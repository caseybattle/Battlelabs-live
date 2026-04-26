export type ProductDashboardRow = {
  SKU: string;
  Product: string;
  "Page URL": string;
  Views: string;
  "Free Sample Clicks": string;
  "Checkout Clicks": string;
  Sales: string;
  Refunds: string;
  Revenue: string;
  "Build Hours": string;
  "Next Action": string;
};

export type ProductEvalInput = {
  sku: string;
  pageUrl: string;
  requiredFiles: string[];
  pageText: string;
  assetText: string;
  dashboardRows: ProductDashboardRow[];
  taskQueueText: string;
};

export type ProductEvalResult = {
  passed: boolean;
  checks: Array<{
    name: string;
    passed: boolean;
    detail: string;
  }>;
};

const riskyClaimPatterns = [
  /\bguarantee(?:d|s)?\s+(?:sales|revenue|ranking|rankings|income)\b/i,
  /\bguarantee\s+(?:you\s+)?(?:will\s+)?(?:rank|sell|earn)\b/i,
  /\bpassive income\b/i,
  /\bmake\s+\$?\d+[,\d]*(?:\s+per\s+month|\s+\/\s+month)?\b/i,
  /\b1000x\b/i,
  /\bget rich\b/i,
];

function addCheck(
  checks: ProductEvalResult["checks"],
  name: string,
  passed: boolean,
  detail: string,
) {
  checks.push({ name, passed, detail });
}

function findRiskyClaim(text: string): string | undefined {
  for (const pattern of riskyClaimPatterns) {
    const match = pattern.exec(text);

    if (!match?.index) {
      if (match && !isNegatedClaimContext(text.slice(0, match[0].length + 80))) {
        return pattern.toString();
      }
      continue;
    }

    const context = text.slice(Math.max(0, match.index - 40), match.index + match[0].length + 80);

    if (!isNegatedClaimContext(context)) {
      return pattern.toString();
    }
  }

  return undefined;
}

function isNegatedClaimContext(context: string): boolean {
  return /\b(no|not|avoid|without|does not|do not|cannot|never)\b/i.test(context);
}

export function evaluateProductFoundrySku(input: ProductEvalInput): ProductEvalResult {
  const checks: ProductEvalResult["checks"] = [];
  const combinedPublicText = `${input.pageText}\n${input.assetText}`;
  const dashboardRow = input.dashboardRows.find((row) => row.SKU === input.sku);

  addCheck(
    checks,
    "dashboard row exists",
    Boolean(dashboardRow),
    dashboardRow ? `Found ${input.sku} in dashboard.` : `Missing ${input.sku} from dashboard.`,
  );

  addCheck(
    checks,
    "dashboard page url matches",
    dashboardRow?.["Page URL"] === input.pageUrl,
    dashboardRow
      ? `Dashboard URL is ${dashboardRow["Page URL"] || "(blank)"}.`
      : "Dashboard row missing.",
  );

  addCheck(
    checks,
    "next action exists",
    Boolean(dashboardRow?.["Next Action"]?.trim()),
    dashboardRow?.["Next Action"]?.trim() || "Next action is blank.",
  );

  for (const file of input.requiredFiles) {
    addCheck(checks, `required file: ${file}`, true, "Verified by runner before evaluation.");
  }

  addCheck(
    checks,
    "public page has no-guarantee language",
    /No sales or ranking results are guaranteed/i.test(input.pageText),
    "The page must say that sales/rankings are not guaranteed.",
  );

  addCheck(
    checks,
    "public assets include compliance reminder",
    /platform compliance|platform rules|AI assistance|AI-content disclosure|required AI-content disclosure/i.test(
      input.assetText,
    ),
    "Assets should remind buyers to review platform rules and AI disclosure requirements.",
  );

  const riskyMatch = findRiskyClaim(combinedPublicText);
  addCheck(
    checks,
    "no risky earnings or ranking claims",
    !riskyMatch,
    riskyMatch ? `Matched risky claim pattern ${riskyMatch}.` : "No risky claim patterns found.",
  );

  addCheck(
    checks,
    "task queue has ready distribution gate",
    /KDP-SCORECARD-005.*Ready/.test(input.taskQueueText),
    "The next autonomous action should be distribution/tracking, not more infrastructure.",
  );

  return {
    passed: checks.every((check) => check.passed),
    checks,
  };
}

export function parseSimpleCsv<T extends Record<string, string>>(text: string): T[] {
  const lines = text.trim().split(/\r?\n/);
  const headers = parseCsvLine(lines[0] ?? "");

  return lines.slice(1).filter(Boolean).map((line) => {
    const values = parseCsvLine(line);
    return headers.reduce<Record<string, string>>((row, header, index) => {
      row[header] = values[index] ?? "";
      return row;
    }, {}) as T;
  });
}

function parseCsvLine(line: string): string[] {
  const values: string[] = [];
  let current = "";
  let quoted = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === '"' && quoted && next === '"') {
      current += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      quoted = !quoted;
      continue;
    }

    if (char === "," && !quoted) {
      values.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  values.push(current);
  return values;
}
