const BLOCKED_HOSTNAME_PATTERNS = [
  /^localhost$/i,
  /^127\./,
  /^0\.0\.0\.0$/,
  /^::1$/,
  /^10\./,
  /^192\.168\./,
  /^169\.254\./, // link-local / cloud metadata
  /^172\.(1[6-9]|2\d|3[0-1])\./,
  /\.local$/i,
];

export class JobFetchError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
    this.name = "JobFetchError";
  }
}

function assertSafeUrl(url: URL) {
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new JobFetchError("Only http(s) job links are supported.", 400);
  }
  if (BLOCKED_HOSTNAME_PATTERNS.some((re) => re.test(url.hostname))) {
    throw new JobFetchError("That link isn't allowed.", 400);
  }
}

function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

const MAX_BYTES = 3_000_000;

export async function extractJobText(jobUrl: string): Promise<string> {
  const url = new URL(jobUrl);
  assertSafeUrl(url);

  const res = await fetch(url, {
    redirect: "follow",
    signal: AbortSignal.timeout(10_000),
    headers: { "User-Agent": "Mozilla/5.0 (compatible; PortfolioCvTailor/1.0)" },
  });

  if (!res.ok) {
    throw new JobFetchError(`Couldn't fetch that job link (${res.status}).`, 400);
  }

  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("text/html") && !contentType.includes("text/plain")) {
    throw new JobFetchError("That link didn't return a readable page.", 400);
  }

  const reader = res.body?.getReader();
  if (!reader) throw new JobFetchError("Couldn't read that job link.", 400);

  let received = 0;
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    received += value.byteLength;
    if (received > MAX_BYTES) {
      await reader.cancel();
      break;
    }
    chunks.push(value);
  }
  const html = Buffer.concat(chunks).toString("utf-8");
  const text = stripHtml(html);

  if (text.length < 40) {
    throw new JobFetchError("Couldn't find readable job text at that link.", 400);
  }
  return text;
}
