import React from "react";
import Image from "next/image";

interface PageProps {
  params: { lang: "en" | "ar" };
}

const page: React.FC<PageProps> = async ({ params }) => {
  const { lang } = await params;
  return (
    <section className="h-screen relative w-full bg-yellowish flex items-center justify-around px-4 lg:px-16 border-b-2 border-bluish gap-0 lg:gap-4">
      <div className="relative w-[40%]  h-[70%] hidden md:block">
        <Image
          src="/contact_upscaled.webp"
          alt="Contact Us"
          fill
          className="object-contain"
          priority
        />
      </div>

      <form className="bg-bluish  w-full z-10 text-white flex flex-col py-6 px-4 max-h-[75%]   md:max-w-[30%] rounded-xl gap-4 ">
        <h2 className="text-yellowish font-bold text-2xl lg:text-4xl text-center">
          {lang === "ar" ? "تواصل معنا" : "Contact Us"}
        </h2>
        <div className="flex flex-col gap-1">
          <label htmlFor="" className="font-medium text-base xl:text-lg">
            {lang === "ar" ? "الاسم" : "Name"}
          </label>
          <input type="text" className="w-full bg-yellowish rounded-sm p-2 text-sm 3xl:text-lg" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="" className="font-medium">
            {lang === "ar" ? "البريد الإلكتروني" : "Email"}
          </label>
          <input type="text" className="w-full bg-yellowish rounded-sm p-2 text-sm  3xl:text-lg" />
        </div>
        <div className="flex flex-col gap-1 ">
          <label htmlFor="" className="font-medium">
            {lang === "ar" ? "الرسالة" : "Message"}
          </label>
          <textarea rows={4} className="w-full bg-yellowish rounded-sm p-2 text-sm  3xl:text-lg" />
        </div>
        <div className="mt-auto self-center">
          <button className="bg-yellowish hover:scale-110 lg:text-lg transition-transform duration-300 cursor-pointer px-4 md:px-8 lg:px-12 py-2 shadow-[0_0_32px_rgba(248,147,31,1)] rounded-lg">
            {lang === "ar" ? "إرسال الرسالة" : "Send Message"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default page;
