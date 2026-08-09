"use client";

import { useRegionalSales } from "../../hooks/useRegionalSales";

export default function RegionalSales() {
  const { resultSet, isLoading, error } = useRegionalSales();

  if (isLoading) {
    return (
      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
        <h2 className="mb-4 text-lg font-semibold">🌍 Regional Sales</h2>
        <p>Loading regional sales...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
        <h2 className="mb-4 text-lg font-semibold">🌍 Regional Sales</h2>
        <p className="text-red-500">Error loading regional sales</p>
      </div>
    );
  }

  const data = resultSet?.tablePivot() ?? [];

  return (
    <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
      <h2 className="mb-4 text-lg font-semibold">🌍 Regional Sales</h2>

      <div className="space-y-4">
        {data.map((region) => {
          const regionName = String(
            region["dim_regions.region_name"] ?? "Unknown"
          );

          const revenue = Number(
            region["fact_sales.total_revenue"] ?? 0
          );

          return (
            <div
              key={regionName}
              className="flex items-center justify-between rounded-lg bg-gray-50 p-4"
            >
              <span className="font-medium">
                {regionName}
              </span>

              <span className="font-bold text-blue-600">
                ₹{revenue.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}