import React from "react";
import CatergoryCard from "@/components/CatergoryCard";

export const categories = [
  {
    title: { en: "Solvents", ar: "المذيبات" },
    description: {
      en: "We provide high-quality solvents for industrial and laboratory use, ensuring purity and efficiency in every application.",
      ar: "نقدم مذيبات عالية الجودة للاستخدام الصناعي والمخبري، مع ضمان النقاء والكفاءة في كل تطبيق.",
    },
    imagePath: "/solvents.webp",
    nav: "/categories/solvents",
  },
  {
    title: { en: "Polymers", ar: "البوليمرات" },
    description: {
      en: "Our polymers are designed for durability and versatility, meeting the needs of modern manufacturing processes.",
      ar: "تم تصميم البوليمرات لدينا لتكون متينة ومتعددة الاستخدامات، لتلبية احتياجات عمليات التصنيع الحديثة.",
    },
    imagePath: "/polymers.webp",
    nav: "/categories/polymers",
  },
  {
    title: { en: "Chemical Additives", ar: "الملحقات الكيميائية" },
    description: {
      en: "Enhance your products with our chemical additives, formulated to improve performance and quality.",
      ar: "عزز منتجاتك بملحقاتنا الكيميائية المصممة لتحسين الأداء والجودة.",
    },
    imagePath: "/chemicalAddtives.webp",
    nav: "/categories/chemical-additives",
  },
  {
    title: { en: "Chemical Preservatives", ar: "المواد الحافظة الكيميائية" },
    description: {
      en: "Our chemical preservatives ensure your products remain safe and stable, extending shelf life effectively.",
      ar: "تضمن المواد الحافظة الكيميائية لدينا بقاء منتجاتك آمنة ومستقرة، مع زيادة العمر الافتراضي بفعالية.",
    },
    imagePath: "/preservatives.webp",
    nav: "/categories/chemical-preservatives",
  },
  {
    title: { en: "Pigments and Fillers", ar: "الأصباغ والمواد المالئة" },
    description: {
      en: "We offer high-quality pigments and fillers to enhance color, texture, and consistency in your products.",
      ar: "نقدم أصباغًا ومواد مالئة عالية الجودة لتعزيز اللون والملمس والتناسق في منتجاتك.",
    },
    imagePath: "/Fillers.webp",
    nav: "/categories/pigments-fillers",
  },
];

type PageProps = {
  params: {
    lang: "en" | "ar";
  };
};

const page: React.FC<PageProps> = async ({ params }) => {
  const { lang } = await params;
  return (
    <section className="h-full grid grid-cols-1 gap-x-6 gap-y-6 p-6 md:p-16 md:grid-cols-3 border-t-2 border-yellowish bg-bluish">
      {categories.map((cat) => (
        <CatergoryCard
          key={cat.title.en}
          lang={lang}
          title={cat.title[lang]}
          description={cat.description[lang]}
          imagePath={cat.imagePath}
          nav={cat.nav}
        />
      ))}
    </section>
  );
};

export default page;
