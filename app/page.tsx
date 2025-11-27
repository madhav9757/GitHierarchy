"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRight, ChevronDown, Folder, File } from "lucide-react";

type GitTreeItem = {
  path: string;
  type: "blob" | "tree";
};

export default function Page() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchHierarchy = async () => {
    if (!username.trim()) return;

    setLoading(true);
    setError(null);
    setRepos(null);

    try {
      // Fetch repositories
      const reposRes = await fetch(`https://api.github.com/users/${username}/repos`);
      const reposJson = await reposRes.json();

      if (!Array.isArray(reposJson)) {
        throw new Error("Invalid username");
      }

      const allRepos: any = {};

      // Fetch tree structure
      for (const repo of reposJson) {
        const repoName = repo.name;

        const treeRes = await fetch(
          `https://api.github.com/repos/${username}/${repoName}/git/trees/${repo.default_branch || "main"}?recursive=1`
        );

        const treeJson = await treeRes.json();
        if (!treeJson.tree) continue;

        const tree = treeJson.tree as GitTreeItem[];

        // Convert to nested object
        const root: any = {};
        tree.forEach((item) => {
          const parts = item.path.split("/");
          let current = root;

          parts.forEach((p, index) => {
            if (!current[p]) {
              current[p] = {
                __type__: index === parts.length - 1 ? item.type : "tree",
                __children__: {},
              };
            }
            current = current[p].__children__;
          });
        });

        allRepos[repoName] = root;
      }

      setRepos(allRepos);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Recursive folder renderer
  const renderTree = (node: any, indent = 0) => {
    return Object.keys(node).map((key) => {
      const item = node[key];
      const isFolder = item.__type__ === "tree";

      return (
        <Collapsible key={key} className="ml-4">
          <CollapsibleTrigger className="flex items-center gap-2 cursor-pointer py-1">
            {isFolder ? (
              <>
                <ChevronRight className="w-4 h-4 data-[state=open]:hidden" />
                <ChevronDown className="w-4 h-4 hidden data-[state=open]:block" />
                <Folder className="w-4 h-4 text-yellow-600" />
              </>
            ) : (
              <>
                <File className="w-4 h-4 text-muted-foreground" />
              </>
            )}

            <span className="text-sm">{key}</span>
          </CollapsibleTrigger>

          {isFolder && (
            <CollapsibleContent className="ml-4 border-l pl-4">
              {renderTree(item.__children__, indent + 1)}
            </CollapsibleContent>
          )}
        </Collapsible>
      );
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-semibold tracking-tight mb-6 text-center">
        GitHub Repo Explorer
      </h1>

      <Card className="shadow-sm border-[1.5px]">
        <CardHeader>
          <CardTitle className="text-xl">Search GitHub User</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter GitHub username"
              className="h-11"
            />
            <Button onClick={fetchHierarchy} className="h-11 px-6" disabled={loading}>
              {loading ? "Fetching..." : "Search"}
            </Button>
          </div>

          {error && <p className="text-red-500 mt-4">{error}</p>}
        </CardContent>
      </Card>

      {/* Repos Section */}
      {repos && (
        <div className="mt-10 space-y-6">
          {Object.keys(repos).map((repoName) => (
            <Card key={repoName} className="border-[1.5px] shadow-sm">
              <CardHeader>
                <CardTitle className="flex gap-2 items-center text-lg">
                  📦 {repoName}
                </CardTitle>
              </CardHeader>

              <CardContent>{renderTree(repos[repoName])}</CardContent>
            </Card>
          ))}
        </div>
      )}

      {loading && (
        <p className="mt-6 text-center text-muted-foreground animate-pulse">
          Fetching repo structures...
        </p>
      )}
    </div>
  );
}
