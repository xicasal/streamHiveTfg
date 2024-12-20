'use client'

import ShowLoading from '@/components/loadingComponent/ShowLoading'
import Navbar from '@/components/Navbar'
import ShowMoviesByCols from '@/components/ShowMoviesByCols'
import useSearchMovies from '@/hooks/useSearchMovies'
import { useParams } from 'next/navigation'

export default function SearchPage() {

  const params = useParams()
  const target = params?.target as string
  const { data: movies, isLoading } = useSearchMovies(target)

  console.log(movies)

  if (isLoading) {
    return (
      <ShowLoading />
    )
  }

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-zinc-800 text-amber-50 p-10">
        <h1 className="text-3xl font-bold mb-8 mt-10">
          Resultados para &quot;{target}&quot;
        </h1>
        <ShowMoviesByCols movies={movies} labelNoResults="No hay resultados para esta búsqueda" />
      </div>
    </>
  )

}
