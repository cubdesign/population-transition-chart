import "@testing-library/jest-dom";
import { renderHook, waitFor } from "@testing-library/react";
import useChart, { createChartData } from "@/hooks/useChart";

describe("useChart", () => {
  it("chart data を正しく作成", () => {
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
        ],
      },
    ];
    const wont = [
      {
        prefecture: {
          code: 13,
          name: "東京都",
        },
        boundaryYear: 2015,
        data: [
          {
            utc: Date.UTC(1960, 0, 1),
            year: 1960,
            value: 9683802,
          },
          {
            utc: Date.UTC(1965, 0, 1),
            year: 1965,
            value: 10869244,
          },
          {
            utc: Date.UTC(1970, 0, 1),
            year: 1970,
            value: 11408071,
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
            utc: Date.UTC(1960, 0, 1),
            year: 1960,
            value: 5039206,
          },
          {
            utc: Date.UTC(1965, 0, 1),
            year: 1965,
            value: 5171800,
          },
          {
            utc: Date.UTC(1970, 0, 1),
            year: 1970,
            value: 5184287,
          },
        ],
      },
    ];
    expect(createChartData(data)).toEqual(wont);
  });

  it("chart data を正しくセット", () => {
    const data1 = [
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
        ],
      },
    ];
    const wont1 = [
      {
        prefecture: {
          code: 13,
          name: "東京都",
        },
        boundaryYear: 2015,
        data: [
          {
            utc: Date.UTC(1960, 0, 1),
            year: 1960,
            value: 9683802,
          },
          {
            utc: Date.UTC(1965, 0, 1),
            year: 1965,
            value: 10869244,
          },
          {
            utc: Date.UTC(1970, 0, 1),
            year: 1970,
            value: 11408071,
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
            utc: Date.UTC(1960, 0, 1),
            year: 1960,
            value: 5039206,
          },
          {
            utc: Date.UTC(1965, 0, 1),
            year: 1965,
            value: 5171800,
          },
          {
            utc: Date.UTC(1970, 0, 1),
            year: 1970,
            value: 5184287,
          },
        ],
      },
    ];
    const { result, rerender } = renderHook(() => useChart(data1));
    expect(result.current.chartData).toEqual(wont1);

    const data2 = [
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
        ],
      },
    ];
    const wont2 = [
      {
        prefecture: {
          code: 13,
          name: "東京都",
        },
        boundaryYear: 2015,
        data: [
          {
            utc: Date.UTC(1960, 0, 1),
            year: 1960,
            value: 9683802,
          },
          {
            utc: Date.UTC(1965, 0, 1),
            year: 1965,
            value: 10869244,
          },
          {
            utc: Date.UTC(1970, 0, 1),
            year: 1970,
            value: 11408071,
          },
        ],
      },
    ];

    rerender(data2);
    waitFor(() => {
      expect(result.current.chartData).toEqual(wont2);
    });
  });
});
