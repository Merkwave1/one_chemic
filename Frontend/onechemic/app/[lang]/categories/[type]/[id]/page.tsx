import {
  fetchProducts,
  fetchProductById,
  getCategorySlug,
  CATEGORY_LABELS,
  getImageUrl,
} from "@/config/config";
import Image from "next/image";
import { Beaker, Factory, ShieldCheck, Package } from "lucide-react";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    lang: "en" | "ar";
    type: string;
    id: string;
  }>;
}

// Generate static params for all products
export async function generateStaticParams() {
  const products = await fetchProducts();
  const params = [];
  const languages = ["en", "ar"];

  for (const lang of languages) {
    for (const product of products) {
      params.push({
        lang,
        type: getCategorySlug(product),
        id: String(product.id),
      });
    }
  }

  return params;
}

const ElementPage = async ({ params }: PageProps) => {
  const { id, lang, type } = await params;
  const product = await fetchProductById(id);

  if (!product) {
    notFound();
  }

  // Get category label
  const categoryLabel = CATEGORY_LABELS[type];
  const imageUrl = getImageUrl(product.imagePath);

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
            {lang === "ar" ? product.titleAr : product.titleEn}
          </h1>

          <p className="text-md md:text-lg leading-relaxed">
            {lang === "ar" ? product.descriptionAr : product.descriptionEn}
          </p>

          {(product.detailedDescriptionEn || product.detailedDescriptionAr) && (
            <p className="text-sm md:text-base opacity-90">
              {lang === "ar"
                ? product.detailedDescriptionAr
                : product.detailedDescriptionEn}
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
              <p className="text-sm mt-1">
                {lang === "ar"
                  ? categoryLabel?.ar || product.categoryAr
                  : categoryLabel?.en || product.categoryEn}
              </p>
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
            src={imageUrl}
            alt={lang === "ar" ? product.titleAr : product.titleEn}
            fill
            className="object-cover"
            unoptimized
          />
          {/* Image overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-bluish/40 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default ElementPage;
