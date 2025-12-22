'use client'

import React, { JSX, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { TreeItem } from '@/lib/github'

/* shadcn */
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

/* lucide */
import {
  Folder,
  FileText,
  ChevronRight,
  ChevronDown,
  FolderOpen,
  FileCode,
} from 'lucide-react'

/* extra FREE icons (react-icons) */
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiGo,
  SiRust,
  SiHtml5,
  SiCss3,
  SiMarkdown,
  SiJson,
} from 'react-icons/si'

/* -------------------------------- TYPES -------------------------------- */

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

/* ------------------------------ BUILD TREE ------------------------------ */

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
    nodes.forEach(n => n.children && sortRecursive(n.children))
    return nodes
  }

  return sortRecursive(root.children || [])
}

/* ---------------------------- ICON RESOLVER ------------------------------ */

function getFileIcon(name: string) {
  const ext = name.split('.').pop()?.toLowerCase()

  const map: Record<string, JSX.Element> = {
    js: <SiJavascript className="text-yellow-400" />,
    jsx: <SiJavascript className="text-yellow-400" />,
    ts: <SiTypescript className="text-blue-400" />,
    tsx: <SiTypescript className="text-blue-400" />,
    py: <SiPython className="text-green-400" />,
    go: <SiGo className="text-cyan-400" />,
    rs: <SiRust className="text-orange-400" />,
    html: <SiHtml5 className="text-orange-500" />,
    css: <SiCss3 className="text-blue-500" />,
    md: <SiMarkdown className="text-gray-400" />,
    json: <SiJson className="text-lime-400" />,
  }

  return map[ext || ''] ?? <FileCode className="h-4 w-4 text-muted-foreground" />
}

/* ---------------------------- TREE ENTRY -------------------------------- */

const TreeEntry: React.FC<{
  node: TreeNode
  owner: string
  repo: string
  depth?: number
}> = ({ node, owner, repo, depth = 0 }) => {
  const isFolder = node.type === 'tree'
  const [open, setOpen] = useState(false)

  const href = `/repo/${owner}/${repo}/${node.path}`

  return (
    <div style={{ paddingLeft: depth * 12 }}>
      <motion.div
        whileHover={{ x: 2 }}
        className="group flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-accent cursor-pointer"
        onClick={() => isFolder && setOpen(!open)}
      >
        {/* Chevron */}
        {isFolder ? (
          <motion.div
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.15 }}
          >
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </motion.div>
        ) : (
          <span className="w-4" />
        )}

        {/* Icon */}
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-muted/50">
          {isFolder ? (
            open ? (
              <FolderOpen className="h-4 w-4 text-blue-400" />
            ) : (
              <Folder className="h-4 w-4 text-blue-400" />
            )
          ) : (
            getFileIcon(node.name)
          )}
        </div>

        {/* Name */}
        {isFolder ? (
          <span className="truncate font-medium text-foreground">
            {node.name}
          </span>
        ) : (
          <Link
            href={href}
            prefetch={false}
            className="truncate text-sm text-foreground hover:text-primary"
          >
            {node.name}
          </Link>
        )}

        {/* Badge */}
        <div className="ml-auto">
          <Badge variant="secondary" className="text-[10px]">
            {isFolder ? 'DIR' : 'FILE'}
          </Badge>
        </div>
      </motion.div>

      {/* CHILDREN */}
      <AnimatePresence>
        {isFolder && open && node.children && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-l border-border/60 ml-4"
          >
            {node.children.map(child => (
              <TreeEntry
                key={child.path}
                node={child}
                owner={owner}
                repo={repo}
                depth={depth + 1}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ------------------------- MAIN VIEWER ----------------------------------- */

export function FileTreeViewer({
  treeItems,
  owner,
  repo,
}: FileTreeViewerProps) {
  const tree = buildTree(treeItems)

  return (
    <Card className="p-4 border-border/60 bg-background/70 backdrop-blur-xl shadow-lg">
      {tree.length === 0 ? (
        <div className="text-center text-muted-foreground">
          No files found
        </div>
      ) : (
        tree.map(node => (
          <TreeEntry
            key={node.path}
            node={node}
            owner={owner}
            repo={repo}
          />
        ))
      )}
    </Card>
  )
}
