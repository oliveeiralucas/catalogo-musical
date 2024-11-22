"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Disco, Artista, Genero, Faixa } from "../../../@types/types";
import Image from "next/image";

const DiscoDetalhesPage = () => {
  const [disco, setDisco] = useState<Disco | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchDisco = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/discos/${id}`
        );
        setDisco(response.data);
      } catch (error) {
        console.error("Erro ao buscar disco:", error);
        setError("Não foi possível carregar os detalhes do disco.");
      } finally {
        setLoading(false);
      }
    };

    fetchDisco();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-400">Carregando...</p>;
  }

  if (error || !disco) {
    return (
      <p className="text-center text-red-500">
        {error || "Disco não encontrado."}
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-10 px-6">
      <h1 className="text-4xl font-extrabold mb-4 text-center">
        {disco.titulo}
      </h1>
      <p className="text-lg text-gray-300 text-center mb-6">
        Ano de Lançamento: {disco.anoLancamento}
      </p>
      {disco.capa && (
        <div className="flex justify-center mb-6">
          <Image
            src={disco.capa}
            alt={disco.titulo}
            className="rounded-lg shadow-lg"
            height={300}
            width={300}
          />
        </div>
      )}

      {/* Artistas */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Artistas</h2>
        {disco.artistas.length > 0 ? (
          <ul className="space-y-2">
            {disco.artistas.map((item) => (
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
            Nenhum artista associado a este disco.
          </p>
        )}
      </div>

      {/* Gêneros */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Gêneros</h2>
        {disco.generos.length > 0 ? (
          <ul className="space-y-2">
            {disco.generos.map((item) => (
              <li key={item.genero.id}>
                <Link
                  href={`/generos/${item.genero.id}`}
                  className="text-blue-400 hover:text-blue-300"
                >
                  {item.genero.nome}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">Nenhum gênero associado a este disco.</p>
        )}
      </div>

      {/* Faixas */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Faixas</h2>
        {disco.faixas.length > 0 ? (
          <ul className="space-y-2">
            {disco.faixas.map((faixa) => (
              <li key={faixa.id} className="text-gray-300">
                {faixa.titulo}{" "}
                <span className="text-gray-400">
                  ({Math.floor(faixa.duracao / 60)}:
                  {String(faixa.duracao % 60).padStart(2, "0")})
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">
            Este disco não possui faixas cadastradas.
          </p>
        )}
      </div>
    </div>
  );
};

export default DiscoDetalhesPage;
