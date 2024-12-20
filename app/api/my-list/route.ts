
import prismadb from '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth'
import { NextResponse } from 'next/server'

export async function GET() {
  
  try {
    
    const currentUser = await serverAuth()

    if (!currentUser) {
      return NextResponse.json({ message: 'Usuario no autorizado' }, { status: 401 })
    }

    const myList = await prismadb.myListUsers.findFirst({
      where: { userId: currentUser.id }
    })

    const favoritesAux = await prismadb.movies.findMany({
      where: { id: { in: myList?.favoritesAux } }
    })

    return NextResponse.json(favoritesAux, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Error del servidor' }, { status: 500 })
  }
}
