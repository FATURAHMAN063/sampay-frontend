import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Education = () => {
  const [currentUser] = useState(() => JSON.parse(localStorage.getItem('currentUser')) || {});
  const [articles, setArticles] = useState([]);
  const [newArticle, setNewArticle] = useState({ title: '', content: '' });

  const navigate = useNavigate();

  useEffect(() => {
    // Load artikel dari localStorage
    const savedArticles = JSON.parse(localStorage.getItem('educationArticles')) || [];
    setArticles(savedArticles);
  }, []);

  const addArticle = () => {
    if (currentUser.role !== 'mitra') {
      alert('Fitur ini hanya untuk mitra.');
      navigate('/');
      return;
    }
    if (!newArticle.title || !newArticle.content) {
      alert('Silakan lengkapi judul dan isi artikel.');
      return;
    }
    const articleToAdd = {
      id: Date.now(),
      title: newArticle.title,
      content: newArticle.content,
      authorId: currentUser.id,
      authorName: currentUser.name,
      date: new Date().toLocaleDateString('id-ID'),
    };

    const updatedArticles = [...articles, articleToAdd];
    setArticles(updatedArticles);
    localStorage.setItem('educationArticles', JSON.stringify(updatedArticles));
    setNewArticle({ title: '', content: '' });
    alert('Artikel baru berhasil ditambahkan.');
  };

  const deleteArticle = (articleId) => {
    if (currentUser.role !== 'mitra') {
      alert('Anda tidak memiliki izin untuk menghapus artikel ini.');
      return;
    }
    const updatedArticles = articles.filter(a => a.id !== articleId);
    setArticles(updatedArticles);
    localStorage.setItem('educationArticles', JSON.stringify(updatedArticles));
    alert('Artikel berhasil dihapus.');
  };

  const filteredArticles = currentUser.role === 'mitra' ? articles.filter(a => a.authorId === currentUser.id) : articles;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-color-sampay-white">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Artikel Edukasi</h2>

      {currentUser.role === 'mitra' && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Tulis Artikel Baru</h3>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Judul Artikel</label>
            <input
              type="text"
              value={newArticle.title}
              onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Contoh: Cara Mendaur Ulang Botol Plastik"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Isi Artikel</label>
            <textarea
              value={newArticle.content}
              onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
              rows="5"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Tulis artikel Anda di sini..."
            ></textarea>
          </div>
          <button
            onClick={addArticle}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Publikasikan Artikel
          </button>
        </div>
      )}

      <div className="space-y-6">
        {filteredArticles.length > 0 ? (
          filteredArticles.map(article => (
            <div key={article.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800">{article.title}</h3>
              <div className="flex justify-between items-center mt-2 mb-4 text-sm text-gray-500">
                <span>Oleh: {article.authorName}</span>
                <span>{article.date}</span>
              </div>
              <p className="text-gray-700 whitespace-pre-line">{article.content}</p>
              {currentUser.role === 'mitra' && article.authorId === currentUser.id && (
                <button
                  onClick={() => deleteArticle(article.id)}
                  className="mt-4 text-red-600 hover:text-red-800 text-sm"
                >
                  Hapus Artikel
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Belum ada artikel.</p>
        )}
      </div>
    </div>
  );
};

export default Education;