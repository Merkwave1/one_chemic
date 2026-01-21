import React from 'react'
import CatergoryCard from '@/components/CatergoryCard'

export const categories = [
  {
    title: "Solvents",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    imagePath: "/solvents.webp", 
    nav: "/categories/solvents"
  },
  {
    title: "Polymers",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    imagePath: "/polymers.webp",
    nav: "/categories/polymers"
  },
  {
    title: "Chemical Additives",
    description: "Chemical Additives and processing Aids. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imagePath: "/chemicalAddtives.webp",
    nav: "/categories/chemical-additives"
  },
  {
    title: "Chemical Preservatives",
    description: "Preservatives and chemical processing. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imagePath: "/preservatives.webp",
    nav: "/categories/chemical-preservatives"
  },
  {
    title: "Pigments and Fillers",
    description: "Pigments and fillers. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imagePath: "/Fillers.webp",
    nav: "/categories/pigments-fillers"
  }
];

type PageProps = {
  params: {
    lang: "en" | "ar";
  };
};


const page: React.FC<PageProps> = async ({ params }) => {
  const { lang } = await params; 
  return (
    <section className='h-full grid grid-cols-1  gap-x-6 gap-y-6  p-16 md:grid-cols-3  border-t-2 border-yellowish  bg-bluish'>
        {categories.map((cat) => (
        <CatergoryCard
          key={cat.title}
          lang={lang}
          title={cat.title}
          description={cat.description}
          imagePath={cat.imagePath}
          nav={cat.nav}
        />
      ))}
    </section>
  )
}

export default page
