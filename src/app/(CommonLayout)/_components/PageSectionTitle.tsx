"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const PageSectionTitle = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const ref = useRef(null);

  // Use the useInView hook with the ref
  const isInView = useInView(ref);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="relative h-[300px] md:h-[200px] mb-16 mt-5"
    >
      <div className="relative h-full rounded-md">
        <div className="flex items-center justify-center h-full">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -20 }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeInOut" }}
              className="text-primary text-5xl md:text-6xl font-bold text-center"
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -20 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeInOut" }}
              className="text-secondary font-medium mt-2 text-lg lg:text-2xl text-center"
            >
              {description}
            </motion.p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PageSectionTitle;
