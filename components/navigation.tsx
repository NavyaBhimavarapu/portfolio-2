"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Download } from "lucide-react"

export function Navigation() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState("home")
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY < 100) setIsVisible(true)
      else if (currentScrollY < lastScrollY) setIsVisible(true)
      else setIsVisible(false)
      setLastScrollY(currentScrollY)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  // Track active section
  useEffect(() => {
    const sections = ["home", "about", "skills", "projects", "experience", "contact"]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.4 }
    )
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Works" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-background border-b-[3px] border-foreground transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="#home"
            className="font-[family-name:var(--font-display)] text-2xl tracking-wider hover:opacity-70 transition-opacity"
          >
            <span className="font-bold">Navya</span>
            <span className="text-[#FFDDE2]">B</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const sectionId = item.href.replace("#", "")
              const isActive = activeSection === sectionId
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-[family-name:var(--font-display)] text-sm tracking-wide transition-all relative group"
                >
                  <span className={`relative z-10 px-2 py-0.5 transition-all duration-200 ${isActive ? "bg-foreground text-background" : "hover:opacity-70"}`}>
                    {item.label}
                  </span>
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/NavyaBhimavarapu_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-foreground text-background font-[family-name:var(--font-display)] text-sm tracking-wide hover:bg-[#FFDDE2] hover:text-foreground transition-colors border-2 border-foreground"
            >
              Resume
              <Download className="w-4 h-4" />
            </a>

            {/* Mobile hamburger */}
            <button
              className="md:hidden border-2 border-foreground p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-5 space-y-1">
                <div className={`h-0.5 bg-foreground transition-all duration-200 ${mobileOpen ? "rotate-45 translate-y-1.5" : ""}`} />
                <div className={`h-0.5 bg-foreground transition-all duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
                <div className={`h-0.5 bg-foreground transition-all duration-200 ${mobileOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden mt-4 border-t-2 border-foreground pt-4 flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-[family-name:var(--font-display)] text-sm tracking-wide px-3 py-2 border-2 border-foreground hover:bg-foreground hover:text-background transition-all duration-150"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  )
}