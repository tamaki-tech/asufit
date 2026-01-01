import { client } from "$lib/api/client";

/**
 * ユーザー情報の型定義
 */
export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

/**
 * 認証状態の型定義
 */
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

/**
 * 認証ストアのクラス定義
 *
 * Svelte 5のrunesを使用した認証状態管理
 * - ユーザー情報の取得と保持
 * - ログイン/ログアウト処理
 * - 認証状態の監視
 */
class AuthStore {
  private _user = $state<User | null>(null);
  private _isLoading = $state(false);

  /**
   * 現在のユーザー情報
   */
  get user(): User | null {
    return this._user;
  }

  /**
   * 認証済みかどうか
   */
  get isAuthenticated(): boolean {
    return this._user !== null;
  }

  /**
   * ローディング状態
   */
  get isLoading(): boolean {
    return this._isLoading;
  }

  /**
   * ユーザー情報を取得
   *
   * APIからユーザー情報を取得し、ストアに保存
   * 認証エラーの場合はユーザー情報をクリア
   */
  async fetchUser(): Promise<void> {
    this._isLoading = true;

    try {
      const response = await client.auth.me.$get();

      if (response.ok) {
        const data = await response.json();
        this._user = data.user;
      } else {
        this._user = null;
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      this._user = null;
    } finally {
      this._isLoading = false;
    }
  }

  /**
   * ログイン処理
   *
   * Auth0のログインページへリダイレクト
   * @param returnTo - ログイン後のリダイレクト先URL
   */
  login(returnTo: string = "/"): void {
    window.location.href = `/api/auth/login?returnTo=${encodeURIComponent(returnTo)}`;
  }

  /**
   * ログアウト処理
   *
   * Auth0のログアウトエンドポイントへリダイレクト
   * @param returnTo - ログアウト後のリダイレクト先URL
   */
  logout(returnTo: string = "/"): void {
    this._user = null;
    window.location.href = `/api/auth/logout?returnTo=${encodeURIComponent(returnTo)}`;
  }

  /**
   * ユーザー情報をクリア
   */
  clear(): void {
    this._user = null;
  }
}

/**
 * 認証ストアのシングルトンインスタンス
 */
export const authStore = new AuthStore();
