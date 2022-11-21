import type { NextPage } from "next";
import Head from "next/head";
import { useQuery, useQueries, UseQueryResult } from "@tanstack/react-query";
import {
  getPopulationComposition,
  PopulationCompositionResponse,
  PopulationOfYear,
} from "@/services/resasApi";
import { useEffect, useState } from "react";
import styles from "@/styles/pages/index.module.scss";

import clsx from "clsx";
import PrefectureSelector from "@/components/PrefectureSelector";
import Chart from "@/components/Chart";
import usePopulationComposition from "../hooks/usePopulationComposition";

const Home: NextPage = () => {
  const [prefectureIds, setPrefectureIds] = useState<number[]>([]);
  const { populations } = usePopulationComposition(prefectureIds);

  useEffect(() => {
    console.log("prefectureIds", prefectureIds);
  }, [prefectureIds]);

  const handleChangePrefecture = (
    change: {
      prefecture_id: number;
      checked: boolean;
    },
    prefecture_ids: number[]
  ) => {
    console.log(change);
    console.log(prefecture_ids);
    setPrefectureIds([...prefecture_ids]);
  };

  return (
    <div className={clsx(styles.container)}>
      <Head>
        <title>population-transition-chart</title>
        <meta name="description" content="population-transition-chart" />
      </Head>

      <main>
        <h1>population-transition-chart</h1>
        <PrefectureSelector onChangePrefecture={handleChangePrefecture} />

        <Chart data={populations} />
      </main>
    </div>
  );
};

export default Home;
