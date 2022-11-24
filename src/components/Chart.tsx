import styles from "@/styles/components/Chart.module.scss";

import Highcharts from "highcharts";
import highchartsAccessibility from "highcharts/modules/accessibility";
import HighchartsReact from "highcharts-react-official";
import { FC, useEffect, useRef, useState } from "react";
import { PopulationComposition } from "@/hooks/usePopulationComposition";
import { Prefecture } from "@/hooks/usePrefecture";
import { useMediaQuery } from "react-responsive";

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

export type ChartProps = {
  data: PopulationComposition[];
};

const Chart: FC<ChartProps> = ({ data }) => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [chartOptions, setChartOptions] = useState<Highcharts.Options>({});

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  useEffect(() => {
    const result = data.map<ChartData>((population) => {
      return {
        boundaryYear: population.boundaryYear,
        prefecture: population.prefecture,
        data: population.data.map<Plot>((item) => {
          return {
            utc: Date.UTC(item.year, 0, 1),
            year: item.year,
            value: item.value,
          };
        }),
      };
    });

    setChartData(result);
  }, [data]);

  useEffect(() => {
    const pointsLength = data.length;

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
          const header = `${new Date(this.x!).getFullYear()}年`;

          const footer = ``;

          let columns: number;

          if (pointsLength > 32) {
            columns = 3;
          } else if (pointsLength > 16) {
            columns = 2;
          } else {
            columns = 1;
          }

          const body = this.points!.reduce(function (result, point) {
            const legendSymbol = `<svg class="legend-symbol">
  ${point.series.legendItem?.symbol?.element.outerHTML}
</svg>`;
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
          console.log(html);
          return html;
        },
      },

      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle",
      },

      plotOptions: {
        series: {
          pointStart: Date.UTC(1960, 0, 1),
          pointInterval: 24 * 60 * 60 * 1000 * 365,
          marker: {
            enabled: true,
            radius: 2.5,
          },
        },
      },

      xAxis: {
        type: "datetime",
        crosshair: true,
        plotLines: [
          {
            label: {
              text: new Date().getFullYear().toString(),
            },
            color: "red", // Color value
            value: Date.UTC(new Date().getFullYear(), 0, 1), // Value of where the line will appear
            width: 0.5, // Width of the line
          },
        ],
        labels: {
          rotation: isMobile ? -45 : 0,
        },
      },

      yAxis: {
        title: {
          text: "人口",
        },
        min: 0,
        crosshair: true,
        labels: {
          formatter: function () {
            return this.value?.toLocaleString();
          },
        },
      },

      series: chartData.map<Highcharts.SeriesOptionsType>((data) => {
        return {
          id: data.prefecture.code.toString(),
          type: "line",
          data: data.data.map<[number, number]>((item) => {
            return [item.utc, item.value];
          }),
          lineWidth: 1,
          name: data.prefecture.name,
          zoneAxis: "x",
          zones: [
            {
              value: Date.UTC(data.boundaryYear, 0, 1),
            },
            {
              dashStyle: "Dash",
            },
          ],
        };
      }),
    };

    if (isMobile) {
      options.yAxis = {
        title: {
          text: "人口(万人)",
        },
        min: 0,
        crosshair: true,
        labels: {
          formatter: function () {
            return (Number(this.value) / 10000).toString();
          },
        },
      };

      if (pointsLength > 10) {
        options.tooltip = {
          shared: false,
          formatter: function () {
            const header = `${new Date(this.x!).getFullYear()}年`;
            const footer = ``;

            const legendSymbol = `<svg class="legend-symbol">
  ${this.series.legendItem?.symbol?.element.outerHTML}
</svg>`;
            const body = `<div>${legendSymbol}${
              this.series.name
            }: ${this.point.y?.toLocaleString()} </div>`;
            const html = `<div class="ptc-tooltip">
  <div class="header">${header}</div> 
  <div class="body">${body}</div> 
  <div class="footer">${footer}</div> 
</div>`;
            return html;
          },
        };
      }
    }
    setChartOptions(options);
  }, [chartData, isMobile]);

  return (
    <div className={styles.chart}>
      <h2 className={styles.header}>Chart</h2>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        ref={chartComponentRef}
      />
    </div>
  );
};

export default Chart;
