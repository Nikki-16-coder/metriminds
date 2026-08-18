import { NextResponse } from "next/server";

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
    let responseType: "currency" | "number" | "percent" = "currency";

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
    // Determine dimension
    // --------------------------------

    let dimensions: string[] = [];
    let queryType = "metric";

    if (
      normalizedQuestion.includes("by region") ||
      normalizedQuestion.includes("by regions") ||
      normalizedQuestion.includes("region")
    ) {
      dimensions = ["dim_regions.region_name"];
      queryType = "breakdown";
    }

    // --------------------------------
    // Build Cube query
    // --------------------------------

    const cubeQuery = {
      measures: [measure],
      dimensions,
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

    const resultData = cubeData.data || [];

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
    // Breakdown response
    // --------------------------------

    return NextResponse.json({
      question,
      measure,
      dimensions,
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