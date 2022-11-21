import { useQuery } from "@tanstack/react-query";
import { getPrefectures, ApiPrefecture } from "@/services/resasApi";
import { useState } from "react";

const usePrefecture = () => {
  const [prefectures, setPrefectures] = useState<ApiPrefecture[]>([]);
  const { isLoading } = useQuery({
    queryKey: [`prefectures`],
    queryFn: getPrefectures,
    onSuccess: (data) => {
      setPrefectures(data.result);
    },
  });
  return { prefectures, isLoading };
};
export default usePrefecture;
