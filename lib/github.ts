export async function getRepos() {
  const res = await fetch(
    "https://api.github.com/users/naraya-albani/repos?&sort=updated",
    {
      next: { revalidate: 3600 }, // cache 1 jam (Next.js App Router)
    },
  );
  return res.json();
}
