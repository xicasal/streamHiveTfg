'use client'

import useBillboard from '@/hooks/useBillboard'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import PlayButton from './PlayButton'
import { useRouter } from 'next/navigation'


export default function Billboard() {

  const router = useRouter()

  const { data: movie } = useBillboard()

  return (
    <div className="relative h-[56.25vw]">

      <video 
        className="w-full h-[56.25vw] object-cover brightness-[60%]"
        poster={movie?.poster} 
        src={movie?.videoUrl}
        autoPlay
        muted
        loop
      />

      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">

        <p className="text-white text-2xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          {movie?.title}
        </p>

        <p className="text-white text-[14px] md:text-lg mt-3 md:mt-8 w-[70%] md:w-[60%] lg:w-[50%] drop-shadow-xl">
          {truncateText(movie?.description, 220)}
        </p>

        <div className="flex flex-row items-center mt-3 md:md:mt-4 gap-3">

          <PlayButton movieId={movie?.id}/>
          
          <button 
            onClick={() => router.push(`/details/${movie?.id}`)}
            className="bg-white text-amber-50 bg-opacity-20 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-lg lg:text-xl font-semibold flex flex-row items-center hover:bg-opacity-60 hover:scale-110 transition"
          >
            <AiOutlineInfoCircle className="mr-1 text-lg md:text-xl" />
            Detalles
          </button>

        </div>

      </div>

    </div>
  )
}

function truncateText(text: string, maxLength: number) {
  if (text?.length > maxLength) {
    return text.slice(0, maxLength) + '...'
  }
}
