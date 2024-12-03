'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Bot, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from "@/hooks/use-toast"

interface Agent {
  id: string
  name: string
  description: string
  config: any
}

export function ConfigureAgentForm({ agent: initialAgent }: { agent: Agent }) {
  const [agent, setAgent] = useState(initialAgent)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch(`/api/agents/${agent.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(agent),
      })

      if (response.ok) {
        toast({
          title: "Agent updated",
          description: "Your AI agent has been updated successfully.",
        })
        router.push('/agents')
      } else {
        const data = await response.json()
        toast({
          title: "Error",
          description: data.message || 'An error occurred while updating the agent',
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error updating agent:', error)
      toast({
        title: "Error",
        description: 'An unexpected error occurred',
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Configure Your AI Agent</CardTitle>
          <CardDescription>Customize your agent's behavior and capabilities</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Agent Name</Label>
              <Input
                id="name"
                value={agent.name}
                onChange={(e) => setAgent({ ...agent, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={agent.description}
                onChange={(e) => setAgent({ ...agent, description: e.target.value })}
                required
              />
            </div>
            {/* Add more configuration options here */}
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? 'Saving...' : 'Save Configuration'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

