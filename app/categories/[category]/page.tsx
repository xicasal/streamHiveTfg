'use client'

import ShowLoading from '@/components/loadingComponent/ShowLoading'
import Navbar from '@/components/Navbar'
import ShowMoviesByCols from '@/components/ShowMoviesByCols'
import useCategory from '@/hooks/useCategory'
import { useParams } from 'next/navigation'

export default function CategoryPageByCategory() {
  const { category } = useParams()
  const decodedCategory = decodeURIComponent(category?.toString() || '') 

  const { data: movies, isLoading } = useCategory(decodedCategory)
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
          Películas de {decodedCategory}
        </h1>
        <ShowMoviesByCols 
          movies={movies} 
          labelNoResults="No hay películas en esta categoría" 
        />
      </div>
    </>
  )
}
