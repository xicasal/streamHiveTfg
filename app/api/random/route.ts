
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import prismadb from '@/lib/prismadb'
import { authOptions } from '@/lib/authOptions'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ message: 'No autenticado' }, { status: 401 })
    }

    const moviesCount = await prismadb.movies.count()
    const randomIndex = Math.floor(Math.random() * moviesCount)

    const randomMovie = await prismadb.movies.findMany({
      skip: randomIndex,
      take: 1
    })

    return NextResponse.json(randomMovie[0], { status: 200 })

  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Error del servidor' }, { status: 500 })
  }
}