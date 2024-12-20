
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';
import { NextResponse } from 'next/server';

type Vote = { userId: string; rating: number };

export async function GET(
  request: Request,
  { params }: { params: Promise<{ movieId: string }> }
) {
  const movieId = (await params).movieId

  if (!movieId) {
    return NextResponse.json({ message: 'Id no válido' }, { status: 404 });
  }

  const movie = await prismadb.movies.findUnique({
    where: { id: movieId },
  });

  if (!movie) {
    return NextResponse.json({ message: 'Id de Película no encontrada' }, { status: 404 });
  }

  return NextResponse.json(movie, { status: 200 });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ movieId: string }> }
) {
  const currentUser = await serverAuth()
  const movieId = (await params).movieId
  const { rating } = await request.json()

  if (!movieId || !rating) {
    return NextResponse.json({ message: 'Datos no válidos' }, { status: 400 })
  }

  if (rating < 1 || rating > 10) {
    return NextResponse.json({ message: 'Rating fuera de rango (1-10)' }, { status: 400 })
  }

  try {
    const movie = await prismadb.movies.findUnique({
      where: { id: movieId },
    });

    if (!movie) {
      return NextResponse.json({ message: 'Película no encontrada' }, { status: 404 })
    }

    const existingVotes: Vote[] = Array.isArray(movie.votes) ? (movie.votes as Vote[]) : []
    const voteIndex = existingVotes.findIndex((vote) => vote.userId === currentUser.id)

    if (voteIndex !== -1) {
      existingVotes[voteIndex].rating = rating
    } else {
      existingVotes.push({ userId: currentUser.id, rating });
    }

    await prismadb.movies.update({
      where: { id: movieId },
      data: { votes: existingVotes },
    });

    return NextResponse.json({ message: 'Voto registrado' }, { status: 200 })
  } catch (error) {
    console.error('Error inesperado:', error);
    return NextResponse.json({ message: 'Error del servidor' }, { status: 500 })
  }
}
