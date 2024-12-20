'use client'

import { useRouter } from 'next/navigation'
import { FaPlay } from 'react-icons/fa'
import FavoriteButton from './FavoriteButton'
import { SlOptionsVertical } from 'react-icons/sl'
import { useState } from 'react'
import useCategoriesFromMyList from '@/hooks/useCategoriesFromMyList'
import { fetcherPost } from '@/lib/fetcher'

interface MovieItemProps {
  item: Record<string, any>,
  isInMyList?: boolean,
  onMutate?: () => void,
}

export default function MovieItem({ item, isInMyList, onMutate }: MovieItemProps) {
  const router = useRouter()
  const [showOptions, setShowOptions] = useState(false)

  const { data: categories } = isInMyList ? useCategoriesFromMyList() : { data: [] }

  const toggleOptions = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowOptions(!showOptions)
  }

  const moveToCategory = async (categoryId: string) => {
    try {
      console.log(`Move movie ${item.id} to category ${categoryId}`)
      await fetcherPost('api/my-list/categories/move-movie', {
        movieId: item.id,
        categoryId,
      })
      if (onMutate) {
        onMutate()
      }
      setShowOptions(false)
      // window.location.reload()
    } catch (error) {
      console.log('Error al mover la película', error)
    }
    
    
  }

  return (
    <div
      onClick={() => router.push(`/details/${item.id}`)}
      className="cursor-pointer snap-center flex-shrink-0 w-60 h-80 rounded-lg transform transition-transform duration-300 relative overflow-hidden group shadow-md shadow-amber-400 hover:shadow-amber-200 hover:scale-110"
    >
      <img
        src={item.poster}
        alt={item.title}
        className="w-full h-full object-cover rounded-lg"
      />
      <div className="absolute inset-0 bg-gray-900 bg-opacity-75 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-lg font-semibold text-amber-50">{item.title}</h3>
        <p className="text-sm text-amber-100">{item.duration}</p>
        <p className="text-sm text-amber-100">{item.genres.join(', ')}</p>
        <div className="flex gap-2 mt-2">
          <div 
            onClick={(e) => {
              e.stopPropagation()
              router.push(`/watch/${item.id}`)
            }}
            className="hexagon bg-amber-50 cursor-pointer w-10 h-10 flex justify-center items-center transition hover:bg-zinc-800 hover:scale-125"
          >
            <FaPlay className="ml-0.5 text-amber-700"/>
          </div>

          <div onClick={(e) => e.stopPropagation()}>
            <FavoriteButton movieId={item.id}/>
          </div>

          {isInMyList && (
            <div className="relative">
              <div 
                onClick={toggleOptions}
                className="hexagon bg-amber-50 ml-12 cursor-pointer w-10 h-10 flex justify-center items-center transition hover:bg-zinc-800 hover:scale-125"
              >
                <SlOptionsVertical className=" text-amber-700"/>
              </div>

              {showOptions && (
                <div className="absolute transform -translate-x-1/2 -translate-y-72 w-48 bg-white shadow-lg rounded-lg z-50">
                  <p className="px-4 py-2 text-zinc-800 font-semibold text-center cursor-default">Mover a Categoría</p>
                  <ul>
                    {categories && categories.map((category: any) => (
                      <li 
                        key={category.id}
                        onClick={(e) => {
                          e.stopPropagation()
                          moveToCategory(category.id)
                        }}
                        className="px-4 py-2 cursor-pointer hover:bg-zinc-200 text-zinc-700 text-center"
                      >
                        {category.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
