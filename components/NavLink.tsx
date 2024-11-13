"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, label }) => {
  const pathname = usePathname(); // Obtém o caminho atual da rota

  return (
    <Link href={href}>
      <p
        className={`text-white hover:text-red-600 transition ${
          pathname === href ? "border-b-2 border-red-600" : ""
        }`}
      >
        {label}
      </p>
    </Link>
  );
};

export default NavLink;
