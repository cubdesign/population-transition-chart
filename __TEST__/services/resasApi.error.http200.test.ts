import "@testing-library/jest-dom";
import { onFullfilledHandler } from "@/services/resasApi";
import { AxiosResponse } from "axios";

export const RESAS_API_KEY: string = process.env.NEXT_PUBLIC_RESAS_API_KEY!;
export const RESAS_API_URL = process.env.NEXT_PUBLIC_RESAS_API_URL!;

describe("resasApi onFullfilled  http 200", () => {
  const response: AxiosResponse = {
    data: {},
    status: 200,
    statusText: "",
    headers: {},
    config: {},
    request: {},
  };

  it("400 Bad Request", () => {
    expect(() =>
      onFullfilledHandler({
        ...response,
        request: {
          response: `400`,
        },
      })
    ).toThrowError("400 Bad Request");
  });

  it("403 Forbidden", () => {
    expect(() =>
      onFullfilledHandler({
        ...response,
        request: {
          response: `{"statusCode":"403","message":"Forbidden.","description":""}`,
        },
      })
    ).toThrowError("403 Forbidden");
  });

  it("404 Not Found", () => {
    expect(() =>
      onFullfilledHandler({
        ...response,
        request: {
          response: `{"statusCode":"404","message":"404. That's an error.","description":"The requested URL /404 was not found on this server."}`,
        },
      })
    ).toThrowError("404 Not Found");
  });
  it("Response JSON SyntaxError", () => {
    expect(() =>
      onFullfilledHandler({
        ...response,
        request: {
          response: "{sss:",
        },
      })
    ).toThrowError("Response JSON SyntaxError");
  });
});
