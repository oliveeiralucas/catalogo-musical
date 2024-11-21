"use client";
import { FC, useEffect, useState } from "react";
import axios from "axios";
import DiscoCard from "../../components/DiscoCard";
import { Disco } from "../../@types/types";

const DiscosPage: FC = () => {
  const [discos, setDiscos] = useState<Disco[]>([]);
  const [titulo, setTitulo] = useState("");
  const [artistaNome, setArtistaNome] = useState("");
  const [generoNome, setGeneroNome] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDiscos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:3000/api/discos", {
        params: {
          titulo: titulo || undefined,
          artistaNome: artistaNome || undefined,
          generoNome: generoNome || undefined,
        },
      });
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchDiscos();
  };

  return (
    <div className="min-h-screen bg-black text-white py-10 px-6">
      <h1 className="text-4xl font-extrabold mb-8 text-center">
        Lista de Discos
      </h1>

      {/* Formulário de Filtros */}
      <form onSubmit={handleSubmit} className="mb-12">
        <div className="flex flex-wrap justify-center gap-4">
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full sm:w-auto p-3 text-black rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Artista"
            value={artistaNome}
            onChange={(e) => setArtistaNome(e.target.value)}
            className="w-full sm:w-auto p-3 text-black rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Gênero"
            value={generoNome}
            onChange={(e) => setGeneroNome(e.target.value)}
            className="w-full sm:w-auto p-3 text-black rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
          <button
            type="submit"
            className="p-3 bg-green-500 text-black font-semibold rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:outline-none"
          >
            Filtrar
          </button>
        </div>
      </form>

      {/* Mensagens de Feedback */}
      {loading && <p className="text-center text-gray-400">Carregando...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Lista de Discos */}
      {discos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-20">
          {discos.map((disco) => (
            <DiscoCard key={disco.id} disco={disco} />
          ))}
        </div>
      ) : (
        !loading && (
          <p className="text-center text-gray-400">Nenhum disco encontrado.</p>
        )
      )}
    </div>
  );
};

export default DiscosPage;
