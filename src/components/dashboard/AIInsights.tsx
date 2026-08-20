const insights = [
  "Total revenue is ₹214,100 across the available sales period.",
  "Europe generated the highest regional revenue at ₹124,000.",
  "Asia recorded the lowest profit margin at 22.86%.",
  "European profit margin declined from 25.31% in February to 19.46% in April.",
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