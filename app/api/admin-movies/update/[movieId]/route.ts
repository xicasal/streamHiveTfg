
import prismadb from '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth'
import { NextResponse } from 'next/server'


export async function POST(
  request: Request,
  { params }: { params: Promise<{ movieId: string }> }
) {
  try {

    const currentUser = await serverAuth()

    if (currentUser.role !== 'admin') {
      return NextResponse.json({ error: 'No tienes permisos para realizar esta acción.' }, { status: 401 })
    }

    const { title, description, videoUrl, poster, genres, cast, producers, directors, duration, year, imdbRating } = await request.json()

    const movieId = (await params).movieId

    if (!movieId) {
      return NextResponse.json({ error: 'Id no válido' }, { status: 404 })
    }

    const movie = await prismadb.movies.findUnique({
      where: { id: movieId }
    })

    if (!movie) {
      return NextResponse.json({ error: 'Película no encontrada' }, { status: 404 })
    }

    await prismadb.movies.update({
      where: { id: movieId },
      data: {
        title: title,
        description: description,
        videoUrl: videoUrl,
        poster: poster,
        genres: genres,
        cast: cast,
        producers: producers,
        directors: directors,
        duration: duration,
        year: year,
        imdbRating: imdbRating
      }
    })

    return NextResponse.json({ message: 'Película actualizada' }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Error del servidor' }, { status: 500 })
  }
}
