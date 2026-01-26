"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Product, FormData, ModalType } from "@/types/product";
import { CATEGORIES } from "@/data/products";
import { useAtom } from "jotai";
import { tokenAtom, tokenTimestampAtom, isTokenExpired } from "@/atom/Auth";
import {
  AdminHeader,
  ProductCard,
  LoadingSpinner,
  EmptyState,
  ModalWrapper,
  AddEditModal,
  ViewModal,
  DeleteModal,
} from "@/components/admin";
import {
  ADD_PRODUCT_ENDPOINT,
  UPDATE_PRODUCT_ENDPOINT,
  DELETE_PRODUCT_ENDPOINT,
  PRODUCTS_ENDPOINT,
  IMAGE_BASE_URL,
} from "@/config/config";

const lang = "en"; // or 'ar' — you can lift this into props or state later

const AdminPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState<ModalType>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [token, setToken] = useAtom(tokenAtom);
  const [tokenTimestamp, setTokenTimestamp] = useAtom(tokenTimestampAtom);
  const hasFetched = useRef(false);

  // Auto-clear token if expired (60 minutes)
  useEffect(() => {
    if (token && tokenTimestamp && isTokenExpired(tokenTimestamp)) {
      setToken("");
      setTokenTimestamp(0);
    }
  }, [token, tokenTimestamp, setToken, setTokenTimestamp]);

  const [formData, setFormData] = useState<FormData>({
    titleEn: "",
    titleAr: "",
    descriptionEn: "",
    descriptionAr: "",
    detailedDescriptionEn: "",
    detailedDescriptionAr: "",
    categoryEn: "",
    categoryAr: "",
    nav: "",
  });

  // Fetch products from API - only once
  const fetchProducts = useCallback(async () => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    try {
      const response = await fetch(PRODUCTS_ENDPOINT);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched products:", data);
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const resetForm = () => {
    setFormData({
      titleEn: "",
      titleAr: "",
      descriptionEn: "",
      descriptionAr: "",
      detailedDescriptionEn: "",
      detailedDescriptionAr: "",
      categoryEn: "",
      categoryAr: "",
      nav: "",
    });
    setImagePreview("");
    setImageFile(null);
    setSelectedProduct(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal("add");
  };

  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    // Find the matching category from CATEGORIES to ensure exact match for dropdown
    const matchedCategory = CATEGORIES.find(
      (c) => c.en.toLowerCase() === product.categoryEn?.toLowerCase(),
    );
    setFormData({
      titleEn: product.titleEn,
      titleAr: product.titleAr,
      descriptionEn: product.descriptionEn,
      descriptionAr: product.descriptionAr,
      detailedDescriptionEn: product.detailedDescriptionEn,
      detailedDescriptionAr: product.detailedDescriptionAr,
      categoryEn: matchedCategory?.en || product.categoryEn || "",
      categoryAr: matchedCategory?.ar || product.categoryAr || "",
      nav: product.nav || "",
    });
    setImagePreview(
      product.imagePath ? `${IMAGE_BASE_URL}${product.imagePath}` : "",
    );
    setShowModal("edit");
  };

  const openViewModal = (product: Product) => {
    setSelectedProduct(product);
    setShowModal("view");
  };

  const openDeleteModal = (product: Product) => {
    setSelectedProduct(product);
    setShowModal("delete");
  };

  const handleCategoryChange = (categoryEn: string) => {
    const category = CATEGORIES.find((c) => c.en === categoryEn);
    if (category) {
      setFormData({
        ...formData,
        categoryEn: category.en,
        categoryAr: category.ar,
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create FormData for multipart/form-data (required by backend for file upload)
    const apiFormData = new window.FormData();
    apiFormData.append("TitleEn", formData.titleEn);
    apiFormData.append("TitleAr", formData.titleAr);
    apiFormData.append("DescriptionEn", formData.descriptionEn);
    apiFormData.append("DescriptionAr", formData.descriptionAr);
    apiFormData.append("DetailedDescriptionEn", formData.detailedDescriptionEn);
    apiFormData.append("DetailedDescriptionAr", formData.detailedDescriptionAr);
    apiFormData.append("CategoryEn", formData.categoryEn);
    apiFormData.append("CategoryAr", formData.categoryAr);
    // Use custom nav or generate from title
    apiFormData.append(
      "Nav",
      formData.nav || formData.titleEn.toLowerCase().replace(/\s+/g, "-"),
    );

    if (imageFile) {
      apiFormData.append("ImageFile", imageFile);
    }

    console.log(
      "Token being used:",
      token ? `${token.substring(0, 20)}...` : "NO TOKEN",
    );

    try {
      let response: Response;

      if (showModal === "edit" && selectedProduct) {
        response = await fetch(UPDATE_PRODUCT_ENDPOINT(selectedProduct.id), {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: apiFormData,
        });

        if (response.ok) {
          const updatedProduct = await response.json();
          console.log("Updated product:", updatedProduct);
          setProducts(
            products.map((p) =>
              p.id === selectedProduct.id ? updatedProduct : p,
            ),
          );
        } else {
          console.error(
            "Update failed:",
            response.status,
            await response.text(),
          );
        }
      } else {
        response = await fetch(ADD_PRODUCT_ENDPOINT, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: apiFormData,
        });

        if (response.ok) {
          const newProduct = await response.json();
          console.log("Added product:", newProduct);
          setProducts([...products, newProduct]);
        } else {
          console.error("Add failed:", response.status, await response.text());
        }
      }
    } catch (error) {
      console.error("Error saving product:", error);
    }

    closeModal();
  };

  const handleDelete = async () => {
    if (selectedProduct) {
      try {
        const response = await fetch(
          DELETE_PRODUCT_ENDPOINT(selectedProduct.id),
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.ok) {
          console.log("Deleted product:", selectedProduct.id);
          setProducts(products.filter((p) => p.id !== selectedProduct.id));
        } else {
          console.error("Delete failed:", response.status);
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
      closeModal();
    }
  };

  const closeModal = () => {
    setShowModal(null);
    setImagePreview("");
    setImageFile(null);
  };

  const handleEditFromView = () => {
    if (selectedProduct) {
      setShowModal(null);
      setTimeout(() => openEditModal(selectedProduct), 100);
    }
  };

  return (
    <div className="min-h-screen bg-bluish">
      {/* Header */}
      <AdminHeader
        lang={lang}
        totalProducts={products.length}
        onAddClick={openAddModal}
        disabled={loading}
      />

      {/* Loading State */}
      {loading ? (
        <LoadingSpinner lang={lang} />
      ) : (
        /* Grid */
        <section className="px-4 py-6 sm:px-6 md:px-8 md:py-8">
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                lang={lang}
                onView={() => openViewModal(product)}
                onEdit={() => openEditModal(product)}
                onDelete={() => openDeleteModal(product)}
                disabled={loading}
              />
            ))}
          </div>

          {products.length === 0 && (
            <EmptyState lang={lang} onAddClick={openAddModal} />
          )}
        </section>
      )}

      {/* Modals */}
      {showModal && (
        <ModalWrapper onClose={closeModal}>
          {(showModal === "add" || showModal === "edit") && (
            <AddEditModal
              lang={lang}
              mode={showModal}
              formData={formData}
              imagePreview={imagePreview}
              categories={CATEGORIES}
              onFormChange={setFormData}
              onImageChange={handleImageChange}
              onCategoryChange={handleCategoryChange}
              onSubmit={handleSubmit}
              onClose={closeModal}
            />
          )}

          {showModal === "view" && selectedProduct && (
            <ViewModal
              lang={lang}
              product={selectedProduct}
              onEdit={handleEditFromView}
              onClose={closeModal}
            />
          )}

          {showModal === "delete" && selectedProduct && (
            <DeleteModal
              lang={lang}
              product={selectedProduct}
              onConfirm={handleDelete}
              onClose={closeModal}
            />
          )}
        </ModalWrapper>
      )}
    </div>
  );
};

export default AdminPage;
