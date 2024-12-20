
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import ShowAndPickProfile from '@/components/ShowProfile'
import { authOptions } from '@/lib/authOptions'

export default async function ProfilesPage() {

  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth')
  }


  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-4xl md:text-6xl text-amber-50 text-center">
          ¡Bienvenido!
        </h1>

        <div className="flex items-center justify-center gap-8 mt-10">

          <ShowAndPickProfile />

        </div>
      </div>
    </div>
  )
}
