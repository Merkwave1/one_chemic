// Product type matching backend API response (camelCase from ASP.NET Core)
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

export type Category = {
  en: string;
  ar: string;
};

export type ModalType = "add" | "edit" | "view" | "delete" | null;

export type FormData = {
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  detailedDescriptionEn: string;
  detailedDescriptionAr: string;
  categoryEn: string;
  categoryAr: string;
  nav: string;
};
