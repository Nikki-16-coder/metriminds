"use client";

import { useState } from "react";

type QueryResponse = {
  question: string;
  measure: string;
   queryType: "metric" | "breakdown" | "time";
  responseType?: "currency" | "number" | "percent";
  value?: string;
  dimensions?: string[];
  data?: Record<string, string>[];
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
  <div className="mt-8 flex w-full gap-3">
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
      className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
    />

    <button
      onClick={handleSend}
      className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
    >
      Send
    </button>
  </div>
);
}