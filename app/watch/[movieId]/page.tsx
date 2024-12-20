'use client'

import useMovie from "@/hooks/useMovie"
import { useParams, useRouter } from "next/navigation"
import { FaArrowLeft } from "react-icons/fa"

export default function Watch() {
  const router = useRouter()
  const params = useParams()
  const movieId = params?.movieId

  const { data: movie } = useMovie(movieId as string)

  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <FaArrowLeft
          onClick={() => router.back()}
          className="text-amber-50 cursor-pointer hover:scale-110 transition-transform"
          size={25}
        />
        <p className="text-amber-50 text-xl md:text-3xl font-bold">
          <span className="font-light">Viendo:</span> {movie?.title}
        </p>
      </nav>

      <div className="h-full w-full flex items-center justify-center">
        <video
          className="h-auto w-auto max-h-full max-w-full"
          src={movie?.videoUrl}
          autoPlay
          controls
          controlsList="nodownload"
        />
      </div>
    </div>
  );
}
