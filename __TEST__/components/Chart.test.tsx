import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/pages/index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Chart from "@/components/Chart";
describe("Chart", () => {
  it("1つのseriesが表示されるこt", async () => {
    const data = [
      {
        prefecture: {
          code: 13,
          name: "東京都",
        },
        boundaryYear: 2015,
        data: [
          {
            year: 1960,
            value: 9683802,
          },
          {
            year: 1965,
            value: 10869244,
          },
          {
            year: 1970,
            value: 11408071,
          },
          {
            year: 1975,
            value: 11673554,
          },
          {
            year: 1980,
            value: 11618281,
          },
          {
            year: 1985,
            value: 11829363,
          },
          {
            year: 1990,
            value: 11855563,
          },
          {
            year: 1995,
            value: 11773605,
          },
          {
            year: 2000,
            value: 12064101,
          },
          {
            year: 2005,
            value: 12576601,
          },
          {
            year: 2010,
            value: 13159388,
          },
          {
            year: 2015,
            value: 13515271,
          },
          {
            year: 2020,
            value: 13732951,
          },
          {
            year: 2025,
            value: 13845936,
          },
          {
            year: 2030,
            value: 13882538,
          },
          {
            year: 2035,
            value: 13851782,
          },
          {
            year: 2040,
            value: 13758624,
          },
          {
            year: 2045,
            value: 13606683,
          },
        ],
      },
    ];

    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Chart data={data} />
      </QueryClientProvider>
    );
    expect(screen.getByText(/東京都/i)).toBeInTheDocument();
  });
  it("2つのseriesが表示されるこt", () => {
    const data = [
      {
        prefecture: {
          code: 13,
          name: "東京都",
        },
        boundaryYear: 2015,
        data: [
          {
            year: 1960,
            value: 9683802,
          },
          {
            year: 1965,
            value: 10869244,
          },
          {
            year: 1970,
            value: 11408071,
          },
          {
            year: 1975,
            value: 11673554,
          },
          {
            year: 1980,
            value: 11618281,
          },
          {
            year: 1985,
            value: 11829363,
          },
          {
            year: 1990,
            value: 11855563,
          },
          {
            year: 1995,
            value: 11773605,
          },
          {
            year: 2000,
            value: 12064101,
          },
          {
            year: 2005,
            value: 12576601,
          },
          {
            year: 2010,
            value: 13159388,
          },
          {
            year: 2015,
            value: 13515271,
          },
          {
            year: 2020,
            value: 13732951,
          },
          {
            year: 2025,
            value: 13845936,
          },
          {
            year: 2030,
            value: 13882538,
          },
          {
            year: 2035,
            value: 13851782,
          },
          {
            year: 2040,
            value: 13758624,
          },
          {
            year: 2045,
            value: 13606683,
          },
        ],
      },
      {
        prefecture: {
          code: 1,
          name: "北海道",
        },
        boundaryYear: 2015,
        data: [
          {
            year: 1960,
            value: 5039206,
          },
          {
            year: 1965,
            value: 5171800,
          },
          {
            year: 1970,
            value: 5184287,
          },
          {
            year: 1975,
            value: 5338206,
          },
          {
            year: 1980,
            value: 5575989,
          },
          {
            year: 1985,
            value: 5679439,
          },
          {
            year: 1990,
            value: 5643647,
          },
          {
            year: 1995,
            value: 5692321,
          },
          {
            year: 2000,
            value: 5683062,
          },
          {
            year: 2005,
            value: 5627737,
          },
          {
            year: 2010,
            value: 5506419,
          },
          {
            year: 2015,
            value: 5381733,
          },
          {
            year: 2020,
            value: 5216615,
          },
          {
            year: 2025,
            value: 5016554,
          },
          {
            year: 2030,
            value: 4791592,
          },
          {
            year: 2035,
            value: 4546357,
          },
          {
            year: 2040,
            value: 4280427,
          },
          {
            year: 2045,
            value: 4004973,
          },
        ],
      },
    ];

    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Chart data={data} />
      </QueryClientProvider>
    );
    expect(screen.getByText(/東京都/i)).toBeInTheDocument();
    expect(screen.getByText(/北海道/i)).toBeInTheDocument();
  });
});
