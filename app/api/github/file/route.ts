// app/api/github/file/routes.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
    const repo = searchParams.get('repo');
    const path = searchParams.get('path');
    const branch = searchParams.get('branch') || 'main';

    if (!username || !repo || !path) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const res = await fetch(
      `https://api.github.com/repos/${username}/${repo}/contents/${encodeURIComponent(path)}?ref=${branch}`,
      {
        headers: {
          Accept: 'application/vnd.github.v3.raw',
          // For private repos, uncomment:
          // Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: `GitHub API returned ${res.status}: ${res.statusText}` },
        { status: res.status }
      );
    }

    const content = await res.text();
    return NextResponse.json({ content });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Unknown error' }, { status: 500 });
  }
}
