# Global CLAUDE.md(親ルール・最上位方針)
このファイルは、このリポジトリ全体に適用される「最上位ルール」です。
ClaudeCodeは全ての生成・レビュー・構成提案において、このファイルを最優先で参照してください。

# 0. このファイルの目的
- このレポジトリを「AI活用による学習OS」として運用されるための憲法とする。
- 全てのプロジェクトが一定品質で生成・レビューされるよう、横断的な基準を定める。
- 言語や技術に依らず共通する原則をここに集約する。

# 1. レビューポリシー(全技術共通)
ClaudeCodeはコード・構成・設計のレビューを行う際、必ず以下の観点に従うこと。

## 1-1. 設計
- 単一責務(SRP)
- レイヤー分離(UI→アプリ→ドメイン→インフラ)
- 依存方向の健全性

## 1-2. コード品質
- 可読性
- 命名規則の一貫性
- DRY/KISS
- 過剰な抽象化を避ける

## 1-3. セキュリティ
- 入力バリデーション
- SQLインジェクション対策
- トークン/セッションの取り扱い
- envや秘密情報の扱い

## 1-4. パフォーマンス
- N+1
- 無駄なループ
- キャッシュできる箇所
- ORMの使い方

# 1-5. テスト
- 正常系・異常系・境界値
- ユニット・結合テストの分離
- テストしやすい構造かどうか

レビュー結果は必ず:
1. 良い点
2. 課題
3. 修正例(コード付き)
4. 学びのポイント

の４構成で返すこと。

# 2. ClaudeCodeの基本動作方針
- 必要最小限で実務的な構造を優先する
- ファイル生成前に必ず「構成案→OKの確認→実行」の順にする
- 説明はできるだけコンパクトに(学習効率優先)
- 過剰な自動生成は禁止(学習を阻害するため)

# 3. 学習OSとしての基本哲学
- 「小さな本番っぽい構成」を大量に作って素早く回すことを目的とする
- 完成より回転率を優先する
- 設計方針・判断基準はすべてこの｀.CLAUDE.md｀に集約する
- プロジェクトごとに個別のCLAUDE.mdを作らず、/ラーニングのルールに従う

# 4. 禁止事項
ClaudeCodeは以下の行為を避ける:

- 大量の自動生成(テンプレの押し付け)
- 明確ではない抽象論の回答
- 危険な設計(セキュリティ軽視)
- 本番向きではない不健全な構成の提案
- 学習目的から逸脱する過剰仕様

# 5. このレポジトリの目的
- 学習ログを資産化し、Gitで管理する
- 日々のミニプロジェクトを積み上げる
- ClaudeCodeとともにテンプレなしでも高速に学習できる構造を作る
- 転職ポートフォリオとしても活用できる

以上のルールをこのレポジトリの最上位方針とする。

# 6. 言語ポリシー
ClaudeCodeは私に対する質問・確認・ファイル生成前の合意分など、
すべての対話・プロンプト・確認メッセージを**日本語で行うこと**。

- 構成案の提示
- 注釈
- レビューコメント
- 補足質問

これら全てを日本語で返す。

もし技術使用上で英語が必要な箇所(コード・設定名など)がある場合でも、
説明・確認メッセージは日本語優先とする。

# 7. 開発コマンド・環境チェックリスト

## Node.js / JavaScript プロジェクト

### セットアップ
```bash
npm install
```

### テスト実行
```bash
npm test                          # テスト全体実行
npm run test:watch               # watch モード（存在する場合）
npm run test -- --testNamePattern="<pattern>"  # 特定のテストのみ実行
```

### コード品質チェック
```bash
npm run lint                      # Linting（ESLint など）
npm run format                    # コードフォーマット（Prettier など）
npm run type-check               # 型チェック（TypeScript）
npm run build                     # ビルド（存在する場合）
```

## Python プロジェクト

### セットアップ
```bash
pip install -r requirements.txt   # または poetry install
python -m pytest tests/ -v        # テスト実行（verbose）
```

### テスト実行
```bash
pytest tests/                     # テスト全体実行
pytest tests/ -v                  # verbose モード
pytest tests/ -k <test_name>      # 特定のテストのみ実行
pytest tests/ --cov=src          # カバレッジ表示（pytest-cov導入時）
```

### コード品質チェック
```bash
black src/ tests/                 # フォーマット
flake8 src/ tests/               # Linting（存在する場合）
mypy src/                         # 型チェック（存在する場合）
```

## Laravel / PHP プロジェクト

### セットアップ
```bash
composer install
cp .env.example .env
php artisan migrate              # DB マイグレーション（必要な場合）
```

### テスト実行
```bash
php artisan test                                  # テスト全体実行
php artisan test --filter=<TestClass>           # 特定のテストのみ実行
php artisan test --filter=<method> --group=unit # Unit テストのみ
```

### コード品質チェック
```bash
./vendor/bin/phpstan             # 静的解析（導入時）
./vendor/bin/pint                # コードスタイル修正（Laravel 8.73+）
```

## Docker 環境

### コンテナ起動・停止
```bash
docker-compose up -d             # バックグラウンド起動
docker-compose down              # 全コンテナ停止
docker-compose logs -f <service> # ログ監視
```

### よくあるコマンド
```bash
docker-compose exec <service> bash    # コンテナにアクセス
docker-compose restart <service>      # 再起動
docker-compose build                  # イメージ再ビルド
```

## 新規プロジェクト開始時のチェックリスト

