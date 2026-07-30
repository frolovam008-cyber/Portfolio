import type { Metadata } from "next";
import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer"

import en from "@/app/messages/en.json";
import ru from "@/app/messages/ru.json";

type Locale = "en" | "ru";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

const metadataByLocale: Record<
  Locale,
  {
    title: string;
    description: string;
    locale: string;
  }
> = {
  en: {
    title: "Marina Frolova | Frontend Developer",
    description:
      "Frontend Developer specializing in React, Next.js and TypeScript.",
    locale: "en_US",
  },

  ru: {
    title: "Марина Фролова | Frontend-разработчик",
    description:
      "Frontend-разработчик, специализирующийся на React, Next.js и TypeScript.",
    locale: "ru_RU",
  },
};

export async function generateMetadata({
  params,
}: Pick<LocaleLayoutProps, "params">): Promise<Metadata> {
  const { locale } = await params;

  if (locale !== "en" && locale !== "ru") {
    return {};
  }

  const currentMetadata = metadataByLocale[locale];

  return {
    title: currentMetadata.title,
    description: currentMetadata.description,

    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        ru: "/ru",
      },
    },

    openGraph: {
      title: currentMetadata.title,
      description: currentMetadata.description,
      locale: currentMetadata.locale,
      type: "website",
      url: `/${locale}`,

      images: [
        {
          url: "/images/og-image.png",
          width: 1200,
          height: 630,
          alt: currentMetadata.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: currentMetadata.title,
      description: currentMetadata.description,
      images: ["/images/og-image.png"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  const messages = {
    en,
    ru,
  }[locale as Locale];

  if (!messages) {
    notFound();
  }

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
    >
      <Navbar />
      {children}
      <Footer />
    </NextIntlClientProvider>
  );
}