import { allElements } from "@/data/data/categories";
import Image from "next/image";
import { Beaker, Factory, ShieldCheck, Package } from "lucide-react";

interface PageProps {
  params: Promise<{
    lang: "en" | "ar";
    type: string;
    id: string;
  }>;
}

// Generate all possible routes for static generation
export async function generateStaticParams() {
  const params = [];
  const languages = ["en", "ar"];

  const categoryMapping: Record<number, string> = {};
  for (let i = 1; i <= 7; i++) categoryMapping[i] = "solvents";
  for (let i = 8; i <= 13; i++) categoryMapping[i] = "polymers";
  for (let i = 14; i <= 16; i++) categoryMapping[i] = "chemical-additives";
  for (let i = 17; i <= 18; i++) categoryMapping[i] = "chemical-preservatives";
  for (let i = 19; i <= 19; i++) categoryMapping[i] = "pigments-fillers";

  for (const lang of languages) {
    for (const element of allElements) {
      params.push({
        lang,
        type: categoryMapping[element.id],
        id: String(element.id),
      });
    }
  }

  return params;
}

const ElementPage = async ({ params }: PageProps) => {
  const { id, lang } = await params;
  const item = allElements.find((el) => el.id === Number(id));

  if (!item) {
    return <div className="p-16 text-red-500">Element not found</div>;
  }

  return (
    <section className="relative w-full flex items-center justify-around min-h-screen overflow-hidden bg-yellowish text-bluish border-b border-bluish">

      {/* 🔹 Decorative background blobs */}
      <div className="absolute -top-32 -left-32 w-72 h-72 bg-bluish/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-yellowish/40 rounded-full blur-3xl" />

      {/* 🔹 Content */}
      <div className="relative z-10 flex flex-col-reverse md:flex-row md:w-full lg:w-[80%] xl:w-[70%] items-center justify-around md:justify-between gap-10 px-6 py-20 max-w-9xl mx-auto">

        {/* TEXT SIDE */}
        <div className="flex flex-col gap-6 max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold">
            {item.title[lang]}
          </h1>

          <p className="text-md md:text-lg leading-relaxed">
            {item.description[lang]}
          </p>

          {item.detailed_descr && (
            <p className="text-sm md:text-base opacity-90">
              {item.detailed_descr[lang]}
            </p>
          )}

          {/* 🔹 Icon highlights */}
          <div className="flex flex-wrap gap-6 mt-4">
            <div className="flex items-center gap-2">
              <Beaker size={20} />
              <span className="text-sm">
                {lang === "en" ? "High Purity" : "نقاء عالي"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Factory size={20} />
              <span className="text-sm">
                {lang === "en" ? "Industrial Grade" : "درجة صناعية"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck size={20} />
              <span className="text-sm">
                {lang === "en" ? "Quality Assured" : "جودة مضمونة"}
              </span>
            </div>
          </div>

          {/* 🔹 Info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-4 rounded-xl border border-bluish bg-white/70 backdrop-blur">
              <h3 className="font-semibold text-lg">
                {lang === "en" ? "Category" : "الفئة"}
              </h3>
              <p className="text-sm mt-1">{item.category?.[lang]}</p>
            </div>

            <div className="p-4 rounded-xl border border-bluish bg-white/70 backdrop-blur">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Package size={18} />
                {lang === "en" ? "Packaging" : "التعبئة"}
              </h3>
              <p className="text-sm mt-1">
                {lang === "en" ? "Drums / Barrels" : "براميل / عبوات"}
              </p>
            </div>
          </div>
        </div>

        {/* IMAGE SIDE */}
        <div className="relative w-full max-w-md md:max-w-2xl h-[280px] md:h-[380px] rounded-2xl overflow-hidden shadow-xl border border-bluish">
          <Image
            src={item.imagePath}
            alt={item.title[lang]}
            fill
            className="object-cover"
          />
          {/* Image overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-bluish/40 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default ElementPage;
