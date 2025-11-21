# Technical Decisions

このファイルは、プロジェクトにおける技術的な意思決定を時系列で記録します。

## 2025-01-22: モーダル実装方針

**Status:** Active
**Category:** UI/Component
**Related Files:** `components/GameResult.tsx`

### Context
- モバイルWebアプリケーションとして開発
- 現在GameResultコンポーネントでモーダルを使用
- UIライブラリ（Radix UI、Headless UIなど）の導入を検討

### 議論内容
**ローカル実装のメリット:**
- 依存関係が少なく、バンドルサイズが小さい
- 完全なカスタマイズ性
- 学習コストがない

**UIライブラリ導入のメリット:**
- アクセシビリティが標準実装（ARIA属性、フォーカストラップ、ESCキー対応）
- モバイル特有の問題（背景スクロール防止、ビューポート対応、タッチジェスチャー）への対応が完璧
- エッジケースのバグが少なく、メンテナンスコストが低い

### Decision
**現時点ではローカル実装を継続**

理由:
- モーダルの使用箇所が限定的（GameResultのみ）
- プロジェクトが小規模でシンプルに保ちたい
- 基本的な機能（スクロール可能、背景スクロール防止など）は実装済み

### Current Implementation
- **File:** `components/GameResult.tsx`
- **Approach:** ローカル実装（Tailwind CSSを使用）
- **Key Features:**
  - スクロール可能なモーダル (`max-h-[90vh] overflow-y-auto`)
  - 固定背景オーバーレイ (`fixed inset-0 bg-black bg-opacity-50`)
  - 中央配置 (`flex items-center justify-center`)

**今後の方針:**
以下の条件を満たした場合、UIライブラリ導入を再検討する：
- モーダルが3箇所以上で必要になった
- ネストしたモーダルや複雑な状態管理が必要
- モバイル特有の問題（iOS Safariの背景スクロール、タッチジェスチャーなど）で不便を感じた
- アクセシビリティが重要な要件になった

**候補ライブラリ:**
- Radix UI - アクセシビリティ完璧、モバイル対応良好
- Vaul - モバイルネイティブなドロワー/モーダル
- Headless UI - シンプルで軽量

### Consequences
- 現状のシンプルさを維持できる
- 将来的にモバイル特有の問題に遭遇する可能性がある
- その際は、モーダルが増える前にライブラリ導入を検討する
