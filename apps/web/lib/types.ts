export interface githubInstallationInterface {
  installation: {
    id: number;
    [key: string]: any; // This allows any other properties with any value
  };
}
