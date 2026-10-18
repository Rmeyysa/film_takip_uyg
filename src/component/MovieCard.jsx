import React, { useState } from 'react';

export default function MovieCard({ movie, onDelete, onToggleStatus, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(movie.title);
  const [genre, setGenre] = useState(movie.genre);
  const [rating, setRating] = useState(movie.rating);
  const [note, setNote] = useState(movie.note || '');

  const handleSave = (e) => {
    e.preventDefault();
    onUpdate({
      ...movie,
      title,
      genre,
      rating: Number(rating),
      note,
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <form onSubmit={handleSave} className="bg-slate-800 rounded-xl p-5 border border-purple-500 shadow-md">
        <h4 className="text-sm font-bold text-purple-400 mb-3">✏️ Filmi Düzenle</h4>
        
        <div className="space-y-3 mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-sm text-slate-200"
            required
          />
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-sm text-slate-200"
          />
          <div className="flex gap-2">
            <input
              type="number"
              min="1"
              max="10"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-20 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-sm text-slate-200"
            />
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Not..."
              rows="1"
              className="flex-1 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-sm text-slate-200"
            ></textarea>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="text-xs px-3 py-1 rounded bg-slate-700 text-slate-300 hover:bg-slate-600"
          >
            İptal
          </button>
          <button
            type="submit"
            className="text-xs px-3 py-1 rounded bg-purple-600 text-white hover:bg-purple-500 font-semibold"
          >
            Kaydet
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-gray-800">{movie.title}</h3>
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
          movie.type === 'Film' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
        }`}>
          {movie.type}
        </span>
      </div>

      <p className="text-sm text-gray-500 mb-2">Tür: <span className="font-medium text-gray-700">{movie.genre}</span></p>
      
      <div className="flex items-center gap-1 mb-3">
        <span className="text-yellow-500 font-bold">★</span>
        <span className="text-sm font-semibold text-gray-700">{movie.rating} / 10</span>
      </div>

      {movie.note && (
        <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded mb-4 italic">
          "{movie.note}"
        </p>
      )}

      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
        <button
          onClick={() => onToggleStatus(movie.id)}
          className={`text-xs px-3 py-1.5 rounded-lg font-medium transition ${
            movie.status === 'İzlendi'
              ? 'bg-green-100 text-green-700 hover:bg-green-200'
              : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
          }`}
        >
          {movie.status === 'İzlendi' ? '✓ İzlendi' : '⏳ İzlenecek'}
        </button>

        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-xs text-purple-600 hover:text-purple-800 font-medium px-2 py-1"
          >
            Düzenle
          </button>
          <button
            onClick={() => onDelete(movie.id)}
            className="text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1"
          >
            Sil
          </button>
        </div>
      </div>
    </div>
  );
}