"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Artista, Genero, Disco } from "../../../@types/types";

interface ArtistaDetalhes extends Artista {
  generos: {
    genero: Genero;
  }[];
  discos: {
    disco: Disco;
  }[];
}

const ArtistaDetalhesPage = () => {
  const [artista, setArtista] = useState<ArtistaDetalhes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchArtista = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/artistas/${id}`
        );
        setArtista(response.data);
      } catch (error) {
        console.error("Erro ao buscar artista:", error);
        setError("Não foi possível carregar os detalhes do artista.");
      } finally {
        setLoading(false);
      }
    };

    fetchArtista();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-400">Carregando...</p>;
  }

  if (error || !artista) {
    return (
      <p className="text-center text-red-500">
        {error || "Artista não encontrado."}
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-10 px-6">
      <h1 className="text-4xl font-extrabold mb-8 text-center">
        {artista.nome}
      </h1>

      {/* Gêneros Musicais */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Gêneros Musicais</h2>
        {artista.generos.length > 0 ? (
          <ul className="space-y-4">
            {artista.generos.map((item) => (
              <li key={item.genero.id}>
                <Link
                  href={`/generos/${item.genero.id}`}
                  className="text-green-400 hover:text-green-300"
                >
                  {item.genero.nome}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">
            Nenhum gênero associado a este artista.
          </p>
        )}
      </div>

      {/* Discos Associados */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Discos</h2>
        {artista.discos.length > 0 ? (
          <ul className="space-y-4">
            {artista.discos.map((item) => (
              <li key={item.disco.id}>
                <Link
                  href={`/discos/${item.disco.id}`}
                  className="text-blue-400 hover:text-blue-300"
                >
                  {item.disco.titulo}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">
            Este artista não possui discos associados.
          </p>
        )}
      </div>
    </div>
  );
};

export default ArtistaDetalhesPage;
