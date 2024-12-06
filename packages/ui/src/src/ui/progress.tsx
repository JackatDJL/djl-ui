"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from ">util/twm";

interface ProgressProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    "color"
  > {
  color?: Record<number, string>;
  bg?: string;
  value: number;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, color, bg = "bg-background", ...props }, ref) => {
  const colorClasses = React.useMemo(() => {
    if (!color) return "bg-primary duration-700";

    const colorMap = color;
    const sortedKeys = Object.keys(colorMap)
      .map((key): number => Number(key))
      .sort((a, b) => a - b);
    for (let i = sortedKeys.length - 1; i >= 0; i--) {
      const threshold = sortedKeys[i];
      if (value >= threshold) {
        return colorMap[threshold];
      }
    }

    return "";
  }, [color, value]);

  return (
    <ProgressPrimitive.Root
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full ",
        bg,
        className
      )}
      ref={ref}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn("h-full w-full flex-1 transition-all", colorClasses)}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
