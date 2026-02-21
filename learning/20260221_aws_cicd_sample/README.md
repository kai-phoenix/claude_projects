# AWS CI/CD Sample with Next.js

## 目的

AWS の CI/CD パイプライン（GitHub Actions + CodeDeploy + EC2）を使った、Next.js アプリケーションの自動デプロイを実装・理解する。

## 今日の学習テーマ

- GitHub Actions で自動テスト・ビルド・デプロイを実行
- CloudFormation で AWS インフラを IaC で管理
- Docker でアプリケーションをコンテナ化
- EC2 への自動デプロイパイプラインを構築

## 使用技術

- **Next.js**: 14（App Router）
- **言語**: TypeScript
- **テスト**: Jest + React Testing Library
- **CI/CD**: GitHub Actions
- **AWS リソース**: CodeDeploy, EC2, IAM, ECR
- **IaC**: CloudFormation
- **コンテナ**: Docker
- **Node.js**: 20 LTS

## セットアップ手順

### 前提条件

- Node.js 20 以上
- Docker がインストール済み
- AWS アカウントと認証情報が設定済み
- GitHub リポジトリの設定済み

### インストール

```bash
npm install
```

## 実行方法

### ローカル開発サーバーを起動

```bash
npm run dev
```

ブラウザで http://localhost:3000 にアクセス

### 本番ビルド

```bash
npm run build
npm start
```

### Docker で実行

```bash
docker-compose up
```

## テストの実行方法

### 全テストを実行

```bash
npm test
```

### ウォッチモード（開発中）

```bash
npm test -- --watch
```

### カバレッジを表示

```bash
npm test -- --coverage
```

## API エンドポイント

### GET /api/health

ヘルスチェックエンドポイント

**レスポンス例:**
```json
{
  "status": "ok",
  "timestamp": "2025-11-30T12:00:00Z"
}
```

## デプロイ方法

### 1. GitHub push で自動デプロイが開始

```bash
git push origin main
```

GitHub Actions が以下を自動実行：
- npm test（テスト実行）
- npm run build（ビルド）
- Docker イメージを ECR に push
- CodeDeploy を通じて EC2 に自動デプロイ

### 2. AWS CloudFormation でインフラをセットアップ

```bash
aws cloudformation create-stack \
  --stack-name aws-cicd-sample \
  --template-body file://cloudformation/template.yaml \
  --capabilities CAPABILITY_IAM
```

## 環境変数

`.env.example` をコピーして `.env.local` を作成：

```bash
cp .env.example .env.local
```

必要な環境変数を設定します（AWS 認証情報など）。

## TODO（今日やること）

- [ ] Next.js アプリケーションの基本構造を実装
- [ ] API ルート（/api/health）を実装
- [ ] Jest + React Testing Library でテストを書く
- [ ] GitHub Actions ワークフローを設定
- [ ] CloudFormation テンプレートで EC2 を定義
- [ ] Dockerfile を作成してコンテナ化
- [ ] ローカルで docker-compose で動作確認
- [ ] GitHub に push して CI/CD パイプラインを確認

## トラブルシューティング

### npm install でエラーが出る場合

```bash
rm -rf node_modules package-lock.json
npm install
```

### Docker ビルドが失敗する場合

```bash
docker system prune -a
docker-compose build --no-cache
```

### GitHub Actions が失敗する場合

- AWS 認証情報が GitHub Secrets に設定されているか確認
- CloudFormation スタックが正しく作成されているか AWS コンソールで確認

## 参考リンク

- [Next.js ドキュメント](https://nextjs.org/docs)
- [GitHub Actions ドキュメント](https://docs.github.com/en/actions)
- [AWS CloudFormation](https://docs.aws.amazon.com/ja_jp/cloudformation/)
- [AWS CodeDeploy](https://docs.aws.amazon.com/ja_jp/codedeploy/)
