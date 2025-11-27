// TreeViewer.tsx (No functional change, type clarity remains)
"use client";

import FolderNode from "./FolderNode";
import { NestedTreeItem } from "@/lib/github";

interface TreeViewerProps {
  tree: Record<string, NestedTreeItem>;
}

export default function TreeViewer({ tree }: TreeViewerProps) {
  return (
    <div className="space-y-1">
      {Object.keys(tree).map((key) => (
        <FolderNode key={key} name={key} data={tree[key]} />
      ))}
    </div>
  );
}