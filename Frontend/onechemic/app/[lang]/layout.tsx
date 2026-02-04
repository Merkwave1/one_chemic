import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

type Lang = "en" | "ar";

interface Props {
  children: React.ReactNode;
  params: Promise<{ lang: string; }>;
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;
  const validLang = lang as Lang; 
  return (
    <div
      className="flex flex-col min-h-screen"
      dir={validLang === "ar" ? "rtl" : "ltr"}
    >
      <Navbar lang={validLang} />
      <main className="flex-1">{children}</main>
      <Footer lang={validLang} />
    </div>
  );
}
