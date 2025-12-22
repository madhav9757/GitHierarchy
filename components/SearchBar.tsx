'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, Github, Loader2, ArrowRight } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

export function SearchBar() {
  const [username, setUsername] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmed = username.trim()
    if (!trimmed) return
    setIsLoading(true)
    router.push(`/user/${trimmed}`)
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="w-full max-w-xl mx-auto"
    >
      <Card
        className={cn(
          'p-3 sm:p-4',
          'flex flex-col sm:flex-row items-stretch gap-3',
          'border-border/60 bg-background/70 backdrop-blur-xl',
          'shadow-sm'
        )}
      >
        {/* Input */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative flex-1">
                <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="GitHub username (e.g. vercel)"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                  className={cn(
                    'h-12 pl-9 pr-3',
                    'bg-background/60',
                    'focus-visible:ring-2 focus-visible:ring-primary'
                  )}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              Enter a GitHub username to explore repositories
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Button */}
        <Button
          type="submit"
          disabled={isLoading || !username.trim()}
          className={cn(
            'h-12 px-5',
            'flex items-center gap-2',
            'group'
          )}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Search className="h-4 w-4" />
              <span>Search</span>
              <ArrowRight className="h-4 w-4 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
            </>
          )}
        </Button>
      </Card>
    </motion.form>
  )
}
