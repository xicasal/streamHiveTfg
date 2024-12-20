
import prismadb from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const topMovies = await prismadb.movies.findMany({
      orderBy: { 
        imdbRating: 'desc' 
      },
      take: 12
    })

    return NextResponse.json(topMovies, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 })
  }
}
