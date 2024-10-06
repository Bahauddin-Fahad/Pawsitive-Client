"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const SectionTitle = ({ sub, heading }: { sub: string; heading: string }) => {
  // Create a ref for the element to be observed
  const ref = useRef(null);

  // Use the useInView hook with the ref
  const isInView = useInView(ref);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="text-center"
    >
      <div className="flex justify-center gap-3">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -20 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeInOut" }}
          className="text-secondary text-sm md:text-lg font-bold tracking-widest"
        >
          {sub}
        </motion.p>
      </div>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -20 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeInOut" }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 text-primary"
      >
        {heading}
      </motion.h1>
    </motion.div>
  );
};

export default SectionTitle;
