import styles from "@/styles/components/Chart.module.scss";

import Highcharts from "highcharts";
import highchartsAccessibility from "highcharts/modules/accessibility";
import HighchartsReact from "highcharts-react-official";

// init the Highcharts module
if (typeof window !== `undefined`) {
  highchartsAccessibility(Highcharts);
}

const Chart = () => {
  const options: Highcharts.Options = {
    accessibility: {
      enabled: true,
    },
    chart: {
      type: "spline",
    },
    title: {
      text: "My chart",
    },
    series: [
      {
        type: "spline",
        data: [1, 2, 1, 4, 3, 6],
      },
    ],
  };
  return (
    <div>
      <h2 className={styles.header}>Chart</h2>

      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Chart;
