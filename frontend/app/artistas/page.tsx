"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Artista } from "../../@types/types";

const ArtistasPage = () => {
  const [artistas, setArtistas] = useState<Artista[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArtistas = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/artistas");
      setArtistas(response.data);
    } catch (error) {
      console.error("Erro ao buscar artistas:", error);
      setError("Não foi possível carregar os artistas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtistas();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja remover este artista?")) {
      try {
        await axios.delete(`http://localhost:3000/api/artistas/${id}`);
        fetchArtistas();
      } catch (error) {
        console.error("Erro ao deletar artista:", error);
        if (axios.isAxiosError(error) && error.response) {
          alert(error.response.data.error);
        } else {
          alert("Não foi possível deletar o artista.");
        }
      }
    }
  };

  if (loading) {
    return <p className="text-center text-gray-400">Carregando...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-black text-white py-10 px-6">
      <h1 className="text-4xl font-extrabold mb-8 text-center">Artistas</h1>
      <div className="flex justify-between items-center mb-6">
        <Link
          href="/artistas/novo"
          className="px-6 py-2 text-base font-medium text-black bg-green-500 rounded-full hover:bg-green-600 focus:ring-2 focus:ring-green-500 transition-all"
        >
          Adicionar Novo Artista
        </Link>
      </div>
      <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-700 text-gray-300">
            <tr>
              <th className="py-3 px-6 text-left font-semibold">ID</th>
              <th className="py-3 px-6 text-left font-semibold">Nome</th>
              <th className="py-3 px-6 text-left font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {artistas.map((artista) => (
              <tr
                key={artista.id}
                className="border-b border-gray-700 hover:bg-gray-700 transition-colors"
              >
                <td className="py-3 px-6">{artista.id}</td>
                <td className="py-3 px-6">{artista.nome}</td>
                <td className="py-3 px-6 flex space-x-4">
                  <Link
                    href={`/artistas/${artista.id}`}
                    className="text-green-400 hover:text-green-300"
                  >
                    Ver Detalhes
                  </Link>
                  <Link
                    href={`/artistas/${artista.id}/editar`}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(artista.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ArtistasPage;
