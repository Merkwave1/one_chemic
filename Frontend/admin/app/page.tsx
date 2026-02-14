"use client";

import React, { useState } from "react";
import type { FormEvent } from "react";

import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { tokenAtom, tokenTimestampAtom, isTokenExpired } from "@/atom/Auth";

import InputField from "@/components/InputField";
import { LOGIN_ENDPOINT } from "@/config/config";

const Page: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [token, setToken] = useAtom(tokenAtom);
  const [tokenTimestamp, setTokenTimestamp] = useAtom(tokenTimestampAtom);
  const router = useRouter();

  // Redirect to dashboard if already logged in and token not expired
  React.useEffect(() => {
    if (token && tokenTimestamp) {
      if (isTokenExpired(tokenTimestamp)) {
        // Token expired, clear it
        setToken("");
        setTokenTimestamp(0);
      } else {
        router.replace("/dashboard");
      }
    }
  }, [token, tokenTimestamp, router, setToken, setTokenTimestamp]);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formEntries = Object.fromEntries(formData.entries()) as {
      username: string;
      password: string;
    };

    // Backend expects PascalCase property names
    const data = {
      UserName: formEntries.username,
      Password: formEntries.password,
    };

    try {
      const response = await fetch(LOGIN_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        // Backend may return plain text or JSON for errors
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errData = await response.json();
          // Handle ASP.NET ModelState validation errors
          if (errData.errors) {
            const messages = Object.values(errData.errors).flat().join(", ");
            setError(messages || "Validation failed");
          } else {
            setError(errData.message || errData.title || "Login failed");
          }
        } else {
          const text = await response.text();
          setError(text || "Login failed");
        }
        return;
      }

      const result = await response.json();

      if (result.token) {
        // Set timestamp FIRST so the useEffect doesn't clear the token
        setTokenTimestamp(Date.now());
        setToken(result.token);
        setError("");
        router.push("/dashboard");
      } else {
        setError("Invalid login response");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Network or server error");
    }
  };

  return (
    <main
      className="w-screen h-screen flex items-center justify-center px-2 bg-bluish"
      style={{ fontFamily: "Tajawal, sans-serif" }}
    >
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center text-right justify-center w-full max-w-md sm:max-w-sm py-6 px-2 md:p-6 sm:p-4 bg-white rounded shadow"
      >
        <h2 className="text-4xl sm:text-3xl mb-8 text-center">تسجيل الدخول</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <InputField
          name="username"
          label="اسم المستخدم"
          type="text"
          placeholder="ادخل اسم المستخدم"
        />
        <InputField
          name="password"
          label="كلمة المرور"
          type="password"
          placeholder="ادخل كلمة المرور"
        />

        <button
          type="submit"
          className="mt-4 bg-bluish text-white py-2 px-1 md:px-4 rounded hover:bg-blue-700 w-full"
        >
          تسجيل الدخول
        </button>
      </form>
    </main>
  );
};

export default Page;
