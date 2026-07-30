import Link from "next/link";
import { ReactNode } from "react";

import styles from "./ContactCard.module.scss";

type ContactCardProps = {
  icon: ReactNode;
  label: string;
  text: string;
  href?: string;
};

export default function ContactCard({
  icon,
  label,
  text,
  href,
}: ContactCardProps) {
  return (
   <article className={styles.card}>
  <div className={styles.icon}>
    {icon}
  </div>

  <div className={styles.content}>
    <h3 className={styles.label}>{label}</h3>

    {href ? (
      <Link
        href={href}
        className={styles.text}
        target="_blank"
        rel="noopener noreferrer"
      >
        {text}
      </Link>
    ) : (
      <p className={styles.text}>{text}</p>
    )}
  </div>
</article>
  );
}