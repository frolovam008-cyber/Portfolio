"use client";

import ProjectSlider, {type ProjectImage} from "@/components/Projects/ProjectSlider/ProjectSlider";
import styles from "./Projects.module.css";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
// import {
//   fadeInLeft,
//   fadeInRight
// } from "@/lib/animations";

type Props = {
  id: string;
  images: ProjectImage[];
  stack: string[];
  github: string;
  demo: string;
  reverse?: boolean;
  delay?:number;
};

export default function ProjectCard({
  id,
  images,
  stack,
  github,
  demo,
  reverse,
  delay
}: Props) {
  const t = useTranslations("Projects");

  return (
    <motion.article
      className={`${styles.card} ${
        reverse ? styles.reverse : ""
      }`}
  //       variants={
  //   reverse
  //     ? fadeInRight
  //     : fadeInLeft
  // }
 initial={{ opacity: 0, y: 80, scale: 0.98 }}
  whileInView={{ opacity: 1, y: 0, scale: 1 }}
  viewport={{ once: true, amount: 0.25 }}
  transition={{
    duration: 0.8,
    delay,
    ease: [0.22, 1, 0.36, 1],
  }}
    >
      <div className={styles.imageWrapper}>
       <ProjectSlider images={images}  alt={t(`${id}.title`)} />
      </div>

      <div className={styles.content}>
        <h3>{t(`${id}.title`)}</h3>

        <p className={styles.description}>
          {t(`${id}.description`)}
        </p>

        <ul className={styles.features}>
          <li>✓ {t(`${id}.features.1`)}</li>
          <li>✓ {t(`${id}.features.2`)}</li>
          <li>✓ {t(`${id}.features.3`)}</li>
          <li>✓ {t(`${id}.features.4`)}</li>
        </ul>

        <div className={styles.stack}>
          {stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>

        <div className={styles.links}>
          <a href={github} target="_blank">
            {t("github")}
          </a>

          <a href={demo} target="_blank">
            {t("demo")}
          </a>
        </div>
      </div>
    </motion.article>
  );
}