"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import {
  ContributionCalendar,
  ContributionWeek,
  GitHubStatsProps,
} from "@/types";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const LIGHT_COLORS = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
const DARK_COLORS = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];
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
const DAY_LABELS = ["Mon", "Wed", "Fri"];

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
    <Card>
      <CardHeader>
        <CardDescription>{label}</CardDescription>
        <CardTitle className="text-xl">{value}</CardTitle>
      </CardHeader>
    </Card>
  );
}

function getColor(count: number, colors: string[]): string {
  if (count === 0) return colors[0];
  if (count <= 2) return colors[1];
  if (count <= 5) return colors[2];
  if (count <= 9) return colors[3];
  return colors[4];
}

function GitHubContributions(result: { calendar: ContributionCalendar }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const colors = mounted
    ? theme === "dark"
      ? DARK_COLORS
      : LIGHT_COLORS
    : LIGHT_COLORS;

  const { calendar } = result;
  const { weeks } = calendar;

  return (
    <>
      {/* Month labels */}
      <div className="flex pl-7 mb-1">
        {weeks.map((week, wi) => {
          const month = new Date(week.firstDay).getMonth();
          const showLabel =
            wi === 0 || month !== new Date(weeks[wi - 1].firstDay).getMonth();

          return (
            <div key={wi} className="flex-1 text-[11px] text-muted-foreground">
              {showLabel ? MONTH_NAMES[month] : ""}
            </div>
          );
        })}
      </div>

      {/* Grid */}
      <div className="flex gap-0">
        {/* Day labels */}
        <div className="flex flex-col mr-1 w-6 justify-between">
          {DAY_LABELS.map((lbl, i) => (
            <div
              key={i}
              className="aspect-square flex items-center text-[10px] text-muted-foreground"
            >
              {lbl}
            </div>
          ))}
        </div>

        {/* Weeks */}
        <div className="flex gap-0.5 w-full">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-0.5 flex-1">
              {Array.from({ length: 7 }).map((_, dow) => {
                const day = week.contributionDays.find(
                  (d) => new Date(d.date).getDay() === dow,
                );
                return (
                  <div
                    key={dow}
                    title={
                      day
                        ? `${day.contributionCount} contributions on ${new Date(
                            day.date,
                          ).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                          })}`
                        : undefined
                    }
                    className="w-full aspect-square rounded-[2px]"
                    style={{
                      background: day
                        ? getColor(day.contributionCount, colors)
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
        {colors.map((c) => (
          <div
            key={c}
            className="size-3 sborder border-border rounded-xs"
            style={{
              background: c,
            }}
          />
        ))}
        <span className="text-[11px] text-muted-foreground">Banyak</span>
      </div>
    </>
  );
}

function GitHubStats(result: {
  calendar: ContributionCalendar;
  stats: GitHubStatsProps;
}) {
  const { calendar, stats } = result;
  const { totalContributions, weeks } = calendar;

  const thisWeek = computeWeekContributions(weeks);
  const bestDay = computeBestDay(weeks);
  const dailyAvg = computeDailyAvg(totalContributions, weeks);

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-3 gap-2">
        <StatCard label="Followers" value={stats.followers} />
        <StatCard label="Following" value={stats.following} />
        <StatCard label="Repositories" value={stats.publicRepos} />
      </div>

      <div className="grid grid-cols-4 gap-2">
        <StatCard label="Contributions" value={totalContributions} />
        <StatCard label="This Week" value={thisWeek} />
        <StatCard label="Best Day" value={bestDay} />
        <StatCard label="Daily Avg" value={`${dailyAvg}/day`} />
      </div>
    </div>
  );
}

export { GitHubContributions, GitHubStats };
