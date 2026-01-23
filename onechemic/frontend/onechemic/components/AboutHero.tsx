import React from 'react'
import Image from 'next/image'
interface AboutHeroProps {
  lang:"en" | "ar";
}

const content = {
  en: {
    title: "About OneChemic",
    description: `Welcome to OneChemic, your premier partner in the chemical raw materials industry.
    Established in 2012, our journey began with a commitment to providing unparalleled quality and service
    to the Egyptian market. Over nearly a decade, we have become a trusted name in the chemical industry.`,
  },
  ar: {
    title: "عن ون كيميك",
    description: `مرحبًا بكم في ون كيميك، شريككم الموثوق في مجال المواد الخام الكيميائية.
    تأسست شركتنا عام 2012، وبدأت رحلتنا بالتزام قوي بتقديم أعلى مستويات الجودة والخدمة
    للسوق المصري. وعلى مدار ما يقرب من عقد من الزمن، أصبحنا اسمًا موثوقًا في صناعة الكيماويات.`,
  },
};

const AboutHero: React.FC<AboutHeroProps> = ({ lang }) => {
  const { title, description } = content[lang];
  return (
    <section className='relative  h-screen  bg-yellowish bg-cover bg-center flex flex-col gap-8 py-2 sm:py-12 md:py-30 items-center px-2 '>
      <div className="absolute inset-0 bottom-0">
        <Image
          src="/about-hero-Picsart-Enhancer.webp"
          alt="About OneChemic"
          fill
          className="object-cover object-center"
          priority
          sizes="(max-width: 1920px) 100vw, 1920px"
          placeholder="blur"
          blurDataURL="/about-hero-Picsart-Enhancer.webp"
        />
      </div>

      <h1 className='text-bluish font-extrabold text-3xl md:text-5xl text-center'>
        {title}
      </h1>
      <p className='text-bluish text-center max-w-4xl text-base md:text-xl'>
        {description}
      </p>
    </section>
  )
}

export default AboutHero
