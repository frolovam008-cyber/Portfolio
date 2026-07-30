"use client";

import styles from "@/components/Projects/Projects.module.css";
import ProjectCard from "@/components/Projects/ProjectCard";
import { projects } from "@/components/Projects/projects.data";
import { useTranslations } from "next-intl";

export default function Projects() {
  const t = useTranslations("Projects");

  return (
    <section
      id="projects"
      className={styles.projects}
    >
      <h2 className={styles.title}>
        {t("sectionTitle")}
      </h2>

      <div className={styles.list}>
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            {...project}
            reverse={index % 2 !== 0}
          />
        ))}
      </div>
    </section>
  );
}