import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { DataProvider } from "@/lib/data-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B0F19",
};

export const metadata: Metadata = {
  title: "CodeXplus | Enterprise Software & AI Product Engineering Lab",
  description:
    "CodeXplus crafts high-performance distributed web applications, smart biometric & facial attendance ecosystems, enterprise ERP platforms, and bespoke digital experiences.",
  keywords: [
    "Software Engineering",
    "Next.js App Development",
    "Biometric Attendance",
    "Enterprise ERP",
    "Full-Stack Engineering",
    "UI/UX Design Systems",
  ],
  openGraph: {
    title: "CodeXplus | Enterprise Software Engineering",
    description: "High-performance software systems, facial biometrics, and enterprise digital platforms.",
    type: "website",
    siteName: "CodeXplus",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="bg-background text-slate-100 font-sans antialiased selection:bg-brand-blue selection:text-white">
        <DataProvider>{children}</DataProvider>
      </body>
    </html>
  );
}
