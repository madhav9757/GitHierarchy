// src/components/file-viewer.tsx
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { vs } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { useTheme } from 'next-themes'

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
  FileCode,
  Hash,
  Copy,
  Check,
  Braces,
} from 'lucide-react'

/* free extra icons (languages / markdown etc.) */
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
  SiYaml,
  SiDash,
} from 'react-icons/si'

interface FileViewerProps {
  content: string
  path: string
}

/**
 * Ultra-polished File Viewer
 * - shadcn everywhere
 * - heavy icon usage (lucide + react-icons)
 * - animated header
 * - syntax logic untouched
 */
export function FileViewer({ content, path }: FileViewerProps) {
  const { theme } = useTheme()
  const [copied, setCopied] = React.useState(false)

  const fileExtension = path.split('.').pop() || 'text'

  const languageMap: Record<string, string> = {
    js: 'javascript',
    jsx: 'jsx',
    ts: 'typescript',
    tsx: 'tsx',
    json: 'json',
    css: 'css',
    html: 'markup',
    py: 'python',
    md: 'markdown',
    sh: 'bash',
    yaml: 'yaml',
    yml: 'yaml',
    java: 'java',
    go: 'go',
    rb: 'ruby',
    rust: 'rust',
    '': 'text',
    text: 'text',
  }

  const language = languageMap[fileExtension.toLowerCase()] || 'text'
  const style = theme === 'dark' ? dracula : vs
  const backgroundColor =
    style.code?.backgroundColor ||
    (theme === 'dark' ? '#282a36' : '#ffffff')

  /* language icons */
  const languageIcons: Record<string, React.ReactNode> = {
    javascript: <SiJavascript className="text-yellow-400" />,
    jsx: <SiJavascript className="text-yellow-400" />,
    typescript: <SiTypescript className="text-blue-400" />,
    tsx: <SiTypescript className="text-blue-400" />,
    python: <SiPython className="text-green-400" />,
    go: <SiGo className="text-cyan-400" />,
    rust: <SiRust className="text-orange-400" />,
    markup: <SiHtml5 className="text-orange-500" />,
    css: <SiCss3 className="text-blue-500" />,
    markdown: <SiMarkdown className="text-gray-400" />,
    json: <SiJson className="text-lime-400" />,
    yaml: <SiYaml className="text-red-400" />,
    bash: <SiDash className="text-muted-foreground" />,
    text: <FileCode className="h-4 w-4" />,
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="space-y-3"
    >
      {/* HEADER */}
      <Card className="flex items-center justify-between px-4 py-3 border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
            {languageIcons[language] || <Braces className="h-4 w-4" />}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 text-sm font-medium truncate">
              <FileCode className="h-4 w-4 text-muted-foreground" />
              <span className="truncate">{path}</span>
            </div>

            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-xs">
                <Hash className="h-3 w-3 mr-1" />
                {language.toUpperCase()}
              </Badge>
            </div>
          </div>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              onClick={handleCopy}
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {copied ? 'Copied!' : 'Copy file'}
          </TooltipContent>
        </Tooltip>
      </Card>

      {/* CODE */}
      <Card
        className="overflow-hidden border-border/60 shadow-xl"
        style={{ backgroundColor }}
      >
        <SyntaxHighlighter
          language={language}
          style={style}
          showLineNumbers
          customStyle={{
            margin: 0,
            padding: '1.2em 0',
            borderRadius: '0.75rem',
            backgroundColor: 'transparent',
          }}
          lineNumberStyle={{
            minWidth: '3.5em',
            paddingLeft: '1em',
            textAlign: 'right',
            userSelect: 'none',
            opacity: 0.5,
          }}
          lineProps={() => ({
            style: { display: 'block', paddingRight: '1em' },
            className:
              'hover:bg-accent/30 transition-colors duration-100',
          })}
        >
          {content}
        </SyntaxHighlighter>
      </Card>
    </motion.div>
  )
}
