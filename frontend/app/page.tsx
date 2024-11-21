"use client";
import { FC, useEffect, useState } from "react";
import axios from "axios";
import DiscoCard from "../components/DiscoCard";
import Hero from "../components/Hero";
import { Disco } from "../@types/types";
import Link from "next/link";

const HomePage: FC = () => {
  const [discosRecomendados, setDiscosRecomendados] = useState<Disco[]>([]);
  const [discosLancamentos, setDiscosLancamentos] = useState<Disco[]>([]);
  const [discosPopulares, setDiscosPopulares] = useState<Disco[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiscos = async () => {
      try {
        const recomendadosResponse = await axios.get(
          "http://localhost:3000/api/discos/random?quantidade=5"
        );
        setDiscosRecomendados(recomendadosResponse.data);

        const lancamentosResponse = await axios.get(
          "http://localhost:3000/api/discos/latest?quantidade=5"
        );
        setDiscosLancamentos(lancamentosResponse.data);

        const popularesResponse = await axios.get(
          "http://localhost:3000/api/discos/popular?quantidade=5"
        );
        setDiscosPopulares(popularesResponse.data);
      } catch (error) {
        console.error("Erro ao buscar discos:", error);
        setError("Não foi possível carregar os discos.");
      } finally {
        setLoading(false);
      }
    };

    fetchDiscos();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-400">Carregando...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Seção Hero */}
      <Hero />
      {/* Recomendados */}
      <Section
        title="Recomendações"
        link="/discos"
        discos={discosRecomendados}
      />
      {/* Últimos Lançamentos */}
      <Section
        title="Últimos Lançamentos"
        link="/discos"
        discos={discosLancamentos}
      />
      {/* Discos Populares */}
      <Section
        title="Discos Populares"
        link="/discos"
        discos={discosPopulares}
      />
    </div>
  );
};

interface SectionProps {
  title: string;
  link: string;
  discos: Disco[];
}

const Section: FC<SectionProps> = ({ title, link, discos }) => {
  return (
    <div className="py-8 px-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">{title}</h2>
        <Link
          href={link}
          className="inline-block py-2 px-6 text-sm font-medium text-black bg-green-400 rounded-full hover:bg-green-500 transition-all"
        >
          Ver Mais
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {discos.map((disco) => (
          <DiscoCard key={disco.id} disco={disco} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
