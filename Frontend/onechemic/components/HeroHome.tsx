import React from "react";
import Image from "next/image";

interface GradientProps {
  lang?: string;
  rtl?: "ltr" | "rtl"; // optional: pass page direction
}
const HeroHome: React.FC<GradientProps> = ({ lang, rtl = "ltr" }) => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Hero Images */}
      <Image
        src="/3.webp"
        alt="Hero Image Mobile"
        fill
        className="object-cover object-center lg:hidden"
        priority
        sizes="(max-width: 1080px) 100vw, 1920px"
      />
      <Image
        src="/4.webp"
        alt="Hero Image Desktop"
        fill
        className="object-cover object-center hidden lg:block"
        priority
        sizes="(max-width: 1920px) 100vw, 1920px"
      />

      <div
        className={`
        absolute inset-0
        
        ${rtl === "rtl" ? "bg-gradient-to-l" : "bg-gradient-to-r"}
        from-bluish/50 to-transparent
      `}
      />
      <div className="relative z-10 flex flex-col items-start justify-center h-full p-8">
        <div className="flex flex-col items-center justify-center mb-20 ">
          <h1 className="text-3xl mt-30 md:mt-0 md:text-5xl text-white max-w-4xl p-2 md:p-10  text-center  ">
            {lang === "ar"
              ? "المورد المتكامل للمواد الخام الكيميائية"
              : "YOUR ONE-STOP SUPPLIER FOR CHEMICAL RAW MATERIALS"}
          </h1>
          <button className="bg-yellowish hover:scale-110 transition-transform duration-300 cursor-pointer px-4 md:px-12 py-2 shadow-[0_0_32px_rgba(248,147,31,1)]  self-center rounded-lg">
            {" "}
            {lang === "ar" ? "اعرف المزيد" : "Learn more"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroHome;
