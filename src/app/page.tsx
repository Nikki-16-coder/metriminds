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
  queryType: "metric" | "breakdown" | "time";
  responseType?: "currency" | "number" | "percent";
  value?: string;
  dimensions?: string[];
  data?: Record<string, string>[];
};

export default function Home() {
  const [response, setResponse] = useState<QueryResponse | null>(null);

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Welcome Section */}
        <section className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome to MetricMind
          </h1>

          <p className="mt-2 text-base text-gray-600">
            AI-powered Business Intelligence Dashboard
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Analyze revenue, profit, regions, and AI-generated business insights.
          </p>
        </section>

        {/* Chat Section */}
        <section className="mb-8">
          <ChatInput onResponse={setResponse} />
        </section>

        {/* AI Response */}
        <section className="mb-8">
          <ResponsePanel response={response} />
        </section>

        {/* KPI Cards */}
        <section className="mb-8">
          <KPICards />
        </section>

        {/* Revenue Chart */}
        <section className="mb-8">
          <RevenueChart />
        </section>

        {/* Regional Sales + Top Products */}
        <section className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <RegionalSales />
          <TopProducts />
        </section>

        {/* AI Insights */}
        <section className="pb-8">
          <AIInsights />
        </section>

      </div>
    </main>
  );
}