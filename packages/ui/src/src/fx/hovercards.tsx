"use client";
// Credits: https://ui.aceternity.com/

// Docs for dis: https://ui.aceternity.com/components/card-hover-effect

import { cn } from ">util/twm";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateRandomInt = () => {
  let result = 1;
  for (let i = 0; i < 5; i++) {
    result *= randomInt(0, 1000);
  }
  return result;
};

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title?: string;
    description?: string;
    href?: string;
    bg?: string;
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-4",
        className
      )}
      key="hovereffectfxwrapppper"
    >
      {items.map((item, idx) => (
        <Link
          className="relative group  block p-2 h-full w-full"
          href={item.href || "#"}
          id={item.title}
          key={item.title ?? generateRandomInt()}
          onMouseEnter={() => {
            setHoveredIndex(idx);
          }}
          onMouseLeave={() => {
            setHoveredIndex(null);
          }}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
                initial={{ opacity: 0 }}
                key={item.title ? `${item.title}span` : generateRandomInt()}
                layoutId="hoverBackground"
              />
            )}
          </AnimatePresence>
          <Card
            bg={item.bg}
            forewardkey={item.title}
            key={item.title ? `card${item.title}` : generateRandomInt()}
          >
            {item.title ? (
              <CardTitle key={item.title ?? generateRandomInt()}>
                {item.title}
              </CardTitle>
            ) : null}
            {item.description ? (
              <CardDescription key={item.description ?? generateRandomInt()}>
                {item.description}
              </CardDescription>
            ) : null}
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
  forewardkey,
  bg,
}: {
  className?: string;
  children: React.ReactNode;
  forewardkey?: string;
  bg?: string;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-1 overflow-hidden bg-background/50 glassblur flex items-center justify-evenly border border-accent group-hover:border-secondary relative z-20",
        className
      )}
      key={`${forewardkey}hoverfxwrapper`}
    >
      {bg ? (
        <Image
          alt={bg || "default image"}
          height={250}
          key={`${forewardkey}hoverfximage`}
          src={bg || "/default-image.jpg"}
          width={250}
        />
      ) : null}
      <div className="relative z-50">
        <div className="p-2">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4
      className={cn("text-foreground font-bold tracking-wide mt-1", className)}
    >
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-2 text-foreground/80 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
