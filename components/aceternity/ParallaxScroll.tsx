"use client"

import { useScroll, useTransform, motion } from "framer-motion"
import { useRef } from "react"

interface ParallaxProps {
    className?: string
    baseVelocity?: number
    pattern?: boolean
}

export function ParallaxScroll({
    className = "",
    baseVelocity = -2,
    pattern = true,
}: ParallaxProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollY } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    })

    const y = useTransform(scrollY, [0, 1000], [0, 200])

    return (
        <div ref={containerRef} className={`overflow-hidden relative ${className}`}>
            <motion.div
                className="absolute inset-0"
                style={{ y }}
            >
                {pattern && (
                    <>
                        <div
                            className="absolute inset-0 grid-pattern opacity-50 dark:opacity-25"
                        />
                        <div
                            className="absolute inset-0"
                            style={{
                                background: "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%)",
                            }}
                        />
                    </>
                )}
            </motion.div>
        </div>
    )
}