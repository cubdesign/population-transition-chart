import { useQuery } from "@tanstack/react-query";
import { getPrefectures, ApiPrefecture } from "@/services/resasApi";
import { useState } from "react";

export type Prefecture = {
  code: number;
  name: string;
};

const usePrefecture = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const { isLoading } = useQuery({
    queryKey: [`prefectures`],
    queryFn: getPrefectures,
    onSuccess: (data) => {
      setPrefectures(
        data.result.map((prefecture: ApiPrefecture) => {
          return { code: prefecture.prefCode, name: prefecture.prefName };
        })
      );
    },
  });
  return { prefectures, isLoading };
};
export default usePrefecture;
