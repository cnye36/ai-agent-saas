"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bot, Home, Settings, Plus, LayoutDashboard, Workflow, Wrench, Command, Share2 } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <Link 
          href="/" 
          className="flex items-center gap-2 px-4 py-3"
        >
          <Bot className="h-6 w-6" />
          <span className="font-bold">AI Agent SaaS</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard"}>
                  <Link href="/dashboard">
                    <Home className="mr-2 h-4 w-4" />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/agents"}>
                  <Link href="/agents">
                    <Bot className="mr-2 h-4 w-4" />
                    <span>My Agents</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/workflows"}>
                  <Link href="/workflows">
                    <Workflow className="mr-2 h-4 w-4" />
                    <span>Workflows</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Build</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/create-agent"}>
                  <Link href="/create-agent">
                    <Plus className="mr-2 h-4 w-4" />
                    <span>New Agent</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/tools"}>
                  <Link href="/tools">
                    <Wrench className="mr-2 h-4 w-4" />
                    <span>Tools</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/commands"}>
                  <Link href="/commands">
                    <Command className="mr-2 h-4 w-4" />
                    <span>Commands</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Other</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/settings"}>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/share"}>
                  <Link href="/share">
                    <Share2 className="mr-2 h-4 w-4" />
                    <span>Share & Embed</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

