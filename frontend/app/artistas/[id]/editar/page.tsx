"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { Artista, Genero } from "../../../../@types/types";

const EditarArtistaPage = () => {
  const [nome, setNome] = useState("");
  const [generosDisponiveis, setGenerosDisponiveis] = useState<Genero[]>([]);
  const [generosSelecionados, setGenerosSelecionados] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchArtista = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/artistas/${id}`
        );
        const artista: Artista = response.data;
        setNome(artista.nome);
        setGenerosSelecionados(artista.generos.map((g) => g.genero.id));
      } catch (error) {
        console.error("Erro ao buscar artista:", error);
        setError("Não foi possível carregar o artista.");
      }
    };

    const fetchGeneros = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/generos");
        setGenerosDisponiveis(response.data);
      } catch (error) {
        console.error("Erro ao buscar gêneros:", error);
      }
    };

    fetchArtista();
    fetchGeneros();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3000/api/artistas/${id}`, {
        nome,
        generosIds: generosSelecionados,
      });
      router.push("/artistas");
    } catch (error) {
      console.error("Erro ao atualizar artista:", error);
      setError("Não foi possível atualizar o artista.");
    }
  };

  const handleGeneroChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const ids = selectedOptions.map((option) => Number(option.value));
    setGenerosSelecionados(ids);
  };

  return (
    <div className="min-h-screen bg-black text-white py-10 px-6 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-8 text-center">
        Editar Artista
      </h1>
      {error && (
        <p className="text-red-500 mb-6 text-center font-medium">{error}</p>
      )}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-gray-800 rounded-lg p-6 shadow-lg"
      >
        <div className="mb-6">
          <label
            htmlFor="nome"
            className="block text-gray-300 font-medium mb-2"
          >
            Nome do Artista
          </label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full p-3 bg-gray-900 text-white rounded-md border border-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="Digite o nome do artista"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="generos"
            className="block text-gray-300 font-medium mb-2"
          >
            Gêneros Musicais
          </label>
          <select
            id="generos"
            multiple
            value={generosSelecionados.map(String)}
            onChange={handleGeneroChange}
            className="w-full p-3 bg-gray-900 text-white rounded-md border border-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
          >
            {generosDisponiveis.map((genero) => (
              <option key={genero.id} value={genero.id}>
                {genero.nome}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full px-6 py-3 text-lg font-medium text-black bg-green-500 rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
        >
          Atualizar Artista
        </button>
      </form>
    </div>
  );
};

export default EditarArtistaPage;