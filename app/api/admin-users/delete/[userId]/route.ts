
import prismadb from '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth'
import { NextResponse } from 'next/server'

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const currentUser = await serverAuth()
        
    if (currentUser.role !== 'admin') {
      return NextResponse.json({ error: 'No tienes permisos para acceder a esta página' }, { status: 401 })
    }

    const userId = (await params).userId

    if (!userId) {
      return NextResponse.json({ error: 'Id no válido' }, { status: 404 })
    }

    await prismadb.users.delete({
      where: { id: userId }
    })

    return NextResponse.json({ message: 'Usuario eliminado' }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Error del servidor' }, { status: 500 })
  }
}
