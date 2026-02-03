"use client";
import { Listbox } from "@headlessui/react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const subjectOptions = [
  { id: 1, labelEn: "Sales Inquiry", labelAr: "استفسار مبيعات" },
  { id: 2, labelEn: "Technical Support", labelAr: "الدعم الفني" },
  { id: 3, labelEn: "Logistics & Supply Chain", labelAr: "اللوجستيات وسلسلة الإمداد" },
  { id: 4, labelEn: "Management", labelAr: "الإدارة" },
];

export default function ContactDropdown({ isArabic }: { isArabic: boolean }) {
  const [selected, setSelected] = useState(subjectOptions[0]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative">
        {/* Dropdown button with arrow */}
        <Listbox.Button className="w-full px-4 py-3 rounded border border-slate-200 dark:bg-slate-700 dark:border-slate-600 focus:ring-primary focus:border-primary transition-all flex justify-between items-center">
          <span>{isArabic ? selected.labelAr : selected.labelEn}</span>
          <ChevronDown className="w-5 h-5 text-slate-500" />
        </Listbox.Button>

        {/* Options menu */}
        <Listbox.Options className="absolute mt-1 w-full bg-white rounded-md shadow-lg z-10 overflow-hidden">
          {subjectOptions.map((option) => (
            <Listbox.Option
              key={option.id}
              value={option}
              className={({ active }) =>
                `cursor-pointer select-none px-4 py-2 ${
                  active ? "bg-yellow-400 text-black" : "text-black"
                }`
              }
            >
              {isArabic ? option.labelAr : option.labelEn}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}