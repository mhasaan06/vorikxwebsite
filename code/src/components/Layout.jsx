import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Hide footer on admin pages
  const isAdmin = pathname.startsWith('/admin');

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      {!isAdmin && <Footer />}
    </>
  );
}
