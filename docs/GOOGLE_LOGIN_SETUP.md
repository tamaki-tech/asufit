# Googleログイン機能のセットアップガイド

このドキュメントでは、ログインページに追加されたGoogleログイン機能のセットアップ方法を説明します。

## 概要

Auth0とHonoを使用してGoogleログイン機能を実装しています。ユーザーはGoogleアカウントを使用してアプリケーションにログインできます。

## アーキテクチャ

```
ユーザー → SvelteKitフロントエンド → Hono API (/api/auth) → Auth0 → Google OAuth
```

### 主要コンポーネント

1. **フロントエンド** (`src/routes/login/+page.svelte`)
   - Googleログインボタン
   - Auth0ログインページへの直接リダイレクト

2. **バックエンドAPI** (`src/lib/api/routes/auth.ts`)
   - Auth0統合
   - ログインエンドポイント
   - ユーザー情報取得エンドポイント

3. **型安全なAPIクライアント** (`src/lib/api/client.ts`)
   - Hono RPCクライアントによるエンドツーエンドの型安全性

## セットアップ手順

### 1. Auth0アカウントの作成と設定

1. [Auth0](https://auth0.com/)にアクセスしてアカウントを作成
2. 新しいアプリケーションを作成（Regular Web Application）
3. Google Connectionを有効化：
   - Auth0ダッシュボードで「Authentication」→「Social」→「Google」を選択
   - GoogleのClient IDとClient Secretを設定
4. Callback URLsに以下を追加：
   ```
   http://localhost:5173/api/auth/callback
   ```
5. Logout URLsに以下を追加：
   ```
   http://localhost:5173
   ```

### 2. 環境変数の設定

プロジェクトルートに `.env` ファイルを作成し、以下の環境変数を設定してください（`.env.example` を参考）：

```bash
# Auth0設定
AUTH0_DOMAIN=your-tenant.us.auth0.com
AUTH0_CLIENT_ID=your_client_id_here
AUTH0_CLIENT_SECRET=your_client_secret_here

# アプリケーション設定
BASE_URL=http://localhost:5173

# セッション暗号化キー（32文字以上）
AUTH0_SESSION_ENCRYPTION_KEY=your_32_character_minimum_secret_key_here
```

**重要**: セッション暗号化キーは最低32文字以上のランダムな文字列を使用してください。以下のコマンドで生成できます：

```bash
openssl rand -base64 32
```

### 3. 依存関係の確認

必要なパッケージがインストールされていることを確認：

```bash
npm install
```

主要な依存関係：
- `@auth0/auth0-hono`: Auth0のHono統合
- `hono`: 軽量Webフレームワーク
- `zod`: バリデーションライブラリ

## 使用方法

### ログイン

1. `/login` ページにアクセス
2. 「Googleでログイン」ボタンをクリック
3. Auth0のログインページにリダイレクト
4. Googleアカウントで認証
5. アプリケーションにリダイレクト

### ログアウト

```typescript
// ログアウト処理
const handleLogout = () => {
  const returnTo = "/login";
  window.location.href = `/api/auth/logout?returnTo=${encodeURIComponent(returnTo)}`;
};
```

### ユーザー情報の取得

```typescript
import { client } from "$lib/api/client";

// +page.ts または +layout.ts でデータをロード
export const load = async ({ fetch }) => {
  const response = await client.auth.me.$get({}, { fetch });

  if (response.ok) {
    const data = await response.json();
    return { user: data.user };
  }

  return { user: null };
};
```

または、コンポーネント内で直接取得:

```typescript
import { client } from "$lib/api/client";
import { onMount } from "svelte";

let user = $state(null);

onMount(async () => {
  const response = await client.auth.me.$get();
  if (response.ok) {
    const data = await response.json();
    user = data.user;
  }
});
```

## APIエンドポイント

### GET /api/auth/login

Googleログインページへリダイレクト

**クエリパラメータ**:
- `returnTo` (オプション): ログイン後のリダイレクト先URL

### GET /api/auth/callback

Auth0からのコールバックを処理（自動）

### GET /api/auth/logout

ログアウト処理

**クエリパラメータ**:
- `returnTo` (オプション): ログアウト後のリダイレクト先URL

### GET /api/auth/me

現在のユーザー情報を取得

**レスポンス例**:
```json
{
  "user": {
    "id": "google-oauth2|123456789",
    "email": "user@example.com",
    "name": "山田 太郎",
    "picture": "https://lh3.googleusercontent.com/..."
  }
}
```

## トラブルシューティング

### ログインできない

1. `.env` ファイルの環境変数が正しく設定されているか確認
2. Auth0ダッシュボードでCallback URLsが正しく設定されているか確認
3. Google Connectionが有効化されているか確認

### セッションエラー

1. `AUTH0_SESSION_ENCRYPTION_KEY` が32文字以上であることを確認
2. ブラウザのCookieが有効になっているか確認

### 型エラー

```bash
npm run check
```

で型チェックを実行し、エラーがないことを確認してください。

## セキュリティ考慮事項

1. **環境変数の保護**: `.env` ファイルは `.gitignore` に含まれており、リポジトリにコミットされません
2. **セッション暗号化**: すべてのセッションデータは `AUTH0_SESSION_ENCRYPTION_KEY` で暗号化されます
3. **HTTPS**: 本番環境では必ずHTTPSを使用してください
4. **CSRFトークン**: Auth0が自動的にCSRF保護を提供します

## 本番環境への移行

本番環境にデプロイする際は：

1. `BASE_URL` を本番URLに変更
2. Auth0のCallback URLsとLogout URLsに本番URLを追加
3. HTTPSを有効化
4. セッション暗号化キーを本番用に再生成
5. 環境変数を安全に管理（Vercel、Netlifyなどの環境変数設定を使用）

## 参考リンク

- [Auth0 Documentation](https://auth0.com/docs)
- [Auth0 Hono Middleware](https://github.com/auth0-lab/auth0-hono)
- [Hono Documentation](https://hono.dev/)
- [SvelteKit Documentation](https://kit.svelte.dev/)
