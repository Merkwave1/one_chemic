import React from "react";
import HomeCard from "@/components/HomeCard";

interface CardsSectionProps {
  lang: "en" | "ar";
}

const CardsSection: React.FC<CardsSectionProps> = ({ lang }) => {
  const isArabic = lang === "ar";
  return (
    <section className="flex flex-col   w-full h-full gap-4 bg-yellowish relative overflow-hidden">
      <div
        className="
            absolute inset-0 
            bg-[radial-gradient(circle_at_center,rgba(255,225,0,0.8)_0%,rgba(248,147,31,0.2)_100%)]
          "
      />

      <div className="flex flex-col  text-center items-center justify-center gap-2 mt-12 z-20">
        <h2 className="text-4xl text-bluish font-bold">
          {isArabic
            ? "خدمات مصممة خصيصًا لاحتياجاتك"
            : "Services tailored to your needs"}
        </h2>
        <p className="text-black text-base">
          {isArabic
            ? "لأن رحلتك فريدة، دعمنا كذلك."
            : "Because your journey is unique, our support is too."}
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center h-full w-full py-12 gap-4 md:gap-8 lg:gap-14 2xl:gap-40 z-20 px-25">
        <HomeCard
          lang={lang}
          imagePath="/research.webp"
          title={{
            en: "Research and Development",
            ar: "البحث والتطوير",
          }}
          description={{
            en: "We innovate and improve our products through continuous research and development.",
            ar: "نحن نبتكر ونطور منتجاتنا من خلال البحث والتطوير المستمر.",
          }}
        />
        <HomeCard
          lang={lang}
          imagePath="/supplychain.webp"
          title={{
            en: "Supply chain optimization",
            ar: "تحسين سلسلة التوريد",
          }}
          description={{
            en: "Our supply chain processes are optimized for efficiency and timely delivery.",
            ar: "نحن نحسن عمليات سلسلة التوريد لدينا لتحقيق الكفاءة وتسليم المنتجات في الوقت المحدد.",
          }}
        />
        <HomeCard
          lang={lang}
          imagePath="/qulaitycontrol.webp"
          title={{
            en: "Quality Control & Assurance",
            ar: "مراقبة الجودة وضمانها",
          }}
          description={{
            en: "We ensure the highest standards of quality in all our products.",
            ar: "نضمن أعلى معايير الجودة في جميع منتجاتنا.",
          }}
        />
      </div>
    </section>
  );
};

export default CardsSection;
