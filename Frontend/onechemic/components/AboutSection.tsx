import React from "react";

interface AboutHeroProps {
  lang: "en" | "ar";
}

const AboutSection: React.FC<AboutHeroProps> = ({ lang }) => {
  const content = {
    foundation: {
      title: {
        en: "Our foundation",
        ar: "أساسنا",
      },
      description: {
        en: `Our foundation rests on a dedication to excellence, making us the
        go-to supplier for factories and distributors in Egypt. With a
        steadfast belief in reliability and customer satisfaction, OneChemic
        stands as a testament to a decade of unwavering commitment to our
        clients and the chemical industry.`,
        ar: `يرتكز أساسنا على الالتزام بالتميز، مما يجعلنا المورد الموثوق للمصانع والموزعين في مصر. مع إيمان راسخ بالمصداقية ورضا العملاء، تعد OneChemic شهادة لعقد من الالتزام المستمر تجاه عملائنا وصناعة الكيماويات.`,
      },
    },
    solutions: {
      title: {
        en: "Made-to-measure solutions for enterprises",
        ar: "حلول مخصصة للمؤسسات",
      },
      description: {
        en: `Our team is poised to explore and secure the chemical solution your
        business demands. This flexibility is coupled with a commitment to
        personalized customer service — an assurance that your individual
        requirements will be met with precision and care.`,
        ar: `فريقنا مستعد لاستكشاف وتأمين الحلول الكيميائية التي يحتاجها عملك. هذه المرونة تترافق مع الالتزام بتقديم خدمة عملاء مخصصة.`,
      },
    },
  };

  return (
    <section
      className={`flex flex-col w-full h-full text-center ${
        lang === "ar" ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <div className="w-full md:w-1/2 bg-bluish py-24 text-yellowish flex flex-col gap-14 px-2 md:px-12 items-center justify-center">
        <h3 className="text-2xl md:text-4xl font-extrabold">
          {content.foundation.title[lang]}
        </h3>
        <p className="text-sm md:text-xl">{content.foundation.description[lang]}</p>
      </div>
      <div className="w-full md:w-1/2 bg-yellowish py-24 text-bluish flex flex-col gap-14 px-4 md:px-12 items-center justify-center">
        <h3 className="text-2xl md:text-4xl font-extrabold">
          {content.solutions.title[lang]}
        </h3>
        <p className="text-base md:text-xl">{content.solutions.description[lang]}</p>
      </div>
    </section>
  );
};

export default AboutSection;
