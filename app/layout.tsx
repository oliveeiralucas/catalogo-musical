import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import './globals.css'

export const metadata = {
  title: "Biblioteca de Discos",
  description: "Projeto desenvolvido por Lucas Oliveira",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        <div className="bg-black text-white">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
