"use client";

import { useState } from "react";

type GitTreeItem = {
  path: string;
  type: "blob" | "tree";
};

export default function Home() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchHierarchy = async () => {
    if (!username.trim()) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      // 1. Fetch Repos
      const reposRes = await fetch(
        `https://api.github.com/users/${username}/repos`
      );
      const repos = await reposRes.json();

      if (!Array.isArray(repos)) {
        throw new Error("Invalid username");
      }

      const result: any = {};

      // 2. Fetch file tree for each repo
      for (const repo of repos) {
        const repoName = repo.name;

        const treeRes = await fetch(
          `https://api.github.com/repos/${username}/${repoName}/git/trees/${
            repo.default_branch || "main"
          }?recursive=1`
        );

        const treeData = await treeRes.json();

        if (!treeData.tree) continue;

        const tree = treeData.tree as GitTreeItem[];

        // Convert paths into nested structure
        const root: any = {};

        tree.forEach((item) => {
          const parts = item.path.split("/");
          let current = root;

          parts.forEach((p, i) => {
            if (!current[p]) {
              current[p] = {
                __type__: i === parts.length - 1 ? item.type : "tree",
                __children__: {},
              };
            }
            current = current[p].__children__;
          });
        });

        result[repoName] = root;
      }

      setData(result);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }

    setLoading(false);
  };

  // Recursive Renderer
  const renderTree = (node: any, level = 0) => {
    return Object.keys(node).map((key) => {
      const item = node[key];
      const isFolder = item.__type__ === "tree";

      return (
        <div key={key} style={{ marginLeft: level * 16 }}>
          <details>
            <summary>
              {isFolder ? "📁 " : "📄 "}
              {key}
            </summary>

            {isFolder &&
              renderTree(item.__children__, level + 1)}
          </details>
        </div>
      );
    });
  };

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "auto" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>
        GitHub Repo File Hierarchy Viewer
      </h1>

      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          style={{
            padding: "12px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            width: "100%",
            fontSize: "16px",
          }}
        />

        <button
          onClick={fetchHierarchy}
          style={{
            padding: "12px 20px",
            background: "black",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Fetch
        </button>
      </div>

      {loading && <p style={{ marginTop: "20px" }}>Loading…</p>}
      {error && <p style={{ marginTop: "20px", color: "red" }}>{error}</p>}

      {data && (
        <div style={{ marginTop: "30px" }}>
          {Object.keys(data).map((repoName) => (
            <details key={repoName} style={{ marginBottom: "20px" }}>
              <summary style={{ fontSize: "18px", fontWeight: "bold" }}>
                📦 {repoName}
              </summary>

              <div style={{ paddingLeft: "20px", marginTop: "10px" }}>
                {renderTree(data[repoName])}
              </div>
            </details>
          ))}
        </div>
      )}
    </div>
  );
}
