// app/api/repos/[username]/route.ts

import { NextRequest, NextResponse } from 'next/server';
// Ensure these imports are correct based on your file structure
import { fetchUserRepos } from '@/lib/superfaceGit'; 

// Define the structure your client (page.tsx) expects
interface RepoResponse {
    name: string;
    description: string;
    tree: []; 
}

// ⚠️ This function MUST be named GET and be exported
export async function GET(
  request: NextRequest, 
  { params }: { params: { username: string } }
) {
  // Extract username from dynamic route parameters
  const { username } = params;

  if (!username) {
    return NextResponse.json({ error: 'Username parameter is missing.' }, { status: 400 });
  }

  try {
    // 1. Call the Superface function on the server
    const repoStructure = await fetchUserRepos(username);
    
    // 2. Format the response for the client
    const repos: RepoResponse[] = Object.keys(repoStructure).map(name => ({
        name: name,
        description: 'No description provided.',
        tree: [], 
    }));
    
    // Return a JSON response with a 200 OK status
    return NextResponse.json({ repos });

  } catch (error) {
    console.error('API Error:', error);
    // Return an error response with a 500 status
    return NextResponse.json({ error: 'Failed to fetch repositories from Superface/GitHub.' }, { status: 500 });
  }
}

// Optional: Explicitly block other methods to ensure 405 for POST/PUT/etc.
// export async function POST() {
//   return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
// }