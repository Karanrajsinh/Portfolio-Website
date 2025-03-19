"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Project {
    thumbnail?: string
    title: string
    description: string
    technologies: string
    link: string
}

interface ExpandableCardProps {
    project: Project
}

export function ExpandableCard({ project }: ExpandableCardProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <motion.div
            layout
            onClick={() => setIsOpen(!isOpen)}
            className="bg-card rounded-lg overflow-hidden cursor-pointer group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
        >
            <motion.div layout className="relative h-48 w-full bg-primary/10">
                {project.thumbnail ? (
                    <div className="absolute inset-0">
                        {/* Image would go here when available */}
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                    </div>
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary">{project.title.charAt(0)}</span>
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                    </div>
                )}
            </motion.div>

            <motion.div layout className="p-4">
                <motion.h3 layout className="text-xl font-bold mb-2">
                    {project.title}
                </motion.h3>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-3"
                        >
                            <p className="text-muted-foreground">
                                {project.description}
                            </p>

                            <div className="text-sm text-primary">
                                {project.technologies}
                            </div>

                            <motion.a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block text-primary hover:text-primary/80 transition-colors"
                                onClick={(e) => e.stopPropagation()}
                                whileHover={{ x: 5 }}
                            >
                                Visit Project →
                            </motion.a>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    )
}