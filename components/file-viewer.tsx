// src/components/file-viewer.tsx
'use client'

import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { vs } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { useTheme } from 'next-themes' 

interface FileViewerProps {
  content: string
  path: string // Used to determine the file language
}

/**
 * Renders the file content with syntax highlighting based on the file extension.
 * This is the component that must be exported as 'FileViewer'.
 */
export function FileViewer({ content, path }: FileViewerProps) {
  const { theme } = useTheme()
  
  const fileExtension = path.split('.').pop() || 'text'
  const languageMap: Record<string, string> = {
    js: 'javascript', jsx: 'jsx', ts: 'typescript', tsx: 'tsx',
    json: 'json', css: 'css', html: 'markup', py: 'python',
    md: 'markdown', sh: 'bash', yaml: 'yaml', yml: 'yaml',
    java: 'java', go: 'go', rb: 'ruby', rust: 'rust',
    '': 'text', text: 'text' 
  }
  const language = languageMap[fileExtension.toLowerCase()] || 'text'

  const style = theme === 'dark' ? dracula : vs
  const backgroundColor = style.code?.backgroundColor || (theme === 'dark' ? '#282a36' : '#ffffff');

  return (
    <div 
      className="rounded-lg overflow-hidden border shadow-xl"
      style={{ backgroundColor: backgroundColor }}
    >
      <SyntaxHighlighter
        language={language}
        style={style}
        showLineNumbers={true}
        customStyle={{ 
          margin: 0, 
          padding: '1em 0',
          borderRadius: '0.5rem',
          backgroundColor: 'transparent !important', 
        }}
        lineNumberStyle={{ 
          minWidth: '3.5em',
          paddingLeft: '1em',
          textAlign: 'right',
          userSelect: 'none',
        }}
        lineProps={() => ({
          style: { display: 'block', paddingRight: '1em' },
          className: 'hover:bg-accent/30 transition-colors duration-100', 
        })}
      >
        {content}
      </SyntaxHighlighter>
    </div>
  )
}