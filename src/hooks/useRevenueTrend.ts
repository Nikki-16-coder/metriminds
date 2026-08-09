import { useCubeQuery } from "@cubejs-client/react";

export function useRevenueTrend() {
  return useCubeQuery({
    measures: ["fact_sales.total_revenue"],
    timeDimensions: [
      {
        dimension: "fact_sales.sale_date",
        granularity: "month",
      },
    ],
  });
}