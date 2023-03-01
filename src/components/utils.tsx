import React, { useEffect, useState } from "react";

export function useIsLoggedIn() {
  const loggedIn = localStorage.getItem("loggedIn");
  const [isLogged, setIsLogged] = useState<string | null>(loggedIn);

  useEffect(() => {
    const handleStorage = () => {
      const loggedIn = localStorage.getItem("loggedIn");

      setIsLogged(loggedIn);
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return isLogged;
}

// export function useOutsideOfRefClick(ref: React.RefObject<HTMLElement>) {
//   const [clicked, setClicked] = useState<boolean>();
//   useEffect(() => {
//     function handleClickOutside(event: any) {
//       if (ref.current && !ref.current.contains(event.target)) {
//         setClicked(true);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [ref]);

//   return [clicked, setClicked];
// }
