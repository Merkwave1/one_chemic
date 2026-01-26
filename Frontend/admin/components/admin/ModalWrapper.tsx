import React from "react";

interface ModalWrapperProps {
  children: React.ReactNode;
  onClose: () => void;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="min-h-screen px-0 sm:px-4 flex items-start sm:items-center justify-center">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal Container - Full screen on mobile */}
        <div className="relative w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-2xl sm:my-8 bg-white sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalWrapper;
