
import bcrypt from 'bcrypt'
import prismadb from '@/lib/prismadb'
import { NextResponse } from 'next/server'


export async function GET() {
  return NextResponse.json({ message: 'Endpoint /api/register está funcionando!' })
}


export async function POST(request: Request) {
  
  try {
    const body = await request.json()
    const { email, name, password } = body

    const existingUser = await prismadb.users.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json({ message: 'Email already exists' }, { status: 422 })
    }

    const userName = name.split(' ')[0]

    const photoProfileOptions = [
      '/images/profiles/perfil1.png',
      '/images/profiles/perfil2.png',
      '/images/profiles/perfil3.png',
      '/images/profiles/perfil4.png',
    ]

    const randomPhotoProfile = photoProfileOptions[Math.floor(Math.random() * photoProfileOptions.length)]

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prismadb.users.create({
      data: {
        email,
        name, 
        hashedPassword,
        userName,
        role: 'user',
        photoProfile: randomPhotoProfile,
        image: '',
        emailVerified: new Date(),
      }
    })
    

    return NextResponse.json(user, { status: 200 })

  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Error del servidor' }, { status: 500 })
  }
}
