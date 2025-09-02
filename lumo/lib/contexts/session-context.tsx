"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
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
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
  loginWithFallback: (email: string, password: string) => Promise<boolean>;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

// Fallback user store for when backend is not available
const fallbackUsers = new Map<string, { name: string; email: string; password: string }>();

// Add a test user for immediate testing
if (typeof window !== 'undefined') {
    const existingFallbackUsers = localStorage.getItem("fallbackUsers");
    if (!existingFallbackUsers) {
        const testUsers = {
            "test@example.com": { name: "Test User", email: "test@example.com", password: "password123" }
        };
        localStorage.setItem("fallbackUsers", JSON.stringify(testUsers));
    }
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkSession = async () => {
    try {
      const token = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");
      
      console.log(
        "SessionContext: Token from localStorage:",
        token ? "exists" : "not found"
      );

      if (!token && !savedUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      // Try to get user from localStorage first (fallback mode)
      if (savedUser) {
        try {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          setLoading(false);
          return;
        } catch (e) {
          localStorage.removeItem("user");
        }
      }

      // Try backend authentication
      if (token) {
        console.log("SessionContext: Fetching user data from backend...");
        try {
          const response = await fetch("/api/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          console.log("SessionContext: Response status:", response.status);

          if (response.ok) {
            const data = await response.json();
            console.log("SessionContext: User data received:", data);
            const userData = data.user;
            const { password, ...safeUserData } = userData;
            setUser(safeUserData);
            localStorage.setItem("user", JSON.stringify(safeUserData));
            console.log("SessionContext: User state updated:", safeUserData);
          } else {
            console.log("SessionContext: Failed to get user data from backend");
                            setUser(null);
                            localStorage.removeItem("token");
                            localStorage.removeItem("user");
                        }
                    } catch (error) {
                        console.log("SessionContext: Backend not available, using fallback");
                        // Backend not available, try to use saved user data
                        if (savedUser) {
                            try {
                                const userData = JSON.parse(savedUser);
                                setUser(userData);
                            } catch (e) {
                                setUser(null);
                                localStorage.removeItem("user");
                            }
                        } else {
                            setUser(null);
                        }
                    }
                }
            } catch (error) {
                console.error("SessionContext: Error checking session:", error);
                setUser(null);
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            } finally {
                setLoading(false);
            }
        };

        const loginWithFallback = async (email: string, password: string): Promise<boolean> => {
            try {
                // Try backend login first
                const response = await fetch("/api/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });

                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem("token", data.token);
                    const { password: _, ...safeUserData } = data.user;
                    setUser(safeUserData);
                    localStorage.setItem("user", JSON.stringify(safeUserData));
                    return true;
                }
            } catch (error) {
                console.log("Backend login failed, trying fallback");
            }

                    // Fallback authentication
        const fallbackUsersData = JSON.parse(localStorage.getItem("fallbackUsers") || "{}");
        const savedUser = fallbackUsersData[email];
        if (savedUser && savedUser.password === password) {
            const userData = { _id: Date.now().toString(), name: savedUser.name, email: savedUser.email };
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("token", "fallback-token-" + Date.now());
            return true;
        }

            return false;
        };

        const logout = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token && !token.startsWith("fallback-token")) {
                    await fetch("/api/auth/logout", {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                }
            } catch (error) {
                console.error("Logout error:", error);
            } finally {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setUser(null);
                router.push("/");
            }
        };

        useEffect(() => {
            console.log("SessionContext: Initial check");
            checkSession();
        }, []);

        return (
            <SessionContext.Provider
                value={{
                    user,
                    loading,
                    isAuthenticated: !!user,
                    logout,
                    checkSession,
                    loginWithFallback,
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
