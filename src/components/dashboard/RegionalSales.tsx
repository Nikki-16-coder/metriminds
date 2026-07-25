const regions = [
  {
    name: "Europe",
    revenue: "₹85,000",
  },
  {
    name: "Asia",
    revenue: "₹70,000",
  },
  {
    name: "North America",
    revenue: "₹59,100",
  },
];

export default function RegionalSales() {
  return (
    <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
      <h2 className="mb-6 text-xl font-semibold">
        🌍 Regional Sales
      </h2>

      <div className="space-y-4">
        {regions.map((region) => (
          <div
            key={region.name}
            className="flex items-center justify-between rounded-lg bg-gray-50 p-4"
          >
            <span className="font-medium">
              {region.name}
            </span>

            <span className="font-bold text-blue-600">
              {region.revenue}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}