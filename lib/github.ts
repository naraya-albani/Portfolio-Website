const EXCLUDED_REPOS = ["naraya-albani"];

export async function getRepos() {
  const res = await fetch(
    "https://api.github.com/users/naraya-albani/repos?&sort=updated",
    {
      next: { revalidate: 3600 },
    },
  );

  const repos = await res.json();

  return repos
    .filter((repo: { name: string }) => !EXCLUDED_REPOS.includes(repo.name))
    .map((repo: { name: string }) => ({
      ...repo,
      name: repo.name
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char: string) => char),
    }));
}
