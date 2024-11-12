export interface UserState {
  user: {
    id: string;
    email: string;
    name: string;
    image?: string;
  } | null;
  setUser: (user: UserState["user"]) => void;
  clearUser: () => void;
}

export interface SessionState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

export interface AppState {
  isLoading: boolean;
  error: { title: string; message: string } | null;
  setIsLoading: (loading: boolean) => void;
  setError: (error: { title: string; message: string } | null) => void;
}
