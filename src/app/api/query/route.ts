import { NextResponse } from "next/server";
import { interpretWithLLM } from "@/lib/llmInterpreter";



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

    
    const {
  measure,
  responseType,
  dimensions,
  queryType,
  timeDimensions,
  isHighestQuery,
} = await interpretWithLLM(question);

const isDiagnosticQuery =
  question.toLowerCase().includes("why") &&
  question.toLowerCase().includes("margin");
    // --------------------------------
    // Build Cube query
    // --------------------------------

    const cubeQuery = {
      measures: [measure],
      dimensions,
      timeDimensions,
    };
  
 if (isDiagnosticQuery) {
  const diagnosticQuery = {
    measures: [
      "fact_sales.total_profit",
      "fact_sales.total_revenue",
    ],
    dimensions: ["dim_regions.region_name"],
    timeDimensions: [
      {
        dimension: "fact_sales.sale_date",
        granularity: "month",
      },
    ],
  };

  

  const diagnosticResponse = await fetch(
    `http://localhost:4000/cubejs-api/v1/load?query=${encodeURIComponent(
      JSON.stringify(diagnosticQuery)
    )}`
  );

  if (!diagnosticResponse.ok) {
    throw new Error("Diagnostic Cube API request failed");
  }

  const diagnosticData = await diagnosticResponse.json();

  

  

const europeRows = (diagnosticData.data || [])
  .filter(
    (row: QueryRow) =>
      row["dim_regions.region_name"] === "Europe"
  )
  .sort(
    (a: QueryRow, b: QueryRow) =>
      new Date(a["fact_sales.sale_date.month"]).getTime() -
      new Date(b["fact_sales.sale_date.month"]).getTime()
  );

const analysis = europeRows.map((row: QueryRow) => {
  const revenue = Number(row["fact_sales.total_revenue"]);
  const profit = Number(row["fact_sales.total_profit"]);

  return {
    month: row["fact_sales.sale_date.month"],
    revenue,
    profit,
    margin: revenue ? (profit / revenue) * 100 : 0,
  };
});


const firstMargin = analysis[0]?.margin ?? 0;
const lastMargin = analysis[analysis.length - 1]?.margin ?? 0;
const marginChange = lastMargin - firstMargin;

const explanation =
  marginChange < 0
    ? `European profit margin declined from ${firstMargin.toFixed(
        2
      )}% to ${lastMargin.toFixed(
        2
      )}%. The margin fell because profit decreased relative to revenue over the period.`
    : `European profit margin increased from ${firstMargin.toFixed(
        2
      )}% to ${lastMargin.toFixed(2)}%.`;

return NextResponse.json({
  question,
  queryType: "diagnostic",
  responseType: "percent",
  explanation,
  data: analysis,
});

  
}

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
    
    console.log("Cube Data:", cubeData);

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

  console.log("Metric Response:", {
    question,
    measure,
    value,
    responseType,
    queryType,
  });

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