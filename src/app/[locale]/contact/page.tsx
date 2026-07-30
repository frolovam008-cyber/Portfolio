import ContactInfo from "@/components/Contacts/ContactInfo/ContactInfo";
import ContactForm from "@/components/Contacts/ContactForm/ContactForm";
// import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

import styles from "@/app/[locale]/contact/page.module.css";

export default async function ContactPage() {
  // const t = useTranslations("ContactForm");
   const t = await getTranslations("ContactForm");

  return (
    <main className={styles.layout}>
      <header className={styles.pageHeader}>
        <span className={styles.label}>
          {t("sectionLabel")}
        </span>

        <h1
          id="contact-page-title"
          className={styles.title}
        >
          {t("title")}
        </h1>

        <p className={styles.description}>
          {t("description")}
        </p>
      </header>

      <aside className={styles.info}>
        <ContactInfo />
      </aside>

      <section
        className={styles.form}
        aria-labelledby="contact-page-title"
      >
        <ContactForm />
      </section>
    </main>
  );
}