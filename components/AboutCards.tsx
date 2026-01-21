"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/Carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

interface AboutCardsProps {
  lang: "en" | "ar";
}


const AboutCards: React.FC<AboutCardsProps> = ({ lang }) => {
  const oneChemicCards = [
    {
      id: 1,
      imagePath: "/premuiem.webp",
      title: {
        en: "Premium Chemical Quality",
        ar: "جودة كيميائية فائقة",
      },
      description: {
        en: "OneChemic produces high-quality chemical raw materials that meet international standards, ensuring purity, consistency, and reliable performance.",
        ar: "تنتج وان كيميك خامات كيميائية عالية الجودة مطابقة للمعايير العالمية، مما يضمن النقاء والثبات والأداء الموثوق.",
      },
    },
    {
      id: 2,
      imagePath: "/modern_production.webp",
      title: {
        en: "Advanced Manufacturing Facility",
        ar: "منشأة تصنيع متطورة",
      },
      description: {
        en: "Our factory is equipped with modern production lines and strict quality control systems to deliver safe and efficient chemical solutions.",
        ar: "يضم مصنعنا أحدث خطوط الإنتاج وأنظمة رقابة صارمة للجودة لتقديم حلول كيميائية آمنة وفعالة.",
      },
    },
    {
      id: 3,
      imagePath: "/packaging.webp",
      title: {
        en: "Superior Packaging Solutions",
        ar: "أفضل حلول التعبئة والتغليف",
      },
      description: {
        en: "We provide strong, secure, and export-ready packaging that protects chemical products during storage and transportation.",
        ar: "نوفر عبوات قوية وآمنة ومناسبة للتصدير لحماية المنتجات الكيميائية أثناء التخزين والنقل.",
      },
    },
    {
      id: 4,
      imagePath: "/rangeofchmicals.webp",
      title: {
        en: "Wide Range of Chemical Products",
        ar: "مجموعة واسعة من المنتجات الكيميائية",
      },
      description: {
        en: "OneChemic offers a diverse range of chemical products serving industrial, agricultural, and commercial sectors.",
        ar: "تقدم وان كيميك مجموعة متنوعة من المنتجات الكيميائية التي تلبي احتياجات القطاعات الصناعية والزراعية والتجارية.",
      },
    },
    {
      id: 5,
      imagePath: "/trust.webp",
      title: {
        en: "Trusted & Reliable Partner",
        ar: "شريك موثوق ومعتمد",
      },
      description: {
        en: "Clients trust OneChemic for its commitment to quality, transparency, and long-term business partnerships.",
        ar: "يثق العملاء في وان كيميك لالتزامها بالجودة والمصداقية وبناء شراكات طويلة الأمد.",
      },
    },
  ];
  



  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true }),
  );

  return (
    <section className="w-full h-full py-20 relative overflow-hidden bg-bluish flex items-center justify-center">


      <Carousel
        plugins={[plugin.current]} 
        opts={{
          align: "center",
          loop: true,
        }}
        className="w-full max-w-5xl px-16"
        dir={"ltr"}
      >
        <CarouselContent>
          {oneChemicCards.map((item) => (
            <CarouselItem key={item.id}>
              <div className="p-12 h-full">
                <div className="relative h-[500px] md:h-[700px] lg:h-[850px] rounded-xl shadow-[0_0_32px_rgba(248,147,31,1)] overflow-hidden group">
                  <Image
                    src={item.imagePath}
                    alt={item.title[lang]}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                  <div className="absolute bottom-20 left-0 right-0 p-4 md:p-6 text-white flex flex-col items-center justify-center text-center">
                    <h1 className="text-xl md:text-2xl font-bold mb-2">
                      {item.title[lang]}
                    </h1>

                    <p className="text-xs md:text-sm opacity-90 self-center">
                      {item.description[lang]}
                    </p>

                    <button className="bg-yellowish hover:scale-110 mt-2 transition-transform duration-300 cursor-pointer px-12 py-2 shadow-[0_0_32px_rgba(248,147,31,1)]  self-center rounded-lg">
                      {" "}
                      {lang === "ar" ? "اعرف المزيد" : "Learn more"}
                    </button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-2 sm:left-4 md:left-2 text-bluish bg-yellowish shadow-[0_0_32px_rgba(248,147,31,1)] hover:bg-yellowish/90 rounded-xl" />
        <CarouselNext className="right-2  sm:right-4 md:right-2 text-bluish bg-yellowish shadow-[0_0_32px_rgba(248,147,31,1)] hover:bg-yellowish/90 rounded-xl" />
      </Carousel>
    </section>
  );
};

export default AboutCards;
