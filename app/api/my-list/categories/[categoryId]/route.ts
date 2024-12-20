
import prismadb from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ categoryId: string }> }
) {
  
  try {
    const categoryID = (await params).categoryId

    if (!categoryID) {
      return NextResponse.json({ message: 'Id no válido' }, { status: 404 })
    }

    const category = await prismadb.categories.findUnique({
      where: { id: categoryID },
      select: { movieIds: true }
    })

    if (!category) {
      return NextResponse.json({ message: 'No existe esta categoría' }, { status: 404 })
    }

    const movies = await prismadb.movies.findMany({
      where: { id: { in: category.movieIds } }
    })

    return NextResponse.json(movies, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Error del servidor' }, { status: 500 })
  }
}
