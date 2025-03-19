"use client";

import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { TailwindConnectButton } from "./tailwind-connect-button";

export default function ExpandableCardDemo() {
    const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(null);
    const ref = useRef<HTMLDivElement>(null);
    const id = useId();

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setActive(false);
            }
        }

        if (active && typeof active === "object") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [active]);

    useOutsideClick(ref, () => setActive(null));

    return (
        <>
            <AnimatePresence>
                {active && typeof active === "object" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm h-full w-full z-10"
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {active && typeof active === "object" ? (
                    <div className="fixed inset-0 grid place-items-center z-[100]">
                        <motion.button
                            key={`button-${active.title}-${id}`}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.05 } }}
                            className="absolute top-4 right-4 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-full h-8 w-8 border border-border hover:bg-background/90 transition-colors"
                            onClick={() => setActive(null)}
                        >
                            <CloseIcon />
                        </motion.button>
                        <motion.div
                            layoutId={`card-${active.title}-${id}`}
                            ref={ref}
                            className="w-full max-w-[800px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-background sm:rounded-3xl overflow-hidden border border-border"
                        >
                            <motion.div layoutId={`image-${active.title}-${id}`}>
                                <div className="relative w-full h-60 md:h-80 sm:rounded-tr-lg sm:rounded-tl-lg overflow-hidden">
                                    <Image
                                        priority
                                        fill
                                        src={active.src}
                                        alt={active.title}
                                        quality={100}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover object-center"
                                    />
                                </div>
                            </motion.div>

                            <div>
                                <div className="flex flex-col md:flex-row justify-between gap-4 items-start p-4">
                                    <div className="w-full md:w-auto">
                                        <motion.h3
                                            layoutId={`title-${active.title}-${id}`}
                                            className="text-lg md:text-xl font-bold text-foreground"
                                        >
                                            {active.title}
                                        </motion.h3>
                                        <motion.p
                                            layoutId={`description-${active.description}-${id}`}
                                            className="text-sm md:text-base text-muted-foreground"
                                        >
                                            {active.description}
                                        </motion.p>
                                    </div>

                                    <motion.a
                                        layoutId={`button-${active.title}-${id}`}
                                        href={active.ctaLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <TailwindConnectButton>{active.ctaText}</TailwindConnectButton>
                                    </motion.a>
                                </div>
                                <div className="pt-4 relative px-4">
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="text-muted-foreground text-sm md:text-base h-[300px] md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto"
                                    >
                                        {typeof active.content === "function"
                                            ? active.content()
                                            : active.content}
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                ) : null}
            </AnimatePresence>
            <ul className="max-w-4xl mx-auto w-full space-y-8">
                {cards.map((card, index) => (
                    <motion.div
                        layoutId={`card-${card.title}-${id}`}
                        key={`card-${card.title}-${id}`}
                        onClick={() => setActive(card)}
                        className=" p-4 lg:p-8 flex flex-col md:flex-row justify-between items-center bg-background/50 hover:bg-background/70 rounded-xl cursor-pointer border border-muted hover:border-cyan-600 transition-colors"
                    >
                        <div className="flex gap-4 flex-col md:flex-row">
                            <motion.div layoutId={`image-${card.title}-${id}`}>
                                <div className="relative h-48 w-48 md:h-20 md:w-20 rounded-lg overflow-hidden">
                                    <Image
                                        fill
                                        src={card.src}
                                        alt={card.title}
                                        quality={100}
                                        sizes="(max-width: 768px) 160px, 56px"
                                        className="object-cover object-center"
                                    />
                                </div>
                            </motion.div>
                            <div>
                                <motion.h3
                                    layoutId={`title-${card.title}-${id}`}
                                    className="text-base md:text-lg font-medium text-foreground text-center md:text-left"
                                >
                                    {card.title}
                                </motion.h3>
                                <motion.p
                                    layoutId={`description-${card.description}-${id}`}
                                    className="text-sm text-muted-foreground text-center md:text-left"
                                >
                                    {card.description}
                                </motion.p>
                            </div>
                        </div>
                        <motion.div
                            layoutId={`button-${card.title}-${id}`}
                            className="mt-4 md:mt-0"
                        >
                            <TailwindConnectButton className="z-20">{card.ctaText}</TailwindConnectButton>
                        </motion.div>
                    </motion.div>
                ))}
            </ul>
        </>
    );
}

export const CloseIcon = () => {
    return (
        <motion.svg
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.05 } }}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 text-foreground"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
        </motion.svg>
    );
};

const cards = [
    {
        description: "Task Management Platform",
        title: "Task Manager",
        src: "/images/projects/Task-Manager.png",
        ctaText: "View Project",
        ctaLink: "https://task-manager-kv.vercel.app",
        content: () => {
            return (
                <div className="space-y-4">
                    <p>
                        Developed a comprehensive task management platform with features including task CRUD operations,
                        project categorization, calendar view, and dashboard insights. The application leverages modern
                        web technologies to provide a seamless user experience.
                    </p>
                    <div>
                        <p className="font-medium mb-2">Key Features:</p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Task organization with project categorization</li>
                            <li>Calendar view for timeline visualization</li>
                            <li>Dashboard with task insights and analytics</li>
                            <li>Advanced search with filtering and sorting</li>
                        </ul>
                    </div>
                    <p>
                        <span className="font-medium">Technologies:</span>{" "}
                        <a
                            href="https://nextjs.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                        >
                            Next.js
                        </a>
                        , TypeScript, Tailwind CSS, ShadCN UI, Tanstack Query
                    </p>
                </div>
            );
        },
    },
    {
        description: "AI-Powered Resume Builder",
        title: "AI-GEN CV",
        src: "/images/projects/AI-GEN CV.png",
        ctaText: "View Project",
        ctaLink: "https://aigencv.vercel.app",
        content: () => {
            return (
                <div className="space-y-4">
                    <p>
                        Built a full-stack resume builder application with AI-powered content generation capabilities.
                        The platform features OAuth authentication, real-time editing, and PDF generation.
                    </p>
                    <div>
                        <p className="font-medium mb-2">Key Features:</p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>AI-powered content suggestions using Gemini API</li>
                            <li>OAuth authentication with Supabase</li>
                            <li>Real-time resume editing and preview</li>
                            <li>PDF generation with custom styling</li>
                        </ul>
                    </div>
                    <p>
                        <span className="font-medium">Technologies:</span>{" "}
                        <a
                            href="https://nextjs.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                        >
                            Next.js
                        </a>
                        , TypeScript, Tailwind CSS, Supabase SSR, Gemini API, Puppeteer, Node.js
                    </p>
                </div>
            );
        },
    },
    {
        description: "Recipe Sharing Platform",
        title: "MyFoodRecipes",
        src: "/images/projects/MyFoodRecipes.png",
        ctaText: "View Project",
        ctaLink: "https://food-recipe-app36580.web.app",
        content: () => {
            return (
                <div className="space-y-4">
                    <p>
                        Developed a multi-user recipe platform that allows users to share, discover, and save recipes.
                        The application includes features for recipe management and real-time updates.
                    </p>
                    <div>
                        <p className="font-medium mb-2">Key Features:</p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>User authentication and profile management</li>
                            <li>Recipe creation and sharing</li>
                            <li>Advanced search and filtering system</li>
                            <li>Real-time updates with React Query</li>
                        </ul>
                    </div>
                    <p>
                        <span className="font-medium">Technologies:</span>{" "}
                        <a
                            href="https://react.dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                        >
                            React.js
                        </a>
                        , Vite, Firebase, React Query, Tailwind CSS
                    </p>
                </div>
            );
        },
    },
];