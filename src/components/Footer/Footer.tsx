"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import {  ArrowUp } from "lucide-react";


import styles from "./Footer.module.css";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* ---------- Top ---------- */}

        <div className={styles.top}>
        
          <p className={styles.tagline}>
            {t("tagline")}
          </p>
            <Link
            href="/"
            aria-label="Home"
            className={styles.logoLink}
          >
            <Image
              src="/images/logo-new1.png"
              alt="Portfolio logo"
              width={170}
              height={60}
              priority
              className={styles.logo}
            />
          </Link>

        </div>

        {/* ---------- Social ---------- */}

        {/* <div className={styles.links}>
          <a
            href="https://github.com/frolovam008-cyber"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            <FaGithub size={18} />
            <span>{t("github")}</span>
          </a>

          <a
            href="mailto:your@email.com"
            className={styles.link}
          >
            <Mail size={18} />
            <span>{t("email")}</span>
          </a>
        </div> */}

        {/* ---------- Bottom ---------- */}

        <div className={styles.bottom}>
          <p className={styles.copy}>
            {t("copyright", {
              year: new Date().getFullYear(),
            })}
          </p>

          <p className={styles.tech}>
            {t("builtWith")}
          </p>

          <a
            href="#home"
            className={styles.toTop}
            aria-label={t("backToTop")}
          >
            <ArrowUp size={18} />
            <span>{t("backToTop")}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}