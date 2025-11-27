// lib/arrayToNestedTree.ts
import { TreeItem, NestedTreeItem } from "@/lib/github";

/**
 * Converts a flat array of GitHub TreeItem objects into a nested tree structure.
 * @param items - Array of TreeItem from GitHub API
 * @returns Nested tree: Record<string, NestedTreeItem>
 */
export function arrayToNestedTree(items: TreeItem[]): Record<string, NestedTreeItem> {
  const tree: Record<string, NestedTreeItem> = {};

  for (const item of items) {
    const parts = item.path.split("/"); // Split path into segments
    let current = tree;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];

      // Last part = file or folder metadata
      if (i === parts.length - 1) {
        current[part] = {
          __type__: item.type, // "blob" = file, "tree" = folder
          path: item.path,
          mode: item.mode,
          sha: item.sha,
          url: item.url,
        };
      } else {
        // Folder: create if not exists
        if (!current[part]) {
          current[part] = { __type__: "tree", __children__: {} };
        }
        // Move deeper into children (safely assert `__children__!`)
        current = current[part].__children__!;
      }
    }
  }

  return tree;
}