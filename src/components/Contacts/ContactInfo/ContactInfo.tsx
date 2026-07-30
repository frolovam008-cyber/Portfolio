import { getTranslations } from "next-intl/server";
import { Mail, FileText, Send } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import ContactCard from "@/components/Contacts/ContactCard/ContactCard";
import styles from "@/components/Contacts/ContactInfo/ContactInfo.module.css";

export default async function ContactInfo() {
  const t = await getTranslations("ContactInfo");

  const contacts = [
    {
      icon: <Mail size={24} aria-hidden="true" />,
      label: t("email"),
      text: "frolovam008@gmail.com",
      href: "mailto:frolovam008@gmail.com",
    },
    {
      icon: <FaGithub size={24} aria-hidden="true" />,
      label: "GitHub",
      text: "github.com/frolovam008-cyber",
      href: "https://github.com/frolovam008-cyber/frolovam008-cyber",
    },
     {
    icon: <FileText size={24} />,
    label: "Resume",
    text: "Download CV",
    href: "/cv.docx",
  },
  {
    icon: <Send size={24} />,
    label: "Telegram",
    text: "@mrnfrlv",
    href: "https://t.me/@mrnfrlv",
  },]

  return (
    <section className={styles.contactInfo} area-label={t("sectionLabel")}>
      {contacts.map((contact) => (
        <ContactCard key={contact.label} {...contact} />
      ))}
    </section>
  );
}
