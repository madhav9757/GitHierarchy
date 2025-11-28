// components/search-bar.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input' // Assume shadcn Input component
import { Button } from '@/components/ui/button' // Assume shadcn Button component
import { Search } from 'lucide-react' // Icon component

/**
 * Renders a search bar for entering a GitHub username and navigating
 * to the user's repository list.
 */
export function SearchBar() {
  const [username, setUsername] = useState('')
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Trim and normalize the username
    const trimmedUsername = username.trim()
    if (!trimmedUsername) {
      // Optionally show a toast/alert for empty input
      console.error("Please enter a username.")
      return
    }

    setIsLoading(true)
    
    // Navigate to the dynamic user page: /user/[username]
    router.push(`/user/${trimmedUsername}`)
    
    // Note: Loading state is generally reset by the new page load, 
    // but you can reset it on a successful navigation/load event if needed.
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex w-full max-w-sm items-center space-x-2"
    >
      <Input
        type="text"
        placeholder="Enter GitHub username (e.g., vercel)"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={isLoading}
        className="h-10 text-base"
      />
      <Button 
        type="submit" 
        disabled={isLoading || !username.trim()}
        className="h-10 px-4"
      >
        {isLoading ? (
          // Placeholder for a loading spinner (e.g., from a custom UI component)
          <span className="animate-spin mr-2">⏳</span>
        ) : (
          <Search className="w-4 h-4 mr-2" />
        )}
        Search
      </Button>
    </form>
  )
}