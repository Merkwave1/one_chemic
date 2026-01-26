import { Product, Category } from "@/types/product";

//fallback products only used when API is unavailable
export const FAKE_PRODUCTS: Product[] = [
  {
    id: 1,
    titleEn: "Methylene Chloride",
    titleAr: "ثنائي كلورو الميثان",
    descriptionEn:
      "Methylene chloride is a solvent used in industrial applications.",
    descriptionAr: "ثنائي كلورو الميثان هو مذيب يستخدم في التطبيقات الصناعية.",
    detailedDescriptionEn:
      "PVA 24-88 is a water-soluble synthetic polymer known for its excellent adhesive strength, film-forming ability, and chemical stability.",
    detailedDescriptionAr:
      "PVA 24-88 هو بوليمر صناعي قابل للذوبان في الماء يتميز بقوة التصاق عالية وقدرة ممتازة على تكوين الأغشية وثبات كيميائي جيد.",
    imagePath: "/products/MethyleneChloride1.webp",
    nav: "methylene-chloride",
    categoryEn: "Solvents",
    categoryAr: "المذيبات",
  },
  {
    id: 2,
    titleEn: "Methyl Ethyl Ketone (MEK)",
    titleAr: "ميثيل إيثيل كيتون",
    descriptionEn: "MEK is commonly used in coatings and adhesives.",
    descriptionAr: "يُستخدم MEK عادة في الطلاء والمواد اللاصقة.",
    detailedDescriptionEn:
      "PVA 24-88 is a water-soluble synthetic polymer known for its excellent adhesive strength, film-forming ability, and chemical stability.",
    detailedDescriptionAr:
      "PVA 24-88 هو بوليمر صناعي قابل للذوبان في الماء يتميز بقوة التصاق عالية وقدرة ممتازة على تكوين الأغشية وثبات كيميائي جيد.",
    imagePath: "/products/MEK.webp",
    nav: "methyl-ethyl-ketone",
    categoryEn: "Solvents",
    categoryAr: "المذيبات",
  },
  {
    id: 3,
    titleEn: "Polyvinyl Alcohol (PVA)",
    titleAr: "بولي فينيل الكحول",
    descriptionEn:
      "PVA is a water-soluble polymer used in adhesives and coatings.",
    descriptionAr:
      "PVA هو بوليمر قابل للذوبان في الماء يستخدم في المواد اللاصقة والطلاء.",
    detailedDescriptionEn:
      "Polyvinyl Alcohol is widely used in textile, paper, and packaging industries for its excellent film-forming and adhesive properties.",
    detailedDescriptionAr:
      "يستخدم بولي فينيل الكحول على نطاق واسع في صناعات النسيج والورق والتغليف لخصائصه الممتازة في تكوين الأغشية واللصق.",
    imagePath: "/products/polymers.webp",
    nav: "polyvinyl-alcohol",
    categoryEn: "Polymers",
    categoryAr: "بوليمرات",
  },
];

// Categories must match the backend exactly for proper filtering
export const CATEGORIES: Category[] = [
  { en: "Solvents", ar: "مذيبات" },
  { en: "Polymers", ar: "بوليمرات" },
  { en: "Chemical Additives", ar: "إضافات كيميائية" },
  { en: "Chemical Preservatives", ar: "مواد حافظة كيميائية" },
  { en: "Pigments & Fillers", ar: "أصباغ ومواد مالئة" },
];
