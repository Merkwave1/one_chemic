import AboutHero from '@/components/AboutHero'
import AboutSection from '@/components/AboutSection';
import React from 'react'
import AboutCards from '@/components/AboutCards';

type PageProps = {
  params: {
    lang: "en" | "ar";
  };
};
const page: React.FC<PageProps> = async ({ params }: PageProps) => {
  const { lang } = await params; 
  return (
    <>
      <AboutHero lang={lang} />
      <AboutSection lang={lang} />
      <AboutCards lang={lang} />
    </>
  )
}

export default page
