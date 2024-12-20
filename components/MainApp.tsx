'use client'

import Billboard from "./Billboard";
import Navbar from "./Navbar";
import useMovieList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";
import NavigationCarousel from "./NavigationCarousel";
import ShowLoading from "./loadingComponent/ShowLoading";
import useTopMovies from "@/hooks/useTopMovies";

export default function MainApp() {

  const { data: movies = [], isLoading: loadingMovies } = useMovieList()
  const { data: favorites = [], isLoading: loadingFavorites } = useFavorites()
  const { data: topMovies = [], isLoading: loadingTopMovies } = useTopMovies()

  if (loadingMovies || loadingFavorites || loadingTopMovies) {
    return (
      <ShowLoading />
    )
  }

  const shuffledMovies = shuffleArray([...movies])

  return (
    <>
    
      <Navbar />

      <Billboard />

      <div className="pb-40">
        
        <NavigationCarousel title="Recomendadas" data={shuffledMovies}/>

        <NavigationCarousel title="Mejor valoradas" data={topMovies}/>
        
        { favorites.length > 0 && (
          <NavigationCarousel title="Mi Lista" data={favorites}/>
        )}

      </div>

    </>
  )
}

interface Movie {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  poster: string;
  genres: string[];
  cast: string[];
  producers: string[];
  directors: string[];
  votes: [];
  year: string;
  duration: string;
  imdbRating: number;
  imdbUsersRating: number;
}

function shuffleArray(array: Movie[]): Movie[] {
  const shuffled = array.sort(() => Math.random() - 0.5)
  return shuffled.slice(0, 12)
}
