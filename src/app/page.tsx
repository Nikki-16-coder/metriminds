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

      <div className="mx-auto max-w-5xl p-8">
        <h2 className="text-2xl font-semibold">
          Welcome to MetricMind
        </h2>

        <p className="mt-2 text-gray-600">
          Your AI-powered Business Intelligence Assistant
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
