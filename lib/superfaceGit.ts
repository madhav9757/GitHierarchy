// lib/superfaceGit.ts
import { SuperfaceClient } from '@superfaceai/one-sdk';
import { TreeItem, RepoStructure } from './github';

const sdk = new SuperfaceClient();

export interface SuperfaceRepo {
  name: string;
  description?: string;
  url?: string;
  [key: string]: any;
}

export interface UserReposResult {
  repos: SuperfaceRepo[];
}

export async function fetchUserRepos(username: string): Promise<RepoStructure> {
  try {
    const profile = await sdk.getProfile('vcs/user-repos');

    const result = await profile.getUseCase('UserRepos').perform({ user: username });

    if (result.isOk()) {
      const data: unknown = result.unwrap();

      if (
        typeof data === 'object' &&
        data !== null &&
        'repos' in data &&
        Array.isArray((data as any).repos)
      ) {
        const repos = (data as UserReposResult).repos;
        const allRepos: RepoStructure = {};

        for (const repo of repos) {
          allRepos[repo.name] = []; // tree fetched later
        }

        return allRepos;
      }

      return {};
    } else {
      // Get the error object directly
      console.error('Superface error:', result.error);
      return {};
    }
  } catch (err) {
    console.error('Unexpected error:', err);
    return {};
  }
}