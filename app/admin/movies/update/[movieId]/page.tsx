'use client'

import ShowLoading from '@/components/loadingComponent/ShowLoading'
import useCurrentUser from '@/hooks/useCurrentUser'
import useMovie from '@/hooks/useMovie'
import { fetcherAdminPost } from '@/lib/fetcher'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

// interface Movies {
//   id: string
//   title: string
//   description: string
//   videoUrl: string
//   poster: string
//   genres: string[]
//   cast: string[]
//   producers: string[]
//   directors: string[]
//   duration: string
//   year: string
//   imdbRating: number
//   imdbUsersRating: number
//   votes: { userId: string, rating: number }[]
// }

export default function AdminUpdateMovieById() {

  const router = useRouter()

  const params = useParams()
  const movieId = params?.movieId

  const { data: currentUser, isLoading: isLoadingCurrentUser  } = useCurrentUser()
  const { data: movie, isLoading: isLoadingMovie } = useMovie(movieId as string)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [poster, setPoster] = useState('')
  const [genres, setGenres] = useState<string[]>([])
  const [cast, setCast] = useState('')
  const [producers, setProducers] = useState('')
  const [directors, setDirectors] = useState('')
  const [duration, setDuration] = useState('')
  const [year, setYear] = useState('')
  const [imdbRating, setImdbRating] = useState('')

  useEffect(() => {
    if (movie) {
      setTitle(movie.title || '')
      setDescription(movie.description || '')
      setVideoUrl(movie.videoUrl || '')
      setPoster(movie.poster || '')
      setGenres(movie.genres || [])
      setCast(movie.cast ? movie.cast.join(', ') : '')
      setProducers(movie.producers ? movie.producers.join(', ') : '')
      setDirectors(movie.directors ? movie.directors.join(', ') : '')
      setDuration(movie.duration || '')
      setYear(movie.year || '')
      setImdbRating(movie.imdbRating ? movie.imdbRating.toString() : '')
    }
  }, [movie])

  const allGenres = ["Acción", "Aventura", "Comedia", "Documental", "Drama", "Fantasía", "Terror", "Niños", "Misterio", "Suspense", "Romance", "Ciencia ficción"]

  const handleGenreChange = (genre: string) => {
    if (genres.includes(genre)) {
      setGenres(genres.filter((g: string) => g !== genre))
    } else {
      setGenres([...genres, genre])
    }
  }

  const handleSave = async () => {
    try {
      await fetcherAdminPost(`/api/admin-movies/update/${movieId}`, {
        title,
        description,
        videoUrl,
        poster,
        genres,
        cast: cast ? cast.split(',').map((c: string) => c.trim()) : [],
        producers: producers ? producers.split(',').map((p: string) => p.trim()) : [],
        directors: directors ? directors.split(',').map((d: string) => d.trim()) : [],
        duration,
        year,
        imdbRating: imdbRating ? Number(imdbRating) : 0
      })
      alert('La película se ha modificado correctamente.')
      router.push('/admin/movies')
    } catch (error) {
      console.error(error)
    }
  }

  if (isLoadingCurrentUser || isLoadingMovie) {
    return (
      <ShowLoading />
    )
  }

  if (currentUser?.role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="p-4 text-white text-3xl font-bold">No tienes permisos para acceder a esta página</h1>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-white p-6">
      <div className="bg-zinc-800 p-6 rounded-lg shadow-lg w-full max-w-screen-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-amber-500">Actualizar Película</h1>
        
        <div className="mb-4">
          <label className="text-base font-medium text-amber-100">Título:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="mt-1 p-2 w-full border border-zinc-600 rounded bg-zinc-700 text-amber-50"
          />
        </div>

        <div className="mb-4">
          <label className="text-base font-medium text-amber-100">Descripción:</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            className="mt-1 p-2 w-full border border-zinc-600 rounded bg-zinc-700 text-amber-50 h-24"
          />
        </div>

        <div className="mb-4">
          <label className="text-base font-medium text-amber-100">VideoUrl:</label>
          <input 
            type="text" 
            value={videoUrl} 
            onChange={(e) => setVideoUrl(e.target.value)} 
            className="mt-1 p-2 w-full border border-zinc-600 rounded bg-zinc-700 text-amber-50"
          />
        </div>

        <div className="mb-4">
          <label className="text-base font-medium text-amber-100">Poster:</label>
          <input 
            type="text" 
            value={poster} 
            onChange={(e) => setPoster(e.target.value)} 
            className="mt-1 p-2 w-full border border-zinc-600 rounded bg-zinc-700 text-amber-50"
          />
        </div>

        <div className="mb-4">
          <label className="text-base font-medium text-amber-100">Géneros:</label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {allGenres.map((genre) => (
              <label key={genre} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={genres.includes(genre)}
                  onChange={() => handleGenreChange(genre)}
                  className="form-checkbox text-amber-500"
                />
                <span>{genre}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="text-base font-medium text-amber-100">Reparto (separado por comas):</label>
          <input 
            type="text" 
            value={cast} 
            onChange={(e) => setCast(e.target.value)} 
            className="mt-1 p-2 w-full border border-zinc-600 rounded bg-zinc-700 text-amber-50"
          />
        </div>

        <div className="mb-4">
          <label className="text-base font-medium text-amber-100">Director/es (separado por comas):</label>
          <input 
            type="text" 
            value={directors} 
            onChange={(e) => setDirectors(e.target.value)} 
            className="mt-1 p-2 w-full border border-zinc-600 rounded bg-zinc-700 text-amber-50"
          />
        </div>

        <div className="mb-4">
          <label className="text-base font-medium text-amber-100">Productores (separado por comas):</label>
          <input 
            type="text" 
            value={producers} 
            onChange={(e) => setProducers(e.target.value)} 
            className="mt-1 p-2 w-full border border-zinc-600 rounded bg-zinc-700 text-amber-50"
          />
        </div>

        <div className="mb-4">
          <label className="text-base font-medium text-amber-100">Duración:</label>
          <input 
            type="text" 
            value={duration} 
            onChange={(e) => setDuration(e.target.value)} 
            className="mt-1 p-2 w-full border border-zinc-600 rounded bg-zinc-700 text-amber-50"
          />
        </div>

        <div className="mb-4">
          <label className="text-base font-medium text-amber-100">Año:</label>
          <input 
            type="text" 
            value={year} 
            onChange={(e) => setYear(e.target.value)} 
            className="mt-1 p-2 w-full border border-zinc-600 rounded bg-zinc-700 text-amber-50"
          />
        </div>

        <div className="mb-4">
          <label className="text-base font-medium text-amber-100">Imdb:</label>
          <input 
            type="text" 
            value={imdbRating} 
            onChange={(e) => setImdbRating(e.target.value)} 
            className="mt-1 p-2 w-full border border-zinc-600 rounded bg-zinc-700 text-amber-50"
          />
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button 
            onClick={() => router.back()} 
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded text-white font-semibold transition-all"
          >
            Cancelar
          </button>
          
          <button 
            onClick={handleSave} 
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 rounded text-white font-semibold transition-all"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  )
}
