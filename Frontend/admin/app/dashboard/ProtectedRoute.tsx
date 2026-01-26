"use client";

import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { tokenAtom, tokenTimestampAtom, isTokenExpired } from "../../atom/Auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [token, setToken] = useAtom(tokenAtom);
  const [tokenTimestamp, setTokenTimestamp] = useAtom(tokenTimestampAtom);
  const [isHydrated, setIsHydrated] = useState(false);
  const router = useRouter();

  // Wait for hydration (atomWithStorage loads async from localStorage)
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    // Only check after hydration is complete
    if (isHydrated) {
      // Check if token is expired
      if (token && isTokenExpired(tokenTimestamp)) {
        setToken("");
        setTokenTimestamp(0);
        router.replace("/");
        return;
      }
      if (!token) {
        router.replace("/");
      }
    }
  }, [token, tokenTimestamp, router, isHydrated, setToken, setTokenTimestamp]);

  // Show loading while hydrating or if no token
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-bluish flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!token || isTokenExpired(tokenTimestamp)) {
    return null; // Will redirect
  }

  return <>{children}</>;
};
