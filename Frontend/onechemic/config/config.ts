// Base URL for API - reads from environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5224";

// Product Endpoints
export const PRODUCTS_ENDPOINT = `${API_BASE_URL}/api/product`;
export const PRODUCT_BY_ID_ENDPOINT = (id: number | string) =>
  `${API_BASE_URL}/api/product/${id}`;

// Image base URL for displaying product images
export const IMAGE_BASE_URL = API_BASE_URL;

// Helper function to get full image URL
export function getImageUrl(imagePath: string | null | undefined): string {
  if (!imagePath) return "/placeholder.jpg";
  // If it's already a full URL, return as is
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  // Ensure path starts with /
  const normalizedPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  // Encode spaces and special characters in path (but not the slashes)
  const encodedPath = normalizedPath.split('/').map(segment => encodeURIComponent(segment)).join('/');
  return `${IMAGE_BASE_URL}${encodedPath}`;
}

// Product type matching backend API response
export type Product = {
  id: number;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  detailedDescriptionEn: string;
  detailedDescriptionAr: string;
  imagePath: string;
  nav: string;
  categoryEn: string;
  categoryAr: string;
};

// Category mapping for URL slugs (handles all variations)
export const CATEGORY_SLUG_MAP: Record<string, string> = {
  // English variations
  "Solvents": "solvents",
  "Polymers": "polymers",
  "Chemical Additives": "chemical-additives",
  "Chemical Preservatives": "chemical-preservatives",
  "Pigments & Fillers": "pigments-fillers",
  "Pigments and Fillers": "pigments-fillers",
};

// Reverse mapping: slug to all possible category names that should match
export const SLUG_TO_CATEGORIES: Record<string, string[]> = {
  "solvents": ["Solvents"],
  "polymers": ["Polymers"],
  "chemical-additives": ["Chemical Additives"],
  "chemical-preservatives": ["Chemical Preservatives"],
  "pigments-fillers": ["Pigments & Fillers", "Pigments and Fillers"],
};

// Category labels for display
export const CATEGORY_LABELS: Record<string, { en: string; ar: string }> = {
  "solvents": { en: "Solvents", ar: "مذيبات" },
  "polymers": { en: "Polymers", ar: "بوليمرات" },
  "chemical-additives": { en: "Chemical Additives", ar: "إضافات كيميائية" },
  "chemical-preservatives": { en: "Chemical Preservatives", ar: "مواد حافظة كيميائية" },
  "pigments-fillers": { en: "Pigments & Fillers", ar: "أصباغ ومواد مالئة" },
};

// Fetch all products from API
export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(PRODUCTS_ENDPOINT, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data.filter((p: Product) => p.titleEn) : [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Fetch single product by ID
export async function fetchProductById(id: number | string): Promise<Product | null> {
  try {
    const response = await fetch(PRODUCT_BY_ID_ENDPOINT(id), {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// Filter products by category slug
export function filterProductsByCategory(products: Product[], categorySlug: string): Product[] {
  const categoryNames = SLUG_TO_CATEGORIES[categorySlug];
  if (!categoryNames || categoryNames.length === 0) return [];
  // Match any of the possible category name variations
  return products.filter((p) => categoryNames.includes(p.categoryEn));
}

// Get category slug from product
export function getCategorySlug(product: Product): string {
  return CATEGORY_SLUG_MAP[product.categoryEn] || "solvents";
}
