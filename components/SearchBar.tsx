// SearchBar.tsx (Type added)
"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react"; // Explicit import of React for better compatibility

interface SearchBarProps {
  username: string;
  setUsername: (username: string) => void;
  onSearch: () => void;
  loading: boolean;
}

export default function SearchBar({ username, setUsername, onSearch, loading }: SearchBarProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 mt-10">
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="h-11 text-base"
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && onSearch()}
        />

        <Button
          className="h-11 px-8 bg-blue-600 hover:bg-blue-700"
          onClick={onSearch}
          disabled={loading}
        >
          {loading ? "Fetching..." : "Search"}
        </Button>
      </div>
    </div>
  );
}