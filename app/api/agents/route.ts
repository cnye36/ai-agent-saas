import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    const { description } = await req.json()
    const user = await prisma.user.findUnique({
      where: { email: session.user?.email as string },
    })

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    const agent = await prisma.agent.create({
      data: {
        name: `New Agent ${new Date().toISOString()}`,
        description,
        config: {},
        userId: user.id,
      },
    })

    return NextResponse.json({ agent })
  } catch (error) {
    console.error('Error creating agent:', error)
    return NextResponse.json({ message: "An error occurred while creating the agent" }, { status: 500 })
  }
}

