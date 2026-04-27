import { readFileSync } from "node:fs";
import path from "node:path";

describe("selected work source links", () => {
  const source = readFileSync(
    path.join(process.cwd(), "src", "app", "selected-work", "page.tsx"),
    "utf8",
  );

  it("keeps source-tagged CTAs wired to teardown and pilot pages", () => {
    expect(source).toContain("/async-teardown?source=selected-work-reset-method");
    expect(source).toContain("/pilot-build?source=selected-work-client-sites");
    expect(source).toContain("/async-teardown?source=selected-work-automation");
    expect(source).toContain("/async-teardown?source=selected-work-cta");
    expect(source).toContain("/pilot-build?source=selected-work-cta");
  });
});
