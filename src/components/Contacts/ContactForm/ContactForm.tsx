"use client";

import { useMemo, useState } from "react";
import { Send } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import FormField from "@/components/Contacts/FormField/FormField";

import {
  createContactFormSchema,
  type ContactFormData,
} from "@/components/Contacts/ContactForm/contactForm.schema";

import styles from "@/components/Contacts/ContactForm/ContactForm.module.css";

type SubmitStatus =
  | "idle"
  | "success"
  | "error";

const defaultValues: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const t = useTranslations("ContactForm");

  const [submitStatus, setSubmitStatus] =
    useState<SubmitStatus>("idle");

  const schema = useMemo(
    () => createContactFormSchema(t),
    [t],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = async (
  data: ContactFormData,
) => {
  setSubmitStatus("idle");

  try {
    const response = await fetch(
      "/api/contact",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.error ||
          "Не удалось отправить сообщение",
      );
    }

    reset();
    setSubmitStatus("success");
  } catch (error) {
    console.error(
      "Contact form error:",
      error,
    );

    setSubmitStatus("error");
  }
};

  return (
    <section
      className={styles.section}
      aria-labelledby="contact-form-title"
    >
 
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        aria-label={t("ariaLabel")}
        noValidate
      >
        <div className={styles.row}>
          <FormField
            id="name"
            label={t("fields.name.label")}
            placeholder={t(
              "fields.name.placeholder",
            )}
            autoComplete="name"
            registration={register("name")}
            error={errors.name?.message}
            disabled={isSubmitting}
          />

          <FormField
            id="email"
            type="email"
            label={t("fields.email.label")}
            placeholder={t(
              "fields.email.placeholder",
            )}
            autoComplete="email"
            registration={register("email")}
            error={errors.email?.message}
            disabled={isSubmitting}
          />
        </div>

        <FormField
          id="subject"
          label={t("fields.subject.label")}
          placeholder={t(
            "fields.subject.placeholder",
          )}
          registration={register("subject")}
          error={errors.subject?.message}
          disabled={isSubmitting}
        />

        <FormField
          as="textarea"
          id="message"
          rows={7}
          label={t("fields.message.label")}
          placeholder={t(
            "fields.message.placeholder",
          )}
          registration={register("message")}
          error={errors.message?.message}
          disabled={isSubmitting}
        />

        <div className={styles.footer}>
          <button
            type="submit"
            className={styles.submit}
            disabled={isSubmitting}
          >
            <span>
              {isSubmitting
                ? t("submitting")
                : t("submit")}
            </span>

            <Send
              size={18}
              aria-hidden="true"
            />
          </button>

          <div
            className={styles.status}
            aria-live="polite"
          >
            {submitStatus === "success" && (
              <p className={styles.success}>
                {t("success")}
              </p>
            )}

            {submitStatus === "error" && (
              <p
                className={
                  styles.submitError
                }
              >
                {t("error")}
              </p>
            )}
          </div>
        </div>
      </form>
    </section>
  );
}
