"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  MapPin,
  ShoppingCart,
  Building,
  CheckCircle,
  XCircle,
} from "lucide-react";
import ContactDropdown from "@/components/ContactDropdown";
import { CLIENT_ENDPOINT } from "@/config/config";

interface PageProps {
  params: { lang: "en" | "ar" };
}

interface FormData {
  fullName: string;
  company: string;
  email: string;
  subject: string;
  message: string;
}

const ContactPage: React.FC<PageProps> = ({ params }) => {
  const [resolvedParams, setResolvedParams] = useState<{
    lang: "en" | "ar";
  } | null>(null);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    company: "",
    email: "",
    subject: "Sales Inquiry",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params;
      setResolvedParams(resolved);
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (submitStatus.type) {
      const timer = setTimeout(() => {
        setSubmitStatus({ type: null, message: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubjectChange = useCallback((subject: string) => {
    setFormData((prev) => ({ ...prev, subject }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch(CLIENT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          company: formData.company,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus({
          type: "success",
          message:
            resolvedParams?.lang === "ar"
              ? "تم إرسال رسالتك بنجاح! سنتواصل معك قريباً."
              : "Message sent successfully! We'll get back to you soon.",
        });
        setFormData({
          fullName: "",
          company: "",
          email: "",
          subject: "Sales Inquiry",
          message: "",
        });
      } else {
        throw new Error(result.message || "Failed to send message");
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          resolvedParams?.lang === "ar"
            ? "حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى."
            : "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!resolvedParams) {
    return <div>Loading...</div>;
  }

  const { lang } = resolvedParams;
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

            {/* Success/Error Messages */}
            {submitStatus.type && (
              <div
                className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                  submitStatus.type === "success"
                    ? "bg-green-100 text-green-800 border border-green-300"
                    : "bg-red-100 text-red-800 border border-red-300"
                }`}
              >
                {submitStatus.type === "success" ? (
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 flex-shrink-0" />
                )}
                <span className="text-sm md:text-base">
                  {submitStatus.message}
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {isArabic ? "الاسم الكامل" : "Full Name"}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    placeholder={isArabic ? "اسمك" : "John Doe"}
                    className="w-full px-4 py-3 rounded border border-slate-200 focus:ring-primary focus:border-primary transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {isArabic ? "الشركة" : "Company"}
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      handleInputChange("company", e.target.value)
                    }
                    placeholder={isArabic ? "شركتك" : "Your Industries Ltd."}
                    className="w-full px-4 py-3 rounded border border-slate-200 focus:ring-primary focus:border-primary transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {isArabic ? "البريد الإلكتروني" : "Email Address"}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder={
                    isArabic ? "بريدك الإلكتروني" : "john@company.com"
                  }
                  className="w-full px-4 py-3 rounded border border-slate-200 focus:ring-primary focus:border-primary transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {isArabic ? "الموضوع" : "Subject"}
                </label>
                <ContactDropdown
                  isArabic={isArabic}
                  onSubjectChange={handleSubjectChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {isArabic ? "رسالتك" : "Your Message"}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder={
                    isArabic ? "كيف يمكننا مساعدتك؟" : "How can we help you?"
                  }
                  className="w-full px-4 py-3 rounded border border-slate-200 focus:ring-primary focus:border-primary transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`self-center px-4 md:px-12 py-2 rounded-lg transition-transform duration-300 ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-yellowish hover:scale-110 cursor-pointer shadow-[0_0_32px_rgba(248,147,31,1)]"
                }`}
              >
                {isSubmitting
                  ? isArabic
                    ? "جارٍ الإرسال..."
                    : "Sending..."
                  : isArabic
                    ? "إرسال الرسالة"
                    : "Send Message"}
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

export default ContactPage;
