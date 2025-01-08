'use client'

import Navbar from '@/components/Navbar'
import useMovie from '@/hooks/useMovie'
import { useParams, useRouter } from 'next/navigation'
import { FaPlay } from 'react-icons/fa'
import { PiRankingBold } from 'react-icons/pi'
import { useEffect, useState } from 'react';
import { VotingPanel } from '@/components/VotingPanel'
import FavoriteButton from '@/components/FavoriteButton'
import ShowLoading from '@/components/loadingComponent/ShowLoading'
import Comments from '@/components/detailsPage/Comments'

interface Vote {
  userId: string
  rating: number
}

export default function Details() {
  const router = useRouter()
  const params = useParams()
  const movieId = params?.movieId
  const { data: movie, refreshMovie, isLoading } = useMovie(movieId as string)

  const [isVoting, setIsVoting] = useState(false)
  const [userRating, setUserRating] = useState("n/a")

  useEffect(() => {
    const calculateUserRating = () => {
      if (!movie?.votes || movie?.votes.length === 0) {
        return "n/a"
      }
      if (movie?.votes.length === 1) {
        return movie?.votes[0].rating
      }
      const sum = movie?.votes.reduce((acc: number, vote: Vote) => acc + vote.rating, 0)
      return (sum / movie?.votes.length).toFixed(1)
    }

    setUserRating(calculateUserRating())
  }, [movie?.votes])

  const handleVoteSubmit = async () => {
    await refreshMovie()
  }

  if (isLoading) {
    return (
      <ShowLoading />
    )
  }

  
  return (
    <div className="p-0 bg-zinc-800 text-amber-50 min-h-screen">
      <Navbar />
      <div 
        className="w-full h-[48rem] mt-0 bg-cover bg-center relative flex items-end" 
        style={{ 
          backgroundImage: `url(${movie?.poster})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className="bg-gradient-to-t from-zinc-800 to-transparent w-full h-full absolute"></div>
        <div className="relative z-10 p-6">
          <h1 className="text-2xl font-bold text-amber-100 mb-2 mt-4">{movie?.title}</h1>
          <div className="bg-gray-800 bg-opacity-10 rounded-md">
            <p className="text-base text-amber-50 max-w-xl">
              {movie?.description}
            </p>
          </div>
          <p className="text-lg text-amber-50 opacity-80 mb-2 mt-6">{movie?.year}</p>
          <p className="text-lg text-amber-50 opacity-80 mb-4">{movie?.genres?.join(", ")}</p>
          <div className="text-lg flex gap-4 flex-row items-center">
            <div className="flex flex-row gap-2 items-center bg-zinc-800 p-2 rounded-md border-2 border-amber-600 shadow-sm shadow-amber-600">
              <span className="font-semibold text-amber-400">IMDB</span>
              <div className="hexagon bg-amber-400 w-8 h-8 flex justify-center items-center text-zinc-800 font-bold">
                {movie?.imdbRating}
              </div>
            </div>
            <div className="flex flex-row gap-2 items-center bg-zinc-800 p-2 rounded-md border-2 border-amber-600 shadow-sm shadow-amber-600">
              <span className="font-semibold text-amber-400">IMDB Usuarios</span>
              <div className="hexagon bg-amber-400 w-8 h-8 flex justify-center items-center text-zinc-800 font-bold">
                {userRating}
              </div>
            </div>
          </div>
          
          <div className="flex flex-row gap-4 mt-4">
            <button 
              onClick={() => router.push(`/watch/${movieId}`)}
              className="flex flex-row items-center bg-amber-100 text-zinc-800 px-4 py-2 rounded-md font-semibold border-2 border-amber-500 shadow-sm shadow-amber-100 hover:bg-amber-600 hover:scale-110 transition"
            >
              <FaPlay size={16} className="mr-2"/>
              Reproducir
            </button>
            <button 
              onClick={() => setIsVoting(true)}
              className="flex flex-row items-center bg-zinc-700 text-amber-50 px-4 py-2 rounded-md hover:bg-zinc-600 hover:scale-110"
            >
              <PiRankingBold size={20} className="mr-2 text-amber-50"/>
              Puntuar
            </button>
            <FavoriteButton movieId={movieId as string}/>
          </div>
        </div>
      </div>

      {isVoting && (
        <VotingPanel
          movieId={movieId as string}
          onCancel={() => {
            setIsVoting(false)
            handleVoteSubmit()
          }}
        />
      )}

      <div className="p-6 space-y-6">
        <div className="bg-amber-200 bg-opacity-20 p-4 rounded-lg">
          <h2 className="text-2xl font-semibold text-amber-400 mb-2 underline underline-offset-2">Dirección</h2>
          <p className="text-lg text-amber-50">{movie?.directors?.join(", ")}</p>
        </div>
        <div className="bg-amber-400 bg-opacity-40 p-4 rounded-lg ">
          <h2 className="text-2xl font-semibold text-amber-400 mb-2 underline underline-offset-2">Productores</h2>
          <p className="text-lg text-amber-50">{movie?.producers?.join(", ")}</p>
        </div>
        <div className="bg-amber-600 bg-opacity-60 p-4 rounded-lg">
          <h2 className="text-2xl font-semibold text-amber-400 mb-2 underline underline-offset-2">Elenco</h2>
          <p className="text-lg text-amber-50">{movie?.cast?.join(", ")}</p>
        </div>

        <Comments movieId={movie.id} />

      </div>
    </div>
  )
}
