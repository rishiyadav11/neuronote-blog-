// hooks/useAuth.ts
import { useState } from "react";
import { signupSchema, signinSchema } from "nauronotescommon";
import { z } from "zod";
import { useAuthContext } from "../context/AuthContext";

const API_URL =import.meta.env.VITE_BASE_URL || "http://localhost:5000";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const { setIsAuthenticated } = useAuthContext();

  const signup = async (data: z.infer<typeof signupSchema>) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/v1/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Signup failed");
      }
      document.cookie = `token=${result.jwt}; path=/;`;
      setIsAuthenticated(true);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signin = async (data: z.infer<typeof signinSchema>) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/v1/user/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Signin failed");
      }
      document.cookie = `token=${result.jwt}; path=/;`;
      setIsAuthenticated(true);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { signup, signin, loading };
};
