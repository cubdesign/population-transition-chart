import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ErrorBox from "@/components/ui/ErrorBox";
describe("ErrorBox", () => {
  it("メッセージの表示", () => {
    render(<ErrorBox message="エラー" />);
    expect(screen.getByText(/エラー/i)).toBeInTheDocument();
  });
  it("再読み込みボタンの表示", () => {
    render(<ErrorBox message="エラー" retry={true} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  it("再読み込みボタンの非表示", () => {
    render(<ErrorBox message="エラー" retry={false} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
  it("ボタンラベルの指定", () => {
    render(<ErrorBox message="エラー" retry={true} retryText={"retry"} />);
    expect(screen.getByRole("button", { name: "retry" })).toBeInTheDocument();
  });
  it("ボタンクリックでonRetryが呼ばれること", () => {
    const retry = jest.fn();
    render(<ErrorBox message="エラー" retry={true} onRetry={retry} />);

    const button = screen.getByRole("button");
    button.click();
    expect(retry).toBeCalledTimes(1);
  });
});
