import Image from "next/image";

interface ProjectHeroProps {
  title: string;
  imageUrl: string;
}

export default function ProjectHero({ title, imageUrl }: ProjectHeroProps) {
  return (
    <section className="relative h-[800px] md:h-[900px] bg-base-200 -mt-[100px]">
      <div className="relative w-full h-full">
        <Image src={imageUrl} alt={title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{title}</h1>
          </div>
        </div>
      </div>
    </section>
  );
}
