'use client'

import useCurrentUser from '@/hooks/useCurrentUser'
import { useRouter } from 'next/navigation'

export default function ShowAndPickProfile() {

  const router = useRouter()
  const {data: user} = useCurrentUser()

  return (

    <div className="group flex flex-col w-44 mx-auto items-center">

      <div 
        className="
          w-44 
          h-44
          rounded-md
          flex 
          items-center 
          justify-center
          overflow-hidden
          hexagon
        "
      >
        <img 
          src={user?.photoProfile}
          alt="Photo profile" 
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
        />

      </div>

      <div
        className="
          mt-4
          text-gray-400
          text-2xl
          text-center
          transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:text-amber-600
        "
      >
        {user?.userName}
      </div>

      <button 
        onClick={() => router.push('/')}
        className="mt-8 bg-amber-100 text-amber-600 text-xl px-4 py-2 rounded-lg border-2 border-amber-600 shadow-md shadow-amber-100 hover:bg-zinc-800 hover:shadow-amber-600 hover:scale-110 transition-transform duration-300 ease-in-out"
      >
        Continuar
      </button>
    </div>
  )
}
