"use client";

import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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

interface AboutCardProps {
  cvUrl: string;
  githubContributions: ReactNode;
}

export function AboutCard({ cvUrl, githubContributions }: AboutCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {/* Overlay backdrop saat expanded */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpanded(false)}
          />
        )}
      </AnimatePresence>

      {/* Card dengan layoutId agar posisi/ukuran dianimasikan */}
      <motion.div
        layoutId="about-card"
        onClick={() => !expanded && setExpanded(true)}
        className={
          expanded
            ? "fixed inset-0 m-auto z-50 w-[min(90vw,600px)] h-fit max-h-[90vh] overflow-y-auto cursor-default"
            : "md:col-span-3 lg:col-span-2 md:row-span-2 cursor-pointer"
        }
        style={{ borderRadius: 16 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <Card className="p-6 bg-card border border-border rounded-2xl shadow-none h-full">
          <div className="flex flex-col h-full relative z-10">
            {/* Header selalu tampil */}
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
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={cvUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download CV
                  </a>
                </Button>
              </ItemActions>
            </Item>

            <p className="text-card-foreground leading-relaxed font-sans text-sm">
              Mahasiswa Teknik Informatika dengan pengalaman di bidang
              pengembangan perangkat lunak, desain UI/UX, dan manajemen proyek.
            </p>

            {githubContributions}

            <div className="space-y-4">
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
                    alt="java"
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
            </div>

            {/* Detail yang muncul hanya saat expanded */}
            <AnimatePresence>
              {expanded && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                  className="mt-4 space-y-4"
                >
                  {/* Tombol tutup */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpanded(false);
                    }}
                  >
                    Close
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Card>
      </motion.div>
    </>
  );
}
