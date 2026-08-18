"use client";

import { useState } from "react";

type QueryResponse = {
  question: string;
  measure: string;
  queryType: "metric" | "breakdown";
  responseType?: "currency" | "number" | "percent";
  value?: string;
  dimensions?: string[];
  data?: {
    "dim_regions.region_name": string;
    "fact_sales.total_revenue": string;
  }[];
};

type ChatInputProps = {
  onResponse: (response: QueryResponse) => void;
};

export default function ChatInput({ onResponse }: ChatInputProps) {
  const [question, setQuestion] = useState("");

  const handleSend = async () => {
    if (!question.trim()) return;

    try {
      const response = await fetch("/api/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      console.log("API Response:", data);

      onResponse(data);

      setQuestion("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="mt-8 flex gap-4">
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
        placeholder="Ask a business question..."
        className="flex-1 rounded-lg border border-gray-300 p-3"
      />

      <button
        onClick={handleSend}
        className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        Send
      </button>
    </div>
  );
}