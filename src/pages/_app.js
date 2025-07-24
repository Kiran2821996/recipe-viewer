import '../styles/globals.css';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Render Navbar only on '/' and '/favorites' routes
  const showNavbar = router.pathname === '/' || router.pathname === '/favorites';

  return (
    <>
      {showNavbar && <Navbar />}
      <Component {...pageProps} />
    </>
  );
}