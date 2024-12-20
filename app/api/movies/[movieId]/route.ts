
import prismadb from '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth'
import { NextResponse } from "next/server"


export async function GET(
  _: unknown,
  { params }: { params: { movieId: string } }
) {
  try {

    await serverAuth()

    const { movieId } = params

    console.log(movieId)

    if (!movieId) {
      return NextResponse.json({ message: 'Id no válido' }, { status: 404 })
    }

    const movie = await prismadb.movies.findUnique({
      where: { id: movieId }
    })

    if (!movie) {
      return NextResponse.json({ message: 'Id de Película no encontrada' }, { status: 404 })
    }

    return NextResponse.json(movie, { status: 200 })

  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Error del servidor' }, { status: 500 })
  }
}
