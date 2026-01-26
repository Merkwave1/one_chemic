import CatergoryCard from "@/components/CatergoryCard";
import {
  fetchProducts,
  filterProductsByCategory,
  getCategorySlug,
  CATEGORY_LABELS,
  getImageUrl,
  Product,
} from "@/config/config";

interface PageProps {
  params: Promise<{ type: string; lang: "ar" | "en" }>;
}

// Generate static params for all category types
export async function generateStaticParams() {
  const categoryTypes = [
    "solvents",
    "polymers",
    "chemical-additives",
    "chemical-preservatives",
    "pigments-fillers",
  ];

  return categoryTypes.map((type) => ({ type }));
}

const CategoryPage = async ({ params }: PageProps) => {
  const { lang, type } = await params;

  // Fetch products from API and filter by category
  const allProducts = await fetchProducts();
  const categoryProducts = filterProductsByCategory(allProducts, type);

  // Get category label for display
  const categoryLabel = CATEGORY_LABELS[type];

  if (!categoryProducts.length) {
    return (
      <section className="min-h-screen h-full flex flex-col items-center justify-center p-6 md:p-16 border-t-2 border-yellowish bg-bluish">
        <h2 className="text-2xl font-bold text-yellowish mb-4">
          {categoryLabel?.[lang] || type}
        </h2>
        <p className="text-white text-lg">
          {lang === "ar"
            ? "لا توجد منتجات في هذه الفئة."
            : "No products found in this category."}
        </p>
      </section>
    );
  }

  return (
    <section className="min-h-screen h-full border-t-2 border-yellowish bg-bluish">
      {/* Category Header */}
      <div className="p-6 md:px-16 md:pt-12">
        <h1 className="text-2xl md:text-4xl font-bold text-yellowish">
          {categoryLabel?.[lang] || type}
        </h1>
        <p className="text-white/70 mt-2">
          {lang === "ar"
            ? `${categoryProducts.length} منتجات`
            : `${categoryProducts.length} product${categoryProducts.length > 1 ? "s" : ""}`}
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 gap-x-6 gap-y-6 p-6 md:px-16 md:pb-16 md:grid-cols-3">
        {categoryProducts.map((product: Product) => (
          <CatergoryCard
            key={product.id}
            lang={lang}
            title={lang === "ar" ? product.titleAr : product.titleEn}
            description={
              lang === "ar" ? product.descriptionAr : product.descriptionEn
            }
            imagePath={getImageUrl(product.imagePath)}

            nav={`/categories/${getCategorySlug(product)}/${product.id}`}
          />
        ))}
      </div>
    </section>
  );
};

export default CategoryPage;
