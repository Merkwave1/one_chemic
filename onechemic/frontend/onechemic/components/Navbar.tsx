"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

interface NavbarProps {
  lang: "en" | "ar";
}

const Navbar = ({ lang = "en" }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isArabic = lang === "ar";
  const pathname = usePathname()!;
  const otherLang = isArabic ? "en" : "ar";

  // Replace only the first lang segment
  const otherLangPath = pathname.replace(/^\/(en|ar)/, `/${otherLang}`);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navigation = [
    { name: isArabic ? "الرئيسية" : "Home", href: `/${lang}` },
    { name: isArabic ? "من نحن" : "About", href: `/${lang}/about` },
    { name: isArabic ? "الأقسام" : "Categories", href: `/${lang}/categories` },
    { name: isArabic ? "اتصل بنا" : "Contact", href: `/${lang}/contact` },
  ];
  useEffect(() => {
  if (!isOpen) return;

  const handleScroll = () => {
    setIsOpen(false);
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, [isOpen]);


  return (
    <nav
      className="w-full h-19 bg-bluish text-yellowish relative z-50"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <Link href={`/${lang}`} className="group shrink-0 z-50">
            <Image
              src="/icon.svg"
              alt="One Chemic Logo"
              width={150}
              height={40}
              className="object-cover transform group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg"
              priority
            />
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex gap-6">
            {navigation.map((item) => {
              const isActive = mounted && pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`transition-colors duration-300 ${
                      isActive
                        ? "underline underline-offset-8 text-lg decoration-yellowish text-white"
                        : "text-white hover:text-gray-200"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop Language Switcher */}
          <div className="hidden md:block">
            <Link
              href={otherLangPath}
              className="px-3 py-1 border border-yellowish rounded hover:bg-yellowish hover:text-bluish transition-colors duration-300"
            >
              {isArabic ? "EN" : "العربية"}
            </Link>
          </div>

          {/* Mobile Hamburger Menu */}
          <button
            className="md:hidden z-50 p-2 text-white hover:text-yellowish transition-colors duration-300"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed left-0 right-0 top-17.5 transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-bluish/95 backdrop-blur-md shadow-2xl border-t border-yellowish/20">
            <div className="space-y-2 py-4">
              {navigation.map((item) => {
                const isActive = mounted && pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center py-3 px-6 text-white hover:text-yellowish hover:bg-yellowish/10 transition-all duration-300 font-medium ${
                      isActive ? "text-yellowish bg-yellowish/10" : ""
                    }`}
                    style={{
                      borderLeft:
                        isActive && !isArabic
                          ? "4px solid #fbbf24"
                          : "4px solid transparent",
                      borderRight:
                        isActive && isArabic
                          ? "4px solid #fbbf24"
                          : "4px solid transparent",
                    }}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}

              {/* Mobile Language Switcher */}
              <div className="px-6 py-4">
                <Link
                  href={otherLangPath}
                  className="block w-full text-center px-4 py-2 border border-yellowish rounded hover:bg-yellowish hover:text-bluish transition-colors duration-300 text-white"
                  onClick={() => setIsOpen(false)}
                >
                  {isArabic ? "EN" : "العربية"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
