'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { TreeItem } from '@/lib/github'
import { Folder, FileText, ChevronRight, ChevronDown } from 'lucide-react'

interface TreeNode {
  path: string
  name: string
  type: 'blob' | 'tree'
  children?: TreeNode[]
}

interface FileTreeViewerProps {
  treeItems: TreeItem[]
  owner: string
  repo: string
}

// --- Build Tree ---
function buildTree(items: TreeItem[]): TreeNode[] {
  const root: TreeNode = { path: '', name: '', type: 'tree', children: [] }

  for (const item of items) {
    const parts = item.path.split('/')
    let currentNode = root

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]
      let childNode = currentNode.children?.find(c => c.name === part)

      if (!childNode) {
        const isFile = i === parts.length - 1 && item.type === 'blob'
        childNode = {
          path: parts.slice(0, i + 1).join('/'),
          name: part,
          type: isFile ? 'blob' : 'tree',
          children: isFile ? undefined : [],
        }
        currentNode.children?.push(childNode)
      }
      currentNode = childNode
    }
  }

  const sortNodes = (a: TreeNode, b: TreeNode) => {
    if (a.type === 'tree' && b.type === 'blob') return -1
    if (a.type === 'blob' && b.type === 'tree') return 1
    return a.name.localeCompare(b.name)
  }

  const sortRecursive = (nodes: TreeNode[]): TreeNode[] => {
    nodes.sort(sortNodes)
    nodes.forEach(node => node.children && sortRecursive(node.children))
    return nodes
  }

  return sortRecursive(root.children || [])
}

// --- Individual Tree Entry ---
const TreeEntry: React.FC<{ node: TreeNode; owner: string; repo: string }> = ({ node, owner, repo }) => {
  const isFolder = node.type === 'tree'
  const [isOpen, setIsOpen] = useState(false)
  const fileHref = isFolder ? '#' : `/repo/${owner}/${repo}/${node.path}`

  const Icon = isFolder ? Folder : FileText
  const textColor = isFolder ? 'text-blue-500 font-medium' : 'text-foreground hover:text-blue-500'
  const chevronRotation = isOpen ? 'rotate-90' : 'rotate-0'

  return (
    <div className="pl-2">
      <div
        className={`flex items-center space-x-2 py-1 px-1 rounded-md hover:bg-accent transition-colors cursor-pointer`}
        onClick={() => isFolder && setIsOpen(!isOpen)}
      >
        {isFolder && (
          <ChevronRight
            size={14}
            className={`transform transition-transform ${chevronRotation} text-blue-500`}
          />
        )}
        {!isFolder && <div className="w-3" />} {/* placeholder for alignment */}

        <Icon size={16} className={isFolder ? 'text-blue-500' : 'text-gray-500'} />

        {isFolder ? (
          <span className={textColor}>{node.name}</span>
        ) : (
          <Link href={fileHref} prefetch={false} className={textColor}>
            {node.name}
          </Link>
        )}
      </div>

      {/* Children */}
      {isFolder && isOpen && node.children && (
        <div className="ml-4 border-l border-gray-200 dark:border-gray-700">
          {node.children.map(child => (
            <TreeEntry key={child.path} node={child} owner={owner} repo={repo} />
          ))}
        </div>
      )}
    </div>
  )
}

// --- Main FileTreeViewer ---
export function FileTreeViewer({ treeItems, owner, repo }: FileTreeViewerProps) {
  const tree = buildTree(treeItems)

  return (
    <div className="p-4 border rounded-lg bg-card text-card-foreground shadow-lg">
      {tree.length === 0 ? (
        <p className="text-center text-muted-foreground">No files found in this repository.</p>
      ) : (
        tree.map(node => <TreeEntry key={node.path} node={node} owner={owner} repo={repo} />)
      )}
    </div>
  )
}
