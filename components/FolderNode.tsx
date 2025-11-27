// FolderNode.tsx (Final Attempt to Resolve Type Error)
"use client";

import { NestedTreeItem } from "@/lib/github";
import { useState } from "react";

interface FolderNodeProps {
  name: string;
  data: NestedTreeItem;
}

export default function FolderNode({ name, data }: FolderNodeProps) {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);
  
  // Use a local variable to hold children if it's a tree
  const children = data.__children__;

  // 1. Check if it is a 'tree' AND if the 'children' variable is defined.
  if (data.__type__ === "tree" && children) {
    // TypeScript now knows 'children' is a defined Record<string, NestedTreeItem>
    const childrenKeys = Object.keys(children); 

    return (
      <div className="ml-4">
        <p
          className="cursor-pointer font-semibold"
          onClick={toggle}
        >
          {open ? "📂" : "📁"} {name}
        </p>
        {open &&
          childrenKeys.map((child) => (
            <FolderNode
              key={child}
              name={child}
              // Accessing 'children[child]' is now safe and resolves the error
              data={children[child]}
            />
          ))}
      </div>
    );
  }

  // Fallback for file/blob nodes, or empty folders
  return (
    <p className="ml-6 text-gray-500 dark:text-gray-400">
      📄 {name}
    </p>
  );
}