import Link from 'next/link';
import Home from '../../public/icons/Home';
import Contact from '../../public/icons/Contact';
import Search from '../../public/icons/Search';

export default function Navbar() {
  return (
    <nav>
      <ul className="flex space-x-4">
        <li>
          <Link href="/">          
            <Home/>
          </Link>
        </li>
        <li>
          <Link href="/"><Search/></Link>
        </li>
        <li>
          <Link href="/"><Contact/></Link>
        </li>
      </ul>
    </nav>
  );
}