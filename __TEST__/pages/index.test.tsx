import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/pages/index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
describe("Home", () => {
  it("render heading", async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );
    const heading = screen.getByText(/population-transition-chart/i);
    expect(heading).toBeInTheDocument();

    // expect(
    //   await screen.findByRole("button", { name: /北海道/i })
    // ).toBeUndefined();

    fireEvent.click(await screen.findByRole("checkbox", { name: /北海道/i }));
    fireEvent.click(await screen.findByRole("checkbox", { name: /東京都/i }));

    expect(
      await screen.findByRole("button", { name: /北海道/i })
    ).toBeInTheDocument();

    expect(
      await screen.findByRole("button", { name: /東京都/i })
    ).toBeInTheDocument();
  });
});
