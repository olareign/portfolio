import { renderToBuffer } from "@react-pdf/renderer";
import { CvDocument } from "@/components/pdf/CvDocument";
import { cvData } from "@/lib/cv-data";
import { GeminiError, callGemini } from "@/lib/tailor/gemini";
import { JobFetchError, extractJobText } from "@/lib/tailor/extract-job-text";
import { buildTailorPrompt } from "@/lib/tailor/prompt";
import { tailorRequestSchema, tailoredCvSchema } from "@/lib/tailor/schema";

export const runtime = "nodejs";

// In-memory, per-instance best-effort limiter — resets on cold start and isn't shared across
// serverless instances. Good enough to blunt casual abuse on a low-traffic personal site; the
// free Gemini tier's own hard quota is the real backstop.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT;
}

function errorResponse(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return errorResponse("Too many requests — try again in a bit.", 429);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse("Invalid request body.", 400);
  }

  const parsed = tailorRequestSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse(parsed.error.issues[0]?.message ?? "Invalid request.", 400);
  }

  try {
    const jobText = parsed.data.jobUrl
      ? await extractJobText(parsed.data.jobUrl)
      : parsed.data.jobDescription!;

    const prompt = buildTailorPrompt(jobText);
    const raw = await callGemini(prompt);

    let json: unknown;
    try {
      json = JSON.parse(raw);
    } catch {
      return errorResponse("AI returned malformed output — try again.", 502);
    }

    const tailored = tailoredCvSchema.safeParse(json);
    if (!tailored.success) {
      return errorResponse("AI output didn't match the expected format — try again.", 502);
    }

    // Identity/contact/certifications/education always come from the real CV, never the model.
    const merged = { ...cvData, ...tailored.data };
    // renderToBuffer is @react-pdf/renderer's PDF layout engine, not React DOM rendering —
    // it throws synchronously catchable errors, so try/catch here is correct.
    // eslint-disable-next-line react-hooks/error-boundaries
    const pdfBuffer = await renderToBuffer(<CvDocument data={merged} />);

    return new Response(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="olareign-cv-tailored.pdf"',
      },
    });
  } catch (err) {
    if (err instanceof JobFetchError || err instanceof GeminiError) {
      return errorResponse(err.message, err.status);
    }
    console.error("tailor-cv failed:", err);
    return errorResponse("Something went wrong generating the tailored CV.", 500);
  }
}
