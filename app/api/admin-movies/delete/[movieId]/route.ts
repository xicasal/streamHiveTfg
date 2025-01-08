
import prismadb from '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth'
import { NextResponse } from 'next/server'

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ movieId: string }> }
) {
  try {
    
    const currentUser = await serverAuth()

    if (currentUser.role !== 'admin') {
      return NextResponse.json({ error: 'No tienes permisos para realizar esta acción.' }, { status: 401 })
    }

    const movieId = (await params).movieId

    if (!movieId) {
      return NextResponse.json({ error: 'Id no válido' }, { status: 404 })
    }

    await prismadb.movies.delete({
      where: { id: movieId }
    })

    await prismadb.users.updateMany({
      where: { favoriteIds: { has: movieId } },
      data: { favoriteIds: { set: [] } }
    })

    await prismadb.myListUsers.updateMany({
      where: { favoritesAux: { has: movieId } },
      data: { favoritesAux: { set: [] } }
    })

    await prismadb.categories.updateMany({
      where: { movieIds: { has: movieId } },
      data: { movieIds: { set: [] } }
    })

    return NextResponse.json({ message: 'Película eliminada' }, { status: 200 })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Error del servidor' }, { status: 500 })
  }
}
