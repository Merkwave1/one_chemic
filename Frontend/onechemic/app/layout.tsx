import type { Metadata } from "next";
import { Alexandria } from "next/font/google";
import "./globals.css";

const alexandria = Alexandria({
  subsets: ["latin", "arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-alexandria",
});


export const metadata: Metadata = {
  title: {
    default: "One Chemic | Chemic Raw Materials Supplier in Egypt",
    template: "%s | One Chemic",
  },
  description:
    "One Chemic is your trusted one-stop supplier for chemic raw materials in Egypt. We provide high-quality chemics, tailored solutions, and reliable services for industrial and agricultural applications.",
  keywords: [
    "One Chemic",
    "chemic raw materials",
    "chemic supplier Egypt",
    "industrial chemicals",
    "agricultural chemicals",
    "chemic factory Egypt",
    "Alexandria chemic supplier",
  ],
  authors: [{ name: "One Chemic" }],
  creator: "One Chemic",
  publisher: "One Chemic",
  metadataBase: new URL("https://onechemic.com"),
  openGraph: {
    title: "One Chemic | Your One-Stop Supplier for Chemic Raw Materials",
    description:
      "High-quality chemic raw materials and customized solutions for industrial and agricultural sectors across Egypt.",
    url: "https://onechemic.com",
    siteName: "One Chemic",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "One Chemic | Chemic Raw Materials Supplier",
    description:
      "Reliable chemic raw materials supplier offering proven solutions for diverse industries in Egypt.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export async function generateStaticParams() {
  return [
    { lang: "en" },
    { lang: "ar" },
  ];
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${alexandria.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
