import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import SectionHeader from '../components/ui/SectionHeader';

const SellTrash = () => {
  const [currentUser] = useState(() => JSON.parse(localStorage.getItem('currentUser')) || {});
  const [trashTypes, setTrashTypes] = useState([]);
  const [selectedTrash, setSelectedTrash] = useState('');
  const [weight, setWeight] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [nearestMitra, setNearestMitra] = useState(null);
  const [history, setHistory] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const mockTrashTypes = [
      { id: 1, name: 'Botol Plastik', pricePerKg: 2000 },
      { id: 2, name: 'Kardus Bekas', pricePerKg: 1500 },
      { id: 3, name: 'Kertas HVS Bekas', pricePerKg: 1000 },
      { id: 4, name: 'Kaleng Aluminium', pricePerKg: 3000 },
    ];
    setTrashTypes(mockTrashTypes);

    const savedHistory = JSON.parse(localStorage.getItem('trashSalesHistory')) || [];
    setHistory(savedHistory);
  }, []);

  const mockMitras = [
    { id: 1, name: 'Bank Sampah Sejahtera', address: 'Jl. Mawar No. 10', distance: '0.5 km' },
    { id: 2, name: 'Bank Sampah Mandiri', address: 'Jl. Melati No. 25', distance: '1.2 km' },
    { id: 3, name: 'Bank Sampah Hijau', address: 'Jl. Kenanga No. 5', distance: '2.0 km' },
  ];

  const calculateTotal = () => {
    if (!selectedTrash || !weight) {
      setTotalPrice(0);
      return;
    }
    const item = trashTypes.find(t => t.id === parseInt(selectedTrash));
    if (item) {
      const total = item.pricePerKg * parseFloat(weight);
      setTotalPrice(total);
    }
  };

  useEffect(() => {
    calculateTotal();
  }, [selectedTrash, weight, trashTypes]);

  const findNearestMitra = () => {
    if (!selectedTrash || !weight) return;
    const nearest = mockMitras.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))[0];
    setNearestMitra(nearest);
  };

  useEffect(() => {
    findNearestMitra();
  }, [selectedTrash, weight]);

  const handleSell = () => {
    if (!selectedTrash || !weight || !nearestMitra) {
      alert('Silakan lengkapi data terlebih dahulu.');
      return;
    }

    const item = trashTypes.find(t => t.id === parseInt(selectedTrash));

    const newSale = {
      id: Date.now(),
      userId: currentUser.id,
      userName: currentUser.name,
      trashName: item.name,
      weight: parseFloat(weight),
      totalPrice,
      mitra: nearestMitra,
      date: new Date().toLocaleDateString('id-ID'),
    };

    const updatedHistory = [...history, newSale];
    setHistory(updatedHistory);
    localStorage.setItem('trashSalesHistory', JSON.stringify(updatedHistory));

    alert(`Penjualan berhasil! Total: Rp ${totalPrice.toLocaleString()}. Penjemputan oleh ${nearestMitra.name}.`);
    setWeight('');
    setTotalPrice(0);
    setNearestMitra(null);
  };

  if (currentUser.role !== 'personal') {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Jual Sampah Anda"
          subtitle="Pilih jenis dan timbang sampahmu, lihat harga secara real-time dan dapatkan uang langsung!"
          className="mb-12"
        />

        {/* Harga Sampah */}
        <Card className="mb-12 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Harga Sampah Hari Ini</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {trashTypes.map(type => (
              <div key={type.id} className="border p-4 rounded-lg bg-white shadow-sm">
                <p className="font-medium text-gray-800">{type.name}</p>
                <p className="text-green-600 font-semibold mt-1">Rp {type.pricePerKg.toLocaleString()}/kg</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Form Input dan Hasil */}
        <Card className="mb-12 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Masukkan Sampah Anda</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Jenis Sampah</label>
              <select
                value={selectedTrash}
                onChange={(e) => setSelectedTrash(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              >
                <option value="">-- Pilih Jenis --</option>
                {trashTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Berat (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                min="0.1"
                step="0.1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Contoh: 2.5"
              />
            </div>
          </div>

          {/* Hasil Kalkulasi dan Mitra */}
          <div className="mt-6">
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <p className="font-bold text-lg text-gray-800">Total Harga: Rp {totalPrice.toLocaleString()}</p>
            </div>
            {nearestMitra && (
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-4">
                <p className="font-semibold text-gray-800">Bank Sampah Terdekat:</p>
                <p>Nama: <strong>{nearestMitra.name}</strong></p>
                <p>Alamat: {nearestMitra.address} (Jarak: {nearestMitra.distance})</p>
              </div>
            )}
            <Button
              onClick={handleSell}
              disabled={!selectedTrash || !weight}
              variant="primary"
              className="w-full md:w-auto"
            >
              Konfirmasi Penjualan
            </Button>
          </div>
        </Card>

        {/* Riwayat Penjualan */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Riwayat Penjualan Saya</h3>
          {history.filter(sale => sale.userId === currentUser.id).length === 0 ? (
            <p className="text-gray-500">Belum ada riwayat penjualan.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sampah</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Berat (kg)</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Harga</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bank Sampah</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {history
                    .filter(sale => sale.userId === currentUser.id)
                    .map(sale => (
                      <tr key={sale.id}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{sale.date}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800">{sale.trashName}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{sale.weight}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-green-600">Rp {sale.totalPrice.toLocaleString()}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{sale.mitra.name}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default SellTrash;