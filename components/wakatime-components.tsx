import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface WakaTimeData {
  data: {
    start: string;
    end: string;
    human_readable_daily_average: string;
    human_readable_total: string;
    best_day: {
      date: string;
      text: string;
    };
    languages: {
      name: string;
      percent: number;
    }[];
    editors: {
      name: string;
      percent: number;
    }[];
  };
}

async function fetchWakaTime(): Promise<WakaTimeData["data"] | null> {
  const apiKey = process.env.WAKATIME_API_KEY;

  if (!apiKey) {
    console.error("WAKATIME_API_KEY tidak ditemukan");
    return null;
  }

  try {
    const res = await fetch(
      "https://wakatime.com/api/v1/users/current/stats/last_7_days",
      {
        headers: {
          Authorization: `Basic ${Buffer.from(apiKey).toString("base64")}`,
        },
        next: { revalidate: 3600 }, // cache 1 jam
      },
    );

    const data = await res.json();

    if (!data.data) {
      console.error("WakaTime error:", data);
      return null;
    }

    return data.data;
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
}

export default async function WakaTimeStats() {
  const wakatime = await fetchWakaTime();

  if (!wakatime) {
    return <p>Failed to load WakaTime</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Stat title="Start Date" value={formatDate(wakatime.start)} />
      <Stat title="End Date" value={formatDate(wakatime.end)} />
      <Stat title="Avg Daily" value={wakatime.human_readable_daily_average} />
      <Stat title="Total" value={wakatime.human_readable_total} />
      <Stat title="Best Day" value={wakatime.best_day.text} />

      <Card className="p-4">
        <h4 className="font-bold mb-2">Top Languages</h4>
        {wakatime.languages.slice(0, 4).map((lang) => (
          <Progress key={lang.name} label={lang.name} value={lang.percent} />
        ))}
      </Card>

      <Card className="p-4">
        <h4 className="font-bold mb-2">Editors</h4>
        {wakatime.editors.map((ed) => (
          <Progress key={ed.name} label={ed.name} value={ed.percent} />
        ))}
      </Card>
    </div>
  );
}

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-xl">{value}</CardTitle>
      </CardHeader>
    </Card>
  );
}

function Progress({ label, value }: { label: string; value: number }) {
  return (
    <div className="mb-2">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span>{value.toFixed(0)}%</span>
      </div>
      <div className="w-full h-2 bg-muted rounded-full">
        <div
          className="h-2 bg-yellow-400 rounded-full"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
