
import MovieItem from './MovieItem'


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
  votes: []
  year: string
  duration: string
  imdbRating: number
  imdbUsersRating: number
}

interface ShowMoviesByColsProps {
  movies: Movie[],
  labelNoResults: string, 
  isInMyList?: boolean,
  onMutate?: () => void,
}

export default function ShowMoviesByCols({ movies, labelNoResults, isInMyList, onMutate }: ShowMoviesByColsProps) {
  return (
    <>
      {movies?.length > 0 ? (
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6'>
          {movies.map((movie: Movie) => (
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
