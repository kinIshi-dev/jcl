# JCL

Next.js + TypeScript プロジェクト（GitHub Pages用）

## 開発

```bash
npm install
npm run dev
```

ブラウザで http://localhost:3000 を開く

## ビルド

```bash
npm run build
```

静的ファイルが `out` ディレクトリに生成されます。

## デプロイ

mainブランチにpushすると、GitHub Actionsが自動的にGitHub Pagesにデプロイします。

### GitHub Pages設定

1. GitHubリポジトリの Settings > Pages
2. Source: GitHub Actions を選択
