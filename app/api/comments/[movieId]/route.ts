
import prismadb from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params } : { params: Promise<{ movieId: string }> }
) {
  try {
    
    const movieId = (await params).movieId

    if (!movieId) {
      return NextResponse.json({ message: 'Id no válido' }, { status: 404 })
    }

    const comments = await prismadb.comments.findMany({
      where: { movieId },
      orderBy: { createdAt: 'desc' },
      include: { user: true }
    })

    return NextResponse.json(comments, { status: 200 })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Error del servidor' }, { status: 500 })
    
  }
}
