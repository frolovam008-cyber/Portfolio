"use client";

import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import {
  CodeXml,
  BriefcaseBusiness,
  ServerCog,
  ExternalLink,
} from "lucide-react";

import styles from "./About.module.scss";

const AvatarTiles = dynamic(
  () => import("@/components/Avatar/AvatarTiles"),
  {
    ssr: false,
  }
);

export default function About() {
  const t = useTranslations("About");

  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>
            {t("label")}
          </span>

          <h2 className={styles.title}>
            {t("title")}
          </h2>

          <p className={styles.description}>
            {t("description")}
          </p>
        </div>

        <div className={styles.main}>
          <div className={styles.imageColumn}>
            <div className={styles.imageWrapper}>
              <div className={styles.glow} />

              <div className={styles.avatarCard}>
                <AvatarTiles />
              </div>
            </div>
          </div>

          <div className={styles.content}>
            <div className={styles.cards}>
              <article className={styles.infoCard}>
                <div className={styles.cardIcon}>
                  <CodeXml
                    size={26}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </div>

                <div className={styles.cardContent}>
                  <h3>React / Next.js</h3>

                  <p>{t("frontendDescription")}</p>

                  <div className={styles.tags}>
                    <span>React</span>
                    <span>Next.js</span>
                    <span>TypeScript</span>
                  </div>
                </div>
              </article>

              <article className={styles.infoCard}>
                <div className={styles.cardIcon}>
                  <BriefcaseBusiness
                    size={26}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </div>

                <div className={styles.cardContent}>
                  <h3>{t("commercialTitle")}</h3>

                  <p>{t("commercialDescription")}</p>

                  <div className={styles.tags}>
                    <span>REST API</span>
                    <span>UI Architecture</span>
                    <span>Business Logic</span>
                  </div>
                </div>
              </article>

              <article className={styles.infoCard}>
                <div className={styles.cardIcon}>
                  <ServerCog
                    size={26}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </div>

                <div className={styles.cardContent}>
                  <h3>{t("fullstackTitle")}</h3>

                  <p>{t("fullstackDescription")}</p>

                  <div className={styles.tags}>
                    <span>Node.js</span>
                    <span>Express</span>
                    <span>PostgreSQL</span>
                  </div>
                </div>
              </article>
            </div>

            <a
              href="/cv.docx"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cv}
            >
              <span>{t("downloadCv")}</span>

              <ExternalLink
                size={18}
                strokeWidth={2}
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
// import { useTranslations } from "next-intl";
// import dynamic from "next/dynamic";
// const AvatarTiles = dynamic(() => import("@/components/Avatar/AvatarTiles"), {
//   ssr: false,
// });
// import styles from "./About.module.scss";

// export default function About() {
//   const t = useTranslations("About");

//   return (
//     <section id="about" className={styles.about}>
//       <div className={styles.content}>
//         <h2>{t("title")}</h2>

//         <p className={styles.description}>{t("description")}</p>

//         <div className={styles.stats}>
//           <div className={styles.card}>
//             <span>3+</span>
//             <p>{t("experience")}</p>
//           </div>

//           <div className={styles.card}>
//             <span>15+</span>
//             <p>{t("projects")}</p>
//           </div>

//           <div className={styles.card}>
//             <span>10+</span>
//             <p>{t("technologies")}</p>
//           </div>
//         </div>
//         <div className={styles.imageWrapper}>
//           <div className={styles.glow} />
//           <div className={styles.card}>
//             <AvatarTiles />
//           </div>{" "}
//         </div>

//         <a href="/cv.pdf" target="_blank" className={styles.cv}>
//           {t("downloadCv")}
//         </a>
//       </div>
//     </section>
//   );
// }
