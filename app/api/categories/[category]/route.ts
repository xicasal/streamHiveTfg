
import { NextResponse, NextRequest } from 'next/server'
import prismadb from '@/lib/prismadb'

export async function GET(
  request: NextRequest,
  context: { params: { category: string } }
) {
  console.log('Request received for category:', context.params.category)
  const { category } = context.params

  if (!category) {
    return NextResponse.json({ message: 'Id no válido' }, { status: 404 })
  }

  try {
    const movies = await prismadb.movies.findMany({
      where: {
        genres: {
          has: category,
        },
      },
    })

    return NextResponse.json(movies, { status: 200 })
  } catch (error) {
    console.error('Error al obtener las películas:', error)
    return NextResponse.json({ message: 'Error del servidor' }, { status: 500 })
  }
}
