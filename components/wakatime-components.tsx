import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WakaTimeData } from "@/types";

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

export function WakaTimeStats(wakatime: WakaTimeData["data"]) {
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
