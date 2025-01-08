
import prismadb from '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth'
import { NextResponse } from 'next/server'


export async function POST(request: Request) {
  try {
    const currentUser = await serverAuth()

    if (currentUser.role !== 'admin') {
      return NextResponse.json({ message: 'No tienes permisos para realizar esta acción.' }, { status: 401 })
    }

    const { title, description, videoUrl, poster, genres, cast, producers, directors, duration, year, imdbRating } = await request.json()

    const existingMovie = await prismadb.movies.findFirst({
      where: { title }
    })

    if (existingMovie) {
      return NextResponse.json({ message: 'Ya existe una película con ese título', exists: true }, { status: 202 })
    }

    await prismadb.movies.create({
      data: {
        title,
        description,
        videoUrl,
        poster,
        genres,
        cast,
        producers,
        directors,
        duration,
        year,
        imdbRating,
        imdbUsersRating: 0,
        votes: []
      }
    })

    return NextResponse.json({ message: 'Película creada' }, { status: 200 })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Error del servidor' }, { status: 500 })
  }
}
