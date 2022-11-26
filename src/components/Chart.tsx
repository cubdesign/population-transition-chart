import styles from "@/styles/components/Chart.module.scss";

import Highcharts from "highcharts";
import highchartsAccessibility from "highcharts/modules/accessibility";
import HighchartsReact from "highcharts-react-official";
import { FC } from "react";
import { PopulationComposition } from "@/hooks/usePopulationComposition";
import clsx from "clsx";
import ChartLegend from "@/components/ChartLegend";
import useChart from "@/hooks/useChart";

// init the Highcharts module
if (typeof window !== `undefined`) {
  highchartsAccessibility(Highcharts);
}

export type ChartProps = {
  data: PopulationComposition[];
  className?: string;
};

const Chart: FC<ChartProps> = ({ data, className }) => {
  const { chartData, chartOptions, chartRef } = useChart(data);
  return (
    <div className={clsx(styles.chart, className)}>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        ref={chartRef}
      />
      {chartData.length > 0 && <ChartLegend />}
    </div>
  );
};

export default Chart;
