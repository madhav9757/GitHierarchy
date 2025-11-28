// components/repo-card.tsx
import Link from 'next/link'
import { Repo } from '@/lib/github'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, GitBranch, ArrowRight, Code } from 'lucide-react'

interface RepoCardProps {
  repo: Repo
}

/**
 * Modern GitHub repository card with hover effects, language badges, and quick stats.
 */
export function RepoCard({ repo }: RepoCardProps) {
  const repoPath = `/repo/${repo.owner.login}/${repo.name}`

  // Optional: language color mapping (better visual for badges)
  const languageColors: Record<string, string> = {
    JavaScript: 'bg-yellow-100 text-yellow-800',
    TypeScript: 'bg-blue-100 text-blue-800',
    Python: 'bg-green-100 text-green-800',
    HTML: 'bg-red-100 text-red-800',
    CSS: 'bg-blue-50 text-blue-700',
    Go: 'bg-cyan-100 text-cyan-800',
    Rust: 'bg-orange-100 text-orange-800',
    default: 'bg-gray-100 text-gray-800',
  }

  const languageClass = repo.language ? languageColors[repo.language] || languageColors.default : ''

  return (
    <Card className="group flex flex-col justify-between h-full hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 border border-border bg-background/50 backdrop-blur-md">
      
      {/* HEADER */}
      <CardHeader className="p-5 space-y-3">
        <Link href={repoPath} prefetch={false}>
          <div className="flex items-center space-x-3 cursor-pointer">
            <Code className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            <CardTitle className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors truncate">
              {repo.name}
            </CardTitle>
          </div>
        </Link>
        <CardDescription className="text-sm text-muted-foreground line-clamp-3 min-h-[60px]">
          {repo.description || 'No description provided for this repository.'}
        </CardDescription>
      </CardHeader>

      {/* CONTENT / STATS */}
      <CardContent className="p-5 pt-0">
        <div className="flex flex-wrap gap-3 items-center">
          {/* Language Badge */}
          {repo.language && (
            <Badge className={`px-3 py-1 font-medium ${languageClass} border-none`}>
              {repo.language}
            </Badge>
          )}

          {/* Stars */}
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="font-semibold">{repo.stargazers_count.toLocaleString()}</span>
            <span className="text-xs">Stars</span>
          </div>

          {/* Fork Indicator */}
          {repo.fork && (
            <div className="flex items-center space-x-1 text-xs italic text-green-600 dark:text-green-400">
              <GitBranch className="w-4 h-4" />
              <span>Forked</span>
            </div>
          )}
        </div>
      </CardContent>

      {/* FOOTER */}
      <CardFooter className="p-5 pt-2">
        <Link href={repoPath} prefetch={false} className="w-full">
          <div className="flex items-center justify-between text-sm text-muted-foreground group-hover:text-primary transition-colors duration-200">
            <span className="font-medium">View Repository Tree</span>
            <ArrowRight className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1" />
          </div>
        </Link>
      </CardFooter>
    </Card>
  )
}
