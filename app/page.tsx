'use client'

import { motion } from 'framer-motion'
import { SearchBar } from '@/components/SearchBar'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FolderTree, Moon, Smartphone } from 'lucide-react'

export default function Home() {
  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl"
      >
        <Badge variant="secondary" className="mb-4">
          GitHub Repository Explorer
        </Badge>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
          Explore GitHub Repositories
        </h1>

        <p className="mt-4 text-lg md:text-xl text-muted-foreground">
          Enter a GitHub username to browse repositories, folders, and files
          with a clean tree view — fast and distraction-free.
        </p>

        {/* Search */}
        <div className="mt-10 flex justify-center">
          <div className="w-full max-w-md">
            <SearchBar />
          </div>
        </div>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-20 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3"
      >
        <Card className="transition hover:shadow-xl">
          <CardContent className="p-6 text-left space-y-3">
            <FolderTree className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-semibold">Fast Navigation</h3>
            <p className="text-sm text-muted-foreground">
              Instantly browse repository file structures with a clean,
              expandable tree view.
            </p>
          </CardContent>
        </Card>

        <Card className="transition hover:shadow-xl">
          <CardContent className="p-6 text-left space-y-3">
            <Moon className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-semibold">Dark & Light Mode</h3>
            <p className="text-sm text-muted-foreground">
              Seamless theme switching for a comfortable viewing experience
              anytime.
            </p>
          </CardContent>
        </Card>

        <Card className="transition hover:shadow-xl">
          <CardContent className="p-6 text-left space-y-3">
            <Smartphone className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-semibold">Fully Responsive</h3>
            <p className="text-sm text-muted-foreground">
              Works beautifully on mobile, tablet, and desktop devices.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
