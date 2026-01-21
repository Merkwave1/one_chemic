import React from "react";
import { MapPin } from "lucide-react";

interface LocationSectionProps {
  lang: "en" | "ar";
}

const LocationSection: React.FC<LocationSectionProps> = ({ lang }) => {
  const isArabic = lang === "ar";
  return (
    <div className="relative bg-yellowish h-full w-full py-50 flex flex-col md:flex-row gap-8 md:gap-0">
      <div
        className="
            absolute inset-0 
            bg-[radial-gradient(circle_at_center,rgba(255,225,0,0.8)_0%,rgba(248,147,31,0.2)_100%)]
          "
      />
      <div className="flex flex-col gap-6 px-30 z-20">
        <MapPin size={250} className="mx-auto  text-bluish" />
        <h4 className="font-extrabold text-5xl text-bluish text-center">
          {isArabic ? "الموقع" : "Location"}
        </h4>
        <p className=" text-bluish text-center text-xl">
          {isArabic
            ? "الإسكندرية، طريق الزراعة البطيء، قليوب، القليوبية، مصر"
            : "Alexandria, agricultural Slow Road, Qalyoub, Qalyoubia, Egypt"}
        </p>
      </div>
      <div className="px-4 md:px-12 w-full z-20">
        <div className="relative w-full h-[300px] md:h-[450px] rounded-xl overflow-hidden border border-bluish shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d13798.928967660973!2d31.225320043624887!3d30.159070398929586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzDCsDA5JzQ3LjUiTiAzMcKwMTMnNDMuNiJF!5e0!3m2!1sen!2seg!4v1769002153900!5m2!1sen!2seg"
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

    </div>
  );
};

export default LocationSection;
