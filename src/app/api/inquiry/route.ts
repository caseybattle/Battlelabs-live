const GOOGLE_FORM_ACTION_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeHwsvqqQefhJRIaQpg9qwYXcVyx0D-Q7corOBHH12bDbzEtw/formResponse";

const SITE_SOURCE = "Battlelabs.live";

const PROJECT_TYPE_MAP: Record<string, string> = {
  "lead-capture": "Consultation",
  "content-social": "Content Creation/Copywriting",
  "website-chat": "Website Design & Development",
  "client-onboarding": "Consultation",
  "business-automation": "Consultation",
  custom: "Other (Please specify below)",
};

export async function POST(request: Request) {
  const payload = await request.json();

  const projectType = PROJECT_TYPE_MAP[payload.service] ?? "Other (Please specify below)";
  const details = typeof payload.details === "string" ? payload.details.trim() : "";

  const formData = new URLSearchParams({
    "entry.1043560953": SITE_SOURCE,
    "entry.611908730": payload.name ?? "",
    "entry.1847535132": payload.email ?? "",
    "entry.259762019": projectType,
    "entry.1993641716": details,
    "entry.2071675749": projectType === "Other (Please specify below)" ? details : "",
  });

  const upstreamResponse = await fetch(GOOGLE_FORM_ACTION_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: formData.toString(),
    cache: "no-store",
    redirect: "manual",
  });

  if (!upstreamResponse.ok && upstreamResponse.status !== 302) {
    return Response.json(
      { ok: false, error: "Google Form submission failed." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
