import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PrefectureSelector from "@/components/PrefectureSelector";
describe("PrefectureSelector", () => {
  it("選択できること", async () => {
    const queryClient = new QueryClient();

    const handleChangePrefecture = jest.fn();
    render(
      <QueryClientProvider client={queryClient}>
        <PrefectureSelector onChangePrefecture={handleChangePrefecture} />
      </QueryClientProvider>
    );

    await waitFor(() =>
      expect(screen.getByText(/東京都/i)).toBeInTheDocument()
    );

    const checkbox = screen.getByRole("checkbox", { name: /東京都/i });
    expect(checkbox).not.toBeChecked();

    handleChangePrefecture.mockImplementation((change, all) => {
      expect(change).toEqual({
        prefecture: {
          code: 13,
          name: "東京都",
        },
        checked: true,
      });
      expect(all).toEqual([
        {
          code: 13,
          name: "東京都",
        },
      ]);
    });

    checkbox.click();
    expect(checkbox).toBeChecked();

    handleChangePrefecture.mockImplementation((change, all) => {
      expect(change).toEqual({
        prefecture: {
          code: 13,
          name: "東京都",
        },
        checked: false,
      });
      expect(all).toEqual([]);
    });

    checkbox.click();
    expect(checkbox).not.toBeChecked();
  });
  it("複数選択できること", async () => {
    const queryClient = new QueryClient();

    const handleChangePrefecture = jest.fn();
    render(
      <QueryClientProvider client={queryClient}>
        <PrefectureSelector onChangePrefecture={handleChangePrefecture} />
      </QueryClientProvider>
    );

    handleChangePrefecture.mockImplementation((change, all) => {
      expect(change).toEqual({
        prefecture: {
          code: 13,
          name: "東京都",
        },
        checked: true,
      });
      expect(all).toEqual([
        {
          code: 13,
          name: "東京都",
        },
      ]);
    });

    fireEvent.click(await screen.findByRole("checkbox", { name: /東京都/i }));

    handleChangePrefecture.mockImplementation((change, all) => {
      expect(change).toEqual({
        prefecture: {
          code: 1,
          name: "北海道",
        },
        checked: true,
      });
      expect(all).toEqual([
        {
          code: 1,
          name: "北海道",
        },
        {
          code: 13,
          name: "東京都",
        },
      ]);
    });

    fireEvent.click(await screen.findByRole("checkbox", { name: /北海道/i }));
  });
});
