import NavLink from "./NavLink";

export function Navbar() {
  return (
    <nav className="bg-gray-900 py-8">
      <div className="container mx-auto px-6 lg:px-20 flex justify-between items-center">
        <div className="text-2xl font-bold text-white">PedrosaMusic</div>
        <div className="space-x-6 flex">
          <NavLink href="/" label="Página Inicial" />
          <NavLink href="/discos" label="Discos" />
          <NavLink href="/artistas" label="Artistas" />
          <NavLink href="/generos-musicais" label="Gêneros Musicais" />
        </div>
      </div>
    </nav>
  );
}
