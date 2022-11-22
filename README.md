# population-transition-chart

## 仕様

https://notion.yumemi.co.jp/0e9ef27b55704d7882aab55cc86c999d

## デモ

https://population-transition-chart-zeta.vercel.app/

## インストール

### node_modulesのインストール

root
```bash
yarn install
```

e2e
```bash
cd e2e
yarn install
```

### .envの作成

.env.sampleをコピーして.envを作成し、以下の環境変数を設定する。

```
NEXT_PUBLIC_RESAS_API_KEY=XXXXXXXXXXXXXXXX　# RESAS APIのAPIキー
NEXT_PUBLIC_RESAS_API_URL=https://opendata.resas-portal.go.jp/api/v1
```


./e2e/cypress.env.json.sampleをコピーして ./e2e/cypress.config.tsを作成し、以下の環境変数を設定する。

```
{
  "RESAS_API_KEY":"XXXXXXXXXXXXXXXX" // RESAS APIのAPIキー
  "RESAS_API_URL":"https://opendata.resas-portal.go.jp/api/v1" // RESAS APIのURL
}
```


## コマンド

### devサーバー起動

```bash
yarn dev
``` 

### build

```bash
yarn build
``` 

### サーバー起動

```bash
yarn start
``` 


### jestテスト --watch

```bash
yarn test
``` 

### cypress UIを起動

```bash
yarn cypress
``` 

### cypress headlessで実行 

```bash
yarn cypress:headless
``` 

### buildしたファイルでe2eテスト cypress UIを起動 

```bash
yarn e2e
``` 


### buildしたファイルでe2eテスト cypress headlessで実行

```bash
yarn e2e:headless
``` 

### lint実行

```bash
yarn lint
``` 


### prettierでソースを整形

```bash
yarn fmt
``` 


## デプロイ
vercelにデプロイします。
`git push`すると自動でデプロイされます。

https://population-transition-chart-zeta.vercel.app/


### 環境変数の設定
vercelの管理画面から環境変数を設定します。
```
NEXT_PUBLIC_RESAS_API_KEY=XXXXXXXXXXXXXXXX　# RESAS APIのAPIキー
NEXT_PUBLIC_RESAS_API_URL=https://opendata.resas-portal.go.jp/api/v1　# RESAS APIのURL
```

githubの管理画面から環境変数を設定します。
```
NEXT_PUBLIC_RESAS_API_KEY=XXXXXXXXXXXXXXXX　# RESAS APIのAPIキー
NEXT_PUBLIC_RESAS_API_URL=https://opendata.resas-portal.go.jp/api/v1　# RESAS APIのURL

CYPRESS_RESAS_API_KEY=XXXXXXXXXXXXXXXX　# RESAS APIのAPIキー
CYPRESS_RESAS_API_URL=https://opendata.resas-portal.go.jp/api/v1　# RESAS APIのURL  
```