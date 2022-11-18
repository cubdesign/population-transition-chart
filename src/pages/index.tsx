import type { NextPage } from "next";
import Head from "next/head";
const RESAS_API_KEY: string = process.env.NEXT_PUBLIC_RESAS_API_KEY!;

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>population-transition-chart</title>
        <meta name="description" content="population-transition-chart" />
      </Head>

      <main>
        <h1>population-transition-chart</h1>
        <p>Deployment</p>
      </main>
    </div>
  );
};

export default Home;
