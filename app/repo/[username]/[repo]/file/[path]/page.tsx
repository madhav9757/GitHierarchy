// app/repo/[username]/[repo]/[...path]/page.tsx
import { notFound } from 'next/navigation'
import { Breadcrumbs } from '@/components/breadcrumbs'
// FIX: Correctly import the named export 'FileViewer'
import { FileViewer } from '@/components/file-viewer' 
import { getFileContent } from '@/lib/github' 
import { Separator } from '@/components/ui/separator' 
import React from 'react'

interface FilePageProps {
  params: { username: string, repo: string, path: string[] }
}

export default async function FilePage({ params }: FilePageProps) {
  
  const { username, repo, path: pathArray } = params

  if (!username || !repo || !pathArray || pathArray.length === 0) {
    notFound()
  }

  const filePath = pathArray.join('/')
  const fileName = pathArray[pathArray.length - 1]

  let content: string = ''
  try {
    content = await getFileContent(username, repo, filePath, 'main') 
  } catch (error) {
    console.error(`Error fetching file content for ${filePath}:`, error)
    return (
      <div className="max-w-7xl mx-auto p-4">
        {/* Breadcrumbs is assumed to be defined */}
        <Breadcrumbs username={username} repo={repo} path={filePath} isRoot={false} />
        <Separator className="mb-6" />
        <div className="text-center p-10 border rounded-lg">
          <h2 className="text-2xl font-semibold">Error Loading File Content</h2>
          <p className="text-muted-foreground">
            Could not fetch the file **{fileName}** from **{username}/{repo}**.
          </p>
          <p className="text-sm text-red-500 mt-2">The file might not exist or the GitHub token may lack read access.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <Breadcrumbs username={username} repo={repo} path={filePath} isRoot={false} />
      <Separator className="mb-6" />

      <h1 className="text-2xl font-bold mb-4">{fileName}</h1>

      {/* FIX: Use the correct component name and props for content viewing */}
      <FileViewer content={content} path={filePath} />
    </div>
  )
}

// Optional: Metadata for SEO
export async function generateMetadata({ params }: FilePageProps) {
    const filePath = params.path.join('/')
    return {
        title: `${filePath} | ${params.username}/${params.repo}`,
        description: `Viewing the content of file ${filePath} in the ${params.username}/${params.repo} GitHub repository.`
    }
}