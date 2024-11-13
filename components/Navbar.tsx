import Link from "next/link";

export function Navbar() {
    return (
      <nav className="bg-gray-900 py-4">
        <div className="container mx-auto px-6 lg:px-20 flex justify-between items-center">
          <div className="text-2xl font-bold text-white">tMovies</div>
          <div className="space-x-6">
            <Link href="/">
              <p className="text-white hover:text-red-600 transition">Home</p>
            </Link>
            <Link href="/movies">
              <p className="text-white hover:text-red-600 transition">Movies</p>
            </Link>
            <Link href="/tv-series">
              <p className="text-white hover:text-red-600 transition">TV Series</p>
            </Link>
          </div>
        </div>
      </nav>
    );
  }