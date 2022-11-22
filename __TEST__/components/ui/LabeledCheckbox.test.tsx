import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LabeledCheckbox from "@/components/ui/LabeledCheckbox";
describe("LabeledCheckbox", () => {
  it("東京都を渡すと表示されること", () => {
    render(<LabeledCheckbox label="東京都" />);
    const heading = screen.getByText(/東京都/i);
    expect(heading).toBeInTheDocument();
  });
  it("チェックボックスを持つ", () => {
    render(<LabeledCheckbox label="東京都" />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
  });
  it("checkedを渡すと、チェックされること", () => {
    render(<LabeledCheckbox label="東京都" checked={true} />);
    const checkbox = screen.getByRole<HTMLInputElement>("checkbox");
    expect(checkbox.checked).toBe(true);
  });
});
