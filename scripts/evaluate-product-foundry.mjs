import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function readRequired(relativePath) {
  const absolutePath = path.join(root, relativePath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Missing required file: ${relativePath}`);
  }

  return fs.readFileSync(absolutePath, "utf8");
}

function parseCsvLine(line) {
  const values = [];
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

function parseSimpleCsv(text) {
  const lines = text.trim().split(/\r?\n/);
  const headers = parseCsvLine(lines[0] ?? "");

  return lines.slice(1).filter(Boolean).map((line) => {
    const values = parseCsvLine(line);
    return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""]));
  });
}

function isNegatedClaimContext(context) {
  return /\b(no|not|avoid|without|does not|do not|cannot|never)\b/i.test(context);
}

function findRiskyClaim(text, patterns) {
  for (const pattern of patterns) {
    const match = pattern.exec(text);

    if (!match) {
      continue;
    }

    const context = text.slice(Math.max(0, match.index - 40), match.index + match[0].length + 80);

    if (!isNegatedClaimContext(context)) {
      return pattern.toString();
    }
  }

  return undefined;
}

function evaluateProductFoundrySku(input) {
  const checks = [];
  const addCheck = (name, passed, detail) => checks.push({ name, passed, detail });
  const combinedPublicText = `${input.pageText}\n${input.assetText}`;
  const dashboardRow = input.dashboardRows.find((row) => row.SKU === input.sku);
  const riskyClaimPatterns = [
    /\bguarantee(?:d|s)?\s+(?:sales|revenue|ranking|rankings|income)\b/i,
    /\bguarantee\s+(?:you\s+)?(?:will\s+)?(?:rank|sell|earn)\b/i,
    /\bpassive income\b/i,
    /\bmake\s+\$?\d+[,\d]*(?:\s+per\s+month|\s+\/\s+month)?\b/i,
    /\b1000x\b/i,
    /\bget rich\b/i,
  ];

  addCheck(
    "dashboard row exists",
    Boolean(dashboardRow),
    dashboardRow ? `Found ${input.sku} in dashboard.` : `Missing ${input.sku} from dashboard.`,
  );
  addCheck(
    "dashboard page url matches",
    dashboardRow?.["Page URL"] === input.pageUrl,
    dashboardRow ? `Dashboard URL is ${dashboardRow["Page URL"] || "(blank)"}.` : "Dashboard row missing.",
  );
  addCheck(
    "next action exists",
    Boolean(dashboardRow?.["Next Action"]?.trim()),
    dashboardRow?.["Next Action"]?.trim() || "Next action is blank.",
  );

  for (const file of input.requiredFiles) {
    addCheck(`required file: ${file}`, true, "Verified by runner before evaluation.");
  }

  addCheck(
    "public page has no-guarantee language",
    /No sales or ranking results are guaranteed/i.test(input.pageText),
    "The page must say that sales/rankings are not guaranteed.",
  );
  addCheck(
    "public assets include compliance reminder",
    /platform compliance|platform rules|AI assistance|AI-content disclosure|required AI-content disclosure/i.test(
      input.assetText,
    ),
    "Assets should remind buyers to review platform rules and AI disclosure requirements.",
  );

  const riskyMatch = findRiskyClaim(combinedPublicText, riskyClaimPatterns);
  addCheck(
    "no risky earnings or ranking claims",
    !riskyMatch,
    riskyMatch ? `Matched risky claim pattern ${riskyMatch}.` : "No risky claim patterns found.",
  );
  addCheck(
    "task queue has ready distribution gate",
    /KDP-SCORECARD-005.*Ready/.test(input.taskQueueText),
    "The next autonomous action should be distribution/tracking, not more infrastructure.",
  );

  return { passed: checks.every((check) => check.passed), checks };
}

const requiredFiles = [
  "src/app/kdp-niche-scorecard/page.tsx",
  "src/lib/kdp-scorecard.ts",
  "public/products/kdp-niche-scorecard/README.md",
  "public/products/kdp-niche-scorecard/free-sample.md",
  "public/products/kdp-niche-scorecard/paid-report-template.md",
  "ops/agent-native-revenue/kdp-scorecard-launch-plan.md",
  "ops/agent-native-revenue/distribution-task-list.md",
  "ops/agent-native-revenue/battlelabs-agent-product-dashboard.csv",
  "ops/agent-native-revenue/portfolio-task-queue.csv",
];

for (const file of requiredFiles) {
  readRequired(file);
}

const pageText = [
  readRequired("src/app/kdp-niche-scorecard/page.tsx"),
  readRequired("src/lib/kdp-scorecard.ts"),
].join("\n");
const assetText = [
  readRequired("public/products/kdp-niche-scorecard/README.md"),
  readRequired("public/products/kdp-niche-scorecard/free-sample.md"),
  readRequired("public/products/kdp-niche-scorecard/paid-report-template.md"),
].join("\n");
const dashboardRows = parseSimpleCsv(
  readRequired("ops/agent-native-revenue/battlelabs-agent-product-dashboard.csv"),
);
const taskQueueText = readRequired("ops/agent-native-revenue/portfolio-task-queue.csv");

const result = evaluateProductFoundrySku({
  sku: "KDP-SCORECARD-001",
  pageUrl: "/kdp-niche-scorecard",
  requiredFiles,
  pageText,
  assetText,
  dashboardRows,
  taskQueueText,
});

console.log("Battlelabs product foundry evals");
for (const check of result.checks) {
  const marker = check.passed ? "PASS" : "FAIL";
  console.log(`${marker} ${check.name}: ${check.detail}`);
}

if (!result.passed) {
  process.exitCode = 1;
}
