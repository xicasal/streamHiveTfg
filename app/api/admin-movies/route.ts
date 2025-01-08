
import prismadb from '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const currentUser = await serverAuth()

    if (currentUser.role !== 'admin') {
      return NextResponse.json({ error: 'No tienes permisos para acceder a esta página' }, { status: 401 })
    }

    const movies = await prismadb.movies.findMany()

    return NextResponse.json(movies, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Error al obtener las películas' }, { status: 400 })
  }
}
