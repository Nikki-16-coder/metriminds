export default function RevenueChart() {
  return (
    <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
      <h2 className="mb-6 text-xl font-semibold">
        📈 Revenue Trend
      </h2>

      <div className="flex h-80 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
        <p className="text-gray-500 text-lg">
          Revenue Chart (Coming Soon)
        </p>
      </div>
    </div>
  );
} 

   (
    <div className="mt-8 rounded-xl bg-white shadow-md border border-gray-200 p-6">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">
          Revenue Trend
        </h2>

        <span className="text-sm text-gray-500">
          Last 6 Months
        </span>
      </div>

      <div className="h-80 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center">

        <div className="text-center">

          <div className="text-6xl">
              📈
          </div>

          <h3 className="mt-4 text-xl font-semibold">
            Revenue Chart
          </h3>

          <p className="text-gray-500 mt-2">
            ECharts visualization will appear here.
          </p>

        </div>

      </div>

    </div>
  );
