import type { Metadata } from "next";
import { Poppins,Tajawal } from "next/font/google";
import "./globals.css";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-tajawal",
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
      <body className={`${poppins.variable} ${tajawal.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
