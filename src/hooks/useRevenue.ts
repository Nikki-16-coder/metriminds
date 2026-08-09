"use client";

import { useCubeQuery } from "@cubejs-client/react";

export function useRevenue() {
  return useCubeQuery({
    measures: [
      "fact_sales.total_revenue",
      "fact_sales.total_profit",
      "fact_sales.profit_margin",
    ],
  });
}