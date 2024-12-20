
import MovieItem from './MovieItem'

interface ShowMoviesByColsProps {
  movies: Record<string, any>[]
  labelNoResults: string, 
  isInMyList?: boolean,
  onMutate?: () => void,
}

export default function ShowMoviesByCols({ movies, labelNoResults, isInMyList, onMutate }: ShowMoviesByColsProps) {
  return (
    <>
      {movies?.length > 0 ? (
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6'>
          {movies.map((movie: Record<string, any>) => (
            <MovieItem 
              key={movie.id} 
              item={movie} 
              isInMyList={isInMyList} 
              onMutate={onMutate}
            />
          ))}
        </div>
      ) : (
        <div className='flex justify-center mt-40 bg-zinc-400 p-10 rounded-lg'>
          <p className='text-center text-2xl'>
            {labelNoResults}
          </p>
        </div>
      )}
    </>
  )
}
