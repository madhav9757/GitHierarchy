'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* shadcn */
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'

/* lucide */
import {
  Menu,
  X,
  Home,
  Info,
  Github,
  Sparkles,
  ArrowRight,
} from 'lucide-react'

/* extra FREE icons */
import { SiGithub } from 'react-icons/si'

import { ThemeToggle } from '../theme-toggle'
import { cn } from '@/lib/utils'

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/about', icon: Info },
]

/**
 * Ultra-polished Header
 * - shadcn everywhere
 * - animated nav + sheet
 * - heavy icon usage
 * - logic unchanged
 */
export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full',
        'border-b border-border/60',
        'bg-background/70 backdrop-blur-xl'
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        {/* LOGO */}
        <Link
          href="/"
          className="group flex items-center gap-2 text-xl md:text-2xl font-bold"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Github className="h-5 w-5" />
          </div>
          <span className="group-hover:text-primary transition-colors">
            GitHub Tree
          </span>
          <Badge
            variant="secondary"
            className="hidden md:inline-flex gap-1 text-xs"
          >
            <Sparkles className="h-3 w-3" />
            Explorer
          </Badge>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map(item => (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="gap-2"
                >
                  <Link href={item.href}>
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Go to {item.name}
              </TooltipContent>
            </Tooltip>
          ))}

          <ThemeToggle />
        </nav>

        {/* MOBILE NAV */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-72 bg-background/80 backdrop-blur-xl"
          >
            <div className="flex flex-col h-full">
              {/* HEADER */}
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <SiGithub className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">GitHub Tree</p>
                  <p className="text-xs text-muted-foreground">
                    Repository Explorer
                  </p>
                </div>
              </div>

              {/* LINKS */}
              <div className="flex flex-col gap-2">
                {navItems.map(item => (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className="group flex items-center justify-between rounded-md px-3 py-2 hover:bg-accent"
                    >
                      <div className="flex items-center gap-2">
                        <item.icon className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">
                          {item.name}
                        </span>
                      </div>
                      <ArrowRight className="h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                    </Link>
                  </SheetClose>
                ))}
              </div>

              {/* FOOTER */}
              <div className="mt-auto border-t border-border/60 pt-4 flex items-center justify-between">
                <ThemeToggle />
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="gap-2"
                >
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SiGithub className="h-4 w-4" />
                    GitHub
                  </a>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
