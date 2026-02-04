import React from "react";
import Image from "next/image";
import Link from "next/link";

interface CatergoryCardProps {
  lang: "en" | "ar";
  title: string;
  description: string;
  imagePath: string;
  nav: string;
}

const CatergoryCard: React.FC<CatergoryCardProps> = ({
  lang,
  title,
  description,
  imagePath,
  nav,
}) => {
  return (
    <Link
      href={`/${lang}${nav}`}
      className="flex flex-col cursor-pointer group max-h-[400px] shadow-[0_0_16px_rgba(248,147,31,1)] bg-white rounded-xl overflow-hidden "
    >
      <div className="relative w-full h-48 overflow-hidden rounded-t-xl">
        <Image
          src={imagePath}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
          priority
          unoptimized
        />
      </div>

      <h3 className="text-md md:text-xl text-black px-4 pt-4 self-start font-bold mb-2 group-hover:underline">
        {title}
      </h3>

      <p className="text-sm md:text-base px-4  self-start text-black">
        {description}
      </p>
      <div className="mt-auto self-center w-full flex items-center mb-4 justify-center">
        <span className="mt-2 text-sm md:text-base w-[80%] md:w-1/2 self-center text-center text-white bg-bluish  px-1 md:px-8 py-2  rounded-lg hover:underline">
          {lang === "ar" ? "اقرأ المزيد" : "Read More"}
        </span>
      </div>
    </Link>
  );
};

export default CatergoryCard;
