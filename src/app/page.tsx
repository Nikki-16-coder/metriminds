"use client";

import { useState } from "react";

import Header from "../components/common/Header";
import ChatInput from "../components/chat/ChatInput";
import ResponsePanel from "../components/chat/ResponsePanel";
import KPICards from "../components/dashboard/KPICards";
import RevenueChart from "../components/charts/RevenueChart";
import RegionalSales from "../components/dashboard/RegionalSales";
import TopProducts from "../components/dashboard/TopProducts";
import AIInsights from "../components/dashboard/AIInsights";

type QueryResponse = {
  question: string;
  measure: string;
  queryType: "metric" | "breakdown";
  responseType?: "currency" | "number" | "percent";
  value?: string;
  dimensions?: string[];
  data?: {
    "dim_regions.region_name": string;
    "fact_sales.total_revenue": string;
  }[];
};

export default function Home() {
  const [response, setResponse] = useState<QueryResponse | null>(null);
  return (
    <main className="min-h-screen bg-gray-100">
      <Header />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome to MetricMind
        </h1>

        <p className="mt-2 text-gray-600">
          AI-powered Business Intelligence Dashboard
        </p>

        <p className="mt-1 text-sm text-gray-500">
          Analyze revenue, profit, regions, and AI-generated business insights.
        </p>

        <ChatInput onResponse={setResponse} />

        <ResponsePanel response={response} />

        <KPICards />
        <RevenueChart />
        <RegionalSales />
        <TopProducts />
        <AIInsights />
      </div>
    </main>
  );
}