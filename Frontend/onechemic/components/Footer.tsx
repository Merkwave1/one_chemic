import React from "react";
import { MapPin, Phone, Mail, Facebook, Twitter } from "lucide-react";

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
    copyright: "Copyright © 2026 One Chemic | Powered by One Chemic",
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
    copyright: "حقوق النشر © 2026 One Chemic | من تصميم One Chemic",
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
      className={`w-full bg-[#F8931F] text-[#08106B] ${
        isRtl ? "rtl" : "ltr"
      } px-6 py-8`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          {/* Contact */}
          <div className={`flex-1 ${textAlign}`}>
            <h6 className="font-bold text-sm md:text-base mb-4">{t.contact}</h6>
            <ul className="space-y-2 text-xs md:text-sm">
              <li className={`flex items-start ${rowAlign}`}>
                <MapPin size={16} className="mr-2" />
                <span>{t.address}</span>
              </li>

              <li className={`flex items-center ${rowAlign}`}>
                <Phone size={16} className="mr-2" />
                <a href={`tel:${tel(t.phoneLabel)}`} className="underline">
                  {t.phoneLabel}
                </a>
              </li>

              <li className={`flex items-center ${rowAlign}`}>
                <Mail size={16} className="mr-2" />
                <a href={`mailto:${t.email}`} className="underline">
                  {t.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Sales */}
          <div className={`flex-1 ${textAlign}`}>
            <h6 className="font-bold text-sm md:text-base mb-4">{t.sales}</h6>
            <ul className="space-y-2 text-xs md:text-sm">
              <li className={`flex items-center ${rowAlign}`}>
                <Phone size={16} className="mr-2" />
                <span>{t.phoneLabel}</span>
              </li>
              <li className={`flex items-center ${rowAlign}`}>
                <Phone size={16} className="mr-2" />
                <span>{t.phoneLabel2}</span>
              </li>
            </ul>
          </div>

          {/* Management */}
          <div className={`flex-1 ${textAlign}`}>
            <h6 className="font-bold text-sm md:text-base mb-4">
              {t.management}
            </h6>
            <ul className="space-y-2 text-xs md:text-sm">
              <li className={`flex items-center ${rowAlign}`}>
                <Phone size={16} className="mr-2" />
                <span>{t.managerPhone}</span>
              </li>

              <li className="flex items-center gap-3 mt-3 justify-start">
                <a
                  aria-label="facebook"
                  href="https://www.facebook.com/onechemic"
                  target="_blank"
                  className="p-1 rounded-full bg-white/10"
                >
                  <Facebook size={16} />
                </a>
                <a aria-label="x" className="p-1 rounded-full bg-white/10" href="https://x.com/onechemic" target="_blank">
                  <Twitter size={16} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-6 text-center text-[10px] md:text-xs text-[#08106B]/80">
          {t.copyright}
        </div>
      </div>
    </footer>
  );
}
