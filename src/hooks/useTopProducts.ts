"use client";

import { useCubeQuery } from "@cubejs-client/react";

export function useTopProducts() {
  return useCubeQuery({
    measures: ["fact_sales.total_revenue"],
    dimensions: ["dim_products.product_name"],
    order: {
      "fact_sales.total_revenue": "desc",
    },
    limit: 5,
  });
}