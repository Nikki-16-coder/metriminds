const insights = [
  "Revenue increased by 18% compared to last month.",
  "Europe recorded the lowest profit margin this quarter.",
  "Laptop Pro X remains the highest-selling product.",
  "Asia continues to show steady revenue growth.",
];

export default function AIInsights() {
  return (
    <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
      <h2 className="mb-6 text-xl font-semibold">
        🧠 AI Insights
      </h2>

      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4"
          >
            <p className="text-gray-700">
              {insight}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}