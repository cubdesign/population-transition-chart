import axios, { AxiosResponse } from "axios";

/**
 * 都道府県
 */
export type ApiPrefecture = {
  prefCode: number;
  prefName: string;
};

/**
 * 年の人口
 */
export type ApiPopulationOfYear = {
  year: number;
  value: number;
  rate?: number;
};

/**
 * 都道府県 Response
 */
export type ApiPrefectureResponse = {
  message: string | null;
  result: ApiPrefecture[];
};

/**
 * 人口構成 Response
 */
export type ApiPopulationCompositionResponse = {
  message: string | null;
  result: {
    boundaryYear: number;
    data: {
      label: string;
      data: ApiPopulationOfYear[];
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

apiClient.interceptors.response.use((response: AxiosResponse) => {
  if (response.request.response === "400") {
    throw new Error("400 Bad Request");
  }
  let lowJson: any = {};
  try {
    lowJson = JSON.parse(response.request.response);
    if (lowJson.statusCode && lowJson.statusCode === "403") {
      throw new Error("403 Forbidden");
    }
    if (lowJson.statusCode && lowJson.statusCode === "404") {
      throw new Error("404 Not Found");
    }
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new Error("Response JSON SyntaxError");
    }
    throw err;
  }

  return response;
});
/**
 * 都道府県一覧を取得する
 */
export const getPrefectures = async () => {
  const res = await apiClient.get<ApiPrefectureResponse>("/prefectures");

  return res.data;
};

/**
 * 人口構成を取得する
 *
 * @param prefCode　都道府県コード
 */
export const getPopulationComposition = async (prefCode: number) => {
  const res = await apiClient.get<ApiPopulationCompositionResponse>(
    `/population/composition/perYear`,
    {
      params: {
        cityCode: "-",
        prefCode: prefCode,
      },
    }
  );

  return res.data;
};
