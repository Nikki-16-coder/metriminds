"use client";

import ReactECharts from "echarts-for-react";

export default function RevenueChart() {
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
      data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [120000, 150000, 165000, 182000, 195000, 214100],
        type: "line",
        smooth: true,
        areaStyle: {},
      },
    ],
  };

  return (
    <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
      <ReactECharts option={option} style={{ height: "400px" }} />
    </div>
  );
}