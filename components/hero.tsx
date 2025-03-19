"use client"

import { motion } from "framer-motion"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
import { Button } from "./ui/button"

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section className="relative min-h-screen flex items-center" id="home">
      {/* Additional hero shadow for emphasis in dark mode only */}
      <div className="absolute inset-0 bg-gradient-to-b dark:from-black/50 from-transparent to-transparent pointer-events-none" />

      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6 py-20 md:py-32"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold font-heading mb-6"
          variants={itemVariants}
        >
          Karanrajsinh Vaghela
          <span className="block opacity-80 text-xl md:text-2xl text-cyan-500 mt-2">
            Front-End Developer
          </span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl"
          variants={itemVariants}
        >
          Crafting intuitive web experiences with modern technologies.
          Specializing in React.js, Next.js, and responsive design.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-16"
          variants={itemVariants}
        >
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <HoverBorderGradient
              containerClassName="rounded-full"
              className="dark:bg-black bg-white text-black dark:text-white px-6 py-3"
              as="button"
              onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View My Work
            </HoverBorderGradient>

            <Button
              asChild
              variant="ghost"
              className="bg-primary/10 hover:bg-primary/20 text-primary w-fit px-6 py-6 rounded-full flex items-center gap-2 transition-colors"
            >
              <a href="/Resume.pdf" download="Karanrajsinh-Resume.pdf">
                Download CV
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-muted-foreground rounded-full p-1"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <div className="w-1.5 h-3 bg-primary rounded-full mx-auto" />
          </motion.div>
          <p className="text-sm text-muted-foreground mt-2 text-center">
            Scroll to explore
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}