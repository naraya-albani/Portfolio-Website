"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  ExternalLink,
  Code2,
  Instagram,
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

export default function Home() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-end mb-6 gap-4">
          <Button size="sm">Hire Me</Button>
          <Button variant="outline" size="sm">
            Download CV
          </Button>
          <ThemeToggle />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 h-200 md:h-150">
          {/* About Me - Tall Card (Top Left) */}
          <Card
            id="about"
            className="md:col-span-3 lg:col-span-2 md:row-span-2 p-6 bg-card border border-border relative rounded-2xl shadow-none"
          >
            <div className="flex flex-col h-full relative z-10">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary font-sans">
                    FM
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-card-foreground font-sans">
                    Naraya Albani
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Code2 className="w-4 h-4" />
                    <span className="font-sans">Software Engineer</span>
                  </div>
                </div>
              </div>
              <p className="text-card-foreground leading-relaxed font-sans flex-1 text-sm">
                Undergraduate Informatics Engineering student with experience in
                UI/UX design, software engineering, and project management.
                Skilled in translating user and stakeholder needs into
                structured requirements, user flows, and high-fidelity
                prototypes across digital projects. Strong foundation in user
                research and cross-functional collaboration, with an interest in
                building scalable, user-centered software solutions.
              </p>
              <div className="space-y-4 mt-4">
                <div>
                  <h3 className="font-bold text-card-foreground font-sans">
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-4">
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
                      alt="java-coffee-cup-logo--v1"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-card-foreground font-sans">
                    Design & Tools
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <img
                      width="48"
                      height="48"
                      src="https://img.icons8.com/color/48/adobe-premiere-pro--v1.png"
                      alt="adobe-premiere-pro--v1"
                    />
                    <img
                      width="48"
                      height="48"
                      src="https://img.icons8.com/color/48/adobe-illustrator--v1.png"
                      alt="adobe-illustrator--v1"
                    />
                    <img
                      width="48"
                      height="48"
                      src="https://img.icons8.com/color/48/adobe-photoshop--v1.png"
                      alt="adobe-photoshop--v1"
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
                      alt="blender-3d"
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
              </div>
            </div>
          </Card>

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
              </div>
              <div className="">
                <div className="flex items-start gap-3 hover:bg-accent p-2 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-primary font-sans">
                      TC
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-card-foreground font-sans text-sm">
                      Senior Full Stack Developer
                    </h4>
                    <p className="text-xs text-muted-foreground font-sans">
                      TechCorp Inc. • 2022 - Present
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 hover:bg-accent p-2 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-primary font-sans">
                      ST
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-card-foreground font-sans text-sm">
                      Full Stack Developer
                    </h4>
                    <p className="text-xs text-muted-foreground font-sans">
                      StartupXYZ • 2020 - 2022
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 hover:bg-accent p-2 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-primary font-sans">
                      ST
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-card-foreground font-sans text-sm">
                      Full Stack Developer
                    </h4>
                    <p className="text-xs text-muted-foreground font-sans">
                      StartupXYZ • 2020 - 2022
                    </p>
                  </div>
                </div>
              </div>
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
                    25+
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
                  Projects
                </h3>
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
              </div>
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-card-foreground font-sans">
                      E-Commerce Platform
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2 font-sans">
                      Modern e-commerce platform with React, Node.js, and
                      PostgreSQL featuring payment processing and real-time
                      inventory.
                    </p>
                    <div className="flex flex-wrap gap-1">
                      <Badge
                        variant="outline"
                        className="text-xs font-sans rounded-full"
                      >
                        React
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-xs font-sans rounded-full"
                      >
                        Node.js
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-xs font-sans rounded-full"
                      >
                        PostgreSQL
                      </Badge>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="ml-3 font-sans bg-transparent hover:bg-primary/10 hover:scale-105 transition-all duration-200 rounded-full"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-card-foreground font-sans">
                      Task Management App
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2 font-sans">
                      Collaborative task management with real-time updates,
                      drag-and-drop functionality, and team features.
                    </p>
                    <div className="flex flex-wrap gap-1">
                      <Badge
                        variant="outline"
                        className="text-xs font-sans rounded-full"
                      >
                        Next.js
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-xs font-sans rounded-full"
                      >
                        TypeScript
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-xs font-sans rounded-full"
                      >
                        Socket.io
                      </Badge>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="ml-3 font-sans bg-transparent hover:bg-primary/10 hover:scale-105 transition-all duration-200 rounded-full"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
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
