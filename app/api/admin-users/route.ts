
import prismadb from '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const currentUser = await serverAuth()

    if (currentUser.role !== 'admin') {
      return NextResponse.json({ error: 'No tienes permisos para acceder a esta página' }, { status: 401 })
    }

    const users = await prismadb.users.findMany({
      where: {
        id: {
          not: currentUser.id
        }
      }
    })

    return NextResponse.json(users, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Error al obtener el usuario' }, { status: 400 })
  }
}
