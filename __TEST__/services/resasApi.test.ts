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

  it("429 Too Many Requests", () => {
    server.use(
      rest.get(`${RESAS_API_URL}/prefectures`, (req, res, ctx) => {
        return res.once(ctx.status(429));
      })
    );

    expect(getPrefectures()).rejects.toThrow(
      "Request failed with status code 429"
    );
  });

  it("400 Bad Request", () => {
    server.use(
      rest.get(
        `${RESAS_API_URL}/population/composition/perYear`,
        (req, res, ctx) => {
          return res.once(ctx.status(200), ctx.body("400"));
        }
      )
    );

    expect(getPopulationComposition(111)).rejects.toThrow("400 Bad Request");
  });

  it("403 Forbidden", () => {
    server.use(
      rest.get(
        `${RESAS_API_URL}/population/composition/perYear`,
        (req, res, ctx) => {
          return res.once(
            ctx.status(200),
            ctx.json({
              statusCode: "403",
              message: "Forbidden.",
              description: "",
            })
          );
        }
      )
    );

    expect(getPopulationComposition(111)).rejects.toThrow("403 Forbidden");
  });

  it("404 Not Found", () => {
    server.use(
      rest.get(
        `${RESAS_API_URL}/population/composition/perYear`,
        (req, res, ctx) => {
          return res.once(
            ctx.status(200),
            ctx.json({
              statusCode: "404",
              message: "404. That's an error.",
              description:
                "The requested URL /404 was not found on this server.",
            })
          );
        }
      )
    );

    expect(getPopulationComposition(111)).rejects.toThrow("404 Not Found");
  });
});
