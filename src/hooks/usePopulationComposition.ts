import { useQueries, UseQueryResult } from "@tanstack/react-query";
import {
  getPopulationComposition,
  ApiPopulationCompositionResponse,
  ApiPopulationOfYear,
} from "@/services/resasApi";
import { useEffect, useState } from "react";
import { Prefecture } from "./usePrefecture";

export type PopulationOfYear = {
  year: number;
  value: number;
};

export type PopulationComposition = {
  boundaryYear: number;
  prefecture: Prefecture;
  data: PopulationOfYear[];
};

const usePopulationComposition = (prefectures: Prefecture[]) => {
  const [populations, setPopulations] = useState<PopulationComposition[]>([]);

  const queries: UseQueryResult<ApiPopulationCompositionResponse>[] =
    useQueries({
      queries: prefectures.map((prefecture) => {
        return {
          queryKey: ["population-composition", prefecture.code],
          queryFn: () => getPopulationComposition(prefecture.code),
        };
      }),
    });

  const allSuccess = queries.every((query) => query.isSuccess);

  useEffect(() => {
    if (allSuccess) {
      const list = queries
        .filter((query) => query.isSuccess)
        .map<PopulationComposition>((query) => {
          const response = query.data!;
          return {
            boundaryYear: response.result.boundaryYear,
            prefecture: prefectures.find(
              (prefecture) =>
                prefecture.code === Number(response.result.prefCode)
            )!,
            data: response.result.data
              .filter(
                (item: { label: string; data: ApiPopulationOfYear[] }) =>
                  item.label === "総人口"
              )
              .at(0)!
              .data.map<PopulationOfYear>((item) => {
                return {
                  year: item.year,
                  value: item.value,
                };
              }),
          };
        });
      setPopulations(list);
      console.log("list", list);
    }
  }, [allSuccess, prefectures]);

  return { populations, isLoading: !allSuccess };
};

export default usePopulationComposition;
