"use client";

import * as React from "react";
import * as RawTooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from ">util/twm";
import { cldText } from ">util/classnames";

const RawTooltipProvider = RawTooltipPrimitive.Provider;

const RawTooltip = RawTooltipPrimitive.Root;

const RawTooltipTrigger = RawTooltipPrimitive.Trigger;

const RawTooltipContent = React.forwardRef<
  React.ElementRef<typeof RawTooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof RawTooltipPrimitive.Content>
>(({ className, sideOffset = 4, side = "top", ...props }, ref) => (
  <RawTooltipPrimitive.Content
    className={cn(
      "z-50 overflow-hidden rounded-md border border-ring bg-background/70 softblur duration-700 px-3 py-1.5 text-sm text-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    ref={ref}
    side={side}
    sideOffset={sideOffset}
    {...props}
  />
));
RawTooltipContent.displayName = RawTooltipPrimitive.Content.displayName;

const Tooltip = React.forwardRef<
  React.ElementRef<typeof RawTooltipContent>,
  React.ComponentPropsWithoutRef<typeof RawTooltipContent> & {
    tips: React.ReactNode;
  }
>(({ children, tips, ...props }, ref) => (
  <RawTooltipProvider>
    <RawTooltip>
      <RawTooltipTrigger className={cldText}>{children}</RawTooltipTrigger>
      <RawTooltipContent {...props} ref={ref}>
        {tips}
      </RawTooltipContent>
    </RawTooltip>
  </RawTooltipProvider>
));
Tooltip.displayName = "Tooltip";

export { Tooltip };
