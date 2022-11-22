import type { NextPage } from "next";
import Head from "next/head";

import { useEffect, useState } from "react";
import styles from "@/styles/pages/index.module.scss";

import clsx from "clsx";
import PrefectureSelector from "@/components/PrefectureSelector";
import Chart from "@/components/Chart";
import usePopulationComposition from "../hooks/usePopulationComposition";
import { Prefecture } from "../hooks/usePrefecture";

const Home: NextPage = () => {
  const [selectedPrefecture, setSelectedPrefecture] = useState<Prefecture[]>(
    []
  );
  const { populations } = usePopulationComposition(selectedPrefecture);

  useEffect(() => {
    console.log("selectedPrefecture", selectedPrefecture);
  }, [selectedPrefecture]);

  const handleChangePrefecture = (
    change: {
      prefecture: Prefecture;
      checked: boolean;
    },
    all: Prefecture[]
  ) => {
    console.log(change);
    console.log(all);

    setSelectedPrefecture(all);
  };

  return (
    <div className={clsx(styles.container)}>
      <Head>
        <title>population-transition-chart</title>
        <meta name="description" content="population-transition-chart" />
      </Head>

      <main>
        <h1 className={styles.title}>population-transition-chart</h1>
        <PrefectureSelector onChangePrefecture={handleChangePrefecture} />

        <Chart data={populations} />
      </main>
    </div>
  );
};

export default Home;
