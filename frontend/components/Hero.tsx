import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

const Hero: FC = () => {
  return (
    <section className="bg-black py-12 sm:py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Texto */}
          <div>
            <p className="text-sm font-semibold tracking-wide text-green-400 uppercase">
              Sua coleção de música
            </p>
            <h1 className="mt-4 text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
              Explore e descubra novos sons
            </h1>
            <p className="mt-6 text-lg text-gray-400 sm:text-xl lg:mt-8">
              Aprofunde-se em nossa vasta coleção de discos e crie sua própria
              trilha sonora.
            </p>

            <Link
              href="/discos"
              role="button"
              className="inline-flex items-center px-6 py-3 mt-8 text-lg font-medium text-black bg-green-400 rounded-full shadow-lg hover:bg-green-500 focus:ring-2 focus:ring-offset-2 focus:ring-green-400 lg:mt-12"
            >
              Comece Agora
              <svg
                className="w-6 h-6 ml-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </Link>
          </div>

          {/* Imagem */}
          <div>
            <Image
              className="rounded-lg shadow-lg"
              src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/1/hero-img.png"
              alt="Herói"
              width={800}
              height={800}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
