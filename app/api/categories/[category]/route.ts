
import { NextResponse } from 'next/server'
import prismadb from '@/lib/prismadb'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ category: string }> }
) {
  try {

    const category = (await params).category

    const movies = await prismadb.movies.findMany({
      where: {
        genres: {
          has: category,
        },
      },
    })

    if (movies.length === 0) {
      return NextResponse.json({ message: 'No se encontraron películas para esta categoría' }, { status: 404 })
    }

    return NextResponse.json(movies, { status: 200 })
  } catch (error) {
    console.error('Error al obtener las películas:', error)
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 })
  }
}
