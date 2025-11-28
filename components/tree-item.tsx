// components/tree-item.tsx
import Link from 'next/link'
import { TreeItem } from '@/lib/github'
import { Folder, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TreeItemProps {
  item: TreeItem
  username: string
  repo: string
  // Note: For subdirectory viewing, you would also pass the current directory path.
}

/**
 * Displays a single file or directory item.
 */
export function TreeItemComponent({ item, username, repo }: TreeItemProps) {
  // Determine the link target based on item type
  const isFile = item.type === 'blob'
  
  // Construct the base URL for the item
  let href = '';
  if (isFile) {
    // Link to the file viewer page: /repo/[user]/[repo]/file/[path]
    href = `/repo/${username}/${repo}/file/${item.path}`
  } else {
    // Link to the subdirectory page (requires a more complex routing setup 
    // to handle nested directories, which we are simplifying for this root view)
    // For a fully working recursive viewer, this would link to:
    // /repo/[user]/[repo]?path=${item.path}
    // For this simple root viewer, we'll just link to the official GitHub folder.
    href = `https://github.com/${username}/${repo}/tree/main/${item.path}`
  }

  return (
    <div className="flex items-center space-x-3 p-3 hover:bg-muted/50 transition-colors duration-150">
      {isFile ? (
        <FileText className="w-5 h-5 text-muted-foreground" />
      ) : (
        <Folder className="w-5 h-5 text-blue-400" />
      )}
      
      {/* Use Link component for files, or a regular anchor for external folder link */}
      <Link href={href} className={cn("text-base font-medium truncate", isFile ? "hover:text-primary" : "text-primary/80")}>
        {item.path}
      </Link>
      
      {item.type === 'blob' && item.size !== undefined && (
          <span className="ml-auto text-sm text-muted-foreground">
              {/* Simple size formatting (e.g., bytes to KB) */}
              {item.size < 1024 ? `${item.size} B` : `${(item.size / 1024).toFixed(1)} KB`}
          </span>
      )}
    </div>
  )
}