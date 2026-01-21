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

interface RepeatedSectionprops {
  lang: "en" | "ar";
}

const RepeatedSection: React.FC<RepeatedSectionprops> = ({ lang }) => {
const items = [
  {
    id: 1,
    image: "/whatwedo.webp",
    title: {
      en: "WHAT WE DO FOR YOU",
      ar: "ماذا نقدم لك",
    },
    description: {
      en: "Embarking on a transformative partnership with OneChemic opens the door to a comprehensive array of services designed to elevate your business in the dynamic landscape of chemical raw materials",
      ar: "الدخول في شراكة استراتيجية مع وان كيميك يفتح لك آفاقًا واسعة من الخدمات المتكاملة المصممة لتطوير أعمالك في عالم المواد الخام الكيميائية المتغير",
    },
  },
  {
    id: 2,
    image: "/unique.webp",
    title: {
      en: "Unique original recipes",
      ar: "تركيبات أصلية وفريدة",
    },
    description: {
      en: "Each technical issue is carefully analyzed by our specialists, and recipes are created for individual engineering challenges",
      ar: "يتم تحليل كل تحدٍ تقني بدقة من قبل خبرائنا، ويتم إعداد تركيبات مخصصة تلائم كل حالة هندسية على حدة",
    },
  },
  {
    id: 3,
    image: "/chemicals.webp",
    title: {
      en: "Best drilling chemicals",
      ar: "أفضل كيماويات الحفر",
    },
    description: {
      en: "We don’t just sell chemical products – we create effective solutions. We save our clients’ time and increase the safety of the work carried out",
      ar: "نحن لا نبيع المنتجات الكيميائية فقط، بل نقدم حلولًا فعالة توفر وقت عملائنا وتعزز سلامة العمليات",
    },
  },
];


  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true }),
  );

  return (
    <section className="w-full h-full py-20 relative overflow-hidden flex items-center justify-center">
      <div className="absolute top-0 left-0 w-1/2 h-full bg-yellowish"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-bluish"></div>

      <Carousel
        plugins={[plugin.current]} 
        opts={{
          align: "center",
          loop: true,
        }}
        className="w-full max-w-5xl px-8 md:px-16"
        dir={"ltr"}
      >
        <CarouselContent>
          {items.map((item) => (
            <CarouselItem key={item.id}>
              <div className="p-2 h-full">
                <div className="relative h-[500px] md:h-[700px] lg:h-[850px] rounded-xl shadow-lg overflow-hidden group">
                  <Image
                    src={item.image}
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

                    <button className="bg-yellowish hover:scale-110 mt-2 transition-transform duration-300 cursor-pointer px-4 text-sm md:text-base md:px-12 py-2 shadow-[0_0_32px_rgba(248,147,31,1)]  self-center rounded-lg">
                      {" "}
                      {lang === "ar" ? "اعرف المزيد" : "Learn more"}
                    </button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-2 sm:left-4 md:left-2 text-yellowish bg-bluish shadow-[0_0_32px_rgba(0,17,135,1)] hover:bg-bluish/90" />
        <CarouselNext className="right-2  sm:right-4 md:right-2 text-bluish bg-yellowish shadow-[0_0_32px_rgba(248,147,31,1)] hover:bg-yellowish/90" />
      </Carousel>
    </section>
  );
};

export default RepeatedSection;
