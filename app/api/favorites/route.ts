
import prismadb from '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const currentUser = await serverAuth()

    const favoritesMovies = await prismadb.movies.findMany({
      where: { id: { in: currentUser?.favoriteIds } }
    })

    console.log('funciona!')

    return NextResponse.json(favoritesMovies, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Error del servidor' }, { status: 500 })
  }
}
