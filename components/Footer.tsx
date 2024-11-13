import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="relative bg-gray-900 text-white py-12"
      style={{
        backgroundImage: `url("/footerbackground.webp")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-6 lg:px-20 text-center">

        {/* Três Colunas */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Coluna 1 */}
          <div>
            <ul>
              <li className="text-sm text-white mb-2">Inicio</li>
              <li className="text-sm text-white mb-2">Entre em contato</li>
              <li className="text-sm text-white mb-2">Sobre nós</li>
            </ul>
          </div>
          {/* Coluna 3 */}
          <div>
            <ul>
              <Link href={"https://www.allmusic.com/newreleases"} target="_blank">
                <li className="text-sm text-black mb-2">
                  Você deveria escutar
                </li>
              </Link>
              <Link href={"https://www.allmusic.com/discover"} target="_blank">
                <li className="text-sm text-black mb-2">
                  Lançamentos recentes
                </li>
              </Link>
              <Link href={"https://www.allmusic.com/allmusic-year-in-review"} target="_blank">
                <li className="text-sm text-white mb-2">Top AllMusic</li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
