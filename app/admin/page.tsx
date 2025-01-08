'use client'

import ShowLoading from '@/components/loadingComponent/ShowLoading'
import Navbar from '@/components/Navbar'
import useCurrentUser from '@/hooks/useCurrentUser'
import { useRouter } from 'next/navigation'

export default function AdminPage() {

  const router = useRouter()
  const { data, isLoading } = useCurrentUser()

  if (isLoading) {
    return (
      <ShowLoading />
    )
  }

  if (data?.role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="p-4 text-white text-3xl font-bold">No tienes permisos para acceder a esta página</h1>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      
      <Navbar />

      <div className="p-10 text-amber-50 mt-24 text-center">
        <h1 className="text-3xl font-bold mb-10">¡Bienvenido a la gestión de Stream Hive!
        </h1>
        <div className="flex gap-10 justify-center mt-20">

          <div
            onClick={() => router.push('/admin/users')}
            className="bg-amber-600 p-5 ml-4 border-2 border-amber-200 rounded-lg shadow-md shadow-amber-100 w-2/3 h-96 text-center flex items-center justify-center transition hover:scale-110 cursor-pointer"
          >
            <h2 className="text-2xl font-semibold">Gestión de usuarios</h2>
          </div>

          <div
            onClick={() => router.push('/admin/movies')}
            className="bg-amber-800 p-5 mr-4 border-2 border-amber-200 rounded-lg shadow-md shadow-amber-100 w-2/3 h-96 text-center flex items-center justify-center transition hover:scale-110 cursor-pointer"
          >
            <h2 className="text-2xl font-semibold">Gestión de películas</h2>
          </div>

        </div>
      </div>
      
    </div>
  )
}
