// app/api/github/tree/route.ts
import { NextResponse } from 'next/server'
import { getRepoTree } from '@/lib/github'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const owner = searchParams.get('owner')
  const repo = searchParams.get('repo')
  const sha = searchParams.get('sha') || 'main' // Optional branch/SHA

  if (!owner || !repo) {
    return NextResponse.json({ error: 'Owner and repo query parameters are required' }, { status: 400 })
  }

  try {
    const tree = await getRepoTree(owner, repo, sha)
    return NextResponse.json(tree)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'An unknown error occurred' 
    }, { status: 500 })
  }
}