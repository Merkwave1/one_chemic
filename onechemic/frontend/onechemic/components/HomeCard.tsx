import React from "react";
import Image from "next/image";

interface HomeCardProps {
  lang: "en" | "ar";
  imagePath: string;
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
}

const HomeCard: React.FC<HomeCardProps> = ({
  lang,
  imagePath,
  title,
  description,
}) => {
  const cardTitle = lang === "en" ? title.en : title.ar;
  const cardDescription = lang === "en" ? description.en : description.ar;

  return (
    <div className="flex flex-col text-center items-center justify-start rounded-xl w-64 md:w-72 xl:w-80 h-110 px-4 pb-6 pt-4 border border-[#FFE100] bg-bluish gap-4">
      <div className="w-[200px] md:w-[200px] xl:w-[280px] relative rounded-xl overflow-hidden group font-bold aspect-4/3">
        <Image
          src={imagePath}
          alt={cardTitle}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-125"
        />
      </div>

      <h3 className="text-xl px-3 md:px-4 lg:px-6 text-white font-semibold mb-4">
        {cardTitle}
      </h3>

      <p className="text-base px-3 md:px-4 lg:px-6 text-white max-w-xl ">
        {cardDescription}
      </p>
    </div>
  );
};

export default HomeCard;
