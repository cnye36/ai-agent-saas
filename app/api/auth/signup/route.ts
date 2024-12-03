import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { hash } from 'bcrypt'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    const exists = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (exists) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 })
    }
    const user = await prisma.user.create({
      data: {
        email,
        password: await hash(password, 10),
      },
    })
    return NextResponse.json({ user: { email: user.email } })
  } catch (error) {
    return NextResponse.json({ message: "An error occurred during signup" }, { status: 500 })
  }
}

