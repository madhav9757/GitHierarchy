// app/repo/[username]/[repo]/page.tsx
import { notFound } from 'next/navigation'
import { TreeItem, getRepoTree } from '@/lib/github'
import { FileTreeViewer } from '@/components/file-tree-viewer'

interface RepoPageProps {
  params: Promise<{ username: string; repo: string }> | { username: string; repo: string }
}

export default async function RepoPage(props: RepoPageProps) {
  const resolvedParams = await props.params
  const { username, repo } = resolvedParams

  // Validate route params
  if (!username || !repo) {
    notFound()
  }

  let treeItems: TreeItem[] = []
  try {
    treeItems = await getRepoTree(username, repo)
  } catch (error) {
    console.error(`Error fetching tree for ${username}/${repo}:`, error)
    
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.'
    
    if (errorMessage.includes('Not Found') || errorMessage.includes('404')) {
      return notFound()
    }

    return (
      <div className="max-w-6xl mx-auto p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Error Loading Repository</h2>
        <p className="text-muted-foreground">
          Could not fetch repository contents for <strong>{username}/{repo}</strong>.<br />
          Reason: {errorMessage}
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-8">
        File Structure: <span className="text-primary">{username}/{repo}</span>
      </h2>

      {treeItems.length === 0 ? (
        <p className="text-center p-10 text-muted-foreground border rounded-lg">
          This repository appears to be empty or its file tree could not be retrieved.
        </p>
      ) : (
        <FileTreeViewer treeItems={treeItems} owner={username} repo={repo} />
      )}
    </div>
  )
}

// Optional: dynamic metadata for SEO
export async function generateMetadata(props: RepoPageProps) {
  const resolvedParams = await props.params
  const { username, repo } = resolvedParams

  return {
    title: `${username}/${repo} - Git Tree Viewer`,
    description: `View the file structure and contents of the GitHub repository ${username}/${repo}.`,
  }
}
