import * as React from "react";

import { cn } from ">util/twm";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn(
      "rounded-lg border bg-background/10 duration-700 glassblur text-foreground shadow-sm",
      className
    )}
    ref={ref}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn("flex flex-col space-y-1.5 pt-1 px-3 pb-1", className)}
    ref={ref}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h3
    className={cn(
      "text-2xl px-3 pt-2 font-semibold leading-none tracking-tight",
      className
    )}
    ref={ref}
    {...props}
  >
    {children}
  </h3>
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    className={cn(
      "pl-3 text-sm text-muted-foreground duration-700 ",
      className
    )}
    ref={ref}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div className={cn("px-3 pt-2", className)} ref={ref} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn("flex items-center px-3 py-1", className)}
    ref={ref}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

const CardDivider = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn("border-t border-ring duration-700 ", className)}
    ref={ref}
    {...props}
  />
));
CardDivider.displayName = "CardDivider";

export {
  Card as Wrapper,
  CardHeader as Header,
  CardFooter as Footer,
  CardTitle as Title,
  CardDescription as Description,
  CardContent as Content,
  CardDivider as Divider,
};

const Preset: React.FC<
  React.HTMLAttributes<HTMLElement> & {
    Header?: React.ReactNode | string | undefined;
    Footer?: React.ReactNode | string | undefined;
    Title?: string | undefined;
    Description?: string | undefined;
    nodivider?: boolean;
  }
> = ({ children, Header, Footer, Title, Description, nodivider, ...props }) => {
  let showheader = true;
  if (!Header && !Title && !Description) {
    showheader = false;
  }
  return (
    <Card>
      {showheader && (
        <CardHeader>
          {Title ? <CardTitle>{Title}</CardTitle> : null}
          {Description ? (
            <CardDescription>{Description}</CardDescription>
          ) : null}
          {Header ? <div className="px-3">{Header}</div> : null}
          {!nodivider && <CardDivider />}
        </CardHeader>
      )}
      {children ? <CardContent {...props}>{children}</CardContent> : null}
      {Footer ? <CardFooter>{Footer}</CardFooter> : null}
    </Card>
  );
};

export { Preset };
