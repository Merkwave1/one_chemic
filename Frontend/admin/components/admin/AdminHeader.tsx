import React from "react";
import { Plus, Package } from "lucide-react";

interface AdminHeaderProps {
  lang: "en" | "ar";
  totalProducts: number;
  onAddClick: () => void;
  disabled?: boolean;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({
  lang,
  totalProducts,
  onAddClick,
  disabled = false,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-yellowish shadow-lg">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 py-4 sm:px-6 md:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-bluish">
            <Package className="h-6 w-6 text-yellowish" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-bluish">
              {lang === "ar" ? "إدارة المنتجات" : "Product Management"}
            </h1>
            <p className="text-xs sm:text-sm text-bluish/70">
              {lang === "ar"
                ? `إجمالي المنتجات: ${totalProducts}`
                : `Total Products: ${totalProducts}`}
            </p>
          </div>
        </div>
        <button
          onClick={onAddClick}
          disabled={disabled}
          className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-bluish px-4 sm:px-6 py-3 font-semibold text-white shadow-lg transition-all ${disabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-xl hover:scale-105 active:scale-95"}`}
        >
          <Plus size={20} />
          <span>{lang === "ar" ? "إضافة منتج" : "Add Product"}</span>
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
