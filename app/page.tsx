
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import MainApp from '@/components/MainApp'



export default async function Home() {

  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth')
  }

  return (
    <>
      <MainApp />
    </>
  )
}
