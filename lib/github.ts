// lib/github.ts

const GITHUB_BASE_URL = "https://api.github.com"
const headers = {
  Authorization: `token ${process.env.GITHUB_TOKEN}`,
  "Content-Type": "application/json",
}

// --- Types ---
export interface Repo {
  id: number
  name: string
  full_name: string
  owner: { login: string }
  description: string | null
  html_url: string
  stargazers_count: number
  fork: boolean
  language: string | null
}

export interface TreeItem {
  path: string
  type: 'blob' | 'tree' // 'blob' is a file, 'tree' is a directory
  sha: string
  url: string
  size?: number
}

// --- API Functions ---

/**
 * Fetches all public repositories for a given user.
 * @param username The GitHub username.
 */
export async function getRepos(username: string): Promise<Repo[]> {
  const url = `${GITHUB_BASE_URL}/users/${username}/repos?type=public&sort=updated`
  const response = await fetch(url, { headers })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || `Failed to fetch repos for user ${username}`)
  }

  return response.json()
}

/**
 * Fetches the file tree for a specific repository and branch (defaulting to main).
 * @param owner The repository owner's username.
 * @param repo The repository name.
 * @param sha The commit SHA or branch name (default: 'main').
 */
export async function getRepoTree(owner: string, repo: string, sha: string = 'main'): Promise<TreeItem[]> {
  const url = `${GITHUB_BASE_URL}/repos/${owner}/${repo}/git/trees/${sha}?recursive=1`
  // We use cache: 'no-store' to ensure we always get the latest tree when the user navigates
  const response = await fetch(url, { headers, cache: 'no-store' }) 

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || `Failed to fetch tree for ${owner}/${repo}`)
  }

  const data = await response.json()
  
  // Filter and format the tree structure
  return data.tree.filter((item: TreeItem) => item.type === 'blob' || item.type === 'tree')
}

/**
 * Fetches the raw content of a specific file.
 * @param owner The repository owner's username.
 * @param repo The repository name.
 * @param path The full path to the file.
 * @param sha The commit SHA or branch name (default: 'main').
 */
export async function getFileContent(owner: string, repo: string, path: string, sha: string = 'main'): Promise<string> {
  // Use the contents API for file content. The 'path' must be URI-encoded.
  const encodedPath = encodeURIComponent(path)
  const url = `${GITHUB_BASE_URL}/repos/${owner}/${repo}/contents/${encodedPath}?ref=${sha}`
  
  const response = await fetch(url, { headers })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || `Failed to fetch content for file ${path}`)
  }

  const data = await response.json()

  // GitHub returns content in Base64 encoding. We need to decode it.
  if (data.encoding === 'base64' && data.content) {
    return Buffer.from(data.content, 'base64').toString('utf-8')
  }

  return data.content || ""
}