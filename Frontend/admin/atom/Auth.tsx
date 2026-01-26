import { atomWithStorage } from "jotai/utils";

// Store token in localStorage
export const tokenAtom = atomWithStorage<string>("token", "");

// Store token timestamp for auto-expiry
export const tokenTimestampAtom = atomWithStorage<number>("tokenTimestamp", 0);

// Token expiry time: 60 minutes in milliseconds
export const TOKEN_EXPIRY_MS = 60 * 60 * 1000;

// Function to check if token is expired
export const isTokenExpired = (timestamp: number): boolean => {
  if (!timestamp) return true;
  return Date.now() - timestamp > TOKEN_EXPIRY_MS;
};
