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
  const cardDescription =
    lang === "en" ? description.en : description.ar;

  return (
    <div className="flex flex-col text-center items-center rounded-xl min-h-[400px] md:min-h-[550px] h-full justify-center py-24 border border-[#FFE100] px-3 md:px-4 lg:px-6 bg-bluish gap-6">
      <div className="w-[300px] md:w-[200px] xl:w-[300px] h-[140px] relative rounded-xl overflow-hidden group font-bold">
        <Image
          src={imagePath}
          alt={cardTitle}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-125"
        />
      </div>

      <h3 className="text-xl text-white font-semibold mb-4">
        {cardTitle}
      </h3>

      <p className="text-base  text-white">
        {cardDescription}
      </p>
    </div>
  );
};

export default HomeCard;
