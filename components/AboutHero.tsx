import React from 'react'
import Image from 'next/image'
interface AboutHeroProps {
  lang:"en" | "ar";
}

const AboutHero: React.FC<AboutHeroProps> = ({ lang }) => {

  return (
    <section className='relative  h-screen  bg-yellowish bg-cover bg-center flex flex-col gap-8 py-30 items-center px-2 '>
      <div className="absolute inset-0 bottom-0">
        <Image
          src="/about-hero-Picsart-Enhancer.png"
          alt="About OneChemic"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      <h1 className='text-bluish font-extrabold text-3xl md:text-5xl text-center'>
        About OneChemic
      </h1>
      <p className='text-bluish text-center max-w-4xl text-base md:text-xl'>
        Welcome to OneChemic, your premier partner in the chemical raw materials industry. Established in 2012, our journey began with a commitment 
        to providing unparalleled quality and service to the Egyptian market. Over nearly a decade,
        we have become a trusted name in the chemical industry.
      </p>
    </section>
  )
}

export default AboutHero
