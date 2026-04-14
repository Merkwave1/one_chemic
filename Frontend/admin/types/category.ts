export type CategoryEntity = {
  id: number;
  titleEn: string;
  titleAr: string;
  imagePath: string;
};

export type CategoryFormData = {
  titleEn: string;
  titleAr: string;
};

export type CategoryModalType = "add" | "edit" | "delete" | null;
