import { rest } from "msw";

export const handlers = [
  rest.get("/aaa", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        bbb: "ccc",
      })
    );
  }),
];
