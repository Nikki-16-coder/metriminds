"use client";

import { useTopProducts } from "../../hooks/useTopProducts";

export default function TopProducts() {
  const { resultSet, isLoading, error } = useTopProducts();

  if (isLoading) {
    return (
      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
        <h2 className="mb-4 text-lg font-semibold">🏆 Top Products</h2>
        <p>Loading top products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
        <h2 className="mb-4 text-lg font-semibold">🏆 Top Products</h2>
        <p className="text-red-500">Error loading top products</p>
      </div>
    );
  }

  const data = resultSet?.tablePivot() ?? [];

  return (
    <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
      <h2 className="mb-4 text-lg font-semibold">🏆 Top Products</h2>

      <div className="space-y-4">
        {data.map((product) => {
          const productName = String(
            product["dim_products.product_name"] ?? "Unknown"
          );

          const revenue = Number(
            product["fact_sales.total_revenue"] ?? 0
          );

          return (
            <div
              key={productName}
              className="flex items-center justify-between rounded-lg bg-gray-50 p-4"
            >
              <span className="font-medium">
                {productName}
              </span>

              <span className="font-bold text-green-600">
                ₹{revenue.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}