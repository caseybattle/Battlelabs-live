import { render, screen } from "@testing-library/react";

import HomePage from "./page";

describe("HomePage", () => {
  it("shows the narrowed hero promise", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        name: /ai automation systems that capture leads and close async/i,
      }),
    ).toBeInTheDocument();
  });

  it("shows the primary call to action", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("link", { name: /start your system/i }),
    ).toBeInTheDocument();
  });

  it("shows the three offer tiers", () => {
    render(<HomePage />);

    expect(screen.getByText(/starter system/i)).toBeInTheDocument();
    expect(screen.getByText(/growth system/i)).toBeInTheDocument();
    expect(screen.getByText(/operator system/i)).toBeInTheDocument();
  });

  it("shows the async inquiry form heading", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        name: /tell us what you want automated/i,
      }),
    ).toBeInTheDocument();
  });
});
