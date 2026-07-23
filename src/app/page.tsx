import Header from "../components/common/Header";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Header />

      <div className="p-8">
        <h2 className="text-2xl font-semibold">
          Welcome to MetricMind
        </h2>

        <p className="mt-2 text-gray-600">
          Your AI-powered Business Intelligence Assistant
        </p>
      </div>
    </main>
  );
}

