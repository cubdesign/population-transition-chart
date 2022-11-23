import "@testing-library/jest-dom";
import { renderHook, waitFor } from "@testing-library/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { server } from "../mocks/server";
import { rest } from "msw";
import { RESAS_API_URL } from "../services/resasApi.error.test";
import usePopulationComposition from "@/hooks/usePopulationComposition";

describe("usePopulationComposition", () => {
  it("正しい値が返ること", async () => {
    server.use(
      rest.get(
        `${RESAS_API_URL}/population/composition/perYear`,
        (req, res, ctx) => {
          const prefCode = req.url.searchParams.get("prefCode");
          if (prefCode === "1") {
            return res(
              ctx.status(200),
              ctx.json({
                message: null,
                result: {
                  boundaryYear: 2015,
                  data: [
                    {
                      label: "総人口",
                      data: [
                        {
                          year: 1960,
                          value: 5039206,
                        },
                        {
                          year: 1965,
                          value: 5171800,
                        },
                        {
                          year: 1970,
                          value: 5184287,
                        },
                        {
                          year: 1975,
                          value: 5338206,
                        },
                        {
                          year: 1980,
                          value: 5575989,
                        },
                        {
                          year: 1985,
                          value: 5679439,
                        },
                        {
                          year: 1990,
                          value: 5643647,
                        },
                        {
                          year: 1995,
                          value: 5692321,
                        },
                        {
                          year: 2000,
                          value: 5683062,
                        },
                        {
                          year: 2005,
                          value: 5627737,
                        },
                        {
                          year: 2010,
                          value: 5506419,
                        },
                        {
                          year: 2015,
                          value: 5381733,
                        },
                        {
                          year: 2020,
                          value: 5216615,
                        },
                        {
                          year: 2025,
                          value: 5016554,
                        },
                        {
                          year: 2030,
                          value: 4791592,
                        },
                        {
                          year: 2035,
                          value: 4546357,
                        },
                        {
                          year: 2040,
                          value: 4280427,
                        },
                        {
                          year: 2045,
                          value: 4004973,
                        },
                      ],
                    },
                    {
                      label: "年少人口",
                      data: [
                        {
                          year: 1960,
                          value: 1681479,
                          rate: 33.3,
                        },
                        {
                          year: 1965,
                          value: 1462123,
                          rate: 28.2,
                        },
                        {
                          year: 1970,
                          value: 1309487,
                          rate: 25.2,
                        },
                        {
                          year: 1975,
                          value: 1312611,
                          rate: 24.5,
                        },
                        {
                          year: 1980,
                          value: 1298324,
                          rate: 23.2,
                        },
                        {
                          year: 1985,
                          value: 1217959,
                          rate: 21.4,
                        },
                        {
                          year: 1990,
                          value: 1034251,
                          rate: 18.3,
                        },
                        {
                          year: 1995,
                          value: 898673,
                          rate: 15.7,
                        },
                        {
                          year: 2000,
                          value: 792352,
                          rate: 13.9,
                        },
                        {
                          year: 2005,
                          value: 719057,
                          rate: 12.7,
                        },
                        {
                          year: 2010,
                          value: 657312,
                          rate: 11.9,
                        },
                        {
                          year: 2015,
                          value: 608296,
                          rate: 11.3,
                        },
                        {
                          year: 2020,
                          value: 561558,
                          rate: 10.7,
                        },
                        {
                          year: 2025,
                          value: 511677,
                          rate: 10.1,
                        },
                        {
                          year: 2030,
                          value: 465307,
                          rate: 9.7,
                        },
                        {
                          year: 2035,
                          value: 423382,
                          rate: 9.3,
                        },
                        {
                          year: 2040,
                          value: 391086,
                          rate: 9.1,
                        },
                        {
                          year: 2045,
                          value: 360177,
                          rate: 8.9,
                        },
                      ],
                    },
                    {
                      label: "生産年齢人口",
                      data: [
                        {
                          year: 1960,
                          value: 3145664,
                          rate: 62.4,
                        },
                        {
                          year: 1965,
                          value: 3460359,
                          rate: 66.9,
                        },
                        {
                          year: 1970,
                          value: 3575731,
                          rate: 68.9,
                        },
                        {
                          year: 1975,
                          value: 3657884,
                          rate: 68.5,
                        },
                        {
                          year: 1980,
                          value: 3823808,
                          rate: 68.5,
                        },
                        {
                          year: 1985,
                          value: 3910729,
                          rate: 68.8,
                        },
                        {
                          year: 1990,
                          value: 3924717,
                          rate: 69.5,
                        },
                        {
                          year: 1995,
                          value: 3942868,
                          rate: 69.2,
                        },
                        {
                          year: 2000,
                          value: 3832902,
                          rate: 67.4,
                        },
                        {
                          year: 2005,
                          value: 3696064,
                          rate: 65.6,
                        },
                        {
                          year: 2010,
                          value: 3482169,
                          rate: 63.2,
                        },
                        {
                          year: 2015,
                          value: 3190804,
                          rate: 59.2,
                        },
                        {
                          year: 2020,
                          value: 2959481,
                          rate: 56.7,
                        },
                        {
                          year: 2025,
                          value: 2781175,
                          rate: 55.4,
                        },
                        {
                          year: 2030,
                          value: 2594718,
                          rate: 54.1,
                        },
                        {
                          year: 2035,
                          value: 2394230,
                          rate: 52.6,
                        },
                        {
                          year: 2040,
                          value: 2140781,
                          rate: 50,
                        },
                        {
                          year: 2045,
                          value: 1931265,
                          rate: 48.2,
                        },
                      ],
                    },
                    {
                      label: "老年人口",
                      data: [
                        {
                          year: 1960,
                          value: 212063,
                          rate: 4.2,
                        },
                        {
                          year: 1965,
                          value: 249318,
                          rate: 4.8,
                        },
                        {
                          year: 1970,
                          value: 299069,
                          rate: 5.7,
                        },
                        {
                          year: 1975,
                          value: 366651,
                          rate: 6.8,
                        },
                        {
                          year: 1980,
                          value: 451727,
                          rate: 8.1,
                        },
                        {
                          year: 1985,
                          value: 549487,
                          rate: 9.6,
                        },
                        {
                          year: 1990,
                          value: 674881,
                          rate: 11.9,
                        },
                        {
                          year: 1995,
                          value: 844927,
                          rate: 14.8,
                        },
                        {
                          year: 2000,
                          value: 1031552,
                          rate: 18.1,
                        },
                        {
                          year: 2005,
                          value: 1205692,
                          rate: 21.4,
                        },
                        {
                          year: 2010,
                          value: 1358068,
                          rate: 24.6,
                        },
                        {
                          year: 2015,
                          value: 1558387,
                          rate: 28.9,
                        },
                        {
                          year: 2020,
                          value: 1695576,
                          rate: 32.5,
                        },
                        {
                          year: 2025,
                          value: 1723702,
                          rate: 34.3,
                        },
                        {
                          year: 2030,
                          value: 1731567,
                          rate: 36.1,
                        },
                        {
                          year: 2035,
                          value: 1728745,
                          rate: 38,
                        },
                        {
                          year: 2040,
                          value: 1748560,
                          rate: 40.8,
                        },
                        {
                          year: 2045,
                          value: 1713531,
                          rate: 42.7,
                        },
                      ],
                    },
                  ],
                },
              })
            );
          } else if (prefCode === "13") {
            return res(
              ctx.status(200),
              ctx.json({
                message: null,
                result: {
                  boundaryYear: 2015,
                  data: [
                    {
                      label: "総人口",
                      data: [
                        {
                          year: 1960,
                          value: 9683802,
                        },
                        {
                          year: 1965,
                          value: 10869244,
                        },
                        {
                          year: 1970,
                          value: 11408071,
                        },
                        {
                          year: 1975,
                          value: 11673554,
                        },
                        {
                          year: 1980,
                          value: 11618281,
                        },
                        {
                          year: 1985,
                          value: 11829363,
                        },
                        {
                          year: 1990,
                          value: 11855563,
                        },
                        {
                          year: 1995,
                          value: 11773605,
                        },
                        {
                          year: 2000,
                          value: 12064101,
                        },
                        {
                          year: 2005,
                          value: 12576601,
                        },
                        {
                          year: 2010,
                          value: 13159388,
                        },
                        {
                          year: 2015,
                          value: 13515271,
                        },
                        {
                          year: 2020,
                          value: 13732951,
                        },
                        {
                          year: 2025,
                          value: 13845936,
                        },
                        {
                          year: 2030,
                          value: 13882538,
                        },
                        {
                          year: 2035,
                          value: 13851782,
                        },
                        {
                          year: 2040,
                          value: 13758624,
                        },
                        {
                          year: 2045,
                          value: 13606683,
                        },
                      ],
                    },
                    {
                      label: "年少人口",
                      data: [
                        {
                          year: 1960,
                          value: 2249052,
                          rate: 23.2,
                        },
                        {
                          year: 1965,
                          value: 2216945,
                          rate: 20.3,
                        },
                        {
                          year: 1970,
                          value: 2400630,
                          rate: 21,
                        },
                        {
                          year: 1975,
                          value: 2564449,
                          rate: 21.9,
                        },
                        {
                          year: 1980,
                          value: 2393687,
                          rate: 20.6,
                        },
                        {
                          year: 1985,
                          value: 2125337,
                          rate: 17.9,
                        },
                        {
                          year: 1990,
                          value: 1727479,
                          rate: 14.5,
                        },
                        {
                          year: 1995,
                          value: 1499126,
                          rate: 12.7,
                        },
                        {
                          year: 2000,
                          value: 1420919,
                          rate: 11.7,
                        },
                        {
                          year: 2005,
                          value: 1424667,
                          rate: 11.3,
                        },
                        {
                          year: 2010,
                          value: 1477371,
                          rate: 11.2,
                        },
                        {
                          year: 2015,
                          value: 1518130,
                          rate: 11.2,
                        },
                        {
                          year: 2020,
                          value: 1534193,
                          rate: 11.1,
                        },
                        {
                          year: 2025,
                          value: 1508463,
                          rate: 10.8,
                        },
                        {
                          year: 2030,
                          value: 1471373,
                          rate: 10.5,
                        },
                        {
                          year: 2035,
                          value: 1443170,
                          rate: 10.4,
                        },
                        {
                          year: 2040,
                          value: 1432251,
                          rate: 10.4,
                        },
                        {
                          year: 2045,
                          value: 1407573,
                          rate: 10.3,
                        },
                      ],
                    },
                    {
                      label: "生産年齢人口",
                      data: [
                        {
                          year: 1960,
                          value: 7067087,
                          rate: 72.9,
                        },
                        {
                          year: 1965,
                          value: 8183336,
                          rate: 75.2,
                        },
                        {
                          year: 1970,
                          value: 8416630,
                          rate: 73.7,
                        },
                        {
                          year: 1975,
                          value: 8360219,
                          rate: 71.6,
                        },
                        {
                          year: 1980,
                          value: 8308563,
                          rate: 71.5,
                        },
                        {
                          year: 1985,
                          value: 8638299,
                          rate: 73,
                        },
                        {
                          year: 1990,
                          value: 8790525,
                          rate: 74.1,
                        },
                        {
                          year: 1995,
                          value: 8705099,
                          rate: 73.9,
                        },
                        {
                          year: 2000,
                          value: 8685878,
                          rate: 71.9,
                        },
                        {
                          year: 2005,
                          value: 8695592,
                          rate: 69.1,
                        },
                        {
                          year: 2010,
                          value: 8850225,
                          rate: 67.2,
                        },
                        {
                          year: 2015,
                          value: 8734155,
                          rate: 64.6,
                        },
                        {
                          year: 2020,
                          value: 8983349,
                          rate: 65.4,
                        },
                        {
                          year: 2025,
                          value: 9065802,
                          rate: 65.4,
                        },
                        {
                          year: 2030,
                          value: 8988837,
                          rate: 64.7,
                        },
                        {
                          year: 2035,
                          value: 8734058,
                          rate: 63,
                        },
                        {
                          year: 2040,
                          value: 8330069,
                          rate: 60.5,
                        },
                        {
                          year: 2045,
                          value: 8023423,
                          rate: 58.9,
                        },
                      ],
                    },
                    {
                      label: "老年人口",
                      data: [
                        {
                          year: 1960,
                          value: 367663,
                          rate: 3.7,
                        },
                        {
                          year: 1965,
                          value: 468963,
                          rate: 4.3,
                        },
                        {
                          year: 1970,
                          value: 590811,
                          rate: 5.1,
                        },
                        {
                          year: 1975,
                          value: 731808,
                          rate: 6.2,
                        },
                        {
                          year: 1980,
                          value: 894961,
                          rate: 7.7,
                        },
                        {
                          year: 1985,
                          value: 1055850,
                          rate: 8.9,
                        },
                        {
                          year: 1990,
                          value: 1244026,
                          rate: 10.4,
                        },
                        {
                          year: 1995,
                          value: 1530695,
                          rate: 13,
                        },
                        {
                          year: 2000,
                          value: 1910456,
                          rate: 15.8,
                        },
                        {
                          year: 2005,
                          value: 2295527,
                          rate: 18.2,
                        },
                        {
                          year: 2010,
                          value: 2642231,
                          rate: 20,
                        },
                        {
                          year: 2015,
                          value: 3005516,
                          rate: 22.2,
                        },
                        {
                          year: 2020,
                          value: 3215409,
                          rate: 23.4,
                        },
                        {
                          year: 2025,
                          value: 3271671,
                          rate: 23.6,
                        },
                        {
                          year: 2030,
                          value: 3422328,
                          rate: 24.6,
                        },
                        {
                          year: 2035,
                          value: 3674554,
                          rate: 26.5,
                        },
                        {
                          year: 2040,
                          value: 3996304,
                          rate: 29,
                        },
                        {
                          year: 2045,
                          value: 4175687,
                          rate: 30.6,
                        },
                      ],
                    },
                  ],
                },
              })
            );
          }
        }
      )
    );
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    const { result } = renderHook(
      () =>
        usePopulationComposition([
          { code: 1, name: "北海道" },
          {
            code: 13,
            name: "東京都",
          },
        ]),
      {
        wrapper,
      }
    );

    expect(result.current.populations).toEqual([]);
    expect(result.current.errors).toEqual([]);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isSuccess).toEqual(false);
    expect(result.current.isError).toBe(false);

    await waitFor(() =>
      expect(result.current.populations).toEqual([
        {
          prefecture: {
            code: 1,
            name: "北海道",
          },
          boundaryYear: 2015,
          data: [
            {
              year: 1960,
              value: 5039206,
            },
            {
              year: 1965,
              value: 5171800,
            },
            {
              year: 1970,
              value: 5184287,
            },
            {
              year: 1975,
              value: 5338206,
            },
            {
              year: 1980,
              value: 5575989,
            },
            {
              year: 1985,
              value: 5679439,
            },
            {
              year: 1990,
              value: 5643647,
            },
            {
              year: 1995,
              value: 5692321,
            },
            {
              year: 2000,
              value: 5683062,
            },
            {
              year: 2005,
              value: 5627737,
            },
            {
              year: 2010,
              value: 5506419,
            },
            {
              year: 2015,
              value: 5381733,
            },
            {
              year: 2020,
              value: 5216615,
            },
            {
              year: 2025,
              value: 5016554,
            },
            {
              year: 2030,
              value: 4791592,
            },
            {
              year: 2035,
              value: 4546357,
            },
            {
              year: 2040,
              value: 4280427,
            },
            {
              year: 2045,
              value: 4004973,
            },
          ],
        },
        {
          prefecture: {
            code: 13,
            name: "東京都",
          },
          boundaryYear: 2015,
          data: [
            {
              year: 1960,
              value: 9683802,
            },
            {
              year: 1965,
              value: 10869244,
            },
            {
              year: 1970,
              value: 11408071,
            },
            {
              year: 1975,
              value: 11673554,
            },
            {
              year: 1980,
              value: 11618281,
            },
            {
              year: 1985,
              value: 11829363,
            },
            {
              year: 1990,
              value: 11855563,
            },
            {
              year: 1995,
              value: 11773605,
            },
            {
              year: 2000,
              value: 12064101,
            },
            {
              year: 2005,
              value: 12576601,
            },
            {
              year: 2010,
              value: 13159388,
            },
            {
              year: 2015,
              value: 13515271,
            },
            {
              year: 2020,
              value: 13732951,
            },
            {
              year: 2025,
              value: 13845936,
            },
            {
              year: 2030,
              value: 13882538,
            },
            {
              year: 2035,
              value: 13851782,
            },
            {
              year: 2040,
              value: 13758624,
            },
            {
              year: 2045,
              value: 13606683,
            },
          ],
        },
      ])
    );
    expect(result.current.errors).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.isError).toBe(false);
  });

  it("エラーが返ること", async () => {
    server.use(
      rest.get(
        `${RESAS_API_URL}/population/composition/perYear`,
        (req, res, ctx) => {
          const prefCode = req.url.searchParams.get("prefCode");
          if (prefCode === "1") {
            return res(
              ctx.status(200),
              ctx.json({
                message: null,
                result: {
                  boundaryYear: 2015,
                  data: [
                    {
                      label: "総人口",
                      data: [
                        {
                          year: 1960,
                          value: 5039206,
                        },
                        {
                          year: 1965,
                          value: 5171800,
                        },
                        {
                          year: 1970,
                          value: 5184287,
                        },
                        {
                          year: 1975,
                          value: 5338206,
                        },
                        {
                          year: 1980,
                          value: 5575989,
                        },
                        {
                          year: 1985,
                          value: 5679439,
                        },
                        {
                          year: 1990,
                          value: 5643647,
                        },
                        {
                          year: 1995,
                          value: 5692321,
                        },
                        {
                          year: 2000,
                          value: 5683062,
                        },
                        {
                          year: 2005,
                          value: 5627737,
                        },
                        {
                          year: 2010,
                          value: 5506419,
                        },
                        {
                          year: 2015,
                          value: 5381733,
                        },
                        {
                          year: 2020,
                          value: 5216615,
                        },
                        {
                          year: 2025,
                          value: 5016554,
                        },
                        {
                          year: 2030,
                          value: 4791592,
                        },
                        {
                          year: 2035,
                          value: 4546357,
                        },
                        {
                          year: 2040,
                          value: 4280427,
                        },
                        {
                          year: 2045,
                          value: 4004973,
                        },
                      ],
                    },
                    {
                      label: "年少人口",
                      data: [
                        {
                          year: 1960,
                          value: 1681479,
                          rate: 33.3,
                        },
                        {
                          year: 1965,
                          value: 1462123,
                          rate: 28.2,
                        },
                        {
                          year: 1970,
                          value: 1309487,
                          rate: 25.2,
                        },
                        {
                          year: 1975,
                          value: 1312611,
                          rate: 24.5,
                        },
                        {
                          year: 1980,
                          value: 1298324,
                          rate: 23.2,
                        },
                        {
                          year: 1985,
                          value: 1217959,
                          rate: 21.4,
                        },
                        {
                          year: 1990,
                          value: 1034251,
                          rate: 18.3,
                        },
                        {
                          year: 1995,
                          value: 898673,
                          rate: 15.7,
                        },
                        {
                          year: 2000,
                          value: 792352,
                          rate: 13.9,
                        },
                        {
                          year: 2005,
                          value: 719057,
                          rate: 12.7,
                        },
                        {
                          year: 2010,
                          value: 657312,
                          rate: 11.9,
                        },
                        {
                          year: 2015,
                          value: 608296,
                          rate: 11.3,
                        },
                        {
                          year: 2020,
                          value: 561558,
                          rate: 10.7,
                        },
                        {
                          year: 2025,
                          value: 511677,
                          rate: 10.1,
                        },
                        {
                          year: 2030,
                          value: 465307,
                          rate: 9.7,
                        },
                        {
                          year: 2035,
                          value: 423382,
                          rate: 9.3,
                        },
                        {
                          year: 2040,
                          value: 391086,
                          rate: 9.1,
                        },
                        {
                          year: 2045,
                          value: 360177,
                          rate: 8.9,
                        },
                      ],
                    },
                    {
                      label: "生産年齢人口",
                      data: [
                        {
                          year: 1960,
                          value: 3145664,
                          rate: 62.4,
                        },
                        {
                          year: 1965,
                          value: 3460359,
                          rate: 66.9,
                        },
                        {
                          year: 1970,
                          value: 3575731,
                          rate: 68.9,
                        },
                        {
                          year: 1975,
                          value: 3657884,
                          rate: 68.5,
                        },
                        {
                          year: 1980,
                          value: 3823808,
                          rate: 68.5,
                        },
                        {
                          year: 1985,
                          value: 3910729,
                          rate: 68.8,
                        },
                        {
                          year: 1990,
                          value: 3924717,
                          rate: 69.5,
                        },
                        {
                          year: 1995,
                          value: 3942868,
                          rate: 69.2,
                        },
                        {
                          year: 2000,
                          value: 3832902,
                          rate: 67.4,
                        },
                        {
                          year: 2005,
                          value: 3696064,
                          rate: 65.6,
                        },
                        {
                          year: 2010,
                          value: 3482169,
                          rate: 63.2,
                        },
                        {
                          year: 2015,
                          value: 3190804,
                          rate: 59.2,
                        },
                        {
                          year: 2020,
                          value: 2959481,
                          rate: 56.7,
                        },
                        {
                          year: 2025,
                          value: 2781175,
                          rate: 55.4,
                        },
                        {
                          year: 2030,
                          value: 2594718,
                          rate: 54.1,
                        },
                        {
                          year: 2035,
                          value: 2394230,
                          rate: 52.6,
                        },
                        {
                          year: 2040,
                          value: 2140781,
                          rate: 50,
                        },
                        {
                          year: 2045,
                          value: 1931265,
                          rate: 48.2,
                        },
                      ],
                    },
                    {
                      label: "老年人口",
                      data: [
                        {
                          year: 1960,
                          value: 212063,
                          rate: 4.2,
                        },
                        {
                          year: 1965,
                          value: 249318,
                          rate: 4.8,
                        },
                        {
                          year: 1970,
                          value: 299069,
                          rate: 5.7,
                        },
                        {
                          year: 1975,
                          value: 366651,
                          rate: 6.8,
                        },
                        {
                          year: 1980,
                          value: 451727,
                          rate: 8.1,
                        },
                        {
                          year: 1985,
                          value: 549487,
                          rate: 9.6,
                        },
                        {
                          year: 1990,
                          value: 674881,
                          rate: 11.9,
                        },
                        {
                          year: 1995,
                          value: 844927,
                          rate: 14.8,
                        },
                        {
                          year: 2000,
                          value: 1031552,
                          rate: 18.1,
                        },
                        {
                          year: 2005,
                          value: 1205692,
                          rate: 21.4,
                        },
                        {
                          year: 2010,
                          value: 1358068,
                          rate: 24.6,
                        },
                        {
                          year: 2015,
                          value: 1558387,
                          rate: 28.9,
                        },
                        {
                          year: 2020,
                          value: 1695576,
                          rate: 32.5,
                        },
                        {
                          year: 2025,
                          value: 1723702,
                          rate: 34.3,
                        },
                        {
                          year: 2030,
                          value: 1731567,
                          rate: 36.1,
                        },
                        {
                          year: 2035,
                          value: 1728745,
                          rate: 38,
                        },
                        {
                          year: 2040,
                          value: 1748560,
                          rate: 40.8,
                        },
                        {
                          year: 2045,
                          value: 1713531,
                          rate: 42.7,
                        },
                      ],
                    },
                  ],
                },
              })
            );
          } else if (prefCode === "13") {
            return res(ctx.status(429));
          } else {
            return res(ctx.status(429));
          }
        }
      )
    );
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    const { result } = renderHook(
      () =>
        usePopulationComposition([
          {
            code: 1,
            name: "北海道",
          },
          { code: 2, name: "青森県" },
          { code: 13, name: "東京都" },
        ]),
      {
        wrapper,
      }
    );
    await waitFor(() => {
      expect(result.current.isError).toBe(true);
      expect(result.current.errors.length).toEqual(2);
      expect(result.current.errors[0]).toBeInstanceOf(Error);
      expect(result.current.isLoading).toBe(true);
      expect(result.current.isSuccess).toBe(false);
    });
  });
});
