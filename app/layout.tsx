import type { Metadata } from "next";
import { DM_Sans, Sora } from "next/font/google";
import "./globals.css";
import { ClientEffects } from "@/components/site/client-effects";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "edpro - Clientes para empresas de mudanzas",
  description: "Conseguimos personas que quieren mudarse y las mandamos directamente a tu negocio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${dmSans.variable} ${sora.variable}`}>
      <body>
        <ClientEffects />
        {children}
      </body>
    </html>
  );
}
