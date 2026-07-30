import { z } from "zod";

type TranslationFunction = (
  key: string,
) => string;

export const createContactFormSchema = (
  t: TranslationFunction,
) =>
  z.object({
    name: z
      .string()
      .trim()
      .min(2, {
        message: t("validation.nameMin"),
      })
      .max(50, {
        message: t("validation.nameMax"),
      }),

    email: z
      .string()
      .trim()
      .email({
        message: t("validation.emailInvalid"),
      }),

    subject: z
      .string()
      .trim()
      .min(3, {
        message: t("validation.subjectMin"),
      })
      .max(100, {
        message: t("validation.subjectMax"),
      }),

    message: z
      .string()
      .trim()
      .min(10, {
        message: t("validation.messageMin"),
      })
      .max(1000, {
        message: t("validation.messageMax"),
      }),
  });

export type ContactFormData = z.infer<
  ReturnType<typeof createContactFormSchema>
>;