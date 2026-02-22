next.configはTSで書けない→next.config.mjsで書く
ReferenceError: fetch is not defined→テスト環境にfetchは存在していない
→node -vで確認=v22.11.0
jest.config.js testEnvionment: 'jest-environment-jsdom'

route.tsのロジックを分解→lib/health.tsに起こす→createHealth時のok時と時刻返却時のタイムスタンプが有効化チェックするhealth.test.tsを定義

カバレッジを通す npm test -- --coverage
ビルド npm run build

./app/page.tsx
53:70  Error: `"` can be escaped with `&quot;`, `&ldquo;`, `&#34;`, `&rdquo;`.  react/no-unescaped-entities
53:73  Error: `"` can be escaped with `&quot;`, `&ldquo;`, `&#34;`, `&rdquo;`.  react/no-unescaped-entities

→ダブルクオートを{``}で包む形に修正し通す