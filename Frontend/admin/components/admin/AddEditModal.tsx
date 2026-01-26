import React, { useRef, useState } from "react";
import { X, Plus, ChevronDown, AlertCircle } from "lucide-react";
import { FormData, Category } from "@/types/product";

interface AddEditModalProps {
  lang: "en" | "ar";
  mode: "add" | "edit";
  formData: FormData;
  imagePreview: string;
  categories: Category[];
  onFormChange: (data: FormData) => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCategoryChange: (categoryEn: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

type ValidationErrors = {
  [K in keyof FormData]?: string;
};

const AddEditModal: React.FC<AddEditModalProps> = ({
  lang,
  mode,
  formData,
  imagePreview,
  categories,
  onFormChange,
  onImageChange,
  onCategoryChange,
  onSubmit,
  onClose,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());

  const validateField = (
    field: keyof FormData,
    value: string,
  ): string | undefined => {
    if (!value || value.trim() === "") {
      const fieldLabels: Record<keyof FormData, { en: string; ar: string }> = {
        titleEn: { en: "English Title", ar: "العنوان بالإنجليزية" },
        titleAr: { en: "Arabic Title", ar: "العنوان بالعربية" },
        descriptionEn: { en: "English Description", ar: "الوصف بالإنجليزية" },
        descriptionAr: { en: "Arabic Description", ar: "الوصف بالعربية" },
        detailedDescriptionEn: {
          en: "English Detailed Description",
          ar: "الوصف التفصيلي بالإنجليزية",
        },
        detailedDescriptionAr: {
          en: "Arabic Detailed Description",
          ar: "الوصف التفصيلي بالعربية",
        },
        categoryEn: { en: "Category", ar: "الفئة" },
        categoryAr: { en: "Category (Arabic)", ar: "الفئة بالعربية" },
        nav: { en: "URL Slug", ar: "رابط المنتج" },
      };
      return lang === "ar"
        ? `${fieldLabels[field].ar} مطلوب`
        : `${fieldLabels[field].en} is required`;
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const requiredFields: (keyof FormData)[] = [
      "titleEn",
      "titleAr",
      "descriptionEn",
      "descriptionAr",
      "detailedDescriptionEn",
      "detailedDescriptionAr",
      "categoryEn",
    ];

    const newErrors: ValidationErrors = {};
    let isValid = true;

    for (const field of requiredFields) {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    }

    setErrors(newErrors);
    setTouched(new Set(requiredFields));
    return isValid;
  };

  const handleFieldBlur = (field: keyof FormData) => {
    setTouched((prev) => new Set(prev).add(field));
    const error = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleFormChange = (field: keyof FormData, value: string) => {
    onFormChange({ ...formData, [field]: value });
    if (touched.has(field)) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleSubmitWithValidation = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(e);
    }
  };

  const renderFieldError = (field: keyof FormData) => {
    if (errors[field] && touched.has(field)) {
      return (
        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
          <AlertCircle size={12} />
          {errors[field]}
        </p>
      );
    }
    return null;
  };

  const getInputClassName = (field: keyof FormData, baseClass: string) => {
    const hasError = errors[field] && touched.has(field);
    return `${baseClass} ${hasError ? "border-red-500 focus:border-red-500 focus:ring-red-200" : ""}`;
  };

  return (
    <>
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between bg-yellowish px-4 sm:px-6 py-4">
        <h2 className="text-lg sm:text-xl font-bold text-bluish">
          {mode === "add"
            ? lang === "ar"
              ? "إضافة منتج جديد"
              : "Add New Product"
            : lang === "ar"
              ? "تعديل المنتج"
              : "Edit Product"}
        </h2>
        <button
          onClick={onClose}
          className="rounded-full bg-bluish/10 p-2 text-bluish transition-colors hover:bg-bluish hover:text-white"
        >
          <X size={20} />
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmitWithValidation}
        className="flex-1 overflow-y-auto"
      >
        <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
          {/* Image Upload - Optional */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-bluish">
              {lang === "ar" ? "الصورة (اختياري)" : "Image (Optional)"}
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={onImageChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full rounded-xl border-2 border-dashed border-bluish/30 bg-bluish/5 py-6 sm:py-8 transition-all hover:border-bluish hover:bg-bluish/10"
            >
              {imagePreview ? (
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={imagePreview}
                    alt="preview"
                    className="h-20 w-20 sm:h-24 sm:w-24 object-cover rounded-xl shadow-lg"
                  />
                  <p className="text-xs text-bluish/60">
                    {lang === "ar"
                      ? "انقر لتغيير الصورة"
                      : "Click to change image"}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="rounded-full bg-bluish/10 p-3">
                    <Plus size={24} className="text-bluish" />
                  </div>
                  <p className="text-sm font-medium text-bluish">
                    {lang === "ar" ? "اختر صورة" : "Choose an image"}
                  </p>
                </div>
              )}
            </button>
          </div>

          {/* Category Dropdown - Required */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-bluish">
              {lang === "ar" ? "الفئة" : "Category"}{" "}
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.categoryEn}
                onChange={(e) => {
                  onCategoryChange(e.target.value);
                  if (touched.has("categoryEn")) {
                    const error = validateField("categoryEn", e.target.value);
                    setErrors((prev) => ({ ...prev, categoryEn: error }));
                  }
                }}
                onBlur={() => handleFieldBlur("categoryEn")}
                className={getInputClassName(
                  "categoryEn",
                  "w-full appearance-none rounded-xl border border-bluish/30 bg-white px-4 py-3 pr-10 text-bluish transition-colors focus:border-bluish focus:outline-none focus:ring-2 focus:ring-bluish/20",
                )}
                required
              >
                <option value="">
                  {lang === "ar" ? "اختر الفئة" : "Select Category"}
                </option>
                {categories.map((cat) => (
                  <option key={cat.en} value={cat.en}>
                    {lang === "ar" ? cat.ar : cat.en}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={20}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-bluish/50 pointer-events-none"
              />
            </div>
            {renderFieldError("categoryEn")}
          </div>

          {/* Title Fields - Required */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-bluish">
                {lang === "ar" ? "العنوان (إنجليزي)" : "Title (English)"}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.titleEn}
                onChange={(e) => handleFormChange("titleEn", e.target.value)}
                onBlur={() => handleFieldBlur("titleEn")}
                className={getInputClassName(
                  "titleEn",
                  "w-full rounded-xl border border-bluish/30 bg-white px-4 py-3 text-bluish placeholder-bluish/40 transition-colors focus:border-bluish focus:outline-none focus:ring-2 focus:ring-bluish/20",
                )}
                placeholder="English Title"
                required
              />
              {renderFieldError("titleEn")}
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-bluish">
                {lang === "ar" ? "العنوان (عربي)" : "Title (Arabic)"}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.titleAr}
                onChange={(e) => handleFormChange("titleAr", e.target.value)}
                onBlur={() => handleFieldBlur("titleAr")}
                className={getInputClassName(
                  "titleAr",
                  "w-full rounded-xl border border-bluish/30 bg-white px-4 py-3 text-bluish placeholder-bluish/40 transition-colors focus:border-bluish focus:outline-none focus:ring-2 focus:ring-bluish/20 text-right",
                )}
                placeholder="العنوان العربي"
                dir="rtl"
                required
              />
              {renderFieldError("titleAr")}
            </div>
          </div>

          {/* Description Fields - Required */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-bluish">
                {lang === "ar" ? "الوصف (إنجليزي)" : "Description (English)"}{" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.descriptionEn}
                onChange={(e) =>
                  handleFormChange("descriptionEn", e.target.value)
                }
                onBlur={() => handleFieldBlur("descriptionEn")}
                className={getInputClassName(
                  "descriptionEn",
                  "h-24 sm:h-28 w-full rounded-xl border border-bluish/30 bg-white px-4 py-3 text-bluish placeholder-bluish/40 transition-colors focus:border-bluish focus:outline-none focus:ring-2 focus:ring-bluish/20 resize-none",
                )}
                placeholder="English Description"
                required
              />
              {renderFieldError("descriptionEn")}
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-bluish">
                {lang === "ar" ? "الوصف (عربي)" : "Description (Arabic)"}{" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.descriptionAr}
                onChange={(e) =>
                  handleFormChange("descriptionAr", e.target.value)
                }
                onBlur={() => handleFieldBlur("descriptionAr")}
                className={getInputClassName(
                  "descriptionAr",
                  "h-24 sm:h-28 w-full rounded-xl border border-bluish/30 bg-white px-4 py-3 text-bluish placeholder-bluish/40 transition-colors focus:border-bluish focus:outline-none focus:ring-2 focus:ring-bluish/20 resize-none text-right",
                )}
                placeholder="الوصف العربي"
                dir="rtl"
                required
              />
              {renderFieldError("descriptionAr")}
            </div>
          </div>

          {/* Detailed Description Fields - Required */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-bluish">
                {lang === "ar"
                  ? "الوصف التفصيلي (إنجليزي)"
                  : "Detailed Description (English)"}{" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.detailedDescriptionEn}
                onChange={(e) =>
                  handleFormChange("detailedDescriptionEn", e.target.value)
                }
                onBlur={() => handleFieldBlur("detailedDescriptionEn")}
                className={getInputClassName(
                  "detailedDescriptionEn",
                  "h-28 sm:h-32 w-full rounded-xl border border-bluish/30 bg-white px-4 py-3 text-bluish placeholder-bluish/40 transition-colors focus:border-bluish focus:outline-none focus:ring-2 focus:ring-bluish/20 resize-none",
                )}
                placeholder="English Detailed Description"
                required
              />
              {renderFieldError("detailedDescriptionEn")}
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-bluish">
                {lang === "ar"
                  ? "الوصف التفصيلي (عربي)"
                  : "Detailed Description (Arabic)"}{" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.detailedDescriptionAr}
                onChange={(e) =>
                  handleFormChange("detailedDescriptionAr", e.target.value)
                }
                onBlur={() => handleFieldBlur("detailedDescriptionAr")}
                className={getInputClassName(
                  "detailedDescriptionAr",
                  "h-28 sm:h-32 w-full rounded-xl border border-bluish/30 bg-white px-4 py-3 text-bluish placeholder-bluish/40 transition-colors focus:border-bluish focus:outline-none focus:ring-2 focus:ring-bluish/20 resize-none text-right",
                )}
                placeholder="الوصف التفصيلي العربي"
                dir="rtl"
                required
              />
              {renderFieldError("detailedDescriptionAr")}
            </div>
          </div>

          {/* Nav/URL Slug Field */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-bluish">
              {lang === "ar" ? "رابط المنتج (Nav)" : "Product URL Slug (Nav)"}
            </label>
            <input
              type="text"
              value={formData.nav}
              onChange={(e) =>
                onFormChange({
                  ...formData,
                  nav: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                })
              }
              className="w-full rounded-xl border border-bluish/30 bg-white px-4 py-3 text-bluish placeholder-bluish/40 transition-colors focus:border-bluish focus:outline-none focus:ring-2 focus:ring-bluish/20"
              placeholder="product-url-slug (auto-generated from title if empty)"
            />
            <p className="mt-1 text-xs text-bluish/50">
              {lang === "ar"
                ? "اترك فارغاً للتوليد التلقائي من العنوان"
                : "Leave empty to auto-generate from title"}
            </p>
          </div>
        </div>

        {/* Form Actions - Sticky on mobile */}
        <div className="sticky bottom-0 bg-white border-t border-bluish/10 p-4 sm:p-6">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border-2 border-bluish/30 px-4 py-3 font-semibold text-bluish transition-all hover:bg-bluish/10"
            >
              {lang === "ar" ? "إلغاء" : "Cancel"}
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-bluish px-4 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] active:scale-95"
            >
              {mode === "add"
                ? lang === "ar"
                  ? "إضافة"
                  : "Add"
                : lang === "ar"
                  ? "تحديث"
                  : "Update"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddEditModal;
