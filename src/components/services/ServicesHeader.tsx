
import { Reveal } from "@/components/home/reveal";

const ServicesHeader = () => {
  return (
    <section className="text-center">
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-rose-700">
          Find Your Perfect Match
        </p>

        <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-[#172033] md:text-5xl">
          Explore Wedding Services
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600">
          Discover talented wedding professionals who can bring
          your dream celebration to life.
        </p>
      </Reveal>
    </section>
  );
};

export default ServicesHeader;
