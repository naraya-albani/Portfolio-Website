import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Instagram,
  Building2,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { fetchDatabase, fetchPageBlocks } from "@/lib/notion";
import { ExperienceCard } from "@/components/experience-card";
import Image from "next/image";
import { Experience } from "@/types";
import { getRepos } from "@/lib/github";
import { ItemGroup } from "@/components/ui/item";
import { ProjectCard, ProjectItem } from "@/components/project-components";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  GitHubContributions,
  GitHubStats,
} from "@/components/github-components";
import { AboutCard } from "@/components/about-card";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import WakaTimeStats from "@/components/wakatime-components";

export default async function Home() {
  const blocks = await fetchPageBlocks();

  const cvBlock = blocks.find((block: any) => block.type === "file");
  const cvUrl = (cvBlock as any).file.file.url;

  const repos = await getRepos();

  const experienceBlock = blocks.filter(
    (block: any) =>
      block.type === "child_database" &&
      block.child_database?.title === "Experiences",
  );

  const experiences = (await fetchDatabase(
    experienceBlock?.[0].id,
  )) as Experience[];

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-end mb-6 gap-4">
          <ThemeToggle />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 h-200 md:h-150">
          {/* About Me - Tall Card (Top Left) */}
          <AboutCard
            cvUrl={cvUrl}
            githubContributions={
              <Suspense
                fallback={<Skeleton className="absolute inset-0 rounded-lg" />}
              >
                <GitHubContributions />
              </Suspense>
            }
            githubStats={
              <Suspense
                fallback={<Skeleton className="absolute inset-0 rounded-lg" />}
              >
                <GitHubStats />
              </Suspense>
            }
            wakaTime={
              <Suspense
                fallback={<Skeleton className="absolute inset-0 rounded-lg" />}
              >
                <WakaTimeStats />
              </Suspense>
            }
          />

          {/* Experience - Medium Card (Top Middle) */}
          <Card
            id="experience"
            className="md:col-span-2 p-6 bg-card border border-border relative rounded-2xl shadow-none"
          >
            <div className="relative z-10">
              <div className="flex justify-between">
                <h3 className="font-bold text-card-foreground mb-4 font-sans">
                  Experiences
                </h3>
                {experiences.length > 3 && (
                  <Dialog>
                    <form>
                      <DialogTrigger asChild>
                        <button className="font-sans text-blue-500 hover:underline">
                          See all
                        </button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-106.25">
                        <DialogHeader>
                          <DialogTitle>Edit profile</DialogTitle>
                          <DialogDescription>
                            Make changes to your profile here. Click save when
                            you&apos;re done.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                          <div className="grid gap-3"></div>
                          <div className="grid gap-3"></div>
                        </div>
                      </DialogContent>
                    </form>
                  </Dialog>
                )}
              </div>
              {experiences.slice(0, 3).map((exp) => (
                <Dialog key={exp.id}>
                  <DialogTrigger asChild>
                    <div className="flex items-start gap-3 hover:bg-accent p-2 rounded-xl cursor-pointer transition-colors">
                      {/* logo perusahaan */}
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 overflow-hidden">
                        {exp.icon?.external.url ? (
                          <Image
                            src={exp.icon.external.url}
                            alt={exp.properties.Name.title?.[0].plain_text}
                            width={200}
                            height={200}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Building2 className="w-5 h-5 text-primary" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-card-foreground text-sm truncate">
                          {exp.properties.Name.title?.[0].plain_text}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          <Badge
                            color={
                              exp.properties.Position.multi_select?.[0].color
                            }
                          >
                            {exp.properties.Position.multi_select?.[0].name}
                          </Badge>{" "}
                          •{" "}
                          {new Intl.DateTimeFormat("en-US", {
                            year: "numeric",
                            month: "long",
                          }).format(
                            new Date(exp.properties.Date.date.start),
                          )}{" "}
                          – Present
                        </p>
                      </div>
                    </div>
                  </DialogTrigger>
                  <ExperienceCard exp={exp} />
                </Dialog>
              ))}
            </div>
          </Card>

          {/* Status - Square Card (Top Right) */}
          <Card className="md:col-span-1 p-6 bg-card border border-border relative rounded-2xl shadow-none">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                <h3 className="font-semibold text-card-foreground font-sans">
                  Available
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4 font-sans">
                Open to new opportunities
              </p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground font-sans">
                    Projects
                  </span>
                  <span className="font-semibold text-card-foreground font-sans">
                    {repos.length}+
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground font-sans">
                    Experience
                  </span>
                  <span className="font-semibold text-card-foreground font-sans">
                    {new Date().getFullYear() - 2023} years
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Social Links - Square Card (Bottom Left) */}
          <Card
            id="contact"
            className="md:col-span-1 p-6 bg-card border border-border relative rounded-2xl shadow-none"
          >
            <div className="relative z-10">
              <h3 className="font-semibold text-card-foreground mb-4 font-sans">
                Connect
              </h3>
              <div className="space-y-3">
                <a
                  href="https://github.com/naraya-albani"
                  className="flex items-center gap-3 text-card-foreground hover:text-primary hover:translate-x-1 transition-all duration-200"
                  target="_blank"
                >
                  <Github className="w-4 h-4" />
                  <span className="text-sm font-sans">GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/narayaalbani/"
                  className="flex items-center gap-3 text-card-foreground hover:text-blue-500 hover:translate-x-1 transition-all duration-200"
                  target="_blank"
                >
                  <Linkedin className="w-4 h-4" />
                  <span className="text-sm font-sans">LinkedIn</span>
                </a>
                <a
                  href="https://twitter.com/narayaalbani"
                  className="flex items-center gap-3 text-card-foreground hover:text-blue-400 hover:translate-x-1 transition-all duration-200"
                  target="_blank"
                >
                  <Twitter className="w-4 h-4" />
                  <span className="text-sm font-sans">Twitter</span>
                </a>
                <a
                  href="https://www.instagram.com/narayaalbani"
                  className="flex items-center gap-3 text-card-foreground hover:text-pink-500 hover:translate-x-1 transition-all duration-200"
                  target="_blank"
                >
                  <Instagram className="w-4 h-4" />
                  <span className="text-sm font-sans">Instagram</span>
                </a>
                <a
                  href="mailto:naraya.albani@gmail.com"
                  className="flex items-center gap-3 text-card-foreground hover:text-red-500 hover:translate-x-1 transition-all duration-200"
                >
                  <Mail className="w-4 h-4" />
                  <span className="text-sm font-sans">Email</span>
                </a>
              </div>
            </div>
          </Card>

          {/* Projects - Large Card (Bottom Right) */}
          <Card
            id="projects"
            className="md:col-span-2 lg:col-span-2 p-6 bg-card border border-border relative rounded-2xl shadow-none"
          >
            <div className="relative z-10">
              <div className="flex justify-between">
                <h3 className="font-bold text-card-foreground mb-4 font-sans">
                  Recent Projects
                </h3>
                {repos.length > 2 && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="font-sans text-blue-500 hover:underline">
                        See all
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-106.25">
                      <DialogHeader>
                        <DialogTitle>Projects</DialogTitle>
                      </DialogHeader>
                      <ScrollArea className="max-h-96">
                        <ItemGroup className="gap-2">
                          {repos.map((repo: any) => (
                            <Dialog key={repo.id}>
                              <DialogTrigger asChild>
                                <ProjectItem repo={repo} />
                              </DialogTrigger>
                              <ProjectCard repo={repo} />
                            </Dialog>
                          ))}
                        </ItemGroup>
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
              <ItemGroup className="gap-2">
                {repos.slice(0, 2).map((repo: any) => (
                  <Dialog key={repo.id}>
                    <DialogTrigger asChild>
                      <ProjectItem repo={repo} />
                    </DialogTrigger>
                    <ProjectCard repo={repo} />
                  </Dialog>
                ))}
              </ItemGroup>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <p className="text-muted-foreground text-sm font-sans">
            © 2026 Naraya Albani. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
