# AI Agent SaaS Platform

A Next.js-based SaaS platform for creating and managing AI agents and workflows.

## Tech Stack

- Next.js 15
- TypeScript
- Prisma
- PostgreSQL
- NextAuth.js
- Tailwind CSS
- Shadcn/ui

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/your-repo/ai-agent-saas.git
cd ai-agent-saas
```

2. Install dependencies:

```bash
pnpm install
```


3. Set up your environment variables:
- Copy `.env.example` to `.env`
- Update the variables with your own values

4. Set up the database:

```bash
pnpm prisma migrate dev
pnpm prisma db push
```

5. Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- User authentication
- AI agent creation and management
- Workflow automation
- Customizable agent configurations
- Responsive dashboard interface
