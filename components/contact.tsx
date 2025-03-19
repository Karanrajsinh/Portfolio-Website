"use client";

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
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
            Get In Touch
          </h2>

        </motion.div>

        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.21, 0.47, 0.32, 0.98]
          }}
          viewport={{ once: true }}
        >
          <div className="relative h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-background rounded-lg blur-4xl opacity-75" />
            <Card className="relative bg-background/50 backdrop-blur-sm border-none transition-all duration-500">
              <CardHeader className="pb-4">
                <CardTitle className="text-center text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary">Let&apos;s Connect</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                {[
                  {
                    href: "mailto:vaghelakaranraj54@gmail.com",
                    icon: <Mail className="h-5 w-5" />,
                    text: "vaghelakaranraj54@gmail.com"
                  },
                  {
                    href: "https://github.com/Karanrajsinh",
                    icon: <Github className="h-5 w-5" />,
                    text: "github.com/Karanrajsinh",
                    external: true
                  },
                  {
                    href: "https://www.linkedin.com/in/vaghela-karanrajsinh",
                    icon: <Linkedin className="h-5 w-5" />,
                    text: "linkedin.com/in/vaghela-karanrajsinh",
                    external: true
                  }
                ].map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-4 p-4 rounded-lg hover:bg-primary/5 transition-all duration-500 relative overflow-hidden"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: [0.21, 0.47, 0.32, 0.98]
                    }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <div className="relative flex items-center gap-4 w-full">
                      <div className="p-2.5 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500">
                        {item.icon}
                      </div>
                      <span className="text-sm sm:text-base group-hover:text-primary transition-colors duration-500 flex-1">
                        {item.text}
                      </span>
                      {item.external && (
                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 group-hover:translate-x-0">
                          <div className="p-1.5 rounded-full bg-primary/10">
                            <ExternalLink className="h-3 w-3 text-primary" />
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.a>
                ))}
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
}