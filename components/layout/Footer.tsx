"use client";

import { Github, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function Footer() {
  return (
    <footer className="relative z-10 text-center p-6 text-sm text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-gray-800 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 transition-colors duration-300">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
        <span>Built with Next.js & GitHub API • © {new Date().getFullYear()}</span>

        <TooltipProvider>
          <div className="flex items-center gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="hover:text-indigo-500 transition-colors"
                  aria-label="GitHub"
                >
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <Github size={18} />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>GitHub</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="hover:text-blue-400 transition-colors"
                  aria-label="Twitter"
                >
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <Twitter size={18} />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Twitter</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="hover:text-blue-600 transition-colors"
                  aria-label="LinkedIn"
                >
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <Linkedin size={18} />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>LinkedIn</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>
    </footer>
  );
}
