
import useCurrentUser from '@/hooks/useCurrentUser'
import useFavorites from '@/hooks/useFavorites'
import axios from 'axios'
import { useCallback, useMemo } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { IoMdCheckmark } from 'react-icons/io'


interface FavoriteButtonProps {
  movieId: string
}

export default function FavoriteButton({ movieId }: FavoriteButtonProps) {

  const { mutate: mutateFavorites } = useFavorites()
  const { data: currentUser, mutate: mutateUser } = useCurrentUser()

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || []

    return list.includes(movieId)
  }, [currentUser, movieId])

  
  const toggleFavorites = useCallback(async () => {
    let response

    if (isFavorite) {
      response = await axios.delete('/api/favorite', { data: { movieId } })
    } else {
      response = await axios.post('/api/favorite', { movieId })
    }

    const updatedFavoriteIds = response?.data?.favoritesIds

    mutateUser({ ...currentUser, favoriteIds: updatedFavoriteIds })

    mutateFavorites()
  }, [movieId, isFavorite, currentUser, mutateUser, mutateFavorites])


  const Icon = isFavorite ? IoMdCheckmark : AiOutlinePlus


  return (
    <div 
      onClick={toggleFavorites}
      className="hexagon bg-amber-50 cursor-pointer group/item w-10 h-10 hexagon flex justify-center items-center transition hover:bg-zinc-800 hover:scale-125"
    >

      <Icon className="size-6 text-amber-700"/>

    </div>
  )
}
