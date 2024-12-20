
import { authOptions } from '@/lib/authOptions'
import prismadb from '@/lib/prismadb'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ message: 'No autenticado' }, { status: 401 })
    }

    const movies = await prismadb.movies.findMany()

    return NextResponse.json(movies, { status: 200 })

  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Error del servidor' }, { status: 500 })
  }


}