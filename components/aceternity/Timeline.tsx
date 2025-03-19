"use client"

import { useScroll, useTransform, motion } from "framer-motion"
import { useRef } from "react"

interface TimelineEntry {
    title: string
    duration: string
    location: string
    content: React.ReactNode
}

interface TimelineProps {
    entries: TimelineEntry[]
}

export function Timeline({ entries }: TimelineProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 0.9", "end 0.3"],
    })

    return (
        <motion.div
            ref={containerRef}
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="relative pt-4 md:pt-10">
                {/* Timeline line */}
                <div className="absolute left-4 md:left-9 top-0 bottom-0 w-0.5 bg-muted" />

                {/* Progress line */}
                <motion.div
                    className="absolute left-4 md:left-9 top-0 w-0.5 bg-primary origin-top"
                    style={{ scaleY: scrollYProgress }}
                />

                {/* Timeline entries */}
                {entries.map((entry, index) => (
                    <motion.div
                        key={index}
                        className="relative pl-12 md:pl-20 pb-10 md:pb-16 last:pb-0"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {/* Timeline dot */}
                        <div className="absolute left-2.5 md:left-7 w-3 md:w-4 h-3 md:h-4 rounded-full bg-background border-2 border-primary" />

                        <div className="bg-card rounded-lg p-4 md:p-6 shadow-lg">
                            <div className="space-y-1 mb-3">
                                <h3 className="text-lg md:text-xl font-bold">{entry.title}</h3>
                                <div className="flex flex-wrap gap-2 text-xs md:text-sm text-muted-foreground">
                                    <span>{entry.duration}</span>
                                    <span>•</span>
                                    <span>{entry.location}</span>
                                </div>
                            </div>
                            <div className="prose prose-sm md:prose-base prose-invert max-w-none">
                                {entry.content}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}