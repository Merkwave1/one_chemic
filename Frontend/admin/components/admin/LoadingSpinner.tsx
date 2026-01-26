import React from "react";

interface LoadingSpinnerProps {
  lang: "en" | "ar";
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ lang }) => {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-yellowish border-t-transparent"></div>
        <p className="text-white/70">
          {lang === "ar" ? "جاري التحميل..." : "Loading..."}
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
