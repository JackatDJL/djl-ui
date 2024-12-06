"use client";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Button } from ">/button";
import type * as Feather from "react-feather";

import { cn } from ">util/twm";
import { forwardRef } from "react";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger> & {
    variant?: "default" | "secondary" | "destructive" | "outline" | "ghost";
    prefix?: keyof typeof Feather;
  }
>(({ className, children, variant, ...props }, ref) => (
  <PopoverPrimitive.Trigger
    asChild
    className={cn(" w-auto h-auto", className)}
    ref={ref}
    {...props}
  >
    <Button variant={variant}>{children}</Button>
  </PopoverPrimitive.Trigger>
));
PopoverTrigger.displayName = PopoverPrimitive.Trigger.displayName;

const PopoverContent = forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className = "", align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      align={align}
      className={cn(
        "z-50 w-72 rounded-md border bg-background/20 duration-700 glassblur border-ring text-foreground p-4 shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      ref={ref}
      sideOffset={sideOffset}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

const Popup: React.FC<
  React.ComponentProps<typeof Popover> & {
    trigger: string | undefined;
    prefix?: keyof typeof Feather;
    align?: "center" | "start" | "end";
    sideOffset?: number;
    triggervariant?:
      | "default"
      | "secondary"
      | "destructive"
      | "outline"
      | "ghost";
  }
> = ({
  children,
  trigger,
  prefix,
  align,
  sideOffset,
  triggervariant,
  ...props
}) => {
  return (
    <Popover>
      <PopoverTrigger prefix={prefix} variant={triggervariant}>
        {trigger}
      </PopoverTrigger>
      <PopoverContent align={align} sideOffset={sideOffset} {...props}>
        {children}
      </PopoverContent>
    </Popover>
  );
};

export {
  Popup as Preset,
  Popover as Wrapper,
  PopoverTrigger as Trigger,
  PopoverContent as Content,
};
