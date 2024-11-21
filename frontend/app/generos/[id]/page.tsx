"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Genero, Artista, Disco } from "../../../@types/types";

interface GeneroDetalhes extends Genero {
  artistas: {
    artista: Artista;
  }[];
  discos: {
    disco: Disco;
  }[];
}

const GeneroDetalhesPage = () => {
  const [genero, setGenero] = useState<GeneroDetalhes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchGenero = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/generos/${id}`
        );
        setGenero(response.data);
      } catch (error) {
        console.error("Erro ao buscar gênero:", error);
        setError("Não foi possível carregar os detalhes do gênero.");
      } finally {
        setLoading(false);
      }
    };

    fetchGenero();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-400">Carregando...</p>;
  }

  if (error || !genero) {
    return (
      <p className="text-center text-red-500">
        {error || "Gênero não encontrado."}
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-10 px-6">
      <h1 className="text-4xl font-extrabold mb-8 text-center">
        {genero.nome}
      </h1>

      {/* Artistas Associados */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Artistas Associados</h2>
        {genero.artistas.length > 0 ? (
          <ul className="space-y-4">
            {genero.artistas.map((item) => (
              <li key={item.artista.id}>
                <Link
                  href={`/artistas/${item.artista.id}`}
                  className="text-green-400 hover:text-green-300"
                >
                  {item.artista.nome}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">
            Nenhum artista associado a este gênero.
          </p>
        )}
      </div>

      {/* Discos Associados */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Discos Associados</h2>
        {genero.discos.length > 0 ? (
          <ul className="space-y-4">
            {genero.discos.map((item) => (
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
          <p className="text-gray-400">Nenhum disco associado a este gênero.</p>
        )}
      </div>
    </div>
  );
};

export default GeneroDetalhesPage;
