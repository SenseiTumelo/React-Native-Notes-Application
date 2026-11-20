import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User } from "../types";
import {
  ProfileUpdate,
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
} from "../services/auth";
type AuthContextType = {
  user: User | null;
  loading: boolean;
  register: (username: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (update: ProfileUpdate) => Promise<void>;
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
   const updateProfile = async (update: ProfileUpdate) => {
    if (!user) throw new Error("Not logged in");
    const updated = await updateUser(user.id, update);
    setUser(updated);
  };
  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}