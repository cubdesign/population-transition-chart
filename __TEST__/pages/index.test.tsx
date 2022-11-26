import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/pages/index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { server } from "../mocks/server";
import { rest } from "msw";
import { RESAS_API_URL } from "../services/resasApi.error.test";

describe("Home", () => {
  it("render heading", async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );
    const heading = screen.getByText(/都道府県別の総人口推移/i);
    expect(heading).toBeInTheDocument();

    fireEvent.click(await screen.findByRole("checkbox", { name: /北海道/i }));
    fireEvent.click(await screen.findByRole("checkbox", { name: /東京都/i }));

    expect(
      await screen.findByRole("button", { name: /北海道/i })
    ).toBeInTheDocument();

    expect(
      await screen.findByRole("button", { name: /東京都/i })
    ).toBeInTheDocument();
  });
  it("chartデータ読み込みに失敗したらエラーが表示される", async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );

    /*
        成功させる
     */
    const checkbox_success = await screen.findByRole("checkbox", {
      name: /北海道/i,
    });
    fireEvent.click(checkbox_success);

    expect(
      await screen.queryByText(
        /人口データの取得に失敗しました。時間をおいて再度お試しください。/i
      )
    ).not.toBeInTheDocument();

    expect(
      await screen.findByRole("button", { name: /北海道/i })
    ).toBeInTheDocument();
    /*
       失敗させる
    */

    server.use(
      rest.get(
        `${RESAS_API_URL}/population/composition/perYear`,
        (req, res, ctx) => {
          return res.once(ctx.status(429));
        }
      )
    );

    const checkbox_failure = await screen.findByRole("checkbox", {
      name: /東京都/i,
    });

    fireEvent.click(checkbox_failure);

    expect(
      await screen.findByText(
        /人口データの取得に失敗しました。時間をおいて再度お試しください。/i
      )
    ).toBeInTheDocument();

    expect(
      await screen.findByRole("button", {
        name: "再取得",
      })
    ).toBeInTheDocument();

    expect(
      await screen.queryByRole("button", { name: /北海道/i })
    ).not.toBeInTheDocument();

    expect(
      await screen.queryByRole("button", { name: /東京都/i })
    ).not.toBeInTheDocument();
  });

  it("chartデータ読み込みをretryできる", async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );

    /*
    成功させる
 */
    const checkbox_success = await screen.findByRole("checkbox", {
      name: /北海道/i,
    });
    fireEvent.click(checkbox_success);

    expect(
      await screen.findByRole("button", { name: /北海道/i })
    ).toBeInTheDocument();

    expect(
      await screen.queryByText(
        /人口データの取得に失敗しました。時間をおいて再度お試しください。/i
      )
    ).not.toBeInTheDocument();

    /*
       失敗させる
    */

    server.use(
      rest.get(
        `${RESAS_API_URL}/population/composition/perYear`,
        (req, res, ctx) => {
          return res.once(ctx.status(429));
        }
      )
    );

    const checkbox_failure = await screen.findByRole("checkbox", {
      name: /東京都/i,
    });

    fireEvent.click(checkbox_failure);

    expect(
      await screen.findByText(
        /人口データの取得に失敗しました。時間をおいて再度お試しください。/i
      )
    ).toBeInTheDocument();

    expect(
      await screen.queryByRole("button", { name: /北海道/i })
    ).not.toBeInTheDocument();

    expect(
      await screen.queryByRole("button", { name: /東京都/i })
    ).not.toBeInTheDocument();

    /*
         再取得
     */

    fireEvent.click(
      await screen.findByRole("button", {
        name: "再取得",
      })
    );

    expect(
      await screen.findByRole("button", { name: /北海道/i })
    ).toBeInTheDocument();

    expect(
      await screen.findByRole("button", { name: /東京都/i })
    ).toBeInTheDocument();

    expect(
      await screen.queryByRole("button", {
        name: "再取得",
      })
    ).not.toBeInTheDocument();
  });
});
