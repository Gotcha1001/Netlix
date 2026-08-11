import { ALL_AUDIENCES_CONFIG, RATING_CONFIG } from "@/lib/constants";
import React from "react";

interface Props {
  rating?: string;
  size?: "sm" | "md";
}

function MaturityBadge({ rating, size }: Props) {
  const config = rating
    ? (RATING_CONFIG[rating] ?? ALL_AUDIENCES_CONFIG)
    : ALL_AUDIENCES_CONFIG;

  const sizeClass =
    size === "sm" ? "w-8 h-8 text-xs" : "w-8 h-8 md:w-11 md:h-11 text-base";

  return (
    <span
      style={{ backgroundColor: config.color }}
      className={`${sizeClass} flex items-center justify-center font-bold rounded-full border border-white text-white shrink-0`}
    >
      {config.display}
    </span>
  );
}

export default MaturityBadge;
