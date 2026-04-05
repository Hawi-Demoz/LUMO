"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface SessionContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

const USER_STORAGE_KEY = "user";
const TOKEN_STORAGE_KEY = "token";

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const clearSession = useCallback(() => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    setUser(null);
  }, []);

  const checkSession = useCallback(async () => {
    try {
      const token = localStorage.getItem(TOKEN_STORAGE_KEY);
      const savedUser = localStorage.getItem(USER_STORAGE_KEY);

      if (!token) {
        clearSession();
        return;
      }

      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch {
          localStorage.removeItem(USER_STORAGE_KEY);
        }
      }

      const response = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        clearSession();
        return;
      }

      const data = await response.json();
      if (!data?.user?._id || !data?.user?.email) {
        clearSession();
        return;
      }

      const safeUser: User = {
        _id: data.user._id,
        name: data.user.name,
        email: data.user.email,
      };

      setUser(safeUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(safeUser));
    } catch {
      clearSession();
    } finally {
      setLoading(false);
    }
  }, [clearSession]);

  const login = useCallback(async (email: string, password: string) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload.message || "Login failed");
    }

    if (!payload?.token || !payload?.user?._id) {
      throw new Error("Invalid login response from server");
    }

    const safeUser: User = {
      _id: payload.user._id,
      name: payload.user.name,
      email: payload.user.email,
    };

    localStorage.setItem(TOKEN_STORAGE_KEY, payload.token);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(safeUser));
    setUser(safeUser);
  }, []);

  const logout = useCallback(async () => {
    try {
      const token = localStorage.getItem(TOKEN_STORAGE_KEY);
      if (token) {
        await fetch("/api/auth/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } finally {
      clearSession();
      router.push("/login");
    }
  }, [clearSession, router]);

  useEffect(() => {
    void checkSession();
  }, [checkSession]);

  return (
    <SessionContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
        checkSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
