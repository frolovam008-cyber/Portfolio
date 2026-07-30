"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
import {
  Link,
  usePathname,
  useRouter,
} from "@/i18n/navigation";

import styles from "./Navbar.module.scss";

type Locale = "en" | "ru";

type NavItem = {
  href: string;
  label: string;
};

export default function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale() as Locale;

  const router = useRouter();
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mobileMenuId = useId();

  const navItems: NavItem[] = [
    {
      href: "/",
      label: t("home"),
    },
    {
      href: "/#about",
      label: t("about"),
    },
    {
      href: "/#projects",
      label: t("projects"),
    },
    {
      href: "/contact",
      label: t("contact"),
    },
  ];

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((current) => !current);
  };

  const toggleLang = () => {
    const newLocale: Locale = locale === "ru" ? "en" : "ru";

    closeMenu();

    router.replace(pathname, {
      locale: newLocale,
    });
  };

    useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header className={styles.header}>
      <nav
        className={styles.navbar}
        aria-label={t("navigation")}
      >
        <Link
          href="/"
          className={styles.left}
          aria-label={t("home")}
          onClick={closeMenu}
        >
          <Image
            src="/images/logo-new1.png"
            alt="Portfolio logo"
            width={180}
            height={150}
            className={styles.logo}
            priority
          />
        </Link>

        <ul className={styles.links}>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.right}>
          <button
            type="button"
            className={styles.btn}
            onClick={toggleLang}
            aria-label={
              locale === "ru"
                ? "Switch language to English"
                : "Переключить язык на русский"
            }
          >
            {locale === "ru" ? "EN" : "RU"}
          </button>

          <ThemeToggle />
        </div>

        <button
          type="button"
          className={styles.burger}
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls={mobileMenuId}
          aria-label={
            isMenuOpen
              ? locale === "ru"
                ? "Закрыть меню"
                : "Close menu"
              : locale === "ru"
                ? "Открыть меню"
                : "Open menu"
          }
        >
          {isMenuOpen ? (
            <X size={28} aria-hidden="true" />
          ) : (
            <Menu size={28} aria-hidden="true" />
          )}
        </button>
      </nav>

      <div
        id={mobileMenuId}
        className={`${styles.mobileMenu} ${
          isMenuOpen ? styles.mobileMenuOpen : ""
        }`}
        aria-hidden={!isMenuOpen}
      >
        <ul className={styles.mobileLinks}>
          {navItems.map((item, index) => (
            <li
              key={item.href}
              style={{
                transitionDelay: isMenuOpen
                  ? `${index * 70 + 100}ms`
                  : "0ms",
              }}
            >
              <Link
                href={item.href}
                onClick={closeMenu}
                tabIndex={isMenuOpen ? 0 : -1}
              >
                <span className={styles.mobileLinkNumber}>
                  0{index + 1}
                </span>

                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.mobileControls}>
          <button
            type="button"
            className={styles.btn}
            onClick={toggleLang}
            tabIndex={isMenuOpen ? 0 : -1}
            aria-label={
              locale === "ru"
                ? "Switch language to English"
                : "Переключить язык на русский"
            }
          >
            {locale === "ru" ? "EN" : "RU"}
          </button>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}