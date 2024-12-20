
import prismadb from '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const currentUser = await serverAuth()

    if (!currentUser) {
      return NextResponse.json({ message: 'Usuario no autorizado' }, { status: 401 })
    }

    let myList = await prismadb.myListUsers.findFirst({
      where: { userId: currentUser.id }
    })

    const categoriesMyList = await prismadb.categories.findMany({
      where: { myListUserId: myList?.id }
    })

    return NextResponse.json(categoriesMyList, { status: 200 })

  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Error del servidor' }, { status: 500 })
    
  }
}

export async function POST(request: Request) {
  try {
    const currentUser = await serverAuth()
    const { title, color } = await request.json()

    if (!currentUser || !title || !color) {
      return NextResponse.json({ message: 'Usuario no autorizado o datos incompletos' }, { status: 401 })
    }

    let myList = await prismadb.myListUsers.findFirst({
      where: { userId: currentUser.id }
    })

    // Si no existe la lista, la creamos
    if (!myList) {
      myList = await prismadb.myListUsers.create({
        data: {
          userId: currentUser.id,
          favoritesAux: [],
          categories: {}
        }
      })
    }

    // Crear una nueva categoría
    const newCategory = await prismadb.categories.create({
      data: {
        myListUserId: myList.id,
        name: title,
        color,
        movieIds: []
      }
    })

    return NextResponse.json(newCategory, { status: 200 })

  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Error del servidor' }, { status: 500 })
  }
}
