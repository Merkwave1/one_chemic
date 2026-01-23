"use client";
import React from "react";
import Image from "next/image";

interface OurPartnersProps {
  lang: "ar" | "en";
}

const OurPartners: React.FC<OurPartnersProps> = ({ lang }) => {
  const brandLogos = [
    { id: 1, name: "Akfix", src: "/akfix_logo.png", alt: "Akfix Brand Logo" },
    {
      id: 2,
      name: "Akkim Silicones",
      src: "/akkim-silicones.png",
      alt: "Akkim Silicones Brand Logo",
    },
    {
      id: 3,
      name: "Hifull Box",
      src: "/Hifill.png",
      alt: "Hifull Brand Logo",
    },
    { id: 4, name: "Dow", src: "/dow-logo.svg", alt: "Dow Brand Logo" },
  ];

  const isArabic = lang === "ar";

  return (
    <section className="py-16 bg-bluish">
      <div
        className={`container mx-auto px-4 sm:px-6 lg:px-8 ${isArabic ? "text-right" : "text-left"}`}
        dir={isArabic ? "rtl" : "ltr"}
      >
        <div className="text-center">
          {/* Section Heading */}
          <h2 className="text-3xl md:text-4xl text-yellowish font-extrabold mb-12">
            {isArabic ? "عملاؤنا" : "Our Partners"}
          </h2>

          {/* Infinite Loop Slider */}
          <div className="overflow-hidden relative w-full">
            <div className="flex animate-infinite-scroll gap-16 md:gap-24 py-12">
              {/* Render logos 3 times for seamless loop */}
              {[...Array(3)].map((_, setIndex) => (
                <React.Fragment key={setIndex}>
                  {brandLogos.map((logo) => (
                    <div
                      key={`${setIndex}-${logo.id}`}
                      className="flex-shrink-0  bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 flex items-center justify-center hover:bg-white/10 hover:scale-110 transition-all duration-300 "
                      style={{ minWidth: "180px" }}
                    >
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={160}
                        height={80}
                        className="h-12 md:h-16 w-auto opacity-80 hover:opacity-100 transition-opacity duration-300"
                        style={{
                          maxHeight: "80px",
                          width: "auto",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CSS for infinite scroll animation */}
      <style jsx global>{`
        @keyframes infinite-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }

        @keyframes infinite-scroll-rtl {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(100% / 3));
          }
        }

        .animate-infinite-scroll {
          animation: ${isArabic ? "infinite-scroll-rtl" : "infinite-scroll"} 25s
            linear infinite;
          width: max-content;
          display: flex;
        }

        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default OurPartners;
