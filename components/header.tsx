"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import Link from "next/link"
import { IconMenu2, IconX, IconSun, IconMoon } from "@tabler/icons-react"

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const iconVariants = {
    open: { rotate: 90, scale: 1 },
    closed: { rotate: 0, scale: 1 },
  }

  const menuVariants = {
    closed: {
      clipPath: "circle(0% at calc(100% - 3rem) 2.5rem)",
      transition: { duration: 0.4, ease: "easeInOut" },
    },
    open: {
      clipPath: "circle(150% at calc(100% - 3rem) 2.5rem)",
      transition: { duration: 0.4, ease: "easeInOut" },
    },
  }

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  if (!mounted) return null

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "py-2 bg-background/80 backdrop-blur-md border-b"
        : "py-4 bg-transparent"
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <Link
          href="#home"
          onClick={() => handleNavClick("#home")}
          className="text-xl md:text-2xl font-bold font-heading"
        >
          Karanrajsinh Vaghela
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center p-4 space-x-8">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.href)}
              className="group text-base font-medium text-muted-foreground hover:text-foreground transition-colors relative py-0.5"
            >
              {item.name}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-cyan-600 transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <IconSun className="w-5 h-5" />
            ) : (
              <IconMoon className="w-5 h-5" />
            )}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden p-2 hover:bg-muted rounded-full transition-colors relative z-50"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          animate={isOpen ? "open" : "closed"}
          variants={iconVariants}
        >
          <AnimatePresence initial={false} mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <IconX className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                <IconMenu2 className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 top-0 bg-background/95 backdrop-blur-md md:hidden"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              style={{ height: "100vh" }}
            >
              <nav className="flex flex-col items-center justify-center h-full space-y-8">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className="text-2xl font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setTheme(theme === "dark" ? "light" : "dark")
                    setIsOpen(false)
                  }}
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <IconSun className="w-6 h-6" />
                  ) : (
                    <IconMoon className="w-6 h-6" />
                  )}
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}