import { rest } from "msw";

export const RESAS_API_URL = process.env.NEXT_PUBLIC_RESAS_API_URL!;

export const handlers = [
  rest.get(`${RESAS_API_URL}/prefectures`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: null,
        result: [
          { prefCode: 1, prefName: "北海道" },
          { prefCode: 2, prefName: "青森県" },
          { prefCode: 3, prefName: "岩手県" },
          { prefCode: 4, prefName: "宮城県" },
          { prefCode: 5, prefName: "秋田県" },
          { prefCode: 6, prefName: "山形県" },
          { prefCode: 7, prefName: "福島県" },
          { prefCode: 8, prefName: "茨城県" },
          { prefCode: 9, prefName: "栃木県" },
          { prefCode: 10, prefName: "群馬県" },
          { prefCode: 11, prefName: "埼玉県" },
          { prefCode: 12, prefName: "千葉県" },
          { prefCode: 13, prefName: "東京都" },
          { prefCode: 14, prefName: "神奈川県" },
          { prefCode: 15, prefName: "新潟県" },
          { prefCode: 16, prefName: "富山県" },
          { prefCode: 17, prefName: "石川県" },
          { prefCode: 18, prefName: "福井県" },
          { prefCode: 19, prefName: "山梨県" },
          { prefCode: 20, prefName: "長野県" },
          { prefCode: 21, prefName: "岐阜県" },
          { prefCode: 22, prefName: "静岡県" },
          { prefCode: 23, prefName: "愛知県" },
          { prefCode: 24, prefName: "三重県" },
          { prefCode: 25, prefName: "滋賀県" },
          { prefCode: 26, prefName: "京都府" },
          { prefCode: 27, prefName: "大阪府" },
          { prefCode: 28, prefName: "兵庫県" },
          { prefCode: 29, prefName: "奈良県" },
          { prefCode: 30, prefName: "和歌山県" },
          { prefCode: 31, prefName: "鳥取県" },
          { prefCode: 32, prefName: "島根県" },
          { prefCode: 33, prefName: "岡山県" },
          { prefCode: 34, prefName: "広島県" },
          { prefCode: 35, prefName: "山口県" },
          { prefCode: 36, prefName: "徳島県" },
          { prefCode: 37, prefName: "香川県" },
          { prefCode: 38, prefName: "愛媛県" },
          { prefCode: 39, prefName: "高知県" },
          { prefCode: 40, prefName: "福岡県" },
          { prefCode: 41, prefName: "佐賀県" },
          { prefCode: 42, prefName: "長崎県" },
          { prefCode: 43, prefName: "熊本県" },
          { prefCode: 44, prefName: "大分県" },
          { prefCode: 45, prefName: "宮崎県" },
          { prefCode: 46, prefName: "鹿児島県" },
          { prefCode: 47, prefName: "沖縄県" },
        ],
      })
    );
  }),
  rest.get(
    `${RESAS_API_URL}/population/composition/perYear`,
    (req, res, ctx) => {
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
  ),
];
