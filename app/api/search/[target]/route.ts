
import prismadb from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ target: string }> }
) {
  const target = (await params).target

  try {
    if (!target) {
      return NextResponse.json({ message: 'Id no válido' }, { status: 404 })
    }

    const decodedTargetAndLowerCase = decodeURIComponent(target).toLowerCase()

    const movies = await prismadb.movies.findMany()

    const filteredMovies = movies.filter(movie => 
      movie.title.toLowerCase().includes(decodedTargetAndLowerCase) || 
      movie.description.toLowerCase().includes(decodedTargetAndLowerCase) || 
      movie.year.toString().includes(decodedTargetAndLowerCase) ||
      movie.cast.some(actor => actor.toLowerCase().includes(decodedTargetAndLowerCase)) ||
      movie.directors.some(director => director.toLowerCase().includes(decodedTargetAndLowerCase)) ||
      movie.producers.some(producer => producer.toLowerCase().includes(decodedTargetAndLowerCase)) 
    )

    return NextResponse.json(filteredMovies, { status: 200 })

  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Error del servidor' }, { status: 500 })
  }

}
