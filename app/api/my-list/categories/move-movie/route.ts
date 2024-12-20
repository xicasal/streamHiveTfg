import prismadb from '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth'
import { without } from 'lodash'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const currentUser = await serverAuth()
    const { movieId, categoryId } = await request.json()

    // Verificar si la lista del usuario existe
    const myList = await prismadb.myListUsers.findFirst({
      where: { userId: currentUser.id }
    })

    if (!myList) {
      return NextResponse.json({ message: 'Lista no encontrada' }, { status: 404 })
    }

    // Encontrar la categoría actual del usuario
    const category = await prismadb.categories.findFirst({
      where: { id: categoryId, myListUserId: myList.id }
    })

    if (!category) {
      return NextResponse.json({ message: 'Categoría no encontrada' }, { status: 404 })
    }

    // Verificar si la película ya está en la misma categoría
    if (category.movieIds.includes(movieId)) {
      return NextResponse.json({ message: 'La película ya está en esta categoría' }, { status: 400 })
    }

    // Actualizar favoritesAux removiendo el movieId si existe
    const updatedFavoriteAux = without(myList.favoritesAux, movieId)

    // Encontrar todas las categorías del usuario
    const categories = await prismadb.categories.findMany({
      where: { myListUserId: myList.id }
    })

    // Eliminar el movieId de cualquier otra categoría que no sea la actual
    const updateCategoryPromises = categories
      .filter(category => category.id !== categoryId && category.movieIds.includes(movieId))
      .map(category =>
        prismadb.categories.update({
          where: { id: category.id },
          data: {
            movieIds: without(category.movieIds, movieId),
          },
        })
      )

    const updatedMovieIds = [...category.movieIds, movieId]

    // Ejecutar las actualizaciones en transacción
    await prismadb.$transaction([
      prismadb.myListUsers.update({
        where: { id: myList.id },
        data: { favoritesAux: updatedFavoriteAux },
      }),
      ...updateCategoryPromises, // Solo promesas válidas
      prismadb.categories.update({
        where: { id: categoryId },
        data: { movieIds: updatedMovieIds },
      }),
    ])

    return NextResponse.json({ message: 'Película movida con éxito' }, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ message: 'Error del servidor' }, { status: 500 })
  }
}
