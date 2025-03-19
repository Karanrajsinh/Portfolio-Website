"use client"

import { motion } from "framer-motion"
import { HoverBorderGradient } from "./aceternity/HoverBorderGradient"

const skills = [
  { name: "React.js", level: 90 },
  { name: "Next.js", level: 85 },
  { name: "TypeScript", level: 80 },
  { name: "Tailwind CSS", level: 90 },
  { name: "Node.js", level: 75 },
  { name: "PostgreSQL", level: 70 },
]

export function About() {
  return (
    <section className="py-20 bg-muted/50" id="about">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Profile Image Placeholder */}
          <motion.div
            className="relative mx-auto md:mx-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-64 h-64 relative rounded-2xl overflow-hidden bg-primary/10 flex items-center justify-center">
              <div className="text-4xl font-bold text-primary">VK</div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </motion.div>

          {/* Content */}
          <div className="space-y-6">
            <motion.h2
              className="text-3xl md:text-4xl font-bold font-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              About Me
            </motion.h2>

            <motion.p
              className="text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              I am a passionate Front-End Developer based in Rajasthan, India, specializing in building responsive and user-friendly web applications. With expertise in modern JavaScript frameworks and a keen eye for design, I create seamless digital experiences that combine functionality with aesthetic appeal.
            </motion.p>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {skills.map((skill, index) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{skill.name}</span>
                    <span className="text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <HoverBorderGradient>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2"
                >
                  Download Resume
                </a>
              </HoverBorderGradient>

              <HoverBorderGradient>
                <a
                  href="mailto:vaghelakaranraj54@gmail.com"
                  className="inline-flex items-center gap-2"
                >
                  Contact Me
                </a>
              </HoverBorderGradient>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}