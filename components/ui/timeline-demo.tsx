"use client";

import React from "react";
import { Timeline } from "./timeline";

export default function TimelineDemo() {
    const data = [
        {
            title: "Jan 2025",
            content: (
                <div className="space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold text-foreground">Open Source Contributor - RxResume</h3>
                        <p className="text-sm lg:text-base text-muted-foreground mb-4">Remote</p>
                        <p className="text-neutral-800 dark:text-neutral-200 text-sm lg:text-base">
                            Contributed to an open-source resume builder project, improving its mobile responsiveness and user experience.
                        </p>
                        <div className="mt-4">
                            <ul className="list-disc list-inside space-y-2 text-neutral-700 dark:text-neutral-300 text-sm lg:text-base">
                                <li>Successfully merged PR addressing frontend layout issues</li>
                                <li>Fixed spacing and overflow problems on mobile screens</li>
                                <li>Implemented reusable scroll components for better performance</li>
                            </ul>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: "Dec 2024",
            content: (
                <div className="space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold text-foreground">Next.js Developer Intern - WorkBinders</h3>
                        <p className="text-sm lg:text-base text-muted-foreground mb-4">Remote (Rajasthan)</p>
                        <p className="text-neutral-800 dark:text-neutral-200 text-sm lg:text-base">
                            Developed and maintained frontend applications using Next.js and modern web technologies.
                        </p>
                        <div className="mt-4">
                            <ul className="list-disc list-inside space-y-2 text-neutral-700 dark:text-neutral-300 text-sm lg:text-base">
                                <li>Built responsive components from scratch for improved reusability</li>
                                <li>Implemented custom animations and integrated REST APIs</li>
                                <li>Translated 40+ Figma screens into pixel-perfect layouts</li>
                                <li>Focused on mobile-first design principles and UI consistency</li>
                            </ul>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: "Apr 2023",
            content: (
                <div className="space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold text-foreground">Social Summer Intern - Atmiya University</h3>
                        <p className="text-sm lg:text-base text-muted-foreground mb-4">Rajkot</p>
                        <p className="text-neutral-800 dark:text-neutral-200 text-sm lg:text-base">
                            Designed and developed a university E-Library platform to improve student access to educational resources.
                        </p>
                        <div className="mt-4">
                            <ul className="list-disc list-inside space-y-2 text-neutral-700 dark:text-neutral-300 text-sm lg:text-base">
                                <li>Created an intuitive interface using HTML, CSS, and JavaScript</li>
                                <li>Implemented responsive design with Bootstrap framework</li>
                                <li>Developed search and filter functionality for easy resource discovery</li>
                            </ul>
                        </div>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div className="w-full">
            <Timeline data={data} />
        </div>
    );
}