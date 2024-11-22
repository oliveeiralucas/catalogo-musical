"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Disco } from "../../@types/types";

const DiscosPage = () => {
  const [discos, setDiscos] = useState<Disco[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDiscos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/discos");
      setDiscos(response.data);
    } catch (error) {
      console.error("Erro ao buscar discos:", error);
      setError("Não foi possível carregar os discos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscos();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja remover este disco?")) {
      try {
        await axios.delete(`http://localhost:3000/api/discos/${id}`);
        fetchDiscos();
      } catch (error) {
        console.error("Erro ao deletar disco:", error);
        alert("Não foi possível deletar o disco.");
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
      <h1 className="text-4xl font-extrabold mb-8 text-center">Discos</h1>
      <div className="flex justify-between items-center mb-6">
        <Link
          href="/discos/novo"
          className="px-6 py-2 text-base font-medium text-black bg-green-500 rounded-full hover:bg-green-600 focus:ring-2 focus:ring-green-500 transition-all"
        >
          Adicionar Novo Disco
        </Link>
      </div>
      <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-700 text-gray-300">
            <tr>
              <th className="py-3 px-6 text-left font-semibold">ID</th>
              <th className="py-3 px-6 text-left font-semibold">Título</th>
              <th className="py-3 px-6 text-left font-semibold">
                Ano de Lançamento
              </th>
              <th className="py-3 px-6 text-left font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {discos.map((disco) => (
              <tr
                key={disco.id}
                className="border-b border-gray-700 hover:bg-gray-700 transition-colors"
              >
                <td className="py-3 px-6">{disco.id}</td>
                <td className="py-3 px-6">{disco.titulo}</td>
                <td className="py-3 px-6">{disco.anoLancamento}</td>
                <td className="py-3 px-6 flex space-x-4">
                  <Link
                    href={`/discos/${disco.id}`}
                    className="text-green-400 hover:text-green-300"
                  >
                    Ver Detalhes
                  </Link>
                  <Link
                    href={`/discos/${disco.id}/editar`}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(disco.id)}
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

export default DiscosPage;
