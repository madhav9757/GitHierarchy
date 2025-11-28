// app/api/github/repos/route.ts
import { NextResponse } from 'next/server'
import { getRepos } from '@/lib/github'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username')

  if (!username) {
    return NextResponse.json({ error: 'Username query parameter is required' }, { status: 400 })
  }

  try {
    const repos = await getRepos(username)
    return NextResponse.json(repos)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'An unknown error occurred' 
    }, { status: 500 })
  }
}