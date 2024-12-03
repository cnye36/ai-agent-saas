import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function Dashboard() {
  const session = await getServerSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="flex flex-col min-h-screen p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">AI Agent SaaS Dashboard</h1>
        <Button asChild variant="outline">
          <Link href="/api/auth/signout">Logout</Link>
        </Button>
      </header>
      <main className="flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard title="Create Agent" description="Design a new AI agent" link="/create-agent" />
          <DashboardCard title="Manage Workflows" description="View and edit your workflows" link="/workflows" />
          <DashboardCard title="Analytics" description="View performance metrics" link="/analytics" />
        </div>
      </main>
    </div>
  )
}

function DashboardCard({ title, description, link }: { title: string; description: string; link: string }) {
  return (
    <div className="border rounded-lg p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
      </div>
      <Button asChild>
        <Link href={link}>Go to {title}</Link>
      </Button>
    </div>
  )
}

