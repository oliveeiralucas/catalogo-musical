"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { Disco, Artista, Genero } from "../../../../@types/types";

const EditarDiscoPage = () => {
  const [titulo, setTitulo] = useState("");
  const [anoLancamento, setAnoLancamento] = useState<number | "">("");
  const [capa, setCapa] = useState("");
  const [artistasDisponiveis, setArtistasDisponiveis] = useState<Artista[]>([]);
  const [generosDisponiveis, setGenerosDisponiveis] = useState<Genero[]>([]);
  const [artistasSelecionados, setArtistasSelecionados] = useState<number[]>(
    []
  );
  const [generosSelecionados, setGenerosSelecionados] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchDisco = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/discos/${id}`
        );
        const disco: Disco = response.data;
        setTitulo(disco.titulo);
        setAnoLancamento(disco.anoLancamento);
        setCapa(disco.capa || "");
        setArtistasSelecionados(disco.artistas.map((a) => a.artista.id));
        setGenerosSelecionados(disco.generos.map((g) => g.genero.id));
      } catch (error) {
        console.error("Erro ao buscar disco:", error);
        setError("Não foi possível carregar o disco.");
      }
    };

    const fetchArtistas = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/artistas");
        setArtistasDisponiveis(response.data);
      } catch (error) {
        console.error("Erro ao buscar artistas:", error);
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

    fetchDisco();
    fetchArtistas();
    fetchGeneros();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3000/api/discos/${id}`, {
        titulo,
        anoLancamento: Number(anoLancamento),
        capa,
        artistasIds: artistasSelecionados,
        generosIds: generosSelecionados,
      });
      router.push("/discos");
    } catch (error) {
      console.error("Erro ao atualizar disco:", error);
      setError("Não foi possível atualizar o disco.");
    }
  };

  const handleArtistaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const ids = selectedOptions.map((option) => Number(option.value));
    setArtistasSelecionados(ids);
  };

  const handleGeneroChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions);
    const ids = selectedOptions.map((option) => Number(option.value));
    setGenerosSelecionados(ids);
  };

  return (
    <div className="min-h-screen bg-black text-white py-10 px-6 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-8 text-center">Editar Disco</h1>
      {error && (
        <p className="text-red-500 mb-6 text-center font-medium">{error}</p>
      )}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-gray-800 rounded-lg p-6 shadow-lg"
      >
        <div className="mb-6">
          <label
            htmlFor="titulo"
            className="block text-gray-300 font-medium mb-2"
          >
            Título do Disco
          </label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full p-3 bg-gray-900 text-white rounded-md border border-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="Digite o título do disco"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="anoLancamento"
            className="block text-gray-300 font-medium mb-2"
          >
            Ano de Lançamento
          </label>
          <input
            type="number"
            id="anoLancamento"
            value={anoLancamento}
            onChange={(e) => setAnoLancamento(e.target.valueAsNumber || "")}
            className="w-full p-3 bg-gray-900 text-white rounded-md border border-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="Digite o ano de lançamento"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="capa"
            className="block text-gray-300 font-medium mb-2"
          >
            URL da Capa
          </label>
          <input
            type="text"
            id="capa"
            value={capa}
            onChange={(e) => setCapa(e.target.value)}
            className="w-full p-3 bg-gray-900 text-white rounded-md border border-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="Digite a URL da capa"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="artistas"
            className="block text-gray-300 font-medium mb-2"
          >
            Artistas
          </label>
          <select
            id="artistas"
            multiple
            value={artistasSelecionados.map(String)}
            onChange={handleArtistaChange}
            className="w-full p-3 bg-gray-900 text-white rounded-md border border-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
          >
            {artistasDisponiveis.map((artista) => (
              <option key={artista.id} value={artista.id}>
                {artista.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label
            htmlFor="generos"
            className="block text-gray-300 font-medium mb-2"
          >
            Gêneros
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
          Atualizar Disco
        </button>
      </form>
    </div>
  );
};

export default EditarDiscoPage;
