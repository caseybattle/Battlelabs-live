import { readFile } from "node:fs/promises";
import path from "node:path";

const ORIGINAL_WEBHOOK_URL =
  "http://95.111.243.97:5678/webhook/4sAG5F1uJ8P2DssC/webhook/battle-labs-lead";

export async function GET() {
  const htmlPath = path.join(process.cwd(), "public", "battlelabs-original.html");
  const html = await readFile(htmlPath, "utf8");
  const restoredHtml = html.replaceAll(ORIGINAL_WEBHOOK_URL, "/api/inquiry");

  return new Response(restoredHtml, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
