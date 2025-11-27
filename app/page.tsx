// app/page.tsx
'use client';

import { useState } from 'react';
// ❌ REMOVE: import { fetchUserRepos } from '@/lib/superfaceGit'; // REMOVE THIS IMPORT
import SearchBar from '@/components/SearchBar'; 
import RepoCard from '@/components/RepoCard'; 

// Note: This interface must match the structure returned by the API Route
interface RepoData {
  name: string;
  description?: string;
  url?: string;
}

export default function HomePage() {
  const [username, setUsername] = useState('');
  const [repoData, setRepoData] = useState<RepoData[]>([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!username.trim()) {
      setError("Please enter a valid GitHub username.");
      setRepoData([]);
      return;
    }
    
    setError(null);
    setLoading(true);
    setRepoData([]);

    try {
      // 1. Fetch repos by calling the new API Route
      const res = await fetch(`/api/repos/${username}`);
      
      if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      
      if (!data?.repos || !Array.isArray(data.repos)) {
          throw new Error("Invalid response from repository API.");
      }

      setRepoData(data.repos as RepoData[]); 

    } catch (err: any) {
      setError(err.message || 'Failed to fetch repositories.');
      setRepoData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 flex flex-col gap-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center">GitHub Repo Structure Viewer</h1>
      
      <SearchBar
        username={username}
        setUsername={setUsername}
        onSearch={handleSearch}
        loading={loading}
      />

      {error && (
        <p className="text-center text-red-500 font-medium">{error}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {repoData.length > 0 ? (
          repoData.map((repo) => (
            <RepoCard
              key={repo.name} 
              username={username}
              repoName={repo.name}
              description={repo.description} 
            />
          ))
        ) : (
          !loading && !error && (
            <p className="text-center col-span-full text-gray-500">
              Start by searching for a GitHub username.
            </p>
          )
        )}
      </div>
    </div>
  );
}