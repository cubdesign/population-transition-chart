import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ChartLegend from "@/components/ChartLegend";
describe("ChartLegend", () => {
  it("実数の表示", () => {
    render(<ChartLegend />);
    expect(screen.getByText("実数")).toBeInTheDocument();
  });
  it("予測hの表示", () => {
    render(<ChartLegend />);
    expect(screen.getByText("予測")).toBeInTheDocument();
  });
});
