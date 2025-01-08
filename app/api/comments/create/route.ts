
import prismadb from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    
    const { movieId, userId, comment, userName } = await request.json()

    await prismadb.comments.create({
      data: {
        movieId,
        userId,
        comment,
        userName
      }
    })

    return NextResponse.json({ message: "Comentario creado.", status: 201 })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Error al crear el comentario.", status: 500 })
  }
}
