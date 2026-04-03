import { ContributionCalendar, GitHubStatsProps } from "@/types";

const EXCLUDED_REPOS = ["naraya-albani"];
const GQL_QUERY = `
  query($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      followers { totalCount }
      following { totalCount }
      repositories(privacy: PUBLIC) { totalCount }
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            firstDay
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

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

export async function fetchContributions(): Promise<{
  calendar: ContributionCalendar;
  stats: GitHubStatsProps;
} | null> {
  const username = process.env.GITHUB_USERNAME;
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    console.error("GITHUB_TOKEN tidak ditemukan di .env.local");
    return null;
  }

  const now = new Date();
  const to = now.toISOString();
  const from = new Date(
    now.getFullYear(),
    now.getMonth() - 5,
    now.getDate(),
  ).toISOString();

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: GQL_QUERY,
        variables: { username, from, to },
      }),
      next: { revalidate: 3600 },
    });

    const data = await res.json();
    if (data.errors) {
      console.error("GitHub API error:", data.errors[0].message);
      return null;
    }

    const user = data.data.user;
    return {
      calendar: user.contributionsCollection.contributionCalendar,
      stats: {
        followers: user.followers.totalCount,
        following: user.following.totalCount,
        publicRepos: user.repositories.totalCount,
      },
    };
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
}
