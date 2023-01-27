import axios from "axios";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { createContext, useState } from "react";
import { api } from "../utils/axios";

interface AuthContext {
  isAuthenticated: boolean;
  signIn: (data: SignInData) => Promise<void>;
}

interface SignInData {
  email: string;
  password: string;
}

interface AuthProvider {
  children: JSX.Element;
}

export const AuthContext = createContext({} as AuthContext);

export function AuthProvider({ children }: AuthProvider) {
  const [token, setToken] = useState("");

  const isAuthenticated = !!token;
  const router = useRouter();

  async function signIn({ email, password }: SignInData) {
    const { data, status } = await api.post("/user/authenticate", {
      email,
      password,
    });

    setCookie(undefined, "user_token", data.token, {
      maxAge: 60 * 15, // 15 min
    });

    api.defaults.headers["Authorization"] = `Bearer ${data.token}`;

    setToken(data.token);
    router.push("/");
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
