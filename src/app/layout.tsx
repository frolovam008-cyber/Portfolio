import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "@/app/globals.scss";
import { Plus_Jakarta_Sans, Manrope, JetBrains_Mono,Inter } from "next/font/google";

export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "cyrillic-ext"],
  variable: "--font-jakarta",
});

export const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
});

export const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-mono",
});

export const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain.com"),

  applicationName: "Marina Frolova Portfolio",

  authors: [
    {
      name: "Marina Frolova",
    },
  ],

  creator: "Marina Frolova",

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}  data-scroll-behavior="smooth">
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="container">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
