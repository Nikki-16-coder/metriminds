import { NextResponse } from "next/server";
import { interpretWithLLM } from "@/lib/llmInterpreter";

export async function POST(request: Request) {
  try {
    const { question } = await request.json();

    const result = await interpretWithLLM(question);
    console.log("Gemini result:", result);

    return NextResponse.json(result);
  } catch (error) {
    console.error("LLM error:", error);

    return NextResponse.json(
      { error: "LLM interpretation failed" },
      { status: 500 }
    );
  }
}