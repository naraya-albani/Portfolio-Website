import { DialogTitle } from "@radix-ui/react-dialog";
import { DialogContent, DialogHeader } from "./ui/dialog";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemTitle,
} from "./ui/item";
import { LanguageIcon } from "./language-icon";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Download, FileQuestion, Github, Info, Link } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";

function ProjectItem({ repo }: { repo: any }) {
  return (
    <Item
      variant="outline"
      role="listitem"
      className="cursor-pointer transition-colors hover:bg-accent"
    >
      <ItemContent>
        <ItemTitle>
          <h1 className="font-semibold">{repo.name}</h1>
          <LanguageIcon language={repo.language} />
        </ItemTitle>
        <ItemDescription>{repo.description}</ItemDescription>
        <ItemFooter>
          {repo.topics.map((topic: string, i: number) => (
            <Badge key={i} variant={"outline"}>
              {topic}
            </Badge>
          ))}
        </ItemFooter>
      </ItemContent>
    </Item>
  );
}

function ProjectCard({ repo }: { repo: any }) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-lg leading-tight flex gap-2">
          {repo.name}
          <LanguageIcon language={repo.language} />
        </DialogTitle>
        <div className="flex gap-2">
          {repo.topics.map((topic: string, i: number) => (
            <Badge key={i} variant={"outline"}>
              {topic}
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Button variant={"outline"} size="icon" asChild>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              <Github />
            </a>
          </Button>
          {repo.homepage && (
            <Button variant={"outline"} size="icon" asChild>
              <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                <Link />
              </a>
            </Button>
          )}
        </div>
      </DialogHeader>

      <Separator />

      <div className="space-y-2">
        {repo.description ? (
          <>
            <h1 className="text-lg font-semibold">Deskripsi</h1>

            <p className="text-sm">{repo.description}</p>
          </>
        ) : (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Info />
              </EmptyMedia>
              <EmptyTitle>Tidak ada deskripsi</EmptyTitle>
              <EmptyDescription>
                Proyek ini belum memiliki deskripsi.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </div>
    </DialogContent>
  );
}

export { ProjectItem, ProjectCard };
