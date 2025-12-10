import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import SectionHeader from '../components/ui/SectionHeader';
import IconBox from '../components/ui/IconBox';

const Home = () => {
  
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-50 to-green-100 py-16 px-4 md:px-8">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 text-center md:text-left">
            <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              Platform #1 untuk Ekonomi Sirkular
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Sampahmu Bernilai,<br />
              <span className="text-green-600">Lingkungan Terjaga</span>
            </h1>
            <p className="text-gray-600 mb-6">
              Jual sampah daur ulang dengan mudah, dapatkan uang langsung ke dompet digital.
              Bergabung dengan ribuan orang yang sudah berkontribusi untuk planet lebih hijau.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button as={Link} to="/sell-trash" variant="primary">
                Mulai Jual Sampah →
              </Button>
              <Button as={Link} to="/education" variant="secondary">
                Pelajari Lebih Lanjut
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center md:justify-start">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-8 h-8 bg-green-300 rounded-full border-2 border-white"></div>
                ))}
              </div>
              <span className="ml-3 text-sm text-gray-600">
                500+ Pengguna<br />
                Sudah bergabung
              </span>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src="/hero-sampay.png"
              alt="Ilustrasi pengelolaan dan pemilahan sampah dengan laptop"
              className="rounded-lg shadow-lg w-full object-cover"
              loading="lazy"
            />
            <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-semibold text-gray-800">Dampak Minggu Ini</h3>
              <p className="text-sm text-gray-600">Sampah Terdaur Ulang</p>
            </div>
          </div>
        </div>
      </section>

      {/* Fitur Unggulan */}
      <section className="py-16 px-4 md:px-8">
        <div className="container mx-auto">
          <SectionHeader
            badgeText="Fitur Unggulan"
            title="Kenapa Pilih Sampay?"
            subtitle="Platform lengkap yang memudahkan kamu untuk berkontribusi pada lingkungan sambil mendapatkan keuntungan finansial."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
              {
                icon: "/home_sampay.png",
                title: "Jual Sampah Mudah",
                desc: "Pilih jenis sampah, timbang, dan lihat harga real-time. Proses cepat dan transparan."
              },
              {
                icon: "/home_sampay1.png",
                title: "Penjemputan Gratis",
                desc: "Mitra kami akan menjemput sampahmu langsung ke lokasi. Tanpa biaya tambahan."
              },
              {
                icon: "/home_sampay2.png",
                title: "Langsung ke Dompet",
                desc: "Uang langsung masuk ke SAMPAY Wallet. Tarik ke Dana, GoPay, atau ShopeePay kapan saja."
              },
              {
                icon: "/home_sampay3.png",
                title: "Toko Produk Daur Ulang",
                desc: "Belanja produk berkualitas dari bahan daur ulang. Menutup siklus ekonomi sirkular."
              }
            ].map((feature, i) => (
              <Card key={i}>
                <div className="w-full h-48 mb-4 overflow-hidden rounded-lg">
                  <img 
                    src={feature.icon} 
                    alt={feature.title} 
                    className="w-full h-full object-cover object-center" 
                  />
                </div>
                <h3 className="text-xl font-bold text-sampay-black mb-2">{feature.title}</h3>
                <p className="text-sampay-black opacity-80">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cara Kerja */}
      <section className="bg-white py-16 px-4 md:px-8">
        <div className="container mx-auto">
          <SectionHeader
            badgeText="Cara Kerja"
            title="Mudah dalam 4 Langkah"
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Daftar & Pilih Sampah", icon: "📝" },
              { step: "2", title: "Lihat Harga Real-time", icon: "💲" },
              { step: "3", title: "Jadwalkan Penjemputan", icon: "📅" },
              { step: "4", title: "Terima Pembayaran", icon: "💳" }
            ].map((item, i) => (
              <IconBox
                key={i}
                number={item.step}
                icon={item.icon}
                title={item.title}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-green-600 text-white py-16 px-4 md:px-8">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <img
              src="public\Logo sampay-app.png"
              alt="Leaf Icon"
              className="w-16 h-16 mx-auto mb-4 bg-sampay-white rounded-full"
            />
            <h2 className="text-3xl font-bold mb-4">Setiap Transaksi, Dampak Nyata</h2>
            <p className="text-lg max-w-2xl mx-auto">
              Dengan menjual 1 kg plastik PET, kamu mengurangi 2.1 kg emisi CO₂.
              Bayangkan dampaknya jika kita semua berkontribusi!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { title: "Harga Transparan", icon: "✅" },
              { title: "Pembayaran Aman", icon: "🔒" },
              { title: "Mitra Terpercaya", icon: "⭐" }
            ].map((item, i) => (
              <Card key={i} className="bg-white bg-opacity-20">
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-bold">{item.title}</h3>
              </Card>
            ))}
          </div>
          <div className="mt-8">
            <Button as={Link} to="/register" variant="secondary">
              Bergabung Sekarang →
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4 md:px-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-2">
                ♻️
              </div>
              <span className="font-bold">SAMPAY</span>
            </div>
            <p className="text-gray-400">
              Solusi Pintar, Sampah Bernilai. Platform digital untuk ekonomi sirkular yang lebih baik.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white">Beranda</Link></li>
              <li><Link to="/shop" className="text-gray-400 hover:text-white">Toko</Link></li>
              <li><Link to="/education" className="text-gray-400 hover:text-white">Edukasi</Link></li>
              <li><Link to="/sell-trash" className="text-gray-400 hover:text-white">Jual Sampah</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Layanan</h3>
            <ul className="space-y-2">
              <li><Link to="/sell-trash" className="text-gray-400 hover:text-white">Jual Sampah</Link></li>
              <li><Link to="/shop" className="text-gray-400 hover:text-white">Jadi Mitra</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Kontak</h3>
            <address className="not-italic text-gray-400">
              <p>Jl. Lingkungan Hijau No. 123, Jakarta</p>
              <p>info@sampay.id</p>
            </address>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          © 2025 Sampay. Semua hak dilindungi.
        </div>
      </footer>
    </div>
  );
};

export default Home;