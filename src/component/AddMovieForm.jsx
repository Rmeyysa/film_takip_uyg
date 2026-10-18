import React, { useState } from 'react';

export default function AddMovieForm({ onAddMovie }) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Film');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState(8);
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newMovie = {
      id: Date.now(),
      title,
      type,
      genre: genre || 'Belirtilmedi',
      rating: Number(rating),
      status: 'İzlenecek',
      note,
    };

    onAddMovie(newMovie);

    // Formu temizle
    setTitle('');
    setGenre('');
    setRating(8);
    setNote('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded-xl mb-8 border border-slate-700 shadow-md">
      <h2 className="text-xl font-bold text-slate-100 mb-4">➕ Yeni Film / Dizi Ekle</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs text-slate-400 mb-1">Film / Dizi Adı</label>
          <input
            type="text"
            required
            placeholder="Örn: Interstellar"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1">Tür</label>
          <input
            type="text"
            placeholder="Örn: Bilim Kurgu, Dram"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1">Kategori</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-purple-500"
          >
            <option value="Film">Film</option>
            <option value="Dizi">Dizi</option>
          </select>
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1">Puan (1-10)</label>
          <input
            type="number"
            min="1"
            max="10"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-xs text-slate-400 mb-1">Not (İsteğe Bağlı)</label>
        <textarea
          placeholder="İzlemeden önce/sonra almak istediğin kısa not..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows="2"
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-purple-500"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold py-2.5 rounded-lg hover:opacity-90 transition"
      >
        Listeye Ekle
      </button>
    </form>
  );
}