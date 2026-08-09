import { useCubeQuery } from "@cubejs-client/react";

export function useRegionalSales() {
  return useCubeQuery({
    measures: ["fact_sales.total_revenue"],
    dimensions: ["dim_regions.region_name"],
  });
}