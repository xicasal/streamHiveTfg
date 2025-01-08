
import prismadb from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export async function DELETE(
  request: Request,
  { params } : { params: Promise<{ commentId: string }> }
) {
  try {
    
    const commentId = (await params).commentId

    if (!commentId) {
      return NextResponse.json({ message: 'Id no válido' }, { status: 404 })
    }

    await prismadb.comments.delete({
      where: { id: commentId }
    })

    return NextResponse.json({ message: 'Comentario eliminado' }, { status: 200 })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Error del servidor' }, { status: 500 })
  }
}
