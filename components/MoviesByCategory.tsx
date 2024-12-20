'use client'

import useMoviesFromCategory from '@/hooks/useMoviesFromCategory'
import ShowLoading from './loadingComponent/ShowLoading'
import ShowMoviesByCols from './ShowMoviesByCols'
import { useCallback } from 'react'
import axios from 'axios'

interface MoviesByCategoryProps {
  categoryId: string
  labelNoResults: string
  isInMyList?: boolean
  onMutate?: () => void
}

export default function MoviesByCategory({ categoryId, labelNoResults, isInMyList, onMutate }: MoviesByCategoryProps) {

  const { data: movies, isLoading, mutate } = useMoviesFromCategory(categoryId)

  const handleMutate = useCallback(async () => {
    const response = await axios.get(`/api/my-list/categories/${categoryId}`)

    mutate({ movies: response.data })
    if (onMutate) {
      onMutate()
    }
  }, [mutate, onMutate])

  if (isLoading) {
    return (
      <ShowLoading />
    )
  }

  return (
    <>
      <ShowMoviesByCols 
        movies={movies} 
        labelNoResults={labelNoResults} 
        isInMyList={isInMyList} 
        onMutate={handleMutate}
      />
    </>
  )
}
