import React from "react";
import { X } from "lucide-react";
import { Product } from "@/types/product";
import { IMAGE_BASE_URL } from "@/config/config";

interface ViewModalProps {
  lang: "en" | "ar";
  product: Product;
  onEdit: () => void;
  onClose: () => void;
}

const ViewModal: React.FC<ViewModalProps> = ({
  lang,
  product,
  onEdit,
  onClose,
}) => {
  // Build the full image URL
  const imageUrl = product.imagePath
    ? product.imagePath.startsWith("http")
      ? product.imagePath
      : `${IMAGE_BASE_URL}${product.imagePath}`
    : "";

  return (
    <>
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between bg-yellowish px-4 sm:px-6 py-4">
        <h2 className="text-lg sm:text-xl font-bold text-bluish line-clamp-1">
          {lang === "ar" ? product.titleAr : product.titleEn}
        </h2>
        <button
          onClick={onClose}
          className="rounded-full bg-bluish/10 p-2 text-bluish transition-colors hover:bg-bluish hover:text-white"
        >
          <X size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={product.titleEn}
            className="w-full h-48 sm:h-64 object-cover rounded-xl shadow-lg"
          />
        )}

        {/* Category */}
        <div className="flex gap-2 flex-wrap">
          <span className="inline-block rounded-full bg-yellowish px-4 py-1.5 text-sm font-semibold text-bluish">
            {product.categoryEn}
          </span>
          <span
            className="inline-block rounded-full bg-bluish px-4 py-1.5 text-sm font-semibold text-white"
            dir="rtl"
          >
            {product.categoryAr}
          </span>
        </div>

        {/* Title - Both Languages */}
        <div className="rounded-xl bg-bluish/5 p-4">
          <p className="text-sm font-semibold text-bluish mb-2">
            Title / العنوان
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-white rounded-lg p-3 border border-bluish/10">
              <p className="text-xs text-bluish/60 mb-1">English</p>
              <p className="text-bluish font-medium">{product.titleEn}</p>
            </div>
            <div
              className="bg-white rounded-lg p-3 border border-bluish/10"
              dir="rtl"
            >
              <p className="text-xs text-bluish/60 mb-1">العربية</p>
              <p className="text-bluish font-medium">{product.titleAr}</p>
            </div>
          </div>
        </div>

        {/* Description - Both Languages */}
        <div className="rounded-xl bg-bluish/5 p-4">
          <p className="text-sm font-semibold text-bluish mb-2">
            Description / الوصف
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-white rounded-lg p-3 border border-bluish/10">
              <p className="text-xs text-bluish/60 mb-1">English</p>
              <p className="text-bluish/80 text-sm">{product.descriptionEn}</p>
            </div>
            <div
              className="bg-white rounded-lg p-3 border border-bluish/10"
              dir="rtl"
            >
              <p className="text-xs text-bluish/60 mb-1">العربية</p>
              <p className="text-bluish/80 text-sm">{product.descriptionAr}</p>
            </div>
          </div>
        </div>

        {/* Detailed Description - Both Languages */}
        <div className="rounded-xl bg-bluish/5 p-4">
          <p className="text-sm font-semibold text-bluish mb-2">
            Detailed Description / الوصف التفصيلي
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-white rounded-lg p-3 border border-bluish/10">
              <p className="text-xs text-bluish/60 mb-1">English</p>
              <p className="text-bluish/80 text-sm whitespace-pre-line">
                {product.detailedDescriptionEn}
              </p>
            </div>
            <div
              className="bg-white rounded-lg p-3 border border-bluish/10"
              dir="rtl"
            >
              <p className="text-xs text-bluish/60 mb-1">العربية</p>
              <p className="text-bluish/80 text-sm whitespace-pre-line">
                {product.detailedDescriptionAr}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Link */}
        <div className="rounded-xl bg-bluish/5 p-4">
          <p className="text-sm font-semibold text-bluish mb-2">
            Navigation Link / رابط التنقل
          </p>
          <div className="bg-white rounded-lg p-3 border border-bluish/10">
            <p className="text-bluish/80 font-mono text-sm break-all">
              /categories/{product.nav}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="sticky bottom-0 bg-white border-t border-bluish/10 p-4 sm:p-6">
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl bg-bluish px-4 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl"
          >
            {lang === "ar" ? "إغلاق" : "Close"}
          </button>
          <button
            onClick={onEdit}
            className="flex-1 rounded-xl bg-yellowish px-4 py-3 font-semibold text-bluish shadow-lg transition-all hover:shadow-xl"
          >
            {lang === "ar" ? "تعديل" : "Edit"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ViewModal;
