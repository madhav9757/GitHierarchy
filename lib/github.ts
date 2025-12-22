const GITHUB_BASE_URL = "https://api.github.com";
const headers = {
  Authorization: `token ${process.env.GITHUB_TOKEN}`,
  "Content-Type": "application/json",
};

// --- Types ---
export interface Repo {
  id: number;
  name: string;
  full_name: string;
  owner: { login: string };
  description: string | null;
  html_url: string;
  stargazers_count: number;
  fork: boolean;
  language: string | null;
}

export interface TreeItem {
  path: string;
  type: 'blob' | 'tree'; // 'blob' is a file, 'tree' is a directory
  sha: string;
  url: string;
  size?: number;
}

// --- API Functions ---

export async function getRepos(username: string): Promise<Repo[]> {
  const url = `${GITHUB_BASE_URL}/users/${username}/repos?type=public&sort=updated`;
  const response = await fetch(url, { headers });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Failed to fetch repos for user ${username}`);
  }

  return response.json();
}

export async function getRepoTree(owner: string, repo: string, sha: string = 'main'): Promise<TreeItem[]> {
  const url = `${GITHUB_BASE_URL}/repos/${owner}/${repo}/git/trees/${sha}?recursive=1`;
  const response = await fetch(url, { headers, cache: 'no-store' });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Failed to fetch tree for ${owner}/${repo}`);
  }

  const data = await response.json();
  return data.tree.filter((item: TreeItem) => item.type === 'blob' || item.type === 'tree');
}

/**
 * Fetches file content through your API route.
 * Works for public and private repos (if your token is set in the API route).
 */
export async function getFileContent(owner: string, repo: string, path: string, branch: string = 'main'): Promise<string> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const url = `${baseUrl}/api/github/file?username=${owner}&repo=${repo}&path=${encodeURIComponent(path)}&branch=${branch}`;

  const res = await fetch(url, { cache: 'no-store' });
  const data = await res.json();

  if (!res.ok || data.error) {
    throw new Error(data.error || `Failed to fetch content for ${owner}/${repo}/${path}`);
  }

  return data.content;
}
