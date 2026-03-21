"use client";

import Image from "next/image";

export function LanguageIcon({ language }: { language: string }) {
  return (
    <Image
      src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${language.toLowerCase()}/${language.toLowerCase()}-original.svg`}
      alt={language}
      width={16}
      height={16}
      className="shrink-0"
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = "none";
      }}
    />
  );
}
