"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Download } from "lucide-react"

// Hide navbar on scroll down, show on scroll up
export function Navigation() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY < 100) {
        setIsVisible(true)
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-background transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <Link 
            href="#" 
            className="font-[family-name:var(--font-display)] text-2xl tracking-wider hover:opacity-70 transition-opacity"
          >
            <span className="font-bold">Navya</span>
            <span className="text-muted-foreground">B</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-[family-name:var(--font-display)] text-sm tracking-wide hover:opacity-70 transition-opacity relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-foreground transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-foreground text-background font-[family-name:var(--font-display)] text-sm tracking-wide hover:bg-foreground/90 transition-colors border-2 border-foreground"
          >
            Resume
            <Download className="w-4 h-4" />
          </a>
        </div>
      </nav>
    </header>
  )
}
