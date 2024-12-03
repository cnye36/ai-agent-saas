import { use } from 'react'
import { ConfigureAgentForm } from './configure-agent-form'
import prisma from '@/lib/prisma'
import { getServerSession } from "next-auth/next"
import { redirect } from 'next/navigation'

async function getAgent(id: string) {
  const session = await getServerSession()
  
  if (!session) {
    redirect('/login')
  }

  const agent = await prisma.agent.findUnique({
    where: {
      id,
    },
  })

  if (!agent) {
    throw new Error('Agent not found')
  }

  return agent
}

export default function ConfigureAgentPage({ params }: { params: { id: string } }) {
  const agent = use(getAgent(params.id))
  
  return <ConfigureAgentForm agent={agent} />
}

