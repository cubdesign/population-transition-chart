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

export type UsePopulationCompositionResult = {
  populations: PopulationComposition[];
  errors: Error[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  refetch: () => void;
};

const usePopulationComposition = (
  prefectures: Prefecture[]
): UsePopulationCompositionResult => {
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

  const allSuccess =
    prefectures.length > 0 && queries.every((query) => query.isSuccess);

  const isError =
    prefectures.length > 0 && queries.some((query) => query.isError);

  const errors = queries
    .filter((query) => query.isError)
    .map((query) => query.error as Error);

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
    } else if (prefectures.length === 0) {
      setPopulations([]);
    }

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [allSuccess, prefectures]);

  return {
    populations,
    errors,
    isLoading: !allSuccess,
    isSuccess: allSuccess,
    isError,
    refetch: () => {
      queries.forEach((query) => query.refetch());
    },
  };
};

export default usePopulationComposition;
