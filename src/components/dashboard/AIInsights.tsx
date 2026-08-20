const insights = [
  "Total revenue is ₹214,100 across the available sales period.",
  "Europe generated the highest regional revenue at ₹124,000.",
  "Asia recorded the lowest profit margin at 22.86%.",
  "European profit margin declined from 25.31% in February to 19.46% in April.",
];

export default function AIInsights() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold tracking-tight text-gray-900">
        🧠 AI Insights
      </h2>

      <div className="space-y-3">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="rounded-xl border border-blue-100 border-l-4 border-l-blue-500 bg-blue-50/60 px-4 py-4 transition hover:bg-blue-50"
          >
            <p className="text-sm leading-6 text-gray-700">
              {insight}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}