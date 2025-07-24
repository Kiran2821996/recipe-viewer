import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-black-800 text-white p-4">
      <div className="container mx-auto flex w-full">
        <Link
          href="/"
          className={`w-1/2 text-center text-xl font-bold py-2 hover:text-gray-300 ${pathname === '/' ? 'border-b-2 border-solid' : ''}`}
        >
          All Meals
        </Link>
        <Link
          href="/favorites"
          className={`w-1/2 text-center text-xl font-bold py-2 hover:text-gray-300 ${pathname === '/favorites' ? 'border-b-2 border-solid' : ''}`}
        >
          Favorite Meals
        </Link>
      </div>
    </nav>
  );
}