"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface HoverBorderGradientProps {
    children: ReactNode
    className?: string
    containerClassName?: string
}

export function HoverBorderGradient({
    children,
    className,
    containerClassName,
}: HoverBorderGradientProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className={cn(
                "relative group",
                containerClassName
            )}
        >
            <motion.div
                className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary via-primary/50 to-primary opacity-0 group-hover:opacity-100 blur transition-opacity duration-500"
                style={{ padding: "1px" }}
            />
            <motion.div
                className={cn(
                    "relative rounded-lg bg-background px-4 py-2 transition-colors duration-200 group-hover:bg-muted/50",
                    className
                )}
            >
                {children}
            </motion.div>
        </motion.div>
    )
}