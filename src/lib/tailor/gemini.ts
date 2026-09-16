import { RESPONSE_SCHEMA } from "./prompt";

// gemini-2.0-flash was removed from the free tier in June 2026 — don't default to it.
// Google no longer publishes a fixed quota table; check aistudio.google.com for current limits.
const DEFAULT_MODEL = "gemini-2.5-flash";

export class GeminiError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
    this.name = "GeminiError";
  }
}

export async function callGemini(prompt: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new GeminiError("AI tailoring isn't configured yet (missing GEMINI_API_KEY).", 503);
  }
  const model = process.env.GEMINI_MODEL || DEFAULT_MODEL;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: RESPONSE_SCHEMA,
          temperature: 0.3,
        },
      }),
      signal: AbortSignal.timeout(30_000),
    }
  );

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error("Gemini API error:", res.status, body);
    throw new GeminiError(
      res.status === 429
        ? "The free AI tier is rate-limited right now — try again in a minute."
        : `AI request failed (${res.status}).`,
      res.status === 429 ? 429 : 502
    );
  }

  const data = (await res.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new GeminiError("AI returned an empty response.", 502);
  }
  return text;
}
