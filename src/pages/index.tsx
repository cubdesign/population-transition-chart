import type { NextPage } from "next";
import Head from "next/head";

import React, { useState } from "react";
import styles from "@/styles/pages/index.module.scss";

import clsx from "clsx";
import PrefectureSelector from "@/components/PrefectureSelector";
import Chart from "@/components/Chart";
import usePopulationComposition from "../hooks/usePopulationComposition";
import { Prefecture } from "@/hooks/usePrefecture";
import ErrorBox from "@/components/ui/ErrorBox";

const Home: NextPage = () => {
  const [selectedPrefecture, setSelectedPrefecture] = useState<Prefecture[]>(
    []
  );
  const { populations, refetch, isError } =
    usePopulationComposition(selectedPrefecture);

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
        {isError ? (
          <ErrorBox
            message="人口データの取得に失敗しました。時間をおいて再度お試しください。"
            retry={true}
            onRetry={refetch}
            retryText="再取得"
          />
        ) : (
          <Chart data={populations} />
        )}
      </main>
    </div>
  );
};

export default Home;
