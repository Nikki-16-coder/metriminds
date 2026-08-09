"use client";

import KPICard from "./KPICard";
import { useRevenue } from "../../hooks/useRevenue";

export default function KPICards() {
  const { resultSet, isLoading, error } = useRevenue();

  const data = resultSet?.tablePivot()?.[0];

  const revenue = data?.["fact_sales.total_revenue"] ?? 0;
  const profit = data?.["fact_sales.total_profit"] ?? 0;
  const margin = data?.["fact_sales.profit_margin"] ?? 0;

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">

      <KPICard
        title="Revenue"
        value={
          isLoading
            ? "Loading..."
            : error
            ? "Error"
            : `₹${Number(revenue).toLocaleString()}`
        }
      />

      <KPICard
        title="Profit"
        value={
          isLoading
            ? "Loading..."
            : error
            ? "Error"
            : `₹${Number(profit).toLocaleString()}`
        }
      />

      <KPICard
        title="Margin"
        value={
          isLoading
            ? "Loading..."
            : error
            ? "Error"
            : `${Number(margin).toFixed(2)}%`
        }
      />

    </div>
  );
}