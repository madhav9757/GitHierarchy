// app/repo/[username]/[repo]/[...path]/page.tsx
import { notFound } from 'next/navigation';
import React from 'react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { FileViewer } from '@/components/file-viewer';
import { getFileContent } from '@/lib/github';
import { Separator } from '@/components/ui/separator';

interface FilePageProps {
  params: { username: string; repo: string; path: string[] };
}

export default async function FilePage({ params }: FilePageProps) {
  const { username, repo, path: pathArray } = params;

  if (!username || !repo || !pathArray || pathArray.length === 0) notFound();

  const filePath = pathArray.join('/');
  const fileName = pathArray[pathArray.length - 1];

  let content = '';
  try {
    content = await getFileContent(username, repo, filePath, 'main');
  } catch (error: any) {
    console.error(`Error fetching file content:`, error);
    return (
      <div className="max-w-7xl mx-auto p-4">
        <Breadcrumbs username={username} repo={repo} path={filePath} isRoot={false} />
        <Separator className="mb-6" />
        <div className="text-center p-10 border rounded-lg bg-red-50 dark:bg-red-900/30">
          <h2 className="text-2xl font-semibold mb-2">Error Loading File</h2>
          <p className="text-muted-foreground">
            Could not fetch <strong>{fileName}</strong> from <strong>{username}/{repo}</strong>.
          </p>
          <p className="text-sm text-red-500 mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <Breadcrumbs username={username} repo={repo} path={filePath} isRoot={false} />
      <Separator className="mb-6" />

      <h1 className="text-2xl font-bold mb-4">{fileName}</h1>

      <FileViewer content={content} path={filePath} />
    </div>
  );
}

export async function generateMetadata({ params }: FilePageProps) {
  const filePath = params.path.join('/');
  return {
    title: `${filePath} | ${params.username}/${params.repo}`,
    description: `Viewing the content of file ${filePath} in the ${params.username}/${params.repo} GitHub repository.`,
  };
}
