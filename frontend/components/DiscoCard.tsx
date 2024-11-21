import { FC } from "react";
import Link from "next/link";
import { Disco } from "../@types/types";
import Image from "next/image";

interface DiscoCardProps {
  disco: Disco;
}

const DiscoCard: FC<DiscoCardProps> = ({ disco }) => {
  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 container">
      <Image
        src={disco.capa}
        alt={disco.titulo}
        className="w-full h-64 object-cover"
        height={256}
        width={256}
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold truncate">{disco.titulo}</h2>
        <p className="text-sm text-gray-400">{disco.anoLancamento}</p>
        <p className="mt-2 text-sm">
          <span className="font-medium text-gray-300">Artista(s):</span>{" "}
          {disco.artistas && disco.artistas.length > 0
            ? disco.artistas.map((artista) => artista.artista.nome).join(", ")
            : "Desconhecido"}
        </p>
        <Link
          href={`/discos/${disco.id}`}
          className="mt-4 inline-block text-green-400 font-medium hover:text-green-300"
        >
          Ver detalhes
        </Link>
      </div>
    </div>
  );
};

export default DiscoCard;
