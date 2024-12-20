import serverAuth from "@/lib/serverAuth"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const currentUser = await serverAuth()

    return NextResponse.json(currentUser, { status: 200 })

  } catch (error) {
    console.error("Error al obtener el usuario", error instanceof Error ? error.message : error)
    return NextResponse.json({ error: 'Error al obtener el usuario' }, { status: 400 })
  }
}
