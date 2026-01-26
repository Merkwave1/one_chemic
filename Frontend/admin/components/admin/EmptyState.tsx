import React from "react";
import { Plus, Package } from "lucide-react";

interface EmptyStateProps {
  lang: "en" | "ar";
  onAddClick: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ lang, onAddClick }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Package size={64} className="text-white/30 mb-4" />
      <p className="text-white/60 text-lg">
        {lang === "ar" ? "لا توجد منتجات بعد" : "No products yet"}
      </p>
      <button
        onClick={onAddClick}
        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-yellowish px-6 py-3 font-semibold text-bluish transition-all hover:scale-105"
      >
        <Plus size={20} />
        {lang === "ar" ? "أضف أول منتج" : "Add your first product"}
      </button>
    </div>
  );
};

export default EmptyState;
