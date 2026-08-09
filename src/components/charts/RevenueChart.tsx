"use client";

import ReactECharts from "echarts-for-react";
import { useRevenueTrend } from "../../hooks/useRevenueTrend";

export default function RevenueChart() {
  const { resultSet, isLoading, error } = useRevenueTrend();

  if (isLoading) {
    return (
      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
        <h2 className="mb-4 text-lg font-semibold">Revenue Trend</h2>
        <p>Loading revenue data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
        <h2 className="mb-4 text-lg font-semibold">Revenue Trend</h2>
        <p className="text-red-500">Error loading revenue data</p>
      </div>
    );
  }

  const data = resultSet?.tablePivot() ?? [];

  const months = data.map(
  (row: Record<string, unknown>) => {
    const date = new Date(
      String(row["fact_sales.sale_date.month"])
    );

    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  }
);

const revenue = data.map(
  (row: Record<string, unknown>) =>
    Number(row["fact_sales.total_revenue"])
);

  const option = {
    title: {
      text: "Revenue Trend",
      left: "center",
    },

    tooltip: {
      trigger: "axis",
    },

    xAxis: {
      type: "category",
      data: months,
    },

    yAxis: {
      type: "value",
    },

    series: [
      {
        name: "Revenue",
        data: revenue,
        type: "line",
        smooth: true,
        areaStyle: {},
      },
    ],
  };

  return (
    <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
      <ReactECharts
        option={option}
        style={{ height: "400px" }}
      />
    </div>
  );
}