// app/user/[username]/page.tsx
import { notFound } from 'next/navigation'
import { Repo, getRepos } from '@/lib/github'
import { RepoCard } from '@/components/RepoCard' 

interface UserPageProps {
  // Use a type that can handle both the resolved object and the Promise 
  // to satisfy the error-prone Next.js environment.
  params: Promise<{ username: string }> | { username: string }
}

// NOTE: We pass 'props' and use 'await props.params' inside the function
export default async function UserPage(props: UserPageProps) {
  
  // FIX: Explicitly await the params object to prevent the error on line 14
  const { username } = await props.params 

  if (!username) {
    notFound()
  }

  let repos: Repo[] = []
  try {
    repos = await getRepos(username)
  } catch (error) {
    console.error("Error fetching repos:", error)
    return (
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-3xl font-bold mb-6">
          Repositories for <span className="text-primary">{username}</span>
        </h2>
        <div className="text-center p-10 border rounded-lg bg-card text-card-foreground shadow-sm mt-8">
          <h3 className="text-xl font-semibold mb-2">Error Loading Repositories</h3>
          <p className="text-muted-foreground">
            Could not fetch public repositories for user **{username}**. 
            This could mean the user does not exist, has no public repos, or the GitHub token is invalid/missing.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-8">
        Repositories for <span className="text-primary">{username}</span>
      </h2>
      
      {repos.length === 0 ? (
        <p className="text-center p-10 text-muted-foreground border rounded-lg">
          This user has no public repositories, or they could not be found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------
// Metadata Function 
// ---------------------------------------------------------------------

export async function generateMetadata(props: UserPageProps) {
    // FIX: Await props.params here as well for full compatibility
    const resolvedParams = await props.params;
    const username = resolvedParams.username;

    return {
        title: `Repos of ${username} - GitHub Tree Viewer`,
        description: `View the list of public repositories for GitHub user ${username}.`
    }
}