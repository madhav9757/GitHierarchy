// components/breadcrumbs.tsx
import Link from 'next/link'
// FIX 1: Import Folder icon
import { Slash, Home, FileText, Folder } from 'lucide-react' 
// FIX 2: Import the utility function
import { cn } from '@/lib/utils' 

interface BreadcrumbsProps {
  username: string
  repo: string
  path: string // The current file or directory path (e.g., 'src/components/button.tsx')
  isRoot: boolean // Flag to indicate if we are at the repo root
}

/**
 * Displays the current path within the repository for easy navigation.
 */
export function Breadcrumbs({ username, repo, path, isRoot }: BreadcrumbsProps) {
  const segments = path.split('/').filter(s => s.length > 0);
  
  // Base link for the repository root
  const repoRootUrl = `/repo/${username}/${repo}`
  
  const breadcrumbs = [
    {
      name: repo,
      href: repoRootUrl,
      isCurrent: isRoot && path === "",
      icon: Home,
    },
    // Add dynamic segments if path exists
    ...segments.map((segment, index) => {
      // Reconstruct the partial path for the segment link
      const partialPath = segments.slice(0, index + 1).join('/');
      const isCurrent = index === segments.length - 1;

      // Link for intermediate folders (or file link)
      // Note: The logic here is simplified for a root viewer.
      const segmentHref = isCurrent && !isRoot && path.includes('.') 
        // If it's the last segment AND a file (has a dot in the path), link to the file viewer.
        ? `/repo/${username}/${repo}/file/${partialPath}` 
        // Otherwise (folder or repo root), link back to the main repo page.
        : `/repo/${username}/${repo}`; 

      return {
        name: segment,
        href: segmentHref,
        isCurrent: isCurrent,
        // Icon logic: Use FileText if it's the current segment AND has a file extension (a dot). Otherwise use Folder.
        icon: isCurrent && path.includes('.') ? FileText : Folder,
      }
    })
  ]

  return (
    <nav className="flex items-center text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {breadcrumbs.map((crumb, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && <Slash className="w-4 h-4 text-gray-400" />}
            
            <Link 
              href={crumb.href} 
              className={cn(
                "inline-flex items-center text-sm font-medium hover:text-primary transition-colors",
                crumb.isCurrent ? 'text-foreground' : 'text-muted-foreground/80'
              )}
            >
              <crumb.icon className="w-4 h-4 mr-1" />
              {crumb.name}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}