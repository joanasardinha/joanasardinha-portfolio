import { useState, useEffect } from "react";

const CORRECT_PASSWORD = "JoanaSardinha1992!";
const STORAGE_KEY = "portfolio_password_verified";

export function usePasswordProtection() {
  const [isProtected, setIsProtected] = useState(true);

  useEffect(() => {
    // Check if user has already entered password in this session
    const isVerified = sessionStorage.getItem(STORAGE_KEY) === "true";
    setIsProtected(!isVerified);
  }, []);

  const verifyPassword = (password: string): boolean => {
    if (password === CORRECT_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "true");
      setIsProtected(false);
      return true;
    }
    return false;
  };

  return { isProtected, verifyPassword };
}
