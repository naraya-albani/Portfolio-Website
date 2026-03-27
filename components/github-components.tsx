interface ContributionDay {
  date: string;
  contributionCount: number;
}

interface ContributionWeek {
  firstDay: string;
  contributionDays: ContributionDay[];
}

interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

interface GitHubStatsProps {
  followers: number;
  following: number;
  publicRepos: number;
}

const COLORS = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];
const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];
const DAY_LABELS = ["", "Sen", "", "Rab", "", "Jum", ""];

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

async function fetchContributions(): Promise<{
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

function getColor(count: number): string {
  if (count === 0) return COLORS[0];
  if (count <= 2) return COLORS[1];
  if (count <= 5) return COLORS[2];
  if (count <= 9) return COLORS[3];
  return COLORS[4];
}

function computeWeekContributions(weeks: ContributionWeek[]): number {
  const lastWeek = weeks[weeks.length - 1];
  if (!lastWeek) return 0;
  return lastWeek.contributionDays.reduce(
    (sum, d) => sum + d.contributionCount,
    0,
  );
}

function computeBestDay(weeks: ContributionWeek[]): number {
  let best = 0;
  for (const week of weeks) {
    for (const day of week.contributionDays) {
      if (day.contributionCount > best) best = day.contributionCount;
    }
  }
  return best;
}

function computeDailyAvg(total: number, weeks: ContributionWeek[]): number {
  const allDays = weeks.flatMap((w) => w.contributionDays);
  const days = allDays.length || 1;
  return Math.round((total / days) * 10) / 10;
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm flex flex-col gap-3 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
            {label}
          </p>
          <p className="text-2xl font-bold mt-1 text-foreground">{value}</p>
        </div>
      </div>
    </div>
  );
}

async function GitHubStats() {
  const result = await fetchContributions();
  if (!result) return null;

  const { calendar, stats } = result;
  const { totalContributions, weeks } = calendar;

  const thisWeek = computeWeekContributions(weeks);
  const bestDay = computeBestDay(weeks);
  const dailyAvg = computeDailyAvg(totalContributions, weeks);

  return (
    <>
      {/* Stats row 1: Followers, Following, Repositories */}
      <div className="grid grid-cols-3 gap-2">
        <StatCard label="Followers" value={stats.followers} />
        <StatCard label="Following" value={stats.following} />
        <StatCard label="Repositories" value={stats.publicRepos} />
      </div>

      {/* Stats row 2: Contributions, This Week, Best Day, Daily Avg */}
      <div className="grid grid-cols-4 gap-2">
        <StatCard label="Contributions" value={totalContributions} />
        <StatCard label="This Week" value={thisWeek} />
        <StatCard label="Best Day" value={bestDay} />
        <StatCard label="Daily Avg" value={`${dailyAvg} / day`} />
      </div>
    </>
  );
}

async function GitHubContributions() {
  const result = await fetchContributions();
  if (!result) return null;

  const { calendar } = result;
  const { weeks } = calendar;

  const monthLabels: { label: string; weekIndex: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, wi) => {
    const month = new Date(week.firstDay).getMonth();
    if (month !== lastMonth) {
      monthLabels.push({ label: MONTH_NAMES[month], weekIndex: wi });
      lastMonth = month;
    }
  });

  return (
    <div className="overflow-x-auto">
      <div className="inline-block">
        {/* Month labels */}
        <div className="relative flex h-4 mb-1 pl-7">
          {monthLabels.map(({ label, weekIndex }) => (
            <span
              key={label + weekIndex}
              className="absolute text-[11px] text-muted-foreground"
              style={{ left: 28 + weekIndex * 14 }}
            >
              {label}
            </span>
          ))}
        </div>

        {/* Grid */}
        <div className="flex gap-0">
          {/* Day labels */}
          <div className="flex flex-col mr-1 w-6 gap-0.5">
            {DAY_LABELS.map((lbl, i) => (
              <div
                key={i}
                className="text-[10px] text-muted-foreground leading-3"
                style={{ height: 12 }}
              >
                {lbl}
              </div>
            ))}
          </div>

          {/* Weeks */}
          <div className="flex gap-0.5">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-0.5">
                {Array.from({ length: 7 }).map((_, dow) => {
                  const day = week.contributionDays.find(
                    (d) => new Date(d.date).getDay() === dow,
                  );
                  return (
                    <div
                      key={dow}
                      title={
                        day
                          ? `${day.contributionCount} kontribusi pada ${new Date(
                              day.date,
                            ).toLocaleDateString("id-ID", {
                              weekday: "short",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}`
                          : undefined
                      }
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: 2,
                        background: day
                          ? getColor(day.contributionCount)
                          : "transparent",
                      }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1.5 mt-2 justify-end">
          <span className="text-[11px] text-muted-foreground">Sedikit</span>
          {COLORS.map((c) => (
            <div
              key={c}
              style={{
                width: 12,
                height: 12,
                borderRadius: 2,
                background: c,
              }}
            />
          ))}
          <span className="text-[11px] text-muted-foreground">Banyak</span>
        </div>
      </div>
    </div>
  );
}

export { GitHubContributions, GitHubStats };
