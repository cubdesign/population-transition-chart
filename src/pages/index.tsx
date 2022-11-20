import type { NextPage } from "next";
import Head from "next/head";
import { useQuery, useQueries, UseQueryResult } from "@tanstack/react-query";
import {
  getPopulationComposition,
  PopulationOfYear,
} from "@/services/resasApi";
import { useEffect, useState } from "react";
import styles from "@/styles/pages/index.module.scss";

import clsx from "clsx";
import PrefectureSelector from "@/components/PrefectureSelector";
import Chart from "@/components/Chart";

const Home: NextPage = () => {
  const [prefectureIds, setPrefectureIds] = useState<number[]>([]);

  const [populationComposition, setPopulationComposition] = useState<{
    boundaryYear: number;
    data: PopulationOfYear[];
  }>({ boundaryYear: 0, data: [] });

  const { isLoading: isLoadingPopulationComposition } = useQuery({
    queryKey: ["population-composition", 1],
    queryFn: () => getPopulationComposition(1),
    onSuccess: (data) => {
      const result = {
        boundaryYear: data.result.boundaryYear,
        data: data.result.data
          .filter((item: any) => {
            console.log(item);
            if (item.label === "総人口") {
              return item;
            }
          })
          .at(0)!.data,
      };
      setPopulationComposition(result);
    },
  });

  const queries: UseQueryResult[] = useQueries({
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
              .at(0)!.data,
          };
          console.log("UseQueryResult", id);
          console.log(result);
        },
      };
    }),
  });

  useEffect(() => {
    console.log("queries", queries);
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

        {isLoadingPopulationComposition ? (
          <p>Loading...</p>
        ) : (
          <ul className={styles.list}>
            {populationComposition.data.map((data) => (
              <li key={data.year}>{data.value}</li>
            ))}
          </ul>
        )}

        <Chart />
      </main>
    </div>
  );
};

export default Home;
