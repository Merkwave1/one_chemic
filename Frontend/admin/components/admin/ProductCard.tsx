import React from "react";
import { Eye, Edit2, Trash2, Package } from "lucide-react";
import { Product } from "@/types/product";
import { IMAGE_BASE_URL } from "@/config/config";

interface ProductCardProps {
  product: Product;
  lang: "en" | "ar";
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  disabled?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  lang,
  onView,
  onEdit,
  onDelete,
  disabled = false,
}) => {
  // Map lang to correct field names (camelCase)
  const getField = (base: "title" | "description" | "category") => {
    const suffix = lang === "ar" ? "Ar" : "En";
    const key = `${base}${suffix}` as keyof Product;
    return product[key] as string;
  };

  // Build the full image URL
  const imageUrl = product.imagePath
    ? product.imagePath.startsWith("http")
      ? product.imagePath
      : `${IMAGE_BASE_URL}${product.imagePath}`
    : "";

  return (
    <div className="group rounded-2xl bg-white overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-yellowish/20 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative h-40 sm:h-48 overflow-hidden bg-gray-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={getField("title")}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            <Package size={48} />
          </div>
        )}
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-block rounded-full bg-yellowish px-3 py-1 text-xs font-semibold text-bluish shadow-md">
            {getField("category")}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-base sm:text-lg font-bold text-bluish line-clamp-1">
          {getField("title")}
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-gray-600 line-clamp-2">
          {getField("description")}
        </p>

        {/* Actions */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <button
            onClick={onView}
            disabled={disabled}
            className={`flex items-center justify-center gap-1 rounded-lg bg-bluish/10 px-2 py-2 text-xs sm:text-sm font-medium text-bluish transition-all ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-bluish hover:text-white"}`}
          >
            <Eye size={14} />
            <span className="hidden sm:inline">
              {lang === "ar" ? "عرض" : "View"}
            </span>
          </button>
          <button
            onClick={onEdit}
            disabled={disabled}
            className={`flex items-center justify-center gap-1 rounded-lg bg-yellowish/20 px-2 py-2 text-xs sm:text-sm font-medium text-yellowish transition-all ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-yellowish hover:text-white"}`}
          >
            <Edit2 size={14} />
            <span className="hidden sm:inline">
              {lang === "ar" ? "تعديل" : "Edit"}
            </span>
          </button>
          <button
            onClick={onDelete}
            disabled={disabled}
            className={`flex items-center justify-center gap-1 rounded-lg bg-red-100 px-2 py-2 text-xs sm:text-sm font-medium text-red-600 transition-all ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600 hover:text-white"}`}
          >
            <Trash2 size={14} />
            <span className="hidden sm:inline">
              {lang === "ar" ? "حذف" : "Delete"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
