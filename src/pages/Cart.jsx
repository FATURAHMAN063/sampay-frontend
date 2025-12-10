import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import SectionHeader from '../components/ui/SectionHeader';

const Cart = () => {
  const [currentUser] = useState(() => JSON.parse(localStorage.getItem('currentUser')) || {});
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser.role !== 'personal') {
      navigate('/');
      return;
    }
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, [currentUser, navigate]);

  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotal(total);
  }, [cart]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Keranjang belanja kosong.');
      return;
    }
    // Simulasi checkout
    alert(`Checkout berhasil! Total belanja: Rp ${total.toLocaleString()}. Terima kasih telah berbelanja di Sampay!`);
    // Kosongkan keranjang setelah checkout
    setCart([]);
    localStorage.setItem('cart', JSON.stringify([]));
  };

  if (currentUser.role !== 'personal') {
    return null; // Akan diarahkan oleh ProtectedRoute di App.jsx
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Keranjang Belanja"
          subtitle="Periksa kembali produk yang ingin Anda beli"
          className="mb-12"
        />

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-xl mb-6">Keranjang Anda kosong.</p>
            <Button as="a" href="/shop" variant="primary">
              Belanja Sekarang
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Daftar Item Keranjang */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map(item => (
                <Card key={item.id} className="flex items-center p-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-contain rounded mr-4" />
                  <div className="flex-grow">
                    <h3 className="font-bold text-gray-800">{item.name}</h3>
                    <p className="text-green-600 font-semibold">Rp {item.price.toLocaleString()}</p>
                    <p className="text-gray-500 text-sm">Oleh: {item.mitraName}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-3">
                    <div className="flex items-center border border-gray-300 rounded">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="px-3 py-1">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <p className="font-semibold text-gray-800">Rp {(item.price * item.quantity).toLocaleString()}</p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Hapus
                    </button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Ringkasan Pembayaran */}
            <div>
              <Card className="p-6 sticky top-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Ringkasan Belanja</h3>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">Rp {total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Biaya Pengiriman</span>
                  <span className="font-medium">Rp 0</span>
                </div>
                <div className="flex justify-between mb-4 pt-4 border-t border-gray-200">
                  <span className="text-lg font-bold text-gray-800">Total</span>
                  <span className="text-lg font-bold text-green-600">Rp {total.toLocaleString()}</span>
                </div>
                <Button onClick={handleCheckout} variant="primary" className="w-full">
                  Checkout
                </Button>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;