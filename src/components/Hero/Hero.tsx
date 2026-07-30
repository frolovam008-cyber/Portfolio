"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import styles from "./Hero.module.scss";

export default function Hero() {
  const t = useTranslations("Hero");
  const locale = useLocale();

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.backgroundImage} aria-hidden="true">
          <Image
            src="/images/hero/hero-background.png"
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 100vw, 70vw"
          />
        </div>

        <div className={styles.text}>
          <div className={styles.marqueeContainer}>
            <div className={styles.marquee}>
              <div className={styles.track}>
                <div className={styles.content}>
                  React • TypeScript • Next.js • Framer Motion • UI Engineering •
                </div>

                <div className={styles.content} aria-hidden="true">
                  React • TypeScript • Next.js • Framer Motion • UI Engineering •
                </div>

                <div className={styles.content} aria-hidden="true">
                  React • TypeScript • Next.js • Framer Motion • UI Engineering •
                </div>
              </div>
            </div>
          </div>

          <h1>{t("title")}</h1>

          <p>{t("subtitle")}</p>

          <div className={styles.actions}>
            <a href="#projects" className={styles.button}>
              {t("projects")}
            </a>

            <Link href={`/${locale}/contact`} className={styles.button}>
              {t("contact")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

