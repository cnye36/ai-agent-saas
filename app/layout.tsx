import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/providers'
import { SidebarNav } from '@/components/sidebar-nav'
import { SidebarInset } from '@/components/ui/sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AI Agent SaaS',
  description: 'Create and manage AI agents and workflows',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex h-screen">
            <SidebarNav />
            <SidebarInset>
              {children}
            </SidebarInset>
          </div>
        </Providers>
      </body>
    </html>
  )
}

