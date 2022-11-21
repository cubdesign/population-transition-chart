import "@testing-library/jest-dom";
import { rest } from "msw";
import { server } from "../mocks/server";
import { getPrefectures, getPopulationComposition } from "@/services/resasApi";

export const RESAS_API_KEY: string = process.env.NEXT_PUBLIC_RESAS_API_KEY!;
export const RESAS_API_URL = process.env.NEXT_PUBLIC_RESAS_API_URL!;

describe("resasApi 異常系", () => {
  it("500エラーの時、「Request failed with status code 500」がThrowされること", () => {
    server.use(
      rest.get(`${RESAS_API_URL}/prefectures`, (req, res, ctx) => {
        return res.once(ctx.status(500));
      })
    );

    expect(getPrefectures()).rejects.toThrow(
      "Request failed with status code 500"
    );
  });

  it("400 Bad Request", () => {
    server.use(
      rest.get(
        `${RESAS_API_URL}/population/composition/perYear`,
        (req, res, ctx) => {
          return res.once(ctx.status(200), ctx.body("403"));
        }
      )
    );

    expect(getPopulationComposition(111)).rejects.toThrow("400 Bad Request");
  });
});
