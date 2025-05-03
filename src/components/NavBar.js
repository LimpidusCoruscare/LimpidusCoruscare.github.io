import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NavBar() {
  const router = useRouter();

  return (
    <nav style={{ padding: '1rem 0', borderBottom: '1px solid #eaeaea' }}>
      <ul style={{ display: 'flex', listStyle: 'none', gap: '1rem' }}>
        <li>
          <Link href="/" style={{
            fontWeight: router.pathname === '/' ? 'bold' : 'normal',
          }}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/blog" style={{
            fontWeight: router.pathname === '/blog' ? 'bold' : 'normal',
          }}>
            Blog
          </Link>
        </li>
        <li>
          <Link href="/about" style={{
            fontWeight: router.pathname === '/about' ? 'bold' : 'normal',
          }}>
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}