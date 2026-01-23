import HeroHome from '@/components/HeroHome'
import CardsSection from '@/components/CardsSection';
import RepeatedSection from "@/components/RepeatedSection"
import LocationSection from '@/components/LocationSection';
import OurPartners from '@/components/OurPartners';

export const dynamicParams = false;

export const generateStaticParams = () => [
  { lang: "en" },
  { lang: "ar" },
];

interface PageProps {
  params: { lang: "en" | "ar" };
}


const Page = async ({ params }: PageProps) => {
  const { lang } = await params; 

  return (
    <>
      <HeroHome lang={lang} rtl={lang === 'ar' ? 'rtl' : 'ltr'} />

      <CardsSection lang={lang} />
      <RepeatedSection lang={lang} />
      <LocationSection lang={lang} />
      <OurPartners lang={lang} />
    </>
  );
};

export default Page;
