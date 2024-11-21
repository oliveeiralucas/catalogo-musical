"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const NovoGeneroPage = () => {
  const [nome, setNome] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/api/generos", { nome });
      router.push("/generos");
    } catch (error) {
      console.error("Erro ao adicionar gênero:", error);
      setError("Não foi possível adicionar o gênero.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-10 px-6 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-8 text-center">
        Adicionar Novo Gênero
      </h1>
      {error && (
        <p className="text-red-500 mb-6 text-center font-medium">{error}</p>
      )}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-gray-800 rounded-lg p-6 shadow-lg"
      >
        <div className="mb-4">
          <label
            htmlFor="nome"
            className="block text-gray-300 font-medium mb-2"
          >
            Nome do Gênero
          </label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full p-3 bg-gray-900 text-white rounded-md border border-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="Digite o nome do gênero"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-6 py-3 text-lg font-medium text-black bg-green-500 rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
        >
          Adicionar Gênero
        </button>
      </form>
    </div>
  );
};

export default NovoGeneroPage;
