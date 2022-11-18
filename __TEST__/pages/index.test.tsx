import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/pages/index";

describe("Home", () => {
  it("render heading", () => {
    render(<Home />);
    const heading = screen.getByText(/population-transition-chart/i);
    expect(heading).toBeInTheDocument();
  });
});
