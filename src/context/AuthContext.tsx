import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User } from "../types";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../services/auth";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  register: (username: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);

  const register = async (username: string, email: string, password: string) => {
    await registerUser(username, email, password);
  };

  const login = async (email: string, password: string) => {
    const loggedIn = await loginUser(email, password);
    setUser(loggedIn);
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}