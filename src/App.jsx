import React, { useState } from 'react';
import { initialMovies } from './interfaces/types';
import MovieCard from './component/MovieCard';
import AddMovieForm from './component/AddMovieForm';

export default function App() {
  const [movies, setMovies] = useState(initialMovies);

  // Yeni film ekleme
  const handleAddMovie = (newMovie) => {
    setMovies([newMovie, ...movies]);
  };

  // Film Güncelleme
  const handleUpdateMovie = (updatedMovie) => {
    setMovies(
      movies.map((movie) => (movie.id === updatedMovie.id ? updatedMovie : movie))
    );
  };

  // Durum değiştirme (İzlendi / İzlenecek)
  const handleToggleStatus = (id) => {
    setMovies(
      movies.map((movie) =>
        movie.id === id
          ? {
              ...movie,
              status: movie.status === 'İzlendi' ? 'İzlenecek' : 'İzlendi',
            }
          : movie
      )
    );
  };

  // Film Silme
  const handleDelete = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        {/* Başlık */}
        <header className="mb-8 border-b border-slate-800 pb-5">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            🎬 Film & Dizi Takip Listesi
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            İzlediğin ve izleyeceğin tüm yapımları tek bir yerden yönet.
          </p>
        </header>

        {/* Ekleme Formu */}
        <AddMovieForm onAddMovie={handleAddMovie} />

        {/* Film Kartları Listesi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onToggleStatus={handleToggleStatus}
              onDelete={handleDelete}
              onUpdate={handleUpdateMovie}
            />
          ))}
        </div>

        {movies.length === 0 && (
          <p className="text-center text-slate-500 my-10">
            Listende henüz hiç film veya dizi yok.
          </p>
        )}
      </div>
    </div>
  );
}