// app/api/repos/[username]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { fetchUserRepos } from '@/lib/superfaceGit'; // Use your existing Superface fetcher
import { SuperfaceRepo } from '@/lib/superfaceGit'; // Assuming this interface is available or imported

// Define the expected output structure for the API route
interface RepoResponse {
    name: string;
    description: string;
    // NOTE: This array is currently empty in fetchUserRepos,
    // as the file tree is fetched separately in a complete solution.
    tree: []; 
}

export async function GET(
  request: NextRequest, 
  { params }: { params: { username: string } }
) {
  const { username } = params;

  if (!username) {
    return NextResponse.json({ error: 'Username parameter is missing.' }, { status: 400 });
  }

  try {
    // 1. Fetch repos using the server-side Superface function
    // NOTE: fetchUserRepos currently returns RepoStructure (Record<string, TreeItem[]>)
    // To provide full data, you would need to adjust fetchUserRepos in superfaceGit.ts
    // to return the raw SuperfaceRepo[] data and process it here.
    
    // TEMPORARY SOLUTION: For a running example, let's assume SuperfaceRepo is what we need.
    
    // For now, let's mock or simplify the response until superfaceGit.ts is updated.
    
    // *** If we assume SuperfaceRepo is the expected list item type ***
    const repoStructure = await fetchUserRepos(username);
    
    // Convert the map keys into a list of objects for the client
    const repos: RepoResponse[] = Object.keys(repoStructure).map(name => ({
        name: name,
        description: 'No description available (Superface implementation needs to return it)',
        tree: [], // Placeholder
    }));
    
    return NextResponse.json({ repos });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch repositories from Superface/GitHub.' }, { status: 500 });
  }
}