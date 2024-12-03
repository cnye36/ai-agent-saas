'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Bot, Wand2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from "@/hooks/use-toast"

const AGENT_TEMPLATES = [
  { id: 'task-manager', label: '✓ Task Manager' },
  { id: 'content-creator', label: '🎨 Content Creator' },
  { id: 'social-media', label: '📱 Social Media Planner' },
  { id: 'seo-writer', label: '📝 Blog SEO Writer' },
  { id: 'researcher', label: '🔍 Research Analyst' },
  { id: 'marketer', label: '📊 Marketing Strategist' },
  { id: 'copywriter', label: '✍️ Copy Editor' },
]

export default function CreateAgent() {
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch('/api/agents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      })

      if (response.ok) {
        const data = await response.json()
        toast({
          title: "Agent created",
          description: "Your new AI agent has been created successfully.",
        })
        router.push(`/agents/${data.agent.id}/configure`)
      } else {
        const data = await response.json()
        toast({
          title: "Error",
          description: data.message || 'An error occurred while creating the agent',
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error creating agent:', error)
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
    <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900">
      <Card className="w-full max-w-2xl p-8 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Generate Your AI Agent <Bot className="inline-block ml-2 h-8 w-8" />
            </h1>
            <p className="text-muted-foreground">
              Describe your AI Agent's specialty and task—more details lead to better customization!
            </p>
          </div>

          <div className="space-y-4">
            <Textarea
              placeholder="I need an AI agent that can..."
              className="min-h-[120px] resize-none text-lg p-4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button 
              type="submit" 
              size="lg" 
              className="w-full text-lg"
              disabled={isLoading}
            >
              <Wand2 className="mr-2 h-5 w-5" />
              {isLoading ? 'Generating...' : 'Generate Agent'}
            </Button>
          </div>

          <div className="space-y-4">
            <div className="text-sm text-muted-foreground text-center">
              or choose from a template
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {AGENT_TEMPLATES.map((template) => (
                <Button
                  key={template.id}
                  variant="secondary"
                  className="text-sm"
                  onClick={() => setDescription(`Create an AI agent that serves as a ${template.label.split(' ').slice(1).join(' ')}`)}
                >
                  {template.label}
                </Button>
              ))}
            </div>
          </div>
        </form>
      </Card>
    </div>
  )
}

