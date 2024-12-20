
import prismadb from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export async function POST(
  request: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const { categoryId } = params
    const { title, color } = await request.json()

    if (!title || !color || !categoryId) {
      return NextResponse.json({ message: 'Datos incompletos' }, { status: 400 })
    }

    const category = await prismadb.categories.findUnique({
      where: { id: categoryId }
    })

    if (!category) {
      return NextResponse.json({ message: 'Categoría no encontrada' }, { status: 404 })
    }

    const updatedCategory = await prismadb.categories.update({
      where: { id: categoryId },
      data: { name: title, color }
    })

    return NextResponse.json(updatedCategory, { status: 200 })

  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Error del servidor' }, { status: 500 })
  }
}
