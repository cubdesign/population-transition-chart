import styles from "@/styles/components/Chart.module.scss";

import Highcharts from "highcharts";
import highchartsAccessibility from "highcharts/modules/accessibility";
import HighchartsReact from "highcharts-react-official";
import { FC, useEffect, useRef, useState } from "react";
import { PopulationCompositionResponse } from "@/services/resasApi";

// init the Highcharts module
if (typeof window !== `undefined`) {
  highchartsAccessibility(Highcharts);
}
type ChartData = number[];
export type ChartProps = {
  data: PopulationCompositionResponse[];
};

const Chart: FC<ChartProps> = ({ data }) => {
  const [chartData, setChartData] = useState<ChartData[][]>([]);
  const [chartOptions, setChartOptions] = useState<Highcharts.Options>({});

  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  // useEffect(() => {
  //   if (chartComponentRef.current) chartComponentRef.current.chart?.reflow();
  // }, [chartOptions]);

  useEffect(() => {
    const result = data.map((item) => {
      return item.result.data[0].data.map((item) => {
        return [Date.UTC(item.year, 0, 1), item.value];
      });
    });
    setChartData(result);
  }, [data]);

  useEffect(() => {
    const options: Highcharts.Options = {
      chart: {
        // zoomType: "x",
      },

      title: {
        text: "Highcharts drawing points",
      },

      subtitle: {
        text: "Using the Boost module",
      },

      accessibility: {
        screenReaderSection: {
          beforeChartFormat:
            "<{headingTagName}>{chartTitle}</{headingTagName}><div>{chartSubtitle}</div><div>{chartLongdesc}</div><div>{xAxisDescription}</div><div>{yAxisDescription}</div>",
        },
      },

      tooltip: {
        valueDecimals: 2,
      },

      xAxis: {
        type: "datetime",
      },

      series: chartData.map((data, index) => {
        return {
          type: "line",
          data: data,
          lineWidth: 0.5,
          name: "Hourly data points",
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
