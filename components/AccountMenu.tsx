'use client'

import useCurrentUser from '@/hooks/useCurrentUser'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface AccountMenuProps {
  visible?: boolean
}

export default function AccountMenu({ visible }: AccountMenuProps) {

  const router = useRouter()

  if(!visible) return null

  const { data: user } = useCurrentUser()

  return (
    <div className="bg-zinc-800 w-56 absolute top-12 right-0 px-8 py-5 flex-col border-2 border-amber-600 rounded-xl flex">

      <div className="flex flex-col gap-3">

        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">

          <img 
            src={user?.photoProfile} 
            alt="Profile" 
            className="w-8 hexagon"
          />
          <p className="text-amber-50 text-base cursor-default">
            {user?.userName}
          </p>

        </div>

        <hr className="bg-zinc-500 border-0 h-px my-4"/>

        <div
          onClick={() => {
            router.push('/')
            signOut()
          }}
          className="px-3 text-center text-white text-base hover:text-amber-600 hover:scale-125 cursor-pointer"
        >
          Cerrar sesión
        </div>

      </div>

    </div>
  )
}



