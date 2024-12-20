
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import MainApp from '@/components/MainApp'
import { authOptions } from '@/lib/authOptions'



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
