import type { NextPage } from "next";
import Head from "next/head";
import { useQuery } from "@tanstack/react-query";
import {
  getPopulationComposition,
  getPrefectures,
  PopulationOfYear,
  Prefecture,
} from "@/services/resasApi";
import { useState } from "react";
import styles from "./index.module.css";

import Highcharts from "highcharts";
import highchartsAccessibility from "highcharts/modules/accessibility";
import HighchartsReact from "highcharts-react-official";

// init the Highcharts module
if (typeof window !== `undefined`) {
  highchartsAccessibility(Highcharts);
}

const Home: NextPage = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);

  const [populationComposition, setPopulationComposition] = useState<{
    boundaryYear: number;
    data: PopulationOfYear[];
  }>({ boundaryYear: 0, data: [] });

  const { isLoading: isLoadingPrefectures } = useQuery({
    queryKey: ["prefectures"],
    queryFn: getPrefectures,
    onSuccess: (data) => {
      setPrefectures(data.result);
    },
  });

  const { isLoading: isLoadingPopulationComposition } = useQuery({
    queryKey: ["population-composition", { prefCode: 1 }],
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
    <div className={styles.container}>
      <Head>
        <title>population-transition-chart</title>
        <meta name="description" content="population-transition-chart" />
      </Head>

      <main>
        <h1>population-transition-chart</h1>
        <p>Prefectures</p>
        {isLoadingPrefectures ? (
          <p>Loading...</p>
        ) : (
          <ul className={styles.list}>
            {prefectures.map((prefecture) => (
              <li key={prefecture.prefCode}>{prefecture.prefName}</li>
            ))}
          </ul>
        )}

        {isLoadingPopulationComposition ? (
          <p>Loading...</p>
        ) : (
          <ul className={styles.list}>
            {populationComposition.data.map((data) => (
              <li key={data.year}>{data.value}</li>
            ))}
          </ul>
        )}

        <HighchartsReact highcharts={Highcharts} options={options} />
      </main>
    </div>
  );
};

export default Home;
