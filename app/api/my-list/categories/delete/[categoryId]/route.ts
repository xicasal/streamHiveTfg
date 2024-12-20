
import { union } from 'lodash'
import { NextResponse } from 'next/server'
import prismadb from '@/lib/prismadb'

export async function DELETE(
  _: unknown,
  { params }: { params: { categoryId: string } }
) {
  try {
    const { categoryId } = params

    if (!categoryId) {
      return NextResponse.json({ message: 'Datos incompletos' }, { status: 400 })
    }

    const category = await prismadb.categories.findUnique({
      where: { id: categoryId }
    })

    if (!category) {
      return NextResponse.json({ message: 'Categoría no encontrada' }, { status: 404 })
    }

    const moviesInCategory = category.movieIds || []

    const myList = await prismadb.myListUsers.findFirst({
      where: { id: category.myListUserId }
    })

    if (!myList) {
      return NextResponse.json({ message: 'Lista no encontrada' }, { status: 404 })
    }

    if (moviesInCategory.length > 0) {
      const updatedFavoritesAux = union(myList.favoritesAux, moviesInCategory)

      await prismadb.myListUsers.update({
        where: { id: myList.id },
        data: { favoritesAux: updatedFavoritesAux }
      })
    }

    await prismadb.categories.delete({
      where: { id: categoryId }
    })

    return NextResponse.json({ message: 'Categoría eliminada' }, { status: 200 })
    
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Error del servidor' }, { status: 500 })
  }
}