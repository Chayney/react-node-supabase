export const BASE_API_URL = import.meta.env.VITE_REACT_APP_API_URL;
export const STORAGE_BASE_URL = import.meta.env.VITE_REACT_STORAGE_BASE_URL;

// トークン取得
export const getToken = (): string | null => {
    return localStorage.getItem('authToken');
};

// トークン設定
export const setFetchAuthentication = (token: string) => {
    localStorage.setItem('authToken', token);
};

// トークン削除
export const removeFetchAuthentication = () => {
    localStorage.removeItem('authToken');
};

// 共通Fetchクライアント
export const apiClient = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
    const token = getToken();

    const headers: HeadersInit = {
        ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
        ...(options.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const response = await fetch(`${BASE_API_URL}${path}`, {
        ...options,
        headers,
    });

    // 共通エラーハンドリング
    if (!response.ok) {
        if (response.status === 401) {
            console.warn('Unauthorized — removing token');
            removeFetchAuthentication();
        }
        const errorText = await response.text();
        throw new Error(`API error (${response.status}): ${errorText}`);
    }

    try {
        return (await response.json()) as T;
    } catch {
        return {} as T;
    }
};

// Fetchエラー判定関数
export const isFetchError = (error: unknown): error is Error => {
    return error instanceof Error;
};