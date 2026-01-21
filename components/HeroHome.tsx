import React from "react";

interface GradientProps {
  lang?: string;
  rtl?: "ltr" | "rtl"; // optional: pass page direction
}
const HeroHome: React.FC<GradientProps> = ({ lang, rtl = "ltr" }) => {
  return (
    <section className="h-screen relative     bg-[url('/hero-mob.png')]
    lg:bg-[url('/hero_upscaled.png')] bg-cover bg-center">

      <div
        className={`
        absolute inset-0
        
        ${rtl === "rtl" ? "bg-gradient-to-l" : "bg-gradient-to-r"}
        from-bluish/50 to-transparent
      `}
      />
      <div className="relative z-10 flex flex-col items-start justify-center h-full p-8">
        <div className="flex flex-col items-center justify-center mb-20 ">
          <h1 className="text-5xl text-white max-w-4xl p-10  text-center  ">
            {lang === "ar"
              ? "المورد المتكامل للمواد الخام الكيميائية"
              : "YOUR ONE-STOP SUPPLIER FOR CHEMICAL RAW MATERIALS"}
          </h1>
          <button className="bg-yellowish hover:scale-110 transition-transform duration-300 cursor-pointer px-12 py-2 shadow-[0_0_32px_rgba(248,147,31,1)]  self-center rounded-lg">
            {" "}
            {lang === "ar"
              ? "اعرف المزيد"
              : "Learn more"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroHome;
