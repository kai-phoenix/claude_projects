# AWS CI/CD Sample with Next.js

## 目的

AWS の CI/CD パイプライン（GitHub Actions + CodeDeploy + EC2）を使った、Next.js アプリケーションの自動デプロイを実装・理解する。

## 今日の学習テーマ

- GitHub Actions で自動テスト・ビルド・デプロイを実行
- CloudFormation で AWS インフラを IaC で管理
- Docker でアプリケーションをコンテナ化
- EC2 への自動デプロイパイプラインを構築

### 追加テーマ（Next.js 実装）

**テーマ名:** ヘルスチェック可視化ダッシュボード（最小版）

狙い:
- API 応答（`status` / `timestamp`）を UI に表示する流れを定着
- App Router + コンポーネント分割 + テストの最小セットを回す
- CI/CD 以前に「アプリ本体の価値」を1つ作る

## 使用技術

- Next.js 14（App Router）
- TypeScript
- Jest + React Testing Library
- GitHub Actions
- AWS: CodeDeploy / EC2 / IAM / ECR
- CloudFormation
- Docker
- Node.js 20 LTS

---

## 最短ゴール（今日の完了条件）

以下を満たせば今日の学習は完了:

- [ ] Next.js 画面でヘルス状態が見える（Loading / Error / Success）
- [ ] コンポーネントテストと API テストが通る
- [ ] ローカルで `npm test` と `npm run build` が通る
- [ ] CloudFormation で EC2 + IAM + SecurityGroup が作成できる
- [ ] GitHub Actions の `test` ジョブが成功する
- [ ] `main` への push で `deploy` ジョブが開始される

---

## 事前準備チェックリスト（着手前）

### ローカル環境

- [ ] Node.js 20 以上
- [ ] Docker / docker-compose が使える
- [ ] AWS CLI が使える（`aws --version`）

### AWS 側

- [ ] EC2 キーペアが作成済み（CloudFormation `KeyPairName` 用）
- [ ] ECR リポジトリを作成済み
- [ ] CodeDeploy の Application / Deployment Group を準備済み
- [ ] デプロイ成果物アップロード用 S3 バケットを準備済み

### GitHub 側

- [ ] Actions Secrets を設定済み
  - `AWS_ACCESS_KEY_ID`
  - `AWS_SECRET_ACCESS_KEY`
  - `AWS_REGION`
  - `ECR_REPOSITORY`
  - `S3_BUCKET`

---

## フェーズ別タスク分解

### Phase 0: ローカル起動確認

**入力**
- ソースコード一式

**作業**
- [x] 依存関係をインストール
- [x] 開発サーバーを起動
- [x] `/api/health` を確認

**確認コマンド**

```bash
npm install
npm run dev
```

**完了条件**
- [x] `http://localhost:3000` が表示される
- [x] `http://localhost:3000/api/health` が `status: ok` を返す

---

### Phase 1: テスト・ビルドを安定化

**入力**
- ローカルで起動済みの状態

**作業**
- [ ] 単体テストを実行
- [ ] カバレッジを確認
- [ ] 本番ビルドを実行

**確認コマンド**

```bash
npm test
npm test -- --coverage
npm run build
```

**完了条件**
- [ ] テストが全件パス
- [ ] ビルドが成功

---

### Phase 1.5: Next.js 実装タスク（今回のメイン）

**対象ファイル**
- `app/page.tsx`
- `components/StatusCard.tsx`
- `app/api/health/route.ts`
- `__tests__/components.test.tsx`
- `__tests__/api.test.ts`

**作業（実装タスク）**
- [ ] `StatusCard` に 3 状態（Loading / Error / Success）を明確に表示
- [ ] `page.tsx` で `fetch('/api/health')` を呼び、結果をカードに渡す
- [ ] API 応答に `environment`（例: `development`）を追加
- [ ] 成功時に「最終確認時刻（timestamp）」を読みやすい表示にする
- [ ] エラー時に再試行ボタン（`再取得`）を追加する

**テストタスク**
- [ ] `StatusCard` の表示分岐（3状態）をテスト
- [ ] `GET /api/health` が `status` / `timestamp` / `environment` を返すことをテスト

