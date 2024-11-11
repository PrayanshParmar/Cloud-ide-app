export interface githubInstallationInterface {
  installation: {
    id: number;
    [key: string]: any; // This allows any other properties with any value
  };
}

export interface userGithubRepos {
  total_count: number;
  repositories: Repository[];
}

export interface Repository {
  id?: number;
  name: string;
  full_name: string;
  private: boolean;
  clone_url: string;
}
