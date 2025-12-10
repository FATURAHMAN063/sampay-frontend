import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import SectionHeader from '../components/ui/SectionHeader';

const Shop = () => {
  const [currentUser] = useState(() => JSON.parse(localStorage.getItem('currentUser')) || {});
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    imageFile: null,
    imagePreview: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(savedProducts);

    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const addToCartFixed = (product) => {
    if (currentUser.role !== 'personal') {
      alert('Silakan login sebagai personal untuk berbelanja.');
      navigate('/login');
      return;
    }
    const existingItem = cart.find(item => item.id === product.id);
    let newCart;
    if (existingItem) {
      newCart = cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    alert(`${product.name} telah ditambahkan ke keranjang.`);
  };

  const addProduct = () => {
    if (currentUser.role !== 'mitra') {
      alert('Fitur ini hanya untuk mitra.');
      navigate('/');
      return;
    }
    if (!newProduct.name || !newProduct.price || !newProduct.imagePreview) {
      alert('Silakan lengkapi semua data, termasuk gambar.');
      return;
    }

    const productToAdd = {
      id: Date.now(),
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      image: newProduct.imagePreview, // Gunakan base64 dari preview
      mitraId: currentUser.id,
      mitraName: currentUser.name,
    };

    const updatedProducts = [...products, productToAdd];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    // Reset form
    setNewProduct({ name: '', price: '', imageFile: null, imagePreview: '' });
    alert('Produk baru berhasil ditambahkan.');
  };

  const deleteProduct = (productId) => {
    if (currentUser.role !== 'mitra') {
      alert('Anda tidak memiliki izin untuk menghapus produk ini.');
      return;
    }
    const updatedProducts = products.filter(p => p.id !== productId);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    alert('Produk berhasil dihapus.');
  };

  const filteredProducts = currentUser.role === 'mitra' ? products.filter(p => p.mitraId === currentUser.id) : products;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Toko Produk Daur Ulang"
          subtitle={currentUser.role === 'mitra' ? 'Kelola produk hasil daur ulang Anda' : 'Temukan produk unik dari bahan daur ulang'}
          className="mb-12"
        />

        {/* Form Tambah Produk untuk Mitra */}
        {currentUser.role === 'mitra' && (
          <Card className="mb-12 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Tambah Produk Baru</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Nama Produk</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                  placeholder="Contoh: Tas dari Plastik Bekas"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Harga (Rp)</label>
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                  placeholder="Contoh: 50000"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 mb-2">Gambar Produk</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setNewProduct({
                        ...newProduct,
                        imageFile: file,
                        imagePreview: reader.result,
                      });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>
            {newProduct.imagePreview && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-1">Preview Gambar:</p>
                <img src={newProduct.imagePreview} alt="Preview Produk" className="w-32 h-32 object-contain border border-gray-300 rounded" />
              </div>
            )}
            <Button onClick={addProduct} variant="primary" className="mt-4 w-full md:w-auto">
              Tambahkan Produk
            </Button>
          </Card>
        )}

        {/* Daftar Produk */}
        <div>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className="flex flex-col h-full">
                  <img
                    src={product.image} // Ini sekarang adalah base64
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <div className="p-4 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-gray-800">{product.name}</h3>
                      <p className="text-green-600 font-semibold mt-1">Rp {product.price.toLocaleString()}</p>
                      <p className="text-gray-500 text-sm mt-1">Oleh: {product.mitraName}</p>
                    </div>
                    <div className="mt-4">
                      {currentUser.role === 'personal' && (
                        <Button
                          onClick={() => addToCartFixed(product)}
                          variant="primary"
                          className="w-full"
                        >
                          Tambah ke Keranjang
                        </Button>
                      )}
                      {currentUser.role === 'mitra' && product.mitraId === currentUser.id && (
                        <Button
                          onClick={() => deleteProduct(product.id)}
                          variant="danger"
                          className="w-full"
                        >
                          Hapus Produk
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Belum ada produk.</p>
              {currentUser.role === 'mitra' && (
                <Button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} variant="primary" className="mt-4">
                  Tambah Produk Pertama
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;