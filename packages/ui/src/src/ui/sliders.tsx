"use client";

 
import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from ">util/twm";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    ref={ref}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full duration-700 bg-secondary opacity-50 glassblur">
      <SliderPrimitive.Range className="absolute h-full bg-primary duration-700" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-secondary duration-700  bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

function GaugeCircle({
  max = 100,
  min = 0,
  value = 0,
  className = "",
}: {
  max?: number;
  min?: number;
  value?: number;
  className?: string;
}) {
  const circumference = 2 * Math.PI * 45;
  const percentPx = circumference / 100;
  const currentPercent = ((value - min) / (max - min)) * 100;

  return (
    <div
      className={cn(
        "relative h-40 w-40 text-2xl font-semibold text-foreground duration-700",
        className
      )}
      style={
        {
          "--circle-size": "100px",
          "--circumference": circumference,
          "--percent-to-px": `${percentPx}px`,
          "--gap-percent": "5",
          "--offset-factor": "0",
          "--transition-length": "1s",
          "--transition-step": "200ms",
          "--delay": "0s",
          "--percent-to-deg": "3.6deg",
          transform: "translateZ(0)",
        } as React.CSSProperties
      }
    >
      <svg
        className="h-full w-full"
        fill="none"
        strokeWidth="2"
        viewBox="0 0 100 100"
      >
        {currentPercent <= 90 && currentPercent >= 0 && (
          <circle
            className="opacity-100 stroke stroke-secondary/70 duration-700"
            cx="50"
            cy="50"
            r="45"
            strokeDashoffset="0"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="10"
            style={
              {
                stroke: "",
                "--stroke-percent": 90 - currentPercent,
                "--offset-factor-secondary": "calc(1 - var(--offset-factor))",
                strokeDasharray:
                  "calc(var(--stroke-percent) * var(--percent-to-px)) var(--circumference)",
                transform:
                  "rotate(calc(1turn - 90deg - (var(--gap-percent) * var(--percent-to-deg) * var(--offset-factor-secondary)))) scaleY(-1)",
                transition: "all var(--transition-length) ease var(--delay)",
                transformOrigin:
                  "calc(var(--circle-size) / 2) calc(var(--circle-size) / 2)",
              } as React.CSSProperties
            }
          />
        )}
        <circle
          className="opacity-100 stroke stroke-primary duration-700"
          cx="50"
          cy="50"
          r="45"
          strokeDashoffset="0"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="10"
          style={
            {
              stroke: "",
              "--stroke-percent": currentPercent,
              strokeDasharray:
                "calc(var(--stroke-percent) * var(--percent-to-px)) var(--circumference)",
              transition:
                "var(--transition-length) ease var(--delay),stroke var(--transition-length) ease var(--delay)",
              transitionProperty: "stroke-dasharray,transform",
              transform:
                "rotate(calc(-90deg + var(--gap-percent) * var(--offset-factor) * var(--percent-to-deg)))",
              transformOrigin:
                "calc(var(--circle-size) / 2) calc(var(--circle-size) / 2)",
            } as React.CSSProperties
          }
        />
      </svg>
      <span
        className="duration-[var(--transition-length)] delay-[var(--delay)] absolute inset-0 m-auto h-fit w-fit ease-linear animate-in fade-in"
        data-current-value={currentPercent}
      >
        {currentPercent}
      </span>
    </div>
  );
}

export { Slider as Default, GaugeCircle as Gauge };
