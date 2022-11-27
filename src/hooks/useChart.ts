import { PopulationComposition } from "@/hooks/usePopulationComposition";
import { Prefecture } from "@/hooks/usePrefecture";
import { RefObject, useEffect, useRef, useState } from "react";

import Highcharts from "highcharts";
import highchartsAccessibility from "highcharts/modules/accessibility";
import { useMediaQuery } from "react-responsive";
import HighchartsReact from "highcharts-react-official";

// init the Highcharts module
if (typeof window !== `undefined`) {
  highchartsAccessibility(Highcharts);
}

type Plot = {
  utc: number; // year Date.UTC
  year: number;
  value: number;
};

type ChartData = {
  boundaryYear: number;
  prefecture: Prefecture;
  data: Plot[];
};

export type UseChartResult = {
  chartData: ChartData[];
  chartOptions: Highcharts.Options;
  chartRef: RefObject<HighchartsReact.RefObject>;
};

export const BREAK_POINT_SM = 768;

// 5年ごと
export const INTREVAL_YEAR_5 = 1000 * 60 * 60 * 24 * 365 * 5;
// 10年ごと
export const INTREVAL_YEAR_10 = 1000 * 60 * 60 * 24 * 365 * 10;

export const yearToUTC = (year: number): number => Date.UTC(year, 0, 1);

export const tooltipFormatTypeShare = (
  ctx: Highcharts.TooltipFormatterContextObject
): string => {
  const pointsLength = ctx.points!.length;

  const header = `${new Date(ctx.x!).getFullYear()}年`;

  const footer = ``;

  let columns: number;

  if (pointsLength > 32) {
    columns = 3;
  } else if (pointsLength > 16) {
    columns = 2;
  } else {
    columns = 1;
  }

  const body = ctx.points!.reduce(function (result, point) {
    const legendSymbol = `<svg class="legend-symbol">${point.series.legendItem?.symbol?.element.outerHTML}</svg>`;
    return (
      result +
      `<div>${legendSymbol}${
        point.series.name
      }: ${point.y?.toLocaleString()}</div>`
    );
  }, "");

  const html = `<div class="ptc-tooltip">
  <div class="header">${header}</div> 
  <div class="body body-${columns}">${body}</div> 
  <div class="footer">${footer}</div> 
</div>`;
  return html;
};

export const tooltipFormatTypeSingle = (
  ctx: Highcharts.TooltipFormatterContextObject
): string => {
  const header = `${new Date(ctx.x!).getFullYear()}年`;
  const footer = ``;

  const legendSymbol = `<svg class="legend-symbol">${ctx.series.legendItem?.symbol?.element.outerHTML}</svg>`;
  const body = `<div>${legendSymbol}${
    ctx.series.name
  }: ${ctx.point.y?.toLocaleString()} </div>`;
  const html = `<div class="ptc-tooltip">
  <div class="header">${header}</div> 
  <div class="body">${body}</div> 
  <div class="footer">${footer}</div> 
</div>`;
  return html;
};

export const createChartData = (data: PopulationComposition[]): ChartData[] => {
  const result = data.map<ChartData>((population) => {
    return {
      boundaryYear: population.boundaryYear,
      prefecture: population.prefecture,
      data: population.data.map<Plot>((item) => {
        return {
          utc: yearToUTC(item.year),
          year: item.year,
          value: item.value,
        };
      }),
    };
  });
  return result;
};

export const createSeriesData = (
  chartData: ChartData[],
  isMobile: boolean
): Highcharts.SeriesOptionsType[] => {
  return chartData.map<Highcharts.SeriesOptionsType>((data) => {
    return {
      id: data.prefecture.code.toString(),
      type: "line",
      data: data.data.map<
        | {
            x: number;
            y: number;
          }
        | {
            x: number;
            y: number;
            marker: {
              enabled: boolean;
            };
          }
      >((item) => {
        if (isMobile && item.year > data.boundaryYear) {
          return {
            x: item.utc,
            y: item.value,
            marker: {
              enabled: false,
            },
          };
        } else {
          return {
            x: item.utc,
            y: item.value,
          };
        }
      }),
      lineWidth: 1,
      name: data.prefecture.name,
      zoneAxis: "x",
      zones: [
        {
          value: yearToUTC(data.boundaryYear),
        },
        {
          dashStyle: "Dash",
        },
      ],
    };
  });
};

const useChart = (data: PopulationComposition[]): UseChartResult => {
  const isMobile = useMediaQuery({ maxWidth: BREAK_POINT_SM });

  const chartRef = useRef<HighchartsReact.RefObject>(null);

  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [chartOptions, setChartOptions] = useState<Highcharts.Options>({});
  const [showSeriesCount, setShowSeriesCount] = useState<number>(0);

  useEffect(() => {
    const result = createChartData(data);
    setChartData(result);
  }, [data]);

  useEffect(() => {
    const pointsLength = data.length;

    const nowYear = new Date().getFullYear();

    const options: Highcharts.Options = {
      chart: {
        // zoomType: "x",
      },

      title: {
        text: "",
      },

      subtitle: {
        text: "",
      },

      accessibility: {
        screenReaderSection: {
          beforeChartFormat:
            "<{headingTagName}>{chartTitle}</{headingTagName}><div>{chartSubtitle}</div><div>{chartLongdesc}</div><div>{xAxisDescription}</div><div>{yAxisDescription}</div>",
        },
      },

      tooltip: {
        shared: true,
        borderWidth: 3,
        useHTML: true,
        formatter: function () {
          return tooltipFormatTypeShare(this);
        },
      },

      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle",
        itemMarginBottom: 10,
      },

      plotOptions: {
        series: {
          pointStart: yearToUTC(1960),
          marker: {
            enabled: true,
            radius: 2.5,
          },
          events: {
            hide: function () {
              //
              let count = this.chart.series.reduce<number>((count, series) => {
                if (series.visible) {
                  count++;
                }
                return count;
              }, 0);

              setShowSeriesCount(count);
            },
            show: function () {
              //
              let count = this.chart.series.reduce<number>((count, series) => {
                if (series.visible) {
                  count++;
                }
                return count;
              }, 0);

              setShowSeriesCount(count);
            },
          },
        },
      },

      xAxis: {
        title: {
          text: "年度",
        },
        type: "datetime",
        crosshair: true,
        plotLines: [
          {
            label: {
              text: nowYear + "年",
              style: {
                color: "red",
              },
            },
            color: "red",
            value: yearToUTC(nowYear),
            width: 0.3,
          },
        ],
        labels: {
          //　モバイルの場合は年を斜めにする
          rotation: isMobile ? -45 : 0,
        },
        tickInterval: isMobile ? INTREVAL_YEAR_10 : INTREVAL_YEAR_5,
      },

      yAxis: {
        title: {
          text: isMobile ? "人口数（万人）" : "人口数（人）",
        },
        min: 0,
        crosshair: true,
        labels: {
          formatter: function () {
            if (isMobile) {
              return (Number(this.value) / 10000).toString();
            }
            return this.value?.toLocaleString();
          },
        },
      },

      series: createSeriesData(chartData, isMobile),
    };

    if (isMobile) {
      if (pointsLength > 10) {
        options.tooltip = {
          shared: false,
          formatter: function () {
            return tooltipFormatTypeSingle(this);
          },
        };
      }
    }
    setChartOptions(options);
  }, [chartData, isMobile, showSeriesCount]);

  return {
    chartData,
    chartOptions,
    chartRef,
  };
};

export default useChart;
