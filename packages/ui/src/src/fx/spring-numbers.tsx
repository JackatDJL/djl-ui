"use client";

import { useEffect } from "react";
import type { MotionValue} from "framer-motion";
import { motion, useSpring, useTransform } from "framer-motion";
import { cldText } from ">util/classnames";

interface AnimatedNumberProps {
  value: number;
  mass?: number;
  stiffness?: number;
  damping?: number;
  precision?: number;
   
  format?: (value: number) => string;
  onAnimationStart?: () => void;
  onAnimationComplete?: () => void;
}

export function Custom({
  value,
  mass = 0.8,
  stiffness = 75,
  damping = 15,
  precision = 0,
  format = (num) => num.toLocaleString(),
  onAnimationStart,
  onAnimationComplete,
}: AnimatedNumberProps) {
  const spring = useSpring(value, { mass, stiffness, damping });
  const display: MotionValue<string> = useTransform(
    spring,
    (
      current: number // typeof number is a fix rn / Need to Test dis
    ) => format(parseFloat(current.toFixed(precision)))
  );

  useEffect(() => {
    spring.set(value);
    if (onAnimationStart) onAnimationStart();
    const unsubscribe = spring.onChange(() => {
      if (spring.get() === value && onAnimationComplete) onAnimationComplete();
    });
    return () => { unsubscribe(); };
  }, [spring, value, onAnimationStart, onAnimationComplete]);

  return <motion.span className={cldText}>{display}</motion.span>;
}

export function SpringNumbers({
  value,
  onAnimationStart,
  onAnimationComplete,
}: AnimatedNumberProps) {
  return (
    <Custom
      damping={15}
      mass={1.3}
      onAnimationComplete={onAnimationComplete}
      onAnimationStart={onAnimationStart}
      stiffness={50}
      value={value}
    />
  );
}
