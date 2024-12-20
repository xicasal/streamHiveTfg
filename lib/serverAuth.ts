
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import prismadb from '@/lib/prismadb'
import { getServerSession } from 'next-auth'


export default async function serverAuth() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    throw new Error('No autenticado')
  }

  const currentUser = await prismadb.users.findUnique({
    where: { email: session.user.email }
  })

  if (!currentUser) {
    throw new Error('Usuario no encontrado')
  }

  console.log('currentUser', currentUser)
  return currentUser
}