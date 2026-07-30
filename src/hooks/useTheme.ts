"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  const savedTheme = localStorage.getItem("theme");

  return savedTheme === "light" || savedTheme === "dark"
    ? savedTheme
    : "dark";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "dark" ? "light" : "dark"
    );
  };

  return { theme, toggleTheme };
}
// "use client";

// import { useEffect, useState } from "react";

// type Theme = "light" | "dark";

// export function useTheme() {
//   const [theme, setTheme] = useState<Theme>("dark");

//   useEffect(() => {
//     const saved = localStorage.getItem("theme") as Theme | null;

//     const initial = saved || "dark";

//     setTheme(initial);
//     document.documentElement.dataset.theme = initial;
//   }, []);

//   const toggleTheme = () => {
//     setTheme(prev => {
//       const next = prev === "dark" ? "light" : "dark";

//       document.documentElement.dataset.theme = next;
//       localStorage.setItem("theme", next);

//       return next;
//     });
//   };

//   return { theme, toggleTheme };
// }