import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import SellTrash from './pages/SellTrash.jsx';
import Shop from './pages/Shop.jsx';
import Cart from './pages/Cart.jsx';
import Education from './pages/Education.jsx';

// Contoh fungsi utilitas (bisa dipindahkan ke utils/auth.js nanti)
const getCurrentUser = () => {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Load user dari localStorage saat aplikasi dimuat
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  // Fungsi logout
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  // Protected Route Helper
  const ProtectedRoute = ({ children, allowedRoles = ['personal', 'mitra'] }) => {
    if (!currentUser) {
      return <Navigate to="/login" replace />;
    }
    if (!allowedRoles.includes(currentUser.role)) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-color-">
        <Navbar currentUser={currentUser} onLogout={handleLogout} />
        <main className="flex-grow bg-sampay-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/sell-trash"
              element={
                <ProtectedRoute allowedRoles={['personal']}>
                  <SellTrash />
                </ProtectedRoute>
              }
            />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={
              <ProtectedRoute allowedRoles={['personal']}>
                <Cart />
              </ProtectedRoute>
            } />
            <Route path="/education" element={<Education />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;