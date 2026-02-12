import React from "react";
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import Image from "next/image";

type FooterProps = {
  lang: "en" | "ar";
};

const translations = {
  en: {
    contact: "Contact US",
    sales: "Sales",
    management: "Management",
    address: "Alexandria agricultural SLOW Road, Qalyub Qalyubia",
    phoneLabel: "(+20) 10 20 77 684",
    phoneLabel2: "(+20) 10 20 22 218",
    managerPhone: "(+20) 10 70 09 7779",
    email: "info@onechemic.com",
    copyright: "Copyright © 2026 One Chemic | Powered by Merkwave",
  },
  ar: {
    contact: "تواصل معنا",
    sales: "المبيعات",
    management: "الإدارة",
    address: "طريق الزراعة، قليوب، القليوبية",
    phoneLabel: "(+20) 10 20 77 684",
    phoneLabel2: "(+20) 10 20 22 218",
    managerPhone: "(+20) 10 70 09 7779",
    email: "info@onechemic.com",
    copyright: "حقوق النشر © 2026 One Chemic | من تصميم Merkwave",
  },
};

export default function Footer({ lang }: FooterProps) {
  const t = translations[lang];
  const isRtl = lang === "ar";

  // helpers
  const textAlign = isRtl ? "text-right" : "text-left";

  const rowAlign = "justify-start";

  const tel = (s: string) => s.replace(/[^+\d]/g, "");

  return (
    <footer
      className={`w-full bg-[#F8931F] text-[#0A1128] ${
        isRtl ? "rtl" : "ltr"
      } px-6 py-8`}
    >
      <div className="max-w-8xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          <div className={`flex-1 ${textAlign}`}>
            <div className="flex flex-col gap-4">
              <div className="relative inline-block w-fit">
                <div className="bg-[#0A1128] px-4 rounded-xl shadow-lg border-2 border-white/20 backdrop-blur-sm">
                  <Image
                    src="/icon.svg"
                    alt="One Chemic Logo"
                    className="object-contain drop-shadow-md"
                    width={90}
                    height={30}
                  />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-[#0A1128]/30 to-transparent rounded-xl -z-10 blur-sm"></div>
              </div>
              <p className="text-[#0A1128] px-1 leading-relaxed max-w-sm">
                  {lang === "ar"
    ? "نقود الطريق في توزيع المواد الخام الكيميائية عبر مصر وما بعدها. الجودة والموثوقية والابتكار في كل دفعة."
    : "Leading the way in chemical raw material distribution across Egypt and beyond. Quality, reliability, and innovation in every batch."}
              </p>
            </div>
          </div>
          {/* Contact */}
          <div className={`flex-1 ${textAlign}`}>
            <h6 className="font-bold text-sm md:text-base mb-4">{t.contact}</h6>
            <ul className="space-y-2 text-xs md:text-sm">
              {/* Location */}
              <li className="flex items-center justify-start space-x-1">
                <MapPin size={22} className="mr-2" />
                <a
                  href="https://maps.app.goo.gl/BmswuYpYUsiJ6tPc9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.address}
                </a>
              </li>

              {/* Phone */}
              <li className="flex items-center justify-start space-x-1">
                <Phone size={20} className="mr-2" />
                <a href={`tel:${tel(t.phoneLabel)}`} dir="ltr">{t.phoneLabel}</a>
              </li>

              {/* Email */}
              <li className="flex items-center justify-start space-x-1">
                <Mail size={20} className="mr-2" />
                <a href={`mailto:${t.email}`}>{t.email}</a>
              </li>
            </ul>
          </div>

          {/* Sales */}
          <div className={`flex-1 ${textAlign}`}>
            <h6 className="font-bold text-sm md:text-base mb-4">{t.sales}</h6>
            <ul className="space-y-2 text-xs md:text-sm">
              <li className={`flex items-center ${rowAlign} space-x-1`}>
                <Phone size={16} className="mr-2" />
                <a href={`tel:${t.phoneLabel}`} dir="ltr">{t.phoneLabel}</a>
              </li>
              <li className={`flex items-center ${rowAlign} space-x-1`}>
                <Phone size={16} className="mr-2" />
                <a href={`tel:${t.phoneLabel2}`} dir="ltr">{t.phoneLabel2}</a>
              </li>
            </ul>
          </div>

          {/* Management */}
          <div className={`flex-1 ${textAlign} `}>
            <h6 className="font-bold text-sm md:text-base mb-4">
              {t.management}
            </h6>
            <ul className="space-y-2 text-xs md:text-sm">
              <li className={`flex items-center ${rowAlign} space-x-1`}>
                <Phone size={16} className="mr-2" />
                <a href={`tel:${t.managerPhone}`} dir="ltr">{t.managerPhone}</a>
              </li>

              <li className="flex items-center gap-3 mt-4 justify-start">
                <a
                  aria-label="facebook"
                  href="https://www.facebook.com/onechemic"
                  target="_blank"
                  className="p-2 rounded-full bg-[#0A1128] text-white hover:bg-[#0A1128]/80 hover:scale-110 transition-all duration-200 shadow-md"
                >
                  <Facebook size={18} />
                </a>
                <a
                  aria-label="x"
                  className="p-2 rounded-full bg-[#0A1128] text-white hover:bg-[#0A1128]/80 hover:scale-110 transition-all duration-200 shadow-md"
                  href="https://x.com/onechemic"
                  target="_blank"
                >
                  <Twitter size={18} />
                </a>
                <a
                  aria-label="linkedin"
                  className="p-2 rounded-full bg-[#0A1128] text-white hover:bg-[#0A1128]/80 hover:scale-110 transition-all duration-200 shadow-md"
                  href="https://www.linkedin.com/company/one-chemic"
                  target="_blank"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  aria-label="instagram"
                  className="p-2 rounded-full bg-[#0A1128] text-white hover:bg-[#0A1128]/80 hover:scale-110 transition-all duration-200 shadow-md"
                  href="https://www.instagram.com/one_chemic/"
                  target="_blank"
                >
                  <Instagram size={18} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-[#0A1128]/20 text-center text-xs md:text-sm text-[#0A1128]/70 font-medium">
          {t.copyright}
        </div>
      </div>
    </footer>
  );
}
