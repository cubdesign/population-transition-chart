import axios from "axios";

/**
 * 都道府県
 */
export type Prefecture = {
  prefCode: number;
  prefName: string;
};

/**
 * 年の人口
 */
export type PopulationOfYear = {
  year: number;
  value: number;
  rate?: number;
};

/**
 * 都道府県 Response
 */
export type PrefectureResponse = {
  message: string | null;
  result: Prefecture[];
};

/**
 * 人口構成 Response
 */
export type PopulationCompositionResponse = {
  message: string | null;
  result: {
    boundaryYear: number;
    data: {
      label: string;
      data: PopulationOfYear[];
    }[];
  };
};

export const RESAS_API_KEY: string = process.env.NEXT_PUBLIC_RESAS_API_KEY!;
export const RESAS_API_URL = process.env.NEXT_PUBLIC_RESAS_API_URL!;

export const apiClient = axios.create({
  baseURL: RESAS_API_URL,
  headers: {
    "X-API-KEY": RESAS_API_KEY,
  },
});

/**
 * 都道府県一覧を取得する
 */
export const getPrefectures = async () => {
  const res = await apiClient.get<PrefectureResponse>("/prefectures");
  if (res.request.response === "403") {
    throw new Error("400 Bad Request");
  }
  return res.data;
};

/**
 * 人口構成を取得する
 *
 * @param prefCode　都道府県コード
 */
export const getPopulationComposition = async (prefCode: number) => {
  const res = await apiClient.get<PopulationCompositionResponse>(
    `/population/composition/perYear`,
    {
      params: {
        cityCode: "-",
        prefCode: prefCode,
      },
    }
  );
  if (res.request.response === "403") {
    throw new Error("400 Bad Request");
  }
  return res.data;
};
