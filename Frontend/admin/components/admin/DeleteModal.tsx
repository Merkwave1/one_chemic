import React from "react";
import { X, Trash2 } from "lucide-react";
import { Product } from "@/types/product";

interface DeleteModalProps {
  lang: "en" | "ar";
  product: Product;
  onConfirm: () => void;
  onClose: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  lang,
  product,
  onConfirm,
  onClose,
}) => {
  const productTitle = lang === "ar" ? product.titleAr : product.titleEn;

  return (
    <>
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between bg-red-500 px-4 sm:px-6 py-4">
        <h2 className="text-lg sm:text-xl font-bold text-white">
          {lang === "ar" ? "حذف المنتج" : "Delete Product"}
        </h2>
        <button
          onClick={onClose}
          className="rounded-full bg-white/20 p-2 text-white transition-colors hover:bg-white/30"
        >
          <X size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="text-center py-6">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <Trash2 size={32} className="text-red-600" />
          </div>
          <h3 className="text-lg font-bold text-bluish mb-2">
            {lang === "ar" ? "هل أنت متأكد؟" : "Are you sure?"}
          </h3>
          <p className="text-bluish/70">
            {lang === "ar"
              ? `هل تريد حذف "${productTitle}"؟`
              : `Do you want to delete "${productTitle}"?`}
          </p>
          <p className="mt-2 text-sm text-red-600">
            {lang === "ar"
              ? "لا يمكن التراجع عن هذا الإجراء."
              : "This action cannot be undone."}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="sticky bottom-0 bg-white border-t border-bluish/10 p-4 sm:p-6">
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border-2 border-bluish/30 px-4 py-3 font-semibold text-bluish transition-all hover:bg-bluish/10"
          >
            {lang === "ar" ? "إلغاء" : "Cancel"}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-red-600 px-4 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:bg-red-700 active:scale-95"
          >
            {lang === "ar" ? "حذف" : "Delete"}
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
