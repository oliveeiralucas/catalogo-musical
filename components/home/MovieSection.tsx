import Image from "next/image";
import Link from "next/link";

export function MovieSection({ title, movies, viewMoreLink }) {
    return (
      <section className="container mx-auto py-12 px-6 lg:px-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          <Link href={viewMoreLink}>
            <p className="text-red-600 hover:underline">View more</p>
          </Link>
        </div>
        <div className="flex space-x-6 overflow-x-auto scrollbar-hide">
          {movies.map((movie) => (
            <div key={movie.id} className="min-w-[200px]">
              <div className="w-[200px] h-[300px] relative mb-3">
                <Image
                  src={movie.imageUrl}
                  alt={movie.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <h3 className="text-lg font-semibold">{movie.title}</h3>
              <p className="text-sm text-gray-400">{movie.year}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }