import Image from "next/image";
import { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Building2 } from "lucide-react";
import { Experience } from "@/types";
import { Separator } from "./ui/separator";

export function ExperienceCard({ exp }: { exp: Experience }) {
  return (
    <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
      <DialogHeader>
        {/* header: logo + nama perusahaan */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 overflow-hidden border border-border">
            {exp.icon.external.url ? (
              <Image
                src={exp.icon.external.url}
                alt={exp.properties.Name.title?.[0].plain_text}
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            ) : (
              <Building2 className="w-6 h-6 text-primary" />
            )}
          </div>
          <div>
            <DialogTitle className="text-base leading-tight">
              {exp.properties.Name.title?.[0].plain_text}
            </DialogTitle>
            <div className="flex items-center gap-3 mt-0.5 flex-wrap">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                {exp.properties.Status.status.name} ·{" "}
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "long",
                }).format(new Date(exp.properties.Date.date.start))}{" "}
                – Present
              </span>
            </div>
          </div>
        </div>
      </DialogHeader>

      <Separator />

      {/* deskripsi */}
      <h1 className="text-xl font-semibold">Deskripsi</h1>
      <ul className="pl-5 space-y-1 list-disc">
        {exp.properties.Description.rich_text[0].plain_text
          .split("\n")
          .filter(Boolean)
          .map((line, i) => (
            <li key={i}>{line.replace(/^•\s*/, "")}</li>
          ))}
      </ul>
    </DialogContent>
  );
}
