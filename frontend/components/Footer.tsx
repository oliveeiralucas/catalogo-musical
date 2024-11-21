import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="bg-dark-900 text-light-200">
      <div className="container mx-auto py-6 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Catálogo de Discos. Todos os direitos reservados.
        </p>
        <p className="mt-2 text-xs text-light-400">
          Desenvolvido com ❤️ por Pedrosa.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
