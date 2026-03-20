"use client";

import Image from "next/image";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";

export function MediaImage({ url, name }: { url: string; name: string }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="relative w-full aspect-video overflow-hidden rounded-lg border border-border">
      {/* Skeleton */}
      {!loaded && !error && (
        <Skeleton className="absolute inset-0 rounded-lg" />
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted rounded-lg text-xs text-muted-foreground">
          Gagal memuat
        </div>
      )}

      {/* Gambar */}
      <Image
        src={url}
        alt={name}
        fill
        loading="lazy"
        className={`object-cover transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  );
}
