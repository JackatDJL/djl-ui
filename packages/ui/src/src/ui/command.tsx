"use client";

import * as React from "react";
import { type DialogProps } from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "react-feather";

import { cn } from ">util/twm";
import { Dialog, DialogWrapper } from ">/dialog";
import { Preset } from ">/popup";

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive> & {
    passthrough?: boolean;
  }
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md duration-700 bg-background text-foreground border border-ring",
      "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium duration-700 [&_[cmdk-group-heading]]:text-primary-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5",
      className
    )}
    ref={ref}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

interface CommandDialogProps extends DialogProps {
  trigger: string;
  triggervariant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "ghost";
}

const asDialog = ({
  children,
  trigger,
  triggervariant,
  ...props
}: CommandDialogProps) => {
  return (
    <DialogWrapper trigger={trigger} triggervariant={triggervariant}>
      <Dialog className="overflow-hidden p-0 shadow-lg" {...props}>
        <Command
          className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium duration-700 [&_[cmdk-group-heading]]:text-primary-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5"
          passthrough
        >
          {children}
        </Command>
      </Dialog>
    </DialogWrapper>
  );
};

const asPopup = ({
  children,
  trigger,
  triggervariant,
  ...props
}: CommandDialogProps) => {
  return (
    <Preset trigger={trigger} triggervariant={triggervariant}>
      <Command
        className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium duration-700 [&_[cmdk-group-heading]]:text-primary-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5"
        passthrough
        {...props}
      >
        {children}
      </Command>
    </Preset>
  );
};

const Input = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  // eslint-disable-next-line react/no-unknown-property -- cmdk-input-wrapper is a custom attribute
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      className={cn(
        "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none duration-700 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
));

Input.displayName = CommandPrimitive.Input.displayName;

const List = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    ref={ref}
    {...props}
  />
));

List.displayName = CommandPrimitive.List.displayName;

const Empty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    className="py-6 text-center text-sm"
    ref={ref}
    {...props}
  />
));

Empty.displayName = CommandPrimitive.Empty.displayName;

const Group = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    className={cn(
      "overflow-hidden p-1 text-foreground duration-700 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-secondary-foreground",
      className
    )}
    ref={ref}
    {...props}
  />
));

Group.displayName = CommandPrimitive.Group.displayName;

const Separator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    className={cn(
      "-mx-1 h-px bg-l-bg-600 duration-700 dark:bg-d-bg-300",
      className
    )}
    ref={ref}
    {...props}
  />
));
Separator.displayName = CommandPrimitive.Separator.displayName;

const Item = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none duration-700 aria-selected:bg-card aria-selected:text-muted-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    ref={ref}
    {...props}
  />
));

Item.displayName = CommandPrimitive.Item.displayName;

const Shortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-s tracking-widest font-bold text-foreground duration-700",
        className
      )}
      {...props}
    />
  );
};
Shortcut.displayName = "CommandShortcut";

export {
  Command as Base,
  asDialog,
  asPopup,
  Input,
  List,
  Empty,
  Group,
  Item,
  Shortcut,
  Separator,
};
