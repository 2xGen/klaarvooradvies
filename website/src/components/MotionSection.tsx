"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

type MotionSectionProps = HTMLMotionProps<"section"> & {
  children: React.ReactNode;
  /** Extra delay (s) for staggered sections */
  delay?: number;
};

export function MotionSection({ children, className, delay = 0, ...rest }: MotionSectionProps) {
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{
        duration: 0.75,
        delay,
        ease: [0.16, 1, 0.3, 1] as const,
      }}
      {...rest}
    >
      {children}
    </motion.section>
  );
}
