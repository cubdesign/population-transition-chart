import styles from "@/styles/components/Chart.module.scss";

import Highcharts from "highcharts";
import highchartsAccessibility from "highcharts/modules/accessibility";
import HighchartsReact from "highcharts-react-official";
import { FC, useEffect, useRef, useState } from "react";
import { PopulationComposition } from "../hooks/usePopulationComposition";
import { Prefecture } from "../hooks/usePrefecture";

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
      },

      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle",
      },

      plotOptions: {
        series: {
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
      },

      yAxis: {
        title: {
          text: "人口",
        },
        crosshair: true,
        labels: {
          format: "{value}",
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
    setChartOptions(options);
  }, [chartData]);

  return (
    <div>
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
