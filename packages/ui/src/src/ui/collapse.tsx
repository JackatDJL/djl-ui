"use client";

import * as React from "react";
import * as CollapsePrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "react-feather";

import { cn } from ">util/twm";

interface CGroupProps {
  title?: string;
  children?: React.ReactNode;
}

const CollapseGroup: React.FC<CGroupProps> = ({
  children,
  title,
  ...props
}) => {
  return (
    <>
      {title ? <h2>{title}</h2> : null}
      <CollapsePrimitive.Root
        type="multiple"
        {...props}
        className="border-t border-b duration-700 border-secondary"
        defaultValue={["default"]}
      >
        {children}
      </CollapsePrimitive.Root>
    </>
  );
};

const CollapseItem = React.forwardRef<
  React.ElementRef<typeof CollapsePrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CollapsePrimitive.Item>
>(({ className, ...props }, ref) => (
  <CollapsePrimitive.Item
    ref={ref}
    {...props}
    className={cn(
      "border-t border-b border-secondary/70 duration-700 ",
      className
    )}
  />
));
CollapseItem.displayName = "AccordionItem";

const CollapseHeadRaw = React.forwardRef<
  React.ElementRef<typeof CollapsePrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof CollapsePrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <CollapsePrimitive.Header className="flex text-l-txt">
    <CollapsePrimitive.Trigger
      className={cn(
        "flex flex-1 items-center justify-between text-foreground duration-700 font py-4 font-medium transition-all [&[data-state=open]>svg]:rotate-180",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </CollapsePrimitive.Trigger>
  </CollapsePrimitive.Header>
));
CollapseHeadRaw.displayName = "CollapseHeadRaw";

const CollapseContentRaw = React.forwardRef<
  React.ElementRef<typeof CollapsePrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof CollapsePrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <CollapsePrimitive.Content
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-collapse-up data-[state=open]:animate-collapse-down"
    ref={ref}
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </CollapsePrimitive.Content>
));

CollapseContentRaw.displayName = "CollapseContentRaw";

interface CollapseProps {
  title?: string;
  children?: React.ReactNode;
  trigger: React.ReactNode;
  className?: string;
  no?: string;
  defaultExpanded?: boolean;
}
let collapseCounter = 0;
const Collapse: React.FC<CollapseProps> = ({
  defaultExpanded,
  title,
  trigger,
  children,
  className,
  no,
  ...props
}) => {
  const value = no || `collapse-${collapseCounter++}`;

  if (!defaultExpanded) {
    return (
      <CollapseItem className={cn("border-b border-t")} value={value}>
        <CollapseHeadRaw>{trigger}</CollapseHeadRaw>
        <CollapseContentRaw>
          <h1 className=" font-bold border-collapse top-2 duration-700 text-muted-foreground">
            {title}
          </h1>
          <div
            className={cn("text-foreground duration-700", className)}
            {...props}
          >
            {children}
          </div>
        </CollapseContentRaw>
      </CollapseItem>
    );
  }
  return (
    <CollapseItem className={cn("border-b border-t")} value="default">
      <CollapseHeadRaw>{trigger}</CollapseHeadRaw>
      <CollapseContentRaw>
        <h1 className=" font-bold border-collapse top-2 text-muted-foreground">
          {title}
        </h1>
        <div className={cn("text-foreground", className)} {...props}>
          {children}
        </div>
      </CollapseContentRaw>
    </CollapseItem>
  );
};

export { CollapseGroup as Group, Collapse as Object };
