import CatergoryCard from "@/components/CatergoryCard";
import {
  categories,
  solventsElements,
  polymersElements,
  chemicalAdditivesElements,
  preservativesElements,
  pigmentsFillersElements,
} from "@/data/data/categories"; // adjust path if needed

interface PageProps {
  params: { type: string };
  lang?: "en" | "ar"; // optional if using lang later
}

export async function generateStaticParams() {
  return categories.map((cat) => ({
    type: cat.nav,
  }));
}

const CategoryPage = async ({ params, lang = "en" }: PageProps) => {
  const { type } = await params;

  let elementsArray: typeof solventsElements = [];
  switch (type) {
    case "solvents":
      elementsArray = solventsElements;
      break;
    case "polymers":
      elementsArray = polymersElements;
      break;
    case "chemical-additives":
      elementsArray = chemicalAdditivesElements;
      break;
    case "chemical-preservatives":
      elementsArray = preservativesElements;
      break;
    case "pigments-fillers":
      elementsArray = pigmentsFillersElements;
      break;
    default:
      elementsArray = [];
  }

  if (!elementsArray.length) return <div>No elements found for this category.</div>;

  return (
    <section className="min-h-screen h-full grid grid-cols-1 gap-x-6 gap-y-6 p-16 md:grid-cols-3 border-t-2 border-yellowish bg-bluish">
      {elementsArray.map((el) => (
        <CatergoryCard
          key={el.nav}
          lang={lang}
          title={el.title[lang]} // picks EN or AR
          description={el.description[lang]}
          imagePath={el.imagePath}
          nav={`/categories/${type}/${el.id}`} // dynamic route for element page
        />
      ))}
    </section>
  );
};

export default CategoryPage;
