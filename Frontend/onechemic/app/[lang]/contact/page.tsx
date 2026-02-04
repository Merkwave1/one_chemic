import React from "react";
import { MapPin, ShoppingCart, Building } from "lucide-react";
import ContactDropdown from "@/components/ContactDropdown";

interface PageProps {
  params: { lang: "en" | "ar" };
}

const page: React.FC<PageProps> = async ({ params }) => {
  const { lang } = await params;
  const isArabic = lang === "ar";

  return (
    <main className={`scroll-smooth ${isArabic ? "rtl" : "ltr"}`}>
      {/* Hero Section */}
      <header className="bg-[#0A1128] py-20 px-6 md:px-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-navy/50 pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 uppercase tracking-tight">
            {isArabic ? "تواصل " : "Get in "}{" "}
            <span className="text-yellowish">
              {isArabic ? "معنا" : "Touch"}
            </span>
          </h1>
          <p className="text-lg text-slate-300 max-w-4xl mx-auto leading-relaxed">
            {isArabic
              ? "شريكك الموثوق في صناعة المواد الكيميائية الخام. نحن هنا لدعم نجاحك."
              : "Your premier partner in the chemical raw materials industry. Whether you have a specific requirement or need technical advice, our team is here to support your success."}
          </p>
        </div>
      </header>

      {/* Contact Form + Info Panel */}
      <section className="max-w-7xl mx-auto px-2 md:px-12 bg-transparent -mt-10 mb-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 shadow-2xl rounded-xl overflow-hidden">
          {/* Contact Form */}
          <div className="bg-white  p-8 md:p-12">
            <h2 className="text-xl md:text-3xl font-bold mb-8 text-black text-center">
              {isArabic ? "أرسل لنا رسالة" : "Send us a message"}
            </h2>
            <form className="space-y-6 flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700  mb-2">
                    {isArabic ? "الاسم الكامل" : "Full Name"}
                  </label>
                  <input
                    type="text"
                    placeholder={isArabic ? "اسمك" : "John Doe"}
                    className="w-full px-4 py-3 rounded border border-slate-200   focus:ring-primary focus:border-primary transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700  mb-2">
                    {isArabic ? "الشركة" : "Company"}
                  </label>
                  <input
                    type="text"
                    placeholder={isArabic ? "شركتك" : "Your Industries Ltd."}
                    className="w-full px-4 py-3 rounded border border-slate-200   focus:ring-primary focus:border-primary transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700  mb-2">
                  {isArabic ? "البريد الإلكتروني" : "Email Address"}
                </label>
                <input
                  type="email"
                  placeholder={
                    isArabic ? "بريدك الإلكتروني" : "john@company.com"
                  }
                  className="w-full px-4 py-3 rounded border border-slate-200   focus:ring-primary focus:border-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700  mb-2">
                  {isArabic ? "الموضوع" : "Subject"}
                </label>
                <ContactDropdown isArabic={isArabic} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700  mb-2">
                  {isArabic ? "رسالتك" : "Your Message"}
                </label>
                <textarea
                  rows={5}
                  placeholder={
                    isArabic ? "كيف يمكننا مساعدتك؟" : "How can we help you?"
                  }
                  className="w-full px-4 py-3 rounded border border-slate-200   focus:ring-primary focus:border-primary transition-all"
                />
              </div>
              <button
                type="submit"
                className="bg-yellowish self-center hover:scale-110 transition-transform duration-300 cursor-pointer px-4 md:px-12 py-2 shadow-[0_0_32px_rgba(248,147,31,1)]  rounded-lg"
              >
                {isArabic ? "إرسال الرسالة" : "Send Message"}
              </button>
            </form>
          </div>

          {/* Info Panel */}
          <div className="bg-yellowish py-8 px-8 md:p-12 flex flex-col justify-between">
            <div>
              <h2 className="text-xl md:text-3xl text-center font-bold mb-10">
                {isArabic ? "معلومات التواصل" : "Contact Information"}
              </h2>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-bluish p-3 rounded-xl">
                    <MapPin className="text-yellowish" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-navy text-lg">
                      {isArabic ? "عنوان المكتب" : "Office Address"}
                    </h3>
                    <p className="text-sm md:text-base font-medium">
                      Alexandria Agricultural Slow Road, Qalyoub, Qalyoubia,
                      Egypt
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-bluish p-3 rounded-xl">
                    <ShoppingCart className="text-yellowish" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-navy text-lg">
                      {isArabic ? "قسم المبيعات" : "Sales Department"}
                    </h3>
                    <p
                      dir="ltr"
                      className={`text-sm md:text-base font-medium ${
                        lang === "ar" ? "text-right" : "text-left"
                      }`}                
                    >
                      (+20) 10 30 20 7156
                    </p>
                    <p
                      dir="ltr"
                      className={`text-sm md:text-base font-medium ${
                        lang === "ar" ? "text-right" : "text-left"
                      }`}                
                    >
                      (+20) 10 30 20 2219
                    </p>
                    <p className="text-sm md:text-base font-medium">
                      sales@onechemic.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-bluish p-3 rounded-xl">
                    <Building className="text-yellowish" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-navy text-lg">
                      {isArabic ? "الإدارة" : "Management"}
                    </h3>
                    <p
                      dir="ltr"
                      className={`text-sm md:text-base font-medium ${
                        lang === "ar" ? "text-right" : "text-left"
                      }`}                
                    >
                      (+20) 10 30 20 7156
                    </p>
                    <p className="text-sm md:text-base font-medium">
                      info@onechemic.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
