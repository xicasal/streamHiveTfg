
import prismadb from '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth'
import { NextResponse } from 'next/server'


export async function POST(request: Request) {
  try {
    const currentUser = await serverAuth()
    
    if (currentUser.role !== 'admin') {
      return NextResponse.json({ error: 'No tienes permisos para acceder a esta página' }, { status: 401 })
    }

    const { userId, newRole } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: 'Id no válido' }, { status: 404 })
    }

    const user = await prismadb.users.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    await prismadb.users.update({
      where: { id: userId },
      data: { role: newRole }
    })

    return NextResponse.json({ message: 'Usuario actualizado' }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Error del servidor' }, { status: 500 })
  }
}
