'use client'

import ShowLoading from '@/components/loadingComponent/ShowLoading'
import Navbar from '@/components/Navbar'
import useAdminMovies from '@/hooks/useAdminMovies'
import useCurrentUser from '@/hooks/useCurrentUser'
import { fetcherDelete } from '@/lib/fetcher'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { BiShow } from 'react-icons/bi'
import { FaRegEdit } from 'react-icons/fa'
import { IoIosAddCircle } from 'react-icons/io'
import { MdDelete } from 'react-icons/md'

interface Movie {
  id: string
  title: string
  description: string
  videoUrl: string
  poster: string
  genres: string[]
  cast: string[]
  producers: string[]
  directors: string[]
  duration: string
  year: string
  imdbRating: number
  imdbUsersRating: number
  votes: { userId: string, rating: number }[]
}

export default function AdminMoviesPage() {

  const router = useRouter()

  const { data: currentUser, isLoading: isLoadingCurrentUser  } = useCurrentUser()
  const { data: movies, isLoading: isLoadingMovies, mutate } = useAdminMovies()

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [movieToDelete, setMovieToDelete] = useState<Movie | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [searchMovie, setSearchMovie] = useState('')


  const handleEditClick = (movie: Movie) => {
    router.push(`/admin/movies/update/${movie.id}`)
  }

  const handleDeleteClick = (movie: Movie) => {
    setMovieToDelete(movie)
  }

  const handleDelete = async () => {
    if (movieToDelete) {
      console.log('Borrando pelicula: ', movieToDelete.title)
      setIsDeleting(true)
      try {
        await fetcherDelete(`/api/admin-movies/delete/${movieToDelete.id}`)
        mutate()
        setMovieToDelete(null)
      } catch (error) {
        console.error(error)
      } finally {
        setIsDeleting(false)
      }
    }
  }
  
  if (isLoadingCurrentUser || isLoadingMovies) {
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

  const filteredAndSortedMovies = movies
    ?.filter((movie: { title: string }) => 
      movie.title.toLowerCase().includes(searchMovie.toLowerCase())
    )
    .sort((a: Movie, b: Movie) => a.title.localeCompare(b.title))

  return (
    <div className="flex flex-col min-h-screen">
              
          <Navbar />
        
          <div className="p-10 text-amber-50 mt-24 text-center flex justify-center items-center gap-4">
            <h1 className="text-3xl font-bold">Gestión de películas</h1>
            <button 
              onClick={() => router.push('/admin/movies/create')} 
              className="text-amber-700 text-4xl hover:text-amber-500 hover:scale-110 transition"
            >
              <IoIosAddCircle />
            </button>
          </div>

          <div className="flex justify-center mb-1">
          <input 
            type="text"
            placeholder="Búsqueda por título..."
            value={searchMovie}
            onChange={(event) => setSearchMovie(event.target.value)}
            className="p-2 border rounded"
          />
        </div>
          
          <div className="container mx-auto p-8 bg-amber-800 text-amber-50 rounded-lg">
            <ul className="w-full">
              <li className="p-2 border-b border-zinc-800 font-bold grid grid-cols-2 text-center">
                <span className="text-left">Nombre</span>
                <span className="text-right">Opciones</span>
              </li>
              {filteredAndSortedMovies.map((movie: Movie) => (
                <li key={movie.id} className="p-2 border-b border-zinc-800 grid grid-cols-2 text-center">
                  <span className="text-left">{movie.title}</span>
                  <span className="text-right flex justify-end gap-2">
                    <button
                      onClick={() => setSelectedMovie(movie)}
                      className="p-1 bg-amber-100 rounded text-zinc-900"
                    >
                      <BiShow />
                    </button>

                    <button 
                      onClick={() => handleEditClick(movie)}
                      className="p-1 bg-zinc-800 rounded"
                    >
                      <FaRegEdit />
                    </button>
    
                    <button 
                      onClick={() => handleDeleteClick(movie)}
                      className="p-1 bg-red-800 rounded"
                    >
                      <MdDelete />
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          </div>
  
          {selectedMovie && (
            <div className="fixed inset-0 flex items-center justify-center bg-zinc-800 bg-opacity-50">
              <div className="bg-amber-50 p-6 rounded-lg shadow-lg text-zinc-900 max-w-lg w-full">
                <h2 className="text-xl font-bold mb-4">{selectedMovie.title}</h2>
                <p className="mb-2"><strong>Id:</strong> {selectedMovie.id}</p>
                <p className="mb-2"><strong>Año:</strong> {selectedMovie.year}</p>
                <p className="mb-2"><strong>Duración:</strong> {selectedMovie.duration}</p>
                <p className="mb-2"><strong>Géneros:</strong> {selectedMovie.genres.join(", ")}</p>
                <p className="mb-2"><strong>Directores:</strong> {selectedMovie.directors.join(", ")}</p>
                <p className="mb-2"><strong>Productores:</strong> {selectedMovie.producers.join(", ")}</p>
                <p className="mb-2"><strong>Reparto:</strong> {selectedMovie.cast.join(", ")}</p>
                <p className="mb-2"><strong>Rating IMDB:</strong> {selectedMovie.imdbRating}</p>
                <p className="mb-4"><strong>Descripción:</strong> {selectedMovie.description}</p>
                <div className="mt-4 flex justify-center gap-2">
                  <button 
                    onClick={() => setSelectedMovie(null)} 
                    className="p-2 bg-zinc-500 rounded"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          )}

          {movieToDelete && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-amber-50 p-6 rounded-lg shadow-lg text-center">
                <p className="mb-4">¿Estás seguro de que deseas eliminar <strong>{movieToDelete.title}</strong>?</p>
                <div className="flex justify-center gap-4">
                  <button 
                    onClick={() => setMovieToDelete(null)} 
                    className="p-2 bg-gray-500 rounded"
                  >
                    Cancelar
                  </button>

                  <button 
                    onClick={handleDelete} 
                    className="p-2 bg-red-600 rounded text-amber-50"
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                  <svg className="animate-spin h-5 w-5 mr-1 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                ) : "Confirmar"}
                  </button>
                </div>
              </div>
            </div>
          )}
  
        </div>
  )
}
