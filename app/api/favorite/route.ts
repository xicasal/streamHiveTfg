
import prismadb from '@/lib/prismadb'
import { NextResponse } from 'next/server'
import { without } from 'lodash'
import serverAuth from '@/lib/serverAuth'


export async function POST(request: Request) {
  try {
    const currentUser = await serverAuth()

    const { movieId } = await request.json()

    const existingMovie = await prismadb.movies.findUnique({
      where: { id: movieId }
    })

    if (!existingMovie) {
      return NextResponse.json({ message: 'ID de película no válido' }, { status: 422 })
    }

    // Verificamos si ya existe una lista de favoritos para el usuario
    let myList = await prismadb.myListUsers.findFirst({
      where: { userId: currentUser.id }
    })

    // Si no existe, la creamos
    if (!myList) {
      myList = await prismadb.myListUsers.create({
        data: {
          userId: currentUser.id,
          favoritesAux: [movieId],
          categories: {}
        }
      })
    } else { // Si ya existe, agregamos la película a la lista
      await prismadb.myListUsers.update({
        where: { id: myList.id },
        data: {
          favoritesAux: { push: movieId }
        }
      })
    }

    const updatedUser = await prismadb.users.update({
      where: { email: currentUser.email || ''},
      data: {
        favoriteIds: { push: movieId }
      },
    })

    return NextResponse.json(updatedUser, { status: 200 })

  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Error del servidor' }, { status: 500 })
  }
}


export async function DELETE(request: Request) {
  try {
    const currentUser = await serverAuth()

    const { movieId } = await request.json()

    const existingMovie = await prismadb.movies.findUnique({
      where: { id: movieId }
    })

    if (!existingMovie) {
      return NextResponse.json({ message: 'ID de película no válido' }, { status: 422 })
    }

    const updateFavoritesIds = without(currentUser.favoriteIds, movieId)

    // Actualizamos la lista de favoritos del usuario para quitar la película
    const myList = await prismadb.myListUsers.findFirst({
      where: { userId: currentUser.id }
    })

    const favoriteInMyList = myList?.favoritesAux.includes(movieId)

    if (favoriteInMyList) {
      const updatedFavoritesAux = without(myList?.favoritesAux, movieId)
      await prismadb.myListUsers.update({
        where: { id: myList?.id },
        data: {
          favoritesAux: updatedFavoritesAux
        }
      })
    }

    const favoriteInCategories = await prismadb.categories.findFirst({
      where: { myListUserId: myList?.id, movieIds: { has: movieId } }
    })

    if (favoriteInCategories) {
      const updatedCategory = without(favoriteInCategories.movieIds, movieId)
      await prismadb.categories.update({
        where: { id: favoriteInCategories.id },
        data: {
          movieIds: updatedCategory
        }
      })
    }

    const updatedUser = await prismadb.users.update({
      where: { email: currentUser.email || '' }, 
      data: {
        favoriteIds: updateFavoritesIds,
      }
    })

    return NextResponse.json(updatedUser, { status: 200 })

  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Error del servidor' }, { status: 500 })
  }
}
