import { useQuery } from "@tanstack/react-query";
import {
  getPrefectures,
  ApiPrefecture,
  ApiPrefectureResponse,
} from "@/services/resasApi";
import { useState } from "react";

export type Prefecture = {
  code: number;
  name: string;
};

export type UsePrefectureResult = {
  prefectures: Prefecture[];
  error: Error | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  refetch: () => void;
};

const usePrefecture = (): UsePrefectureResult => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const { isLoading, error, isSuccess, isError, refetch } = useQuery<
    ApiPrefectureResponse,
    Error
  >({
    queryKey: [`prefectures`],
    queryFn: getPrefectures,
    onSuccess: (data) => {
      setPrefectures(
        data.result.map<Prefecture>((prefecture: ApiPrefecture) => {
          return { code: prefecture.prefCode, name: prefecture.prefName };
        })
      );
    },
  });
  return { prefectures, error, isLoading, isSuccess, isError, refetch };
};
export default usePrefecture;
