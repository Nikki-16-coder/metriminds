import Header from "../components/common/Header";
import ChatInput from "../components/chat/ChatInput";
import ResponsePanel from "../components/chat/ResponsePanel";
import KPICards from "../components/dashboard/KPICards";
import RevenueChart from "../components/charts/RevenueChart";
import RegionalSales from "../components/dashboard/RegionalSales";
import TopProducts from "../components/dashboard/TopProducts";
import AIInsights from "../components/dashboard/AIInsights";
export default function Home() {
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


        <ChatInput />
        <ResponsePanel />
        <KPICards />
        <RevenueChart />
        <RegionalSales />
        <TopProducts />
        <AIInsights />
      </div>
    </main>
  );
}
