import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/providers/Providers";
import "@/styles/index.css";

export const dynamic = "force-static";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DTECHEX — Doon Technology Expert",
  description:
    "DTECHEX empowers businesses with AI, Cloud, and Digital Engineering to drive innovation, automate operations, and accelerate growth.",
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body
        className="antialiased"
        style={{ backgroundColor: "#04050d" }}
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
