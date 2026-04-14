"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  CategoryEntity,
  CategoryFormData,
  CategoryModalType,
} from "@/types/category";
import { useAtom } from "jotai";
import { tokenAtom, tokenTimestampAtom, isTokenExpired } from "@/atom/Auth";
import {
  CATEGORIES_ENDPOINT,
  ADD_CATEGORY_ENDPOINT,
  UPDATE_CATEGORY_ENDPOINT,
  DELETE_CATEGORY_ENDPOINT,
  IMAGE_BASE_URL,
} from "@/config/config";
import { ModalWrapper } from "@/components/admin";
import { Plus, X, Trash2, Edit2, Package, AlertCircle } from "lucide-react";

const lang = "en";

const CategoriesTab: React.FC = () => {
  const [categories, setCategories] = useState<CategoryEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState<CategoryModalType>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryEntity | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [token] = useAtom(tokenAtom);
  const [tokenTimestamp] = useAtom(tokenTimestampAtom);
  const hasFetched = useRef(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<CategoryFormData>({
    titleEn: "",
    titleAr: "",
  });
  const [errors, setErrors] = useState<Partial<CategoryFormData>>({});

  const fetchCategories = useCallback(async () => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    try {
      const response = await fetch(CATEGORIES_ENDPOINT);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const resetForm = () => {
    setFormData({ titleEn: "", titleAr: "" });
    setImagePreview("");
    setImageFile(null);
    setSelectedCategory(null);
    setErrors({});
  };

  const openAddModal = () => {
    resetForm();
    setShowModal("add");
  };

  const openEditModal = (cat: CategoryEntity) => {
    setSelectedCategory(cat);
    setFormData({ titleEn: cat.titleEn, titleAr: cat.titleAr });
    setImagePreview(cat.imagePath ? `${IMAGE_BASE_URL}${cat.imagePath}` : "");
    setShowModal("edit");
  };

  const openDeleteModal = (cat: CategoryEntity) => {
    setSelectedCategory(cat);
    setShowModal("delete");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CategoryFormData> = {};
    if (!formData.titleEn.trim()) newErrors.titleEn = "English title is required";
    if (!formData.titleAr.trim()) newErrors.titleAr = "Arabic title is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const apiFormData = new window.FormData();
    apiFormData.append("TitleEn", formData.titleEn);
    apiFormData.append("TitleAr", formData.titleAr);
    if (imageFile) apiFormData.append("ImageFile", imageFile);

    try {
      let response: Response;
      if (showModal === "edit" && selectedCategory) {
        response = await fetch(UPDATE_CATEGORY_ENDPOINT(selectedCategory.id), {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: apiFormData,
        });
        if (response.ok) {
          const updated = await response.json();
          setCategories(categories.map((c) => (c.id === selectedCategory.id ? updated : c)));
        } else {
          console.error("Update failed:", response.status, await response.text());
        }
      } else {
        response = await fetch(ADD_CATEGORY_ENDPOINT, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: apiFormData,
        });
        if (response.ok) {
          const newCat = await response.json();
          setCategories([...categories, newCat]);
        } else {
          console.error("Add failed:", response.status, await response.text());
        }
      }
    } catch (error) {
      console.error("Error saving category:", error);
    }
    closeModal();
  };

  const handleDelete = async () => {
    if (!selectedCategory) return;
    try {
      const response = await fetch(DELETE_CATEGORY_ENDPOINT(selectedCategory.id), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        setCategories(categories.filter((c) => c.id !== selectedCategory.id));
      } else {
        console.error("Delete failed:", response.status);
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
    closeModal();
  };

  const closeModal = () => {
    setShowModal(null);
    setImagePreview("");
    setImageFile(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-yellowish border-t-transparent"></div>
          <p className="text-white/70">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-yellowish shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 py-4 sm:px-6 md:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-bluish">
              <Package className="h-6 w-6 text-yellowish" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-bluish">
                Category Management
              </h1>
              <p className="text-xs sm:text-sm text-bluish/70">
                Total Categories: {categories.length}
              </p>
            </div>
          </div>
          <button
            onClick={openAddModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-bluish px-4 sm:px-6 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105 active:scale-95"
          >
            <Plus size={20} />
            <span>Add Category</span>
          </button>
        </div>
      </header>

      {/* Grid */}
      <section className="px-4 py-6 sm:px-6 md:px-8 md:py-8">
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((cat) => {
            const imageUrl = cat.imagePath
              ? cat.imagePath.startsWith("http")
                ? cat.imagePath
                : `${IMAGE_BASE_URL}${cat.imagePath}`
              : "";
            return (
              <div
                key={cat.id}
                className="group rounded-2xl bg-white overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-yellowish/20 hover:-translate-y-1"
              >
                <div className="relative h-40 sm:h-48 overflow-hidden bg-gray-100">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={cat.titleEn}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-400">
                      <Package size={48} />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-base sm:text-lg font-bold text-bluish line-clamp-1">
                    {cat.titleEn}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500" dir="rtl">
                    {cat.titleAr}
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => openEditModal(cat)}
                      className="flex items-center justify-center gap-1 rounded-lg bg-yellowish/20 px-2 py-2 text-xs sm:text-sm font-medium text-yellowish transition-all hover:bg-yellowish hover:text-white"
                    >
                      <Edit2 size={14} />
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                    <button
                      onClick={() => openDeleteModal(cat)}
                      className="flex items-center justify-center gap-1 rounded-lg bg-red-100 px-2 py-2 text-xs sm:text-sm font-medium text-red-600 transition-all hover:bg-red-600 hover:text-white"
                    >
                      <Trash2 size={14} />
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {categories.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <Package size={64} className="text-white/30 mb-4" />
            <p className="text-white/60 text-lg">No categories yet</p>
            <button
              onClick={openAddModal}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-yellowish px-6 py-3 font-semibold text-bluish transition-all hover:scale-105"
            >
              <Plus size={20} />
              Add your first category
            </button>
          </div>
        )}
      </section>

      {/* Modals */}
      {showModal && (showModal === "add" || showModal === "edit") && (
        <ModalWrapper onClose={closeModal}>
          <div className="sticky top-0 z-10 flex items-center justify-between bg-yellowish px-4 sm:px-6 py-4">
            <h2 className="text-lg sm:text-xl font-bold text-bluish">
              {showModal === "add" ? "Add New Category" : "Edit Category"}
            </h2>
            <button
              onClick={closeModal}
              className="rounded-full bg-bluish/10 p-2 text-bluish transition-colors hover:bg-bluish hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
            <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
              {/* Image Upload */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-bluish">
                  Image (Optional)
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
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
                      <p className="text-xs text-bluish/60">Click to change image</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <div className="rounded-full bg-bluish/10 p-3">
                        <Plus size={24} className="text-bluish" />
                      </div>
                      <p className="text-sm font-medium text-bluish">Choose an image</p>
                    </div>
                  )}
                </button>
              </div>

              {/* Title Fields */}
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-bluish">
                    Title (English) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.titleEn}
                    onChange={(e) =>
                      setFormData({ ...formData, titleEn: e.target.value })
                    }
                    className={`w-full rounded-xl border ${errors.titleEn ? "border-red-500" : "border-bluish/30"} bg-white px-4 py-3 text-bluish placeholder-bluish/40 transition-colors focus:border-bluish focus:outline-none focus:ring-2 focus:ring-bluish/20`}
                    placeholder="English Title"
                    required
                  />
                  {errors.titleEn && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.titleEn}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-bluish">
                    Title (Arabic) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.titleAr}
                    onChange={(e) =>
                      setFormData({ ...formData, titleAr: e.target.value })
                    }
                    className={`w-full rounded-xl border ${errors.titleAr ? "border-red-500" : "border-bluish/30"} bg-white px-4 py-3 text-bluish placeholder-bluish/40 transition-colors focus:border-bluish focus:outline-none focus:ring-2 focus:ring-bluish/20 text-right`}
                    placeholder="العنوان العربي"
                    dir="rtl"
                    required
                  />
                  {errors.titleAr && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.titleAr}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="sticky bottom-0 bg-white border-t border-bluish/10 p-4 sm:p-6">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 rounded-xl border-2 border-bluish/30 px-4 py-3 font-semibold text-bluish transition-all hover:bg-bluish/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-bluish px-4 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl active:scale-95"
                >
                  {showModal === "add" ? "Add Category" : "Save Changes"}
                </button>
              </div>
            </div>
          </form>
        </ModalWrapper>
      )}

      {showModal === "delete" && selectedCategory && (
        <ModalWrapper onClose={closeModal}>
          <div className="sticky top-0 z-10 flex items-center justify-between bg-red-500 px-4 sm:px-6 py-4">
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Delete Category
            </h2>
            <button
              onClick={closeModal}
              className="rounded-full bg-white/20 p-2 text-white transition-colors hover:bg-white/30"
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="text-center py-6">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <Trash2 size={32} className="text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-bluish mb-2">Are you sure?</h3>
              <p className="text-bluish/70">
                Do you want to delete &quot;{selectedCategory.titleEn}&quot;?
              </p>
              <p className="mt-2 text-sm text-red-600">
                This action cannot be undone.
              </p>
            </div>
          </div>
          <div className="sticky bottom-0 bg-white border-t border-bluish/10 p-4 sm:p-6">
            <div className="flex gap-3">
              <button
                onClick={closeModal}
                className="flex-1 rounded-xl border-2 border-bluish/30 px-4 py-3 font-semibold text-bluish transition-all hover:bg-bluish/10"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 rounded-xl bg-red-600 px-4 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:bg-red-700 active:scale-95"
              >
                Delete
              </button>
            </div>
          </div>
        </ModalWrapper>
      )}
    </>
  );
};

export default CategoriesTab;
