import Image from "next/image";

// components/HeroSection.js
export function HeroSection({ title, description, imageUrl }) {
    return (
      <section className="relative w-full h-[600px]">
        <div className="absolute inset-0">
          <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>
        <div className="relative container mx-auto py-24 px-6 lg:px-20 z-10">
          <div className="w-full max-w-lg">
            <h1 className="text-5xl font-bold mb-4">{title}</h1>
            <p className="text-lg mb-6">{description}</p>
            <div className="flex space-x-4">
              <button className="bg-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition">
                Watch now
              </button>
              <button className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition">
                Watch trailer
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }