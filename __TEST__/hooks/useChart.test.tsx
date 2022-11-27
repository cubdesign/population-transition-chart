import "@testing-library/jest-dom";
import { renderHook, waitFor } from "@testing-library/react";
import useChart, {
  createChartData,
  tooltipFormatTypeShare,
  tooltipFormatTypeSingle,
} from "@/hooks/useChart";
import Highcharts from "highcharts";
import { stub } from "../mocks/utils";

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

describe("tooltipFormatTypeShare", () => {
  it("ただしく表示できること", () => {
    const ctx = stub<Highcharts.TooltipFormatterContextObject>({
      x: Date.UTC(1960, 0, 1),
      points: [
        stub<Highcharts.TooltipFormatterContextObject>({
          y: 9683802,
          series: stub<Highcharts.Series>({
            name: "東京都",
            legendItem: stub<Highcharts.LegendItemObject>({
              symbol: stub<Highcharts.SVGElement>({
                element: stub<SVGElement>({
                  outerHTML: `<path></path>`,
                }),
              }),
            }),
          }),
        }),
      ],
    });

    const wont = `<div class="ptc-tooltip">
  <div class="header">1960年</div>
  <div class="body body-1"><div><svg class="legend-symbol"><path></path></svg>東京都: 9,683,802</div></div>
  <div class="footer"></div>
</div>`;
    expect(tooltipFormatTypeShare(ctx)).toEqual(wont);
  });

  it("ただしい行数で表示できること", () => {
    const createCtx = (n: number) => {
      const points = [];
      for (let i = 0; i < n; i++) {
        points.push(
          stub<Highcharts.TooltipFormatterContextObject>({
            y: 9683802,
            series: stub<Highcharts.Series>({
              name: "東京都",
              legendItem: stub<Highcharts.LegendItemObject>({
                symbol: stub<Highcharts.SVGElement>({
                  element: stub<SVGElement>({
                    outerHTML: `<path></path>`,
                  }),
                }),
              }),
            }),
          })
        );
      }
      return stub<Highcharts.TooltipFormatterContextObject>({
        x: Date.UTC(1960, 0, 1),
        points,
      });
    };

    expect(tooltipFormatTypeShare(createCtx(1))).toMatch(/body-1/);
    expect(tooltipFormatTypeShare(createCtx(16))).toMatch(/body-1/);
    expect(tooltipFormatTypeShare(createCtx(17))).toMatch(/body-2/);
    expect(tooltipFormatTypeShare(createCtx(32))).toMatch(/body-2/);
    expect(tooltipFormatTypeShare(createCtx(33))).toMatch(/body-3/);
  });
});

describe("tooltipFormatTypeSingle", () => {
  it("ただしく表示できること", () => {
    const ctx = stub<Highcharts.TooltipFormatterContextObject>({
      x: Date.UTC(1960, 0, 1),
      point: stub<Highcharts.Point>({
        y: 9683802,
      }),
      series: stub<Highcharts.Series>({
        name: "東京都",
        legendItem: stub<Highcharts.LegendItemObject>({
          symbol: stub<Highcharts.SVGElement>({
            element: stub<SVGElement>({
              outerHTML: `<path></path>`,
            }),
          }),
        }),
      }),
    });

    const wont = `<div class="ptc-tooltip">
  <div class="header">1960年</div>
  <div class="body"><div><svg class="legend-symbol"><path></path></svg>東京都: 9,683,802</div></div>
  <div class="footer"></div>
</div>`;
    expect(tooltipFormatTypeSingle(ctx)).toEqual(wont);
  });
});
