"use client";

import React from "react";
import { Timeline } from "./timeline";
import resumeData from "@/data/resume.json";

export default function TimelineDemo() {
    const data = resumeData.experience.map((exp) => ({
        title: exp.date,
        content: (
            <div className="space-y-4">
                <div>
                    <h3 className="text-lg font-semibold text-foreground">{exp.role} - {exp.company}</h3>
                    <p className="text-sm lg:text-base text-muted-foreground mb-4">{exp.location}</p>
                    <p className="text-neutral-800 dark:text-neutral-200 text-sm lg:text-base">
                        {exp.summary}
                    </p>
                    {exp.highlights && exp.highlights.length > 0 && (
                        <div className="mt-4">
                            <ul className="list-disc list-inside space-y-2 text-neutral-700 dark:text-neutral-300 text-sm lg:text-base">
                                {exp.highlights.map((highlight, idx) => (
                                    <li key={idx}>{highlight}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        ),
    }));

    return (
        <div className="w-full">
            <Timeline data={data} />
        </div>
    );
}
