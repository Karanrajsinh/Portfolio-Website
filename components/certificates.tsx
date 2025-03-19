"use client";

import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';

const certificates = [
  {
    title: "The Ultimate React Course 2024: React, Next.js, Redux & More",
    issuer: "Udemy",
    date: "2024",
    description: "Comprehensive course covering modern React ecosystem including Next.js 14, Redux, TypeScript, and advanced React patterns.",
    link: "https://www.udemy.com/certificate/UC-fbf5c5d9-d543-461b-8c98-f680b5983ede/"
  },
  {
    title: "The Complete Javascript Course From Zero To Expert",
    issuer: "Udemy",
    date: "2024",
    description: "Advanced JavaScript concepts, ES6+, asynchronous JavaScript, OOP, and modern development practices.",
    link: "https://drive.google.com/file/d/1cvXo3euz-hUERaz7FQqwBCf4yFKiFgea/view?usp=drivesdk"
  },
  {
    title: "Conquering Responsive Layouts",
    issuer: "Kevin Powell",
    date: "2024",
    description: "Mastering CSS flexbox, grid, and modern responsive design techniques for building fluid, adaptive layouts.",
    link: "https://drive.google.com/file/d/1ntC9taHxBGmV2BBtt6WLyxvkrM3Cxy7X/view"
  }
];

export function Certificates() {
  return (
    <section id="certificates" className="py-24 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 -z-10"
      >
        <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </motion.div>

      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative mb-12"
        >
          <h2 className="text-3xl font-bold text-center">
            Certificates & Courses
          </h2>

        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="relative h-full group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.21, 0.47, 0.32, 0.98]
                }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-lg" />
                <Card className="h-full bg-background/50 backdrop-blur-sm border border-muted hover:border-primary/50 transition-all duration-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-base lg:text-xl font-semibold pr-12">
                      <div className="p-2 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-500">
                        <Award className="h-5 w-5" />
                      </div>
                      <span className="font-normal group-hover:text-primary transition-colors duration-500">{cert.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 flex flex-col h-full px-6">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-base font-medium text-muted-foreground">{cert.issuer}</p>
                        <p className="text-sm text-muted-foreground">{cert.date}</p>
                      </div>
                      <p className="text-sm lg:text-base leading-relaxed text-muted-foreground/90">{cert.description}</p>
                    </div>
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-6 right-6 p-2.5 rounded-lg hover:bg-primary/10 transition-all duration-500 group/link"
                    >
                      <svg
                        className="w-4 h-4 text-primary group-hover/link:scale-110 transition-transform duration-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                        />
                      </svg>
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}