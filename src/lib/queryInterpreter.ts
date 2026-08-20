export type QueryResponseType = "currency" | "number" | "percent";

export type QueryIntent = {
  measure: string;
  responseType: QueryResponseType;
  dimensions: string[];
  queryType: "metric" | "breakdown" | "time";
  timeDimensions: {
    dimension: string;
    granularity: "month";
  }[];
  isHighestQuery: boolean;
};

export function interpretQuestion(question: string): QueryIntent {
  const normalizedQuestion = question.toLowerCase();

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

  let dimensions: string[] = [];
  let queryType: "metric" | "breakdown" | "time" = "metric";

  let timeDimensions: {
    dimension: string;
    granularity: "month";
  }[] = [];

  if (
    normalizedQuestion.includes("region") ||
    normalizedQuestion.includes("by region")
  ) {
    dimensions = ["dim_regions.region_name"];
    queryType = "breakdown";
  } else if (
    normalizedQuestion.includes("product") ||
    normalizedQuestion.includes("by product")
  ) {
    dimensions = ["dim_products.product_name"];
    queryType = "breakdown";
  } else if (
    normalizedQuestion.includes("monthly") ||
    normalizedQuestion.includes("by month") ||
    normalizedQuestion.includes("over time")
  ) {
    timeDimensions = [
      {
        dimension: "fact_sales.sale_date",
        granularity: "month",
      },
    ];

    queryType = "time";
  }

  const isHighestQuery =
    normalizedQuestion.includes("highest") ||
    normalizedQuestion.includes("top");

  return {
    measure,
    responseType,
    dimensions,
    queryType,
    timeDimensions,
    isHighestQuery,
  };
}