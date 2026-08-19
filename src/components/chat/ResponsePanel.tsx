"use client";

type QueryResponse = {
  question: string;
  measure: string;
  queryType: "metric" | "breakdown" | "time";
  responseType?: "currency" | "number" | "percent";
  value?: string;
  dimensions?: string[];
  timeDimensions?: {
    dimension: string;
    granularity: string;
  }[];
  data?: Record<string, string>[];
};

type ResponsePanelProps = {
  response: QueryResponse | null;
};

export default function ResponsePanel({
  response,
}: ResponsePanelProps) {
  const formatMetricValue = () => {
    if (!response?.value) return "";

    const numericValue = Number(response.value);

    switch (response.responseType) {
      case "currency":
        return `₹${numericValue.toLocaleString("en-IN")}`;

      case "percent":
        return `${(numericValue * 100).toFixed(2)}%`;

      case "number":
        return numericValue.toLocaleString("en-IN");

      default:
        return response.value;
    }
  };

  return (
    <div className="mt-8 rounded-xl border border-gray-300 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">
        🤖 AI Response
      </h2>

      {!response && (
        <p className="text-gray-600">
          Waiting for your question...
        </p>
      )}

      {/* Single metric */}
      {response?.queryType === "metric" && (
        <>
          <p className="text-sm text-gray-500">
            {response.question}
          </p>

          <p className="mt-3 text-3xl font-bold text-blue-600">
            {formatMetricValue()}
          </p>
        </>
      )}

      {/* Breakdown and time-based results */}
      {(response?.queryType === "breakdown" ||
        response?.queryType === "time") &&
        response.data && (
          <div>
            <p className="mb-4 text-sm text-gray-500">
              {response.question}
            </p>

            <div className="space-y-3">
              {response.data.map((row, index) => {
                const dimensionKey =
                  response.queryType === "time"
                    ? "fact_sales.sale_date.month"
                    : response.dimensions?.[0] ?? "";

                const dimensionValue = row[dimensionKey];

                const measureValue =
                  row[response.measure];

                let displayLabel = dimensionValue;

                if (response.queryType === "time") {
                  const date = new Date(dimensionValue);

                  displayLabel = date.toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
                      year: "numeric",
                    }
                  );
                }

                return (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                  >
                    <span className="font-medium text-gray-800">
                      {displayLabel}
                    </span>

                    <span className="font-semibold text-blue-600">
                      ₹
                      {Number(measureValue).toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
    </div>
  );
}