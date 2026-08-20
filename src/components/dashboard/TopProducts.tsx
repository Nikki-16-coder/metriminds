"use client";

import { useTopProducts } from "../../hooks/useTopProducts";

export default function TopProducts() {
  const { resultSet, isLoading, error } = useTopProducts();

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          🏆 Top Products
        </h2>
        <p className="text-sm text-gray-500">Loading top products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          🏆 Top Products
        </h2>
        <p className="text-sm text-red-500">
          Error loading top products
        </p>
      </div>
    );
  }

  const data = resultSet?.tablePivot() ?? [];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold text-gray-900">
        🏆 Top Products
      </h2>

      <div className="space-y-3">
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
              className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 transition hover:bg-gray-100"
            >
              <span className="font-medium text-gray-700">
                {productName}
              </span>

              <span className="font-semibold text-green-600">
                ₹{revenue.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}