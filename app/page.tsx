import { Hero } from "@/components/hero"
import { Experience } from "@/components/experience"
import { Projects } from "@/components/projects"
import { Certificates } from "@/components/certificates"
import { Contact } from "@/components/contact"

export default function Home() {
  return (
    <>
      <Hero />
      <Experience />
      <Projects />
      <Certificates />
      <Contact />
    </>
  )
}