**完了条件**
- [ ] UI でヘルス状態が視覚的に判別できる
- [ ] 追加したテストがパス

---

### Phase 2: インフラ作成（CloudFormation）

**入力**
- `cloudformation/template.yaml`

**作業**
- [ ] Stack を作成
- [ ] EC2 / IAM Role / SecurityGroup の作成を確認
- [ ] Outputs（Public IP / DNS）を確認

**確認コマンド**

```bash
aws cloudformation create-stack \
  --stack-name aws-cicd-sample \
  --template-body file://cloudformation/template.yaml \
  --capabilities CAPABILITY_IAM \
  --parameters ParameterKey=KeyPairName,ParameterValue=<your-keypair>
```

**完了条件**
- [ ] Stack ステータスが `CREATE_COMPLETE`
- [ ] Outputs から接続先情報が取得できる

---

### Phase 3: コンテナとレジストリ連携

**入力**
- Dockerfile / docker-compose.yml / ECR リポジトリ

**作業**
- [ ] ローカルでコンテナビルド
- [ ] ECR ログイン
- [ ] イメージ push 手順を確認

**確認コマンド（例）**

```bash
docker-compose up --build
```

**完了条件**
- [ ] ローカルコンテナ起動が成功
- [ ] ECR push の前提がそろっている

---

### Phase 4: GitHub Actions 接続

**入力**
- `.github/workflows/deploy.yml`
- GitHub Secrets

**作業**
- [ ] PR で `test` ジョブが通ることを確認
- [ ] `main` push で `deploy` が起動することを確認

**完了条件**
- [ ] `test` ジョブ成功
- [ ] `deploy` ジョブが `needs: test` の順で実行される

---

### Phase 5: デプロイ確認

**入力**
- EC2 / CodeDeploy / 最新イメージ

**作業**
- [ ] デプロイ後に EC2 公開URLへアクセス
- [ ] `api/health` の疎通確認
- [ ] 失敗時の切り戻し方針をメモ

**完了条件**
- [ ] 公開先でアプリが動作
- [ ] 問題発生時の調査ポイントを記録

---

## 実行コマンドまとめ

### ローカル開発

```bash
npm run dev
```

### テスト

```bash
npm test
npm test -- --watch
npm test -- --coverage
```

### ビルド

```bash
npm run build
npm start
```

### Docker

```bash
docker-compose up --build
```

---

## 環境変数

`.env.example` をコピーして `.env.local` を作成:

```bash
cp .env.example .env.local
```

必要値は `.env.example` を参照。

---

## API エンドポイント

### GET /api/health

レスポンス例:

```json
{
  "status": "ok",
  "timestamp": "2026-02-21T12:00:00.000Z"
}
```

---

## トラブルシューティング（フェーズ対応）

### Phase 0-1: `npm install` / `npm test` が失敗する

```bash
rm -rf node_modules package-lock.json
npm install
```

### Phase 3: Docker ビルドが失敗する

```bash
docker system prune -a
docker-compose build --no-cache
```

### Phase 4-5: GitHub Actions / AWS デプロイ失敗

- [ ] GitHub Secrets 名と値を再確認
- [ ] CloudFormation Stack 状態を確認
- [ ] CodeDeploy Application / Deployment Group 名の一致を確認
- [ ] ECR リポジトリ名が `deploy.yml` と一致しているか確認

---

## 次の1手（迷った時の再開テンプレ）

1. 今いるフェーズを 1 つ選ぶ
2. そのフェーズの「完了条件」だけ満たす
3. 成果を 3 行メモする（やったこと / 詰まったこと / 次にやること）

### 今日のおすすめ着手順（Next.js実装を先にやる場合）

1. Phase 1.5 の `StatusCard` 表示分岐を先に作る
2. テストを追加して `npm test` を通す
3. その後に Phase 2 以降（AWS 側）へ進む

---

## 参考リンク

- [Next.js ドキュメント](https://nextjs.org/docs)
- [GitHub Actions ドキュメント](https://docs.github.com/en/actions)
- [AWS CloudFormation](https://docs.aws.amazon.com/ja_jp/cloudformation/)
- [AWS CodeDeploy](https://docs.aws.amazon.com/ja_jp/codedeploy/)
