// ── Types ──────────────────────────────────────────────────────────────────
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

// ── Constants ──────────────────────────────────────────────────────────────
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

// ── Fetch (Server Component) ───────────────────────────────────────────────
async function fetchContributions(): Promise<ContributionCalendar | null> {
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
      next: { revalidate: 3600 }, // cache 1 jam
    });

    const data = await res.json();
    if (data.errors) {
      console.error("GitHub API error:", data.errors[0].message);
      return null;
    }

    return data.data.user.contributionsCollection.contributionCalendar;
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
}

// ── Helpers ────────────────────────────────────────────────────────────────
function getColor(count: number): string {
  if (count === 0) return COLORS[0];
  if (count <= 2) return COLORS[1];
  if (count <= 5) return COLORS[2];
  if (count <= 9) return COLORS[3];
  return COLORS[4];
}

// ── Component ──────────────────────────────────────────────────────────────
export async function GitHubContributions() {
  const calendar = await fetchContributions();

  if (!calendar) {
    return null;
  }

  const { totalContributions, weeks } = calendar;

  // Hitung bulan label positions
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
    <div className="mt-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-card-foreground font-sans">
          GitHub Contributions
        </h3>
        <span className="text-sm text-muted-foreground font-sans">
          {totalContributions.toLocaleString("id-ID")} kontribusi tahun ini
        </span>
      </div>

      {/* Scrollable grid */}
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
                            ? `${day.contributionCount} kontribusi pada ${new Date(day.date).toLocaleDateString("id-ID", { weekday: "short", year: "numeric", month: "short", day: "numeric" })}`
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
    </div>
  );
}
