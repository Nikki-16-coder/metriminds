"use client";

import ReactECharts from "echarts-for-react";
import { useRevenueTrend } from "../../hooks/useRevenueTrend";

export default function RevenueChart() {
  const { resultSet, isLoading, error } = useRevenueTrend();

  if (isLoading) {
    return (
      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Revenue Trend
        </h2>
        <p className="text-sm text-gray-500">Loading revenue data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Revenue Trend
        </h2>
        <p className="text-sm text-red-500">
          Error loading revenue data
        </p>
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
      textStyle: {
        fontSize: 18,
        fontWeight: 600,
      },
    },

    tooltip: {
      trigger: "axis",
    },

    grid: {
      left: "6%",
      right: "4%",
      bottom: "10%",
      top: "18%",
      containLabel: true,
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
    <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <ReactECharts
        option={option}
        style={{ height: "400px", width: "100%" }}
      />
    </div>
  );
}