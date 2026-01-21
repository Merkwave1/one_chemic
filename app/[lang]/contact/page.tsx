import React from "react";
import Image from "next/image";

interface PageProps {
  lang: "en" | "ar";
}

const page: React.FC<PageProps> = ({ lang }) => {
  return (
    <section className="h-screen relative w-full bg-yellowish flex items-center justify-between px-16 border-b-2 border-bluish gap-4">
      <div className="relative w-1/2  h-3/4 hidden md:block">
        <Image
          src="/contact_upscaled.webp"
          alt="Contact Us"
          fill
          className="object-contain"
          priority
        />
      </div>

      <form className="bg-bluish h-full w-full z-10 text-white flex flex-col py-6 px-4 max-h-1/2 md:max-w-[40%] rounded-xl gap-8 ">
        <h2 className="text-yellowish font-bold text-2xl md:text-4xl text-center">
          Contact us
        </h2>
        <div className="flex flex-col gap-1">
          <label htmlFor="" className="font-medium">
            Name
          </label>
          <input type="text" className="w-full bg-yellowish rounded-sm p-2" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="" className="font-medium">
            Email
          </label>
          <input type="text" className="w-full bg-yellowish rounded-sm p-2" />
        </div>
        <div className="flex flex-col gap-1 ">
          <label htmlFor="" className="font-medium">
            Message
          </label>
          <textarea rows={4} className="w-full bg-yellowish rounded-sm p-2" />
        </div>
          <div className="mt-auto self-center">
            <button className="bg-yellowish hover:scale-110 transition-transform duration-300 cursor-pointer px-12 py-2 shadow-[0_0_32px_rgba(248,147,31,1)] rounded-lg">
              {lang === "ar" ? "إرسال الرسالة" : "Send Message"}
            </button>
          </div>
      </form>
    </section>
  );
};

export default page;
