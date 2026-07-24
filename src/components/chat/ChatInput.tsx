export default function ChatInput() {
  return (
    <div className="mt-8 flex gap-4">
      <input
        type="text"
        placeholder="Ask a business question..."
        className="flex-1 rounded-lg border border-gray-300 p-3"
      />

      <button className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
        Send
      </button>
    </div>
  );
}
