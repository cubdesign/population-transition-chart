import styles from "@/styles/components/ChartLegend.module.scss";
import { FC } from "react";
import clsx from "clsx";

export type ChartLegendProps = {
  className?: string;
};
const ChartLegend: FC<ChartLegendProps> = ({ className }) => {
  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.inner}>
        <div className={styles.legends}>
          <div className={clsx(styles.legend, styles.legend1)}>実数</div>
          <div className={clsx(styles.legend, styles.legend2)}>予測</div>
        </div>
      </div>
    </div>
  );
};

export default ChartLegend;
