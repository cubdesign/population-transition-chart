import type { NextPage } from "next";
import Head from "next/head";

import { useState } from "react";
import styles from "@/styles/pages/index.module.scss";

import clsx from "clsx";
import PrefectureSelector from "@/components/PrefectureSelector";
import Chart from "@/components/Chart";
import usePopulationComposition from "../hooks/usePopulationComposition";
import { Prefecture } from "@/hooks/usePrefecture";

const Home: NextPage = () => {
  const [selectedPrefecture, setSelectedPrefecture] = useState<Prefecture[]>(
    []
  );
  const { populations } = usePopulationComposition(selectedPrefecture);

  const handleChangePrefecture = (
    change: {
      prefecture: Prefecture;
      checked: boolean;
    },
    all: Prefecture[]
  ) => {
    setSelectedPrefecture(all);
  };

  return (
    <div className={clsx(styles.container)}>
      <Head>
        <title>都道府県別の総人口推移</title>
        <meta
          name="description"
          content="都道府県別の総人口推移をグラフで表示するアプリです。"
        />
      </Head>

      <main>
        <h1 className={styles.title}>都道府県別の総人口推移</h1>
        <PrefectureSelector onChangePrefecture={handleChangePrefecture} />

        <Chart data={populations} />
      </main>
    </div>
  );
};

export default Home;
