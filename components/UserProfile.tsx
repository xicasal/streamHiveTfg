'use client'

import useCurrentUser from '@/hooks/useCurrentUser'
import SignOutButton from './SignOutButton'


export default function UserProfileForTest() {
  const { data: user, error, isLoading } = useCurrentUser()
  
  if (isLoading) return <p className="text-white">Cargando...</p>
  if (error) return <p className="text-white">Error al cargar el usuario</p>


  return (
    <>
      <h1 className="text-2xl text-green-500">Proyecto TFG</h1>
      
      <div>
        <h1 className="text-white">Perfil de usuario</h1>
        <p className="text-white">Nombre: {user?.name}</p>
        <p className="text-white">Email: {user?.email}</p>
      </div>

      <SignOutButton className="mt-4" />
    </>
  )
}