"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RepoCardProps {
  username: string;
  repoName: string;
  description?: string;
}

export default function RepoCard({ username, repoName, description }: RepoCardProps) {
  const router = useRouter();

  const handleClick = () => {
    // Navigate to /repo/[username]/[repoName]
    router.push(`/repo/${username}/${repoName}`);
  };

  return (
    <Card
      onClick={handleClick}
      className="cursor-pointer hover:shadow-lg transition-shadow duration-200 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <CardHeader className="bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-700 p-4">
        <CardTitle className="text-lg font-bold">{repoName}</CardTitle>
      </CardHeader>

      <CardContent className="p-4 text-gray-700 dark:text-gray-300">
        {description || "No description provided."}
      </CardContent>
    </Card>
  );
}
