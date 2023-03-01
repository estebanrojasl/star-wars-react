import React, { useEffect, useState } from "react";

export function useIsLoggedIn() {
  const [isLogged, setIsLogged] = useState<boolean>();

  useEffect(() => {
    const handleStorage = () => {
      const loggedIn = localStorage.getItem("loggedIn") as "1" | "0";
      if (loggedIn === "1") {
        setIsLogged(true);
      } else if (loggedIn === "0") {
        setIsLogged(false);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return isLogged;
}
