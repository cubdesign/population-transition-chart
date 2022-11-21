import { useQueries, UseQueryResult } from "@tanstack/react-query";
import {
  getPopulationComposition,
  ApiPopulationCompositionResponse,
} from "@/services/resasApi";
import { useEffect, useState } from "react";
import { Prefecture } from "./usePrefecture";

const usePopulationComposition = (prefectures: Prefecture[]) => {
  const [populations, setPopulations] = useState<
    ApiPopulationCompositionResponse[]
  >([]);

  const queries: UseQueryResult<ApiPopulationCompositionResponse>[] =
    useQueries({
      queries: prefectures.map((prefecture) => {
        return {
          queryKey: ["population-composition", prefecture.code],
          queryFn: () => getPopulationComposition(prefecture.code),
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
  const allSuccess = queries.every((query) => query.isSuccess);

  useEffect(() => {
    if (allSuccess) {
      const list = queries
        .filter((query) => query.isSuccess)
        .map((query) => query.data!);
      setPopulations(list);
      console.log("list", list);
    }
  }, [allSuccess]);

  return { populations, isLoading: !allSuccess };
};

export default usePopulationComposition;
