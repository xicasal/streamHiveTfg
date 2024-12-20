'use client'

import { useRef, useEffect, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
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

interface NavigationInterfaceProps {
  data: Movie[]
  title: string
}

export default function NavigationCarousel({ data, title }: NavigationInterfaceProps) {

  const carouselRef = useRef<HTMLDivElement>(null)
  const [isScrollable, setIsScrollable] = useState(true)

  useEffect(() => {
    const checkScrollability = () => {
      if (carouselRef.current) {
        setIsScrollable(carouselRef.current.scrollWidth > carouselRef.current.clientWidth)
      }
    }
    checkScrollability()
    window.addEventListener('resize', checkScrollability)
    return () => window.removeEventListener('resize', checkScrollability)
  }, [])

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({
      left: -300,
      behavior: 'smooth'
    })
  }

  const scrollRight = () => {
    carouselRef.current?.scrollBy({
      left: 300,
      behavior: 'smooth'
    })
  }

  return (
    <div className="relative w-full mt-4">
      {/* Título del carrusel */}
      <h2 className="text-3xl font-bold mb-4 text-amber-50 ml-4">{title}</h2>

      {/* Botones izquierdo */}
      {isScrollable && (
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10 opacity-75 shadow-md hover:opacity-100"
          onClick={scrollLeft}
        >
          <FaArrowLeft size={20} className="text-amber-600"/>
        </button>
      )}

      {/* Contenedor del carrusel */}
      <div
        ref={carouselRef}
        className="flex gap-8 overflow-x-scroll scrollbar-hide scroll-smooth snap-x snap-mandatory px-12 py-6 h-96"
      >
        {data.map((item, index) => (
            <MovieItem key={index} item={item}/>
        ))}
      </div>

      {/* Botón derecho */}
      {isScrollable && (
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-zinc-800 text-white p-2 rounded-full z-10 opacity-75 hover:opacity-100"
          onClick={scrollRight}
        >
          <FaArrowRight size={18} className="text-amber-600"/>
        </button>
      )}
    </div>
  )
}
