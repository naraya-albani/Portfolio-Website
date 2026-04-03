import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
} from "@/components/ui/item";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "./theme-toggle";
import { FileUser } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { ScrollArea } from "./ui/scroll-area";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

interface AboutCardProps {
  cvUrl: string;
  githubContributions: ReactNode;
  githubStats: ReactNode;
  wakaTime: ReactNode;
}

export function AboutCard({
  cvUrl,
  githubContributions,
  githubStats,
  wakaTime,
}: AboutCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card
          id="about"
          className="md:col-span-3 lg:col-span-2 md:row-span-2 p-6 bg-card border border-border relative rounded-2xl shadow-none transition-transform duration-200 hover:scale-105"
        >
          <div className="space-y-4 h-full relative z-10">
            <Item className="p-0 mb-4">
              <ItemMedia>
                <Avatar size="lg">
                  <AvatarImage
                    src="https://github.com/naraya-albani.png"
                    alt="@naraya-albani"
                  />
                  <AvatarFallback>NA</AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Naraya Albani</ItemTitle>
                <ItemDescription>Full-stack Web Developer</ItemDescription>
              </ItemContent>
              <ItemActions>
                <ThemeToggle />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={cvUrl}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FileUser />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Download CV</p>
                  </TooltipContent>
                </Tooltip>
              </ItemActions>
            </Item>

            <p className="text-card-foreground leading-relaxed font-sans text-sm">
              Computer Science student with experience in software development,
              UI/UX design, and project management.
            </p>

            <h3 className="mt-4 font-bold text-card-foreground font-sans">
              GitHub Activity
            </h3>

            {githubContributions}

            <h3 className="font-bold text-card-foreground font-sans">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/fluency/96/nextjs.png"
                alt="nextjs"
              />
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/fluency/48/laravel.png"
                alt="laravel"
              />
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/color/48/flutter.png"
                alt="flutter"
              />
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/fluency/48/python.png"
                alt="python"
              />
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/color/48/java-coffee-cup-logo--v1.png"
                alt="java"
              />
            </div>

            <h3 className="font-bold text-card-foreground font-sans">
              Design & Tools
            </h3>
            <div className="flex flex-wrap gap-2">
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/color/48/adobe-premiere-pro--v1.png"
                alt="premiere"
              />
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/color/48/adobe-illustrator--v1.png"
                alt="illustrator"
              />
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/color/48/adobe-photoshop--v1.png"
                alt="photoshop"
              />
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/ios-filled/50/aseprite.png"
                alt="aseprite"
                className="bg-white rounded"
              />
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/color/48/blender-3d.png"
                alt="blender"
                className="bg-white rounded"
              />
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/fluency/48/canva.png"
                alt="canva"
              />
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/fluency/48/figma.png"
                alt="figma"
              />
            </div>
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <ScrollArea className="h-[calc(90vh-3rem)] pr-3 py-6">
          <div className="space-y-4 h-full relative z-10">
            <Item className="p-0 mb-4">
              <ItemMedia>
                <Avatar size="lg">
                  <AvatarImage
                    src="https://github.com/naraya-albani.png"
                    alt="@naraya-albani"
                  />
                  <AvatarFallback>NA</AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Naraya Albani</ItemTitle>
                <ItemDescription>Full-stack Web Developer</ItemDescription>
              </ItemContent>
              <ItemActions>
                <ThemeToggle />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={cvUrl}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FileUser />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Download CV</p>
                  </TooltipContent>
                </Tooltip>
              </ItemActions>
            </Item>

            <p className="text-card-foreground leading-relaxed font-sans text-sm">
              Computer Science student with experience in software development,
              UI/UX design, and project management.
            </p>

            <h3 className="mt-4 font-bold text-card-foreground font-sans">
              GitHub Activity
            </h3>

            {githubStats}

            {githubContributions}

            <h3 className="font-bold text-card-foreground font-sans">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/fluency/96/nextjs.png"
                alt="nextjs"
              />
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/fluency/48/laravel.png"
                alt="laravel"
              />
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/color/48/flutter.png"
                alt="flutter"
              />
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/fluency/48/python.png"
                alt="python"
              />
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/color/48/java-coffee-cup-logo--v1.png"
                alt="java"
              />
            </div>

            <h3 className="font-bold text-card-foreground font-sans">
              Design & Tools
            </h3>
            <div className="flex flex-wrap gap-2">
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/color/48/adobe-premiere-pro--v1.png"
                alt="premiere"
              />
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/color/48/adobe-illustrator--v1.png"
                alt="illustrator"
              />
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/color/48/adobe-photoshop--v1.png"
                alt="photoshop"
              />
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/ios-filled/50/aseprite.png"
                alt="aseprite"
                className="bg-white rounded"
              />
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/color/48/blender-3d.png"
                alt="blender"
                className="bg-white rounded"
              />
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/fluency/48/canva.png"
                alt="canva"
              />
              <img
                width="48"
                height="48"
                src="https://img.icons8.com/fluency/48/figma.png"
                alt="figma"
              />
            </div>

            <h3 className="mt-4 font-bold text-card-foreground font-sans">
              WakaTime Stats
            </h3>

            {wakaTime}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
