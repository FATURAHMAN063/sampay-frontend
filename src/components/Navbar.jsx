import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Navbar = ({ currentUser, onLogout }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-sampay-green-dark text-sampay-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold flex items-center">
            <img src="public\Logo sampay-app.png" alt="Logo Sampay" className="w-10 h-10 mr-2 bg-sampay-white rounded-full" />
            Sampay
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`hover:underline ${isActive('/') ? 'font-bold' : ''}`}>
              Beranda
            </Link>
            <Link to="/shop" className={`hover:underline ${isActive('/shop') ? 'font-bold' : ''}`}>
              Toko
            </Link>
            <Link to="/education" className={`hover:underline ${isActive('/education') ? 'font-bold' : ''}`}>
              Edukasi
            </Link>
            {currentUser && currentUser.role === 'personal' && (
              <>
                <Link to="/sell-trash" className={`hover:underline ${isActive('/sell-trash') ? 'font-bold' : ''}`}>
                  Jual Sampah
                </Link>
                <Link to="/cart" className={`hover:underline ${isActive('/cart') ? 'font-bold' : ''}`}>
                  Keranjang
                </Link>
              </>
            )}
            {currentUser ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm">Halo, {currentUser.name}</span>
                <button
                  onClick={onLogout}
                  className="bg-red-500 hover:bg-red-600 text-sampay-white py-1 px-3 rounded text-sm"
                >
                  Keluar
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className={`hover:underline ${isActive('/login') ? 'font-bold' : ''}`}>
                  Masuk
                </Link>
                <Link
                  to="/register"
                  className={`bg-sampay-white text-sampay-green-dark hover:bg-sampay-gray-light py-1 px-3 rounded text-sm ${isActive('/register') ? 'ring-2 ring-white' : ''}`}
                >
                  Daftar
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 space-y-3 border-t border-sampay-green">
            <Link
              to="/"
              className={`block px-3 py-2 rounded ${isActive('/') ? 'bg-sampay-green' : 'hover:bg-sampay-green'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Beranda
            </Link>
            <Link
              to="/shop"
              className={`block px-3 py-2 rounded ${isActive('/shop') ? 'bg-sampay-green' : 'hover:bg-sampay-green'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Toko
            </Link>
            <Link
              to="/education"
              className={`block px-3 py-2 rounded ${isActive('/education') ? 'bg-sampay-green' : 'hover:bg-sampay-green'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Edukasi
            </Link>
            {currentUser && currentUser.role === 'personal' && (
              <>
                <Link
                  to="/sell-trash"
                  className={`block px-3 py-2 rounded ${isActive('/sell-trash') ? 'bg-sampay-green' : 'hover:bg-sampay-green'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Jual Sampah
                </Link>
                <Link
                  to="/cart"
                  className={`block px-3 py-2 rounded ${isActive('/cart') ? 'bg-sampay-green' : 'hover:bg-sampay-green'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Keranjang
                </Link>
              </>
            )}
            {currentUser ? (
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm">Halo, {currentUser.name}</span>
                <button
                  onClick={() => {
                    onLogout();
                    setIsMenuOpen(false);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-sampay-white py-1 px-3 rounded text-sm"
                >
                  Keluar
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`block px-3 py-2 rounded ${isActive('/login') ? 'bg-sampay-green' : 'hover:bg-sampay-green'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Masuk
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded bg-sampay-white text-sampay-green-dark hover:bg-sampay-gray-light"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Daftar
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;