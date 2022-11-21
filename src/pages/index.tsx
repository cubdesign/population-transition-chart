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

const Home: NextPage = () => {
  const [prefectureIds, setPrefectureIds] = useState<number[]>([]);
  const [populations, setPopulations] = useState<
    PopulationCompositionResponse[]
  >([]);
  const queries: UseQueryResult<PopulationCompositionResponse>[] = useQueries({
    queries: prefectureIds.map((id) => {
      return {
        queryKey: ["population-composition", id],
        queryFn: () => getPopulationComposition(id),
        onSuccess: (data: any) => {
          const result = {
            boundaryYear: data.result.boundaryYear,
            data: data.result.data
              .filter((item: any) => {
                //console.log(item);
                if (item.label === "総人口") {
                  return item;
                }
              })
              .at(0).data,
          };
          // console.log("UseQueryResult", id);
          // console.log("result", result);
        },
      };
    }),
  });
  const allSuccess = queries.every((query) => query.isSuccess === true);

  useEffect(() => {
    console.log("prefectureIds", prefectureIds);
  }, [prefectureIds]);

  useEffect(() => {
    if (allSuccess) {
      const list = queries
        .filter((query) => query.isSuccess)
        .map((query) => query.data!);
      setPopulations(list);
      console.log("list", list);
    }
  }, [allSuccess]);

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
