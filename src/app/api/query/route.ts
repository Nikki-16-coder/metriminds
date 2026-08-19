import { NextResponse } from "next/server";

type QueryResponseType = "currency" | "number" | "percent";

type QueryRow = Record<string, string>;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const question = body.question;

    if (!question) {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      );
    }

    const normalizedQuestion = question.toLowerCase();

    // --------------------------------
    // Determine measure
    // --------------------------------

    let measure = "fact_sales.total_revenue";
    let responseType: QueryResponseType = "currency";

    if (
      normalizedQuestion.includes("profit margin") ||
      normalizedQuestion.includes("margin")
    ) {
      measure = "fact_sales.profit_margin";
      responseType = "percent";
    } else if (normalizedQuestion.includes("profit")) {
      measure = "fact_sales.total_profit";
      responseType = "currency";
    } else if (
      normalizedQuestion.includes("orders") ||
      normalizedQuestion.includes("order count")
    ) {
      measure = "fact_sales.total_orders";
      responseType = "number";
    } else if (
      normalizedQuestion.includes("quantity") ||
      normalizedQuestion.includes("units")
    ) {
      measure = "fact_sales.total_quantity";
      responseType = "number";
    }

    // --------------------------------
    // Determine dimension / time
    // --------------------------------

    let dimensions: string[] = [];
    let queryType: "metric" | "breakdown" | "time" = "metric";

    let timeDimensions: {
      dimension: string;
      granularity: "month";
    }[] = [];

    if (
      normalizedQuestion.includes("by region") ||
      normalizedQuestion.includes("by regions") ||
      normalizedQuestion.includes("region")
    ) {
      dimensions = ["dim_regions.region_name"];
      queryType = "breakdown";
    } else if (
      normalizedQuestion.includes("by product") ||
      normalizedQuestion.includes("by products") ||
      normalizedQuestion.includes("product")
    ) {
      dimensions = ["dim_products.product_name"];
      queryType = "breakdown";
    } else if (
      normalizedQuestion.includes("over time") ||
      normalizedQuestion.includes("monthly") ||
      normalizedQuestion.includes("by month") ||
      normalizedQuestion.includes("month")
    ) {
      timeDimensions = [
        {
          dimension: "fact_sales.sale_date",
          granularity: "month",
        },
      ];

      queryType = "time";
    }

    // --------------------------------
    // Detect highest / top queries
    // --------------------------------

    const isHighestQuery =
      normalizedQuestion.includes("highest") ||
      normalizedQuestion.includes("top");

    // --------------------------------
    // Build Cube query
    // --------------------------------

    const cubeQuery = {
      measures: [measure],
      dimensions,
      timeDimensions,
    };

    console.log("Cube Query:", cubeQuery);

    // --------------------------------
    // Call Cube
    // --------------------------------

    const cubeResponse = await fetch(
      `http://localhost:4000/cubejs-api/v1/load?query=${encodeURIComponent(
        JSON.stringify(cubeQuery)
      )}`
    );

    if (!cubeResponse.ok) {
      throw new Error("Cube API request failed");
    }

    const cubeData = await cubeResponse.json();

    const resultData: QueryRow[] = cubeData.data || [];

    // --------------------------------
    // Highest / Top result
    // --------------------------------

    if (isHighestQuery && dimensions.length > 0 && resultData.length > 0) {
      const highestRow = resultData.reduce(
        (highest: QueryRow, row: QueryRow) => {
          const highestValue = Number(highest[measure] ?? 0);
          const currentValue = Number(row[measure] ?? 0);

          return currentValue > highestValue ? row : highest;
        }
      );

      return NextResponse.json({
        question,
        measure,
        dimensions,
        data: [highestRow],
        queryType: "breakdown",
      });
    }

    // --------------------------------
    // Single metric response
    // --------------------------------

    if (queryType === "metric") {
      const value = resultData[0]?.[measure];

      if (value === undefined) {
        throw new Error("No data returned from Cube");
      }

      return NextResponse.json({
        question,
        measure,
        value,
        responseType,
        queryType,
      });
    }

    // --------------------------------
    // Breakdown / time response
    // --------------------------------

    return NextResponse.json({
      question,
      measure,
      dimensions,
      timeDimensions,
      data: resultData,
      queryType,
    });
  } catch (error) {
    console.error("Query error:", error);

    return NextResponse.json(
      { error: "Failed to process business query" },
      { status: 500 }
    );
  }
}