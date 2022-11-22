import "@testing-library/jest-dom";
import Home from "@/pages/index";
import { renderHook } from "@testing-library/react";
import usePrefecture from "../../src/hooks/usePrefecture";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactElement, ReactNode } from "react";
describe("Home", () => {
  it("render heading", () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    const { prefectures } = renderHook(() => usePrefecture());
    expect(prefectures).toEqual([]);
  });
});
