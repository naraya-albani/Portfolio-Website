import Image from "next/image";
import { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Building2 } from "lucide-react";
import { Experience } from "@/types";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { MediaImage } from "./media-image";

export function ExperienceCard({ exp }: { exp: Experience }) {
  return (
    <DialogContent className="sm:max-w-lg flex flex-col max-h-[85vh]">
      <DialogHeader className="text-left shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 overflow-hidden border border-border">
            {exp.icon?.external.url ? (
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
            <DialogTitle className="text-lg leading-tight">
              {exp.properties.Name.title?.[0].plain_text}
            </DialogTitle>
            <div className="flex items-center gap-3 mt-0.5 flex-wrap">
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Badge color={exp.properties.Position.multi_select?.[0].color}>
                  {exp.properties.Position.multi_select?.[0].name}
                </Badge>{" "}
                · {exp.properties.Status.status.name} ·{" "}
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "long",
                }).format(new Date(exp.properties.Date.date.start))}{" "}
                –{" "}
                {exp.properties.Date.date.end
                  ? new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "long",
                    }).format(new Date(exp.properties.Date.date.end))
                  : "Present"}
              </span>
            </div>
          </div>
        </div>
      </DialogHeader>

      <Separator className="shrink-0" />

      <div className="overflow-y-auto flex-1 space-y-4 pr-1">
        {/* media */}
        <div className="space-y-2">
          <h1 className="text-lg font-semibold">Media</h1>
          <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {exp.properties["Files & media"].files.map((file, i) => {
              const url =
                file.type === "file" ? file.file.url : file.external.url;
              return (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 w-52"
                >
                  <MediaImage url={url} name={file.name} />
                </a>
              );
            })}
          </div>
        </div>

        {/* deskripsi */}
        <div className="space-y-2">
          <h1 className="text-lg font-semibold">Deskripsi</h1>
          <ul className="pl-5 space-y-1 list-disc text-sm">
            {exp.properties.Description.rich_text[0].plain_text
              .split("\n")
              .filter(Boolean)
              .map((line, i) => (
                <li key={i}>{line.replace(/^•\s*/, "")}</li>
              ))}
          </ul>
        </div>
      </div>
    </DialogContent>
  );
}
