import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    role: 'personal'
  });
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      setError('Kata sandi minimal 6 karakter.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.some(u => u.email === formData.email)) {
      setError('Email sudah terdaftar.');
      return;
    }

    const newUser = { id: Date.now(), ...formData };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Pendaftaran berhasil! Silakan masuk.');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-8">
          <div className="mx-auto flex justify-center">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-white text-xl">
              ♻️
            </div>
          </div>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Daftar Akun Baru</h2>
          <p className="mt-2 text-gray-600">
            Bergabunglah dengan komunitas peduli lingkungan.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md">
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 mb-2">Nama Lengkap</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Contoh: Budi Santoso"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="contoh@email.com"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 mb-2">Kata Sandi</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="••••••••"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700 mb-2">Nomor HP</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Contoh: 081234567890"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-gray-700 mb-2">Alamat</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Contoh: Jl. Lingkungan Hijau No. 123, Jakarta"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Peran Anda</label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="personal"
                    checked={formData.role === 'personal'}
                    onChange={handleChange}
                    className="form-radio text-green-600"
                  />
                  <span className="ml-2 text-sampay-black">Personal (Penjual Sampah)</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="mitra"
                    checked={formData.role === 'mitra'}
                    onChange={handleChange}
                    className="form-radio text-green-600"
                  />
                  <span className="ml-2 text-sampay-black">Mitra (Bank Sampah)</span>
                </label>
              </div>
            </div>
            <Button type="submit" variant="primary" className="w-full">
              Daftar
            </Button>
          </form>
          <p className="text-center text-gray-600 mt-6">
            Sudah punya akun?{' '}
            <Link to="/login" className="text-green-600 hover:underline font-medium">
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;