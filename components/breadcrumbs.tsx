// components/breadcrumbs.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Slash, Home, FileText, Folder, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/* extra FREE icons */
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiGo,
  SiRust,
} from "react-icons/si";
import { JSX } from "react";

interface BreadcrumbsProps {
  username: string;
  repo: string;
  path: string;
  isRoot: boolean;
}

/* ---------------- ICON RESOLVER ---------------- */

function getFileIcon(name: string) {
  const ext = name.split(".").pop()?.toLowerCase();
  const map: Record<string, JSX.Element> = {
    js: <SiJavascript className="text-yellow-400" />,
    ts: <SiTypescript className="text-blue-400" />,
    py: <SiPython className="text-green-400" />,
    go: <SiGo className="text-cyan-400" />,
    rs: <SiRust className="text-orange-400" />,
  };

  return map[ext || ""] ?? <FileText className="h-4 w-4" />;
}

/* ---------------- COMPONENT ---------------- */

export function Breadcrumbs({
  username,
  repo,
  path,
  isRoot,
}: BreadcrumbsProps) {
  const segments = path.split("/").filter(Boolean);
  const repoRootUrl = `/repo/${username}/${repo}`;

  const breadcrumbs = [
    {
      name: repo,
      href: repoRootUrl,
      isCurrent: isRoot && path === "",
      icon: <Home className="h-4 w-4" />,
    },
    ...segments.map((segment, index) => {
      const partialPath = segments.slice(0, index + 1).join("/");
      const isCurrent = index === segments.length - 1;

      const href =
        isCurrent && path.includes(".")
          ? `/repo/${username}/${repo}/file/${partialPath}`
          : `/repo/${username}/${repo}`;

      return {
        name: segment,
        href,
        isCurrent,
        icon:
          isCurrent && path.includes(".") ? (
            getFileIcon(segment)
          ) : (
            <Folder className="h-4 w-4 text-blue-400" />
          ),
      };
    }),
  ];

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        {breadcrumbs.map((crumb, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, delay: index * 0.03 }}
            className="flex items-center"
          >
            {index > 0 && (
              <ChevronRight className="mx-1 h-4 w-4 text-muted-foreground" />
            )}

            <Link
              href={crumb.href}
              className={cn(
                "group flex items-center gap-1.5 rounded-md px-2 py-1",
                "transition-colors hover:bg-accent",
                crumb.isCurrent
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground"
              )}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-muted/50">
                {crumb.icon}
              </span>

              <span className="max-w-[160px] truncate">{crumb.name}</span>
            </Link>
          </motion.li>
        ))}
      </ol>
    </nav>
  );
}