```
□ README.md に以下を明記
  □ 目的・学習テーマ
  □ 使用技術・バージョン
  □ セットアップ手順（npm install, pip install など）
  □ テスト実行方法
  □ ビルド・実行コマンド（存在する場合）

□ .env.example を作成（秘密情報が必要な場合）

□ .gitignore を設定
  □ node_modules / __pycache__ / vendor
  □ .env（.env.example は含める）
  □ build/ / dist/ / .next/ など生成ファイル

□ 最初のテストが 1 つ以上動く状態で完成とする
  □ npm test / pytest / php artisan test が実行可能

□ src/ ディレクトリを作成（テンプレなし）
```

# 8. アーキテクチャ判断基準

## 全体構造

### UI層 と API層 の分離
- Frontend（Web/Mobile） と Backend（API/Service） は別リポジトリ/別プロジェクト管理を基本とする
- モノレポが必要な場合は `/packages/` ディレクトリを使用して責務を明確に

### データフロー（標準パターン）
```
Entry Point (CLI / API endpoint / Web Handler)
     ↓
Application Layer (ビジネスロジック・オーケストレーション・バリデーション)
     ↓
Domain Layer (エンティティ・ドメインルール・集約)
     ↓
Infrastructure Layer (DB / API Client / File System)
```

**各層の責務**:
- **Entry Point**: リクエスト受け取り、レスポンス返却のみ
- **Application**: 処理の流れ制御、トランザクション管理
- **Domain**: ビジネスルールの実装、バリデーション
- **Infrastructure**: データ取得・永続化、外部連携

### ファイル・ディレクトリ構成（言語別）

#### JavaScript/TypeScript（Next.js, Express など）
```
src/
├── app/              # ページ/ルーハンドラ（Next.js の場合）
├── api/              # API エンドポイント
├── components/       # UI コンポーネント
├── services/         # ビジネスロジック
├── domain/           # エンティティ・バリデーション
├── lib/              # ユーティリティ関数
└── __tests__/        # テスト
```

#### Python
```
src/
├── main.py           # エントリーポイント（CLI/Webサーバ）
├── app/              # ビジネスロジック層
├── domain/           # エンティティ・ドメインルール
├── infrastructure/   # DB/API クライアント
└── __init__.py
tests/
├── unit/             # ユニットテスト
├── integration/      # 統合テスト
└── conftest.py       # pytest 設定
```

#### PHP/Laravel
```
app/
├── Http/Controllers/  # Controller（Entry Point）
├── Services/          # ビジネスロジック層
├── Models/            # Domain エンティティ
├── Repositories/      # Infrastructure（DB アクセス）
└── Requests/          # バリデーション
tests/
├── Unit/              # ユニットテスト
├── Feature/           # 統合テスト
└── TestCase.php       # 基本クラス
```

## テスト戦略

### テストレベルの定義
- **Unit Test**: 単一の関数/メソッド/クラスをテスト（外部依存はモック化）
- **Integration Test**: 複数層の連携をテスト（DB はテスト用に隔離）
- **E2E Test**: 実際のワークフロー全体をテスト（大型プロジェクト・Web UI テストのみ）

### テスト対象の優先順位
1. ドメインロジック（ビジネスルール）
2. API エンドポイント・ハンドラ
3. リポジトリ/DB クエリ（データ層）
4. ユーティリティ関数

### テストしなくてもよい箇所
- フレームワークの標準機能（Rails の自動ルーティング等）
- 外部ライブラリの検証（すでにテストされている）
- UI レイアウト（スナップショットテストは過度）

## セキュリティレビューチェックリスト

新規プロジェクト・大型変更時に必ず確認:

```
入力バリデーション
□ ユーザー入力は全て バリデーション・サニタイズ対象
□ API リクエストボディ・クエリパラメータをチェック
□ ファイルアップロード時はサイズ・形式を制限

SQLインジェクション / NoSQL インジェクション
□ SQL/NoSQL クエリはパラメータ化クエリを使用
□ ORM を使用している場合、raw クエリは最小化

認証・認可
□ API キー / Session Token は env に隔離
□ JWT の署名検証が実装済み
□ ユーザー認証情報（password）は絶対にログに出力しない

CORS / CSRF / XSS（Web API の場合）
□ CORS は必要な origin のみを許可
□ CSRF トークン実装（フォーム送信時）
□ XSS 対策：テンプレートエンジンは自動エスケープ対応

ファイル操作
□ アップロードファイルはウイルススキャン検討
□ ファイルパス traversal 対策（../../../ 等）
□ アップロード先は web root の外に配置

秘密情報管理
□ API key / 認証情報は .env に隔離
□ .env ファイルは .gitignore に含める
□ Git 履歴から秘密情報がリークしていないか確認

エラーハンドリング
□ エラーメッセージに内部情報を含めない
□ スタックトレースを本番環境に出力しない
□ ログには十分な情報を含める（デバッグ用）
```

# 9. プロジェクト完成の定義

学習用プロジェクトが「完成」とみなされる条件:

- [ ] README.md に目的・実行方法が明記されている
- [ ] 最初のテストが 1 つ以上実行でき、パスしている
- [ ] src/ 以下に最小限の実装が存在する（ダミーコードは不可）
- [ ] セキュリティレビュー対象項目をチェック済み
- [ ] 依存ライブラリのバージョンが明記されている（package.json / requirements.txt など）
- [ ] Git コミットメッセージが日本語で意図が明確
- [ ] `.env.example` が存在する（秘密情報が必要な場合）

「完成度」より「回転率」を優先するため、上記を満たせばプロジェクト化完了。
その後の実装詳細・最適化は別途学習のテーマとする。