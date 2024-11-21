import { FC } from "react";
import Link from "next/link";

const Header: FC = () => {
  return (
    <header className="bg-dark-900 text-light-100 shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link href="/" className="text-2xl font-bold text-green-400">
          Catálogo de Discos
        </Link>
        <nav className="flex space-x-6">
          <Link
            href="/discos"
            className="hover:text-green-400 transition-colors font-bold"
          >
            Discos
          </Link>
          <Link
            href="/artistas"
            className="hover:text-green-400 transition-colors font-bold"
          >
            Artistas
          </Link>
          <Link
            href="/generos"
            className="hover:text-green-400 transition-colors font-bold"
          >
            Gêneros
          </Link>
          <Link
            href="/buscar"
            className="hover:text-green-400 transition-colors font-bold"
          >
            Buscar
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
