
"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import styles from "./ThemeToggle.module.scss";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";

    setTheme(nextTheme);
  };

  return (
    <button
      type="button"
      className={styles.btn}
      onClick={toggleTheme}
      aria-label="Переключить цветовую тему"
    >
      <Sun
        className={styles.sun}
        size={20}
        aria-hidden="true"
      />

      <Moon
        className={styles.moon}
        size={20}
        aria-hidden="true"
      />
    </button>
  );
}

// "use client";

// import styles from "./ThemeToggle.module.scss";
// import { useTheme } from "@/hooks/useTheme";

// export default function ThemeToggle() {
//   const { theme, toggleTheme } = useTheme();

//   const isDark = theme === "dark";

//   return (
//     <button
//       className={styles.btn}
//       onClick={toggleTheme}
//       aria-label="toggle theme"
//     >
//       {isDark ? "☀️" : "🌙"}
//     </button>
//   );
// }