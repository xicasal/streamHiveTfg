'use client'

import { useRouter } from 'next/navigation'
import { FaPlay } from 'react-icons/fa'


interface PlayButtonProps {
  movieId: string
}

export default function PlayButton({ movieId }: PlayButtonProps) {

  const router = useRouter()

  return (
    <button
      onClick={() => router.push(`/watch/${movieId}`)}
      className="bg-amber-400 bg-opacity-50 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-lg lg:text-xl font-semibold flex flex-row items-center hover:bg-opacity-100 hover:scale-110 transition transform"
    >
      <FaPlay size={13} className="mr-1"/>
      Reproducir
    </button>
  )
}
