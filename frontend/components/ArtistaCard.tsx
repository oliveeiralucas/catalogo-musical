import { FC } from "react";
import Link from "next/link";
import { Artista } from "../@types/types";

interface ArtistaCardProps {
  artista: Artista;
}

const ArtistaCard: FC<ArtistaCardProps> = ({ artista }) => {
  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-md p-6 transition-transform transform hover:scale-105">
      <h2 className="text-2xl font-semibold truncate">{artista.nome}</h2>
      <p className="mt-3 text-sm text-gray-400">
        <span className="font-medium text-gray-300">Gêneros:</span>{" "}
        {artista.generos && artista.generos.length > 0
          ? artista.generos.map((g) => g.genero.nome).join(", ")
          : "Não especificado"}
      </p>
      <Link
        href={`/artistas/${artista.id}`}
        className="mt-4 inline-block text-green-400 font-medium hover:text-green-300"
      >
        Ver detalhes
      </Link>
    </div>
  );
};

export default ArtistaCard;
