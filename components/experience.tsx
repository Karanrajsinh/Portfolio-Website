"use client"

import { motion } from "framer-motion"
import TimelineDemo from "./ui/timeline-demo"

export function Experience() {
  return (
    <section id="experience">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Professional Experience
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            My journey in web development, from internships to open-source contributions
          </p>
        </motion.div>

        <TimelineDemo />
      </div>
    </section>
  )
}