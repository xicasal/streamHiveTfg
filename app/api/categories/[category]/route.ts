
import { NextResponse } from 'next/server'
import prismadb from '@/lib/prismadb'

export async function GET(
  _: unknown,
  { params }: { params: { category: string } }
) {
  const { category } = params

  if (!category) {
    return NextResponse.json({ message: 'Id no válido' }, { status: 404 })
  }

  try {
    const movies = await prismadb.movies.findMany({
      where: { genres: {
        has: category
      } }
    })

    return NextResponse.json(movies, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Error del servidor' }, { status: 500 })
  }
}
