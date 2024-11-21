import Link from "next/link";

const Custom404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark-900 text-light-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold tracking-wider text-white">404</h1>
        <p className="mt-4 text-2xl font-medium text-light-200">
          Página não encontrada.
        </p>
        <p className="mt-2 text-light-400">
          Oops! Parece que você se perdeu no caminho.
        </p>
      </div>
      <Link href="/">
        <button className="mt-6 px-5 py-2.5 bg-light-400 text-light-white text-base font-semibold rounded shadow-md transition-all duration-200">
          Voltar para a Página Inicial
        </button>
      </Link>
    </div>
  );
};

export default Custom404;
