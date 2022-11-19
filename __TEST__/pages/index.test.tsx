import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/pages/index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
describe("Home", () => {
  it("render heading", () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );
    const heading = screen.getByText(/population-transition-chart/i);
    expect(heading).toBeInTheDocument();
  });
});
