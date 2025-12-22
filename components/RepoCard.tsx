'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Repo } from '@/lib/github'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Star,
  GitBranch,
  ArrowRight,
  Code,
  Eye,
  Calendar,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface RepoCardProps {
  repo: Repo
}

/**
 * Premium Repo Card
 * - shadcn everywhere
 * - glassmorphism
 * - motion micro-interactions
 * - logic untouched
 */
export function RepoCard({ repo }: RepoCardProps) {
  const repoPath = `/repo/${repo.owner.login}/${repo.name}`

  const languageColors: Record<string, string> = {
    JavaScript:
      'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
    TypeScript:
      'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    Python:
      'bg-green-500/10 text-green-600 dark:text-green-400',
    HTML:
      'bg-red-500/10 text-red-600 dark:text-red-400',
    CSS:
      'bg-sky-500/10 text-sky-600 dark:text-sky-400',
    Go:
      'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
    Rust:
      'bg-orange-500/10 text-orange-600 dark:text-orange-400',
    default:
      'bg-muted text-muted-foreground',
  }

  const languageClass = repo.language
    ? languageColors[repo.language] || languageColors.default
    : ''

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="h-full"
    >
      <Card
        className={cn(
          'group flex h-full flex-col justify-between',
          'border-border/60 bg-background/70 backdrop-blur-xl',
          'hover:shadow-xl transition-all'
        )}
      >
        {/* HEADER */}
        <CardHeader className="space-y-3">
          <Link href={repoPath} prefetch={false}>
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Code className="h-5 w-5" />
              </div>
              <CardTitle className="truncate text-lg font-semibold group-hover:text-primary transition-colors">
                {repo.name}
              </CardTitle>
            </div>
          </Link>

          <CardDescription className="line-clamp-3 min-h-[60px]">
            {repo.description || 'No description provided.'}
          </CardDescription>
        </CardHeader>

        {/* CONTENT */}
        <CardContent className="flex flex-wrap items-center gap-3">
          {repo.language && (
            <Badge
              variant="secondary"
              className={cn('px-3 py-1', languageClass)}
            >
              {repo.language}
            </Badge>
          )}

          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">
              {repo.stargazers_count.toLocaleString()}
            </span>
          </div>

          {repo.fork && (
            <div className="flex items-center gap-1 text-xs text-green-500">
              <GitBranch className="h-4 w-4" />
              Forked
            </div>
          )}
        </CardContent>

        {/* FOOTER */}
        <CardFooter>
          <Link
            href={repoPath}
            prefetch={false}
            className="group/link flex w-full items-center justify-between text-sm font-medium text-primary"
          >
            <span>Open repository</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
