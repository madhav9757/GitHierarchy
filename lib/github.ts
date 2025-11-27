// types/github.ts
export interface TreeItem {
  path: string;
  mode: string;
  type: "blob" | "tree";
  sha: string;
  size?: number;
  url: string;
}

export interface RepoStructure {
  [repoName: string]: TreeItem[];
}

export interface NestedTreeItem {
  __type__: "tree" | "blob";
  __children__?: Record<string, NestedTreeItem>;
  path?: string;
  mode?: string;
  sha?: string;
  url?: string;
}