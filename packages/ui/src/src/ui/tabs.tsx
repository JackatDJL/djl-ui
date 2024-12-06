"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import useMeasure from "react-use-measure";

import { cn } from ">util/twm";
import { Wrapper } from ">/custom-card";
import { cldText } from ">util/classnames";

// Direction Aware Tabs
interface Tab {
  id: number;
  label: string;
  content: ReactNode;
}

interface OgImageSectionProps {
  tabs: Tab[];
  className?: string;
  rounded?: string;
  onChange?: () => void;
  activeTab: number;

  setActiveTab: (tabId: number) => void;
}

function CustomDirectionAwareTabs({
  tabs,
  className,
  rounded,
  onChange,
  activeTab: propActiveTab,
  setActiveTab: _propSetActiveTab,
}: OgImageSectionProps) {
  const [activeTab, setActiveTab] = useState(propActiveTab || 1);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [ref, bounds] = useMeasure();

  const content = useMemo(() => {
    const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;
    return activeTabContent || null;
  }, [activeTab, tabs]);

  const handleTabClick = (newTabId: number) => {
    if (newTabId !== activeTab && !isAnimating) {
      const newDirection = newTabId > activeTab ? 1 : -1;
      setDirection(newDirection);
      setActiveTab(newTabId);
      onChange ? onChange() : null;
    }
  };

  const variants = {
    initial: (dir: number) => ({
      x: 300 * dir,
      opacity: 0,
      filter: "blur(4px)",
    }),
    active: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: (dir: number) => ({
      x: -300 * dir,
      opacity: 0,
      filter: "blur(4px)",
    }),
  };

  return (
    <div className=" flex flex-col items-center w-full">
      <div
        className={cn(
          "flex space-x-1 border border-none border-accent rounded-full cursor-pointer bg-muted opacity-90 glassblur px-[3px] py-[3.2px] shadow-inner-shadow",
          className,
          rounded
        )}
      >
        {tabs.map((tab) => (
          <button
            className={cn(
              cldText,
              "relative rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-medium  transition focus-visible:outline-1 focus-visible:ring-1  focus-visible:outline-none flex gap-2 items-center ",
              activeTab === tab.id
                ? "text-white"
                : "hover:text-neutral-300/60  text-neutral-200/80",
              rounded
            )}
            key={tab.id}
            onClick={() => {
              handleTabClick(tab.id);
            }}
            style={{ WebkitTapHighlightColor: "transparent" }}
            type="button"
          >
            {activeTab === tab.id && (
              <motion.span
                className="absolute  inset-0 z-10 bg-muted mix-blend-difference shadow-inner-shadow border border-accent"
                layoutId="bubble"
                style={rounded ? { borderRadius: 9 } : { borderRadius: 9999 }}
                transition={{ type: "spring", bounce: 0.19, duration: 0.4 }}
              />
            )}

            {tab.label}
          </button>
        ))}
      </div>
      <MotionConfig transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}>
        <motion.div
          animate={{ height: bounds.height }}
          className="relative mx-auto w-full h-full overflow-hidden"
          initial={false}
        >
          <div className="p-1" ref={ref}>
            <AnimatePresence
              custom={direction}
              mode="popLayout"
              onExitComplete={() => {
                setIsAnimating(false);
              }}
            >
              <motion.div
                animate="active"
                className="text-foreground"
                custom={direction}
                exit="exit"
                initial="initial"
                key={activeTab}
                onAnimationComplete={() => {
                  setIsAnimating(false);
                }}
                onAnimationStart={() => {
                  setIsAnimating(true);
                }}
                variants={variants}
              >
                {content}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </MotionConfig>
    </div>
  );
}

function PresetDirectionAwareTabs(props: OgImageSectionProps) {
  const [activeTabs, setActiveTabs] = useState(0);
  return (
    <Wrapper className="border-accent ">
      <CustomDirectionAwareTabs
        {...props}
        activeTab={activeTabs}
        setActiveTab={setActiveTabs}
      />
    </Wrapper>
  );
}
export { CustomDirectionAwareTabs, PresetDirectionAwareTabs };
