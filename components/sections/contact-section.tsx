"use client"

import { useState, useEffect, useRef, useCallback } from "react"

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

const contacts = [
  {
    label: "LinkedIn",
    handle: "navya-bhimavarapu",
    sub: "Let's connect professionally",
    url: "https://www.linkedin.com/in/navya-bhimavarapu-953643331/",
    Icon: LinkedInIcon,
  },
  {
    label: "GitHub",
    handle: "NavyaBhimavarapu",
    sub: "Check out my repositories",
    url: "https://github.com/NavyaBhimavarapu",
    Icon: GithubIcon,
  },
  {
    label: "Email",
    handle: "bhimavarapunp@gmail.com",
    sub: "Drop me a message anytime",
    url: "mailto:bhimavarapunp@gmail.com",
    Icon: EmailIcon,
  },
  {
    label: "Instagram",
    handle: "@navya._sri",
    sub: "Behind the scenes",
    url: "#",  // add real URL when ready
    Icon: InstagramIcon,
  },
]

function ContactCard({ contact, index, visible }: { contact: typeof contacts[0]; index: number; visible: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const cx = (e.clientX - rect.left) / rect.width
    const cy = (e.clientY - rect.top) / rect.height
    setTilt({ x: (cy - 0.5) * -8, y: (cx - 0.5) * 8 })
    setGlowPos({ x: cx * 100, y: cy * 100 })
  }, [])

  const Icon = contact.Icon

  return (
    <a
      ref={ref}
      href={contact.url}
      target={contact.url.startsWith("mailto") || contact.url === "#" ? "_self" : "_blank"}
      rel="noopener noreferrer"
      className="relative group block"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease ${index * 120}ms, transform 0.6s ease ${index * 120}ms`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false) }}
    >
      {/* Shadow */}
      <div className="absolute inset-0 border-[4px] border-foreground bg-foreground translate-x-2 translate-y-2 -z-10" />

      <div
        className={`border-[5px] border-foreground p-6 md:p-7 relative overflow-hidden transition-colors duration-200 ${hovered ? "bg-foreground text-background" : "bg-background text-foreground"}`}
        style={{
          transform: `perspective(700px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: hovered ? "transform 0.08s ease-out, background-color 0.2s, color 0.2s" : "transform 0.5s ease-out, background-color 0.2s",
          willChange: "transform",
        }}
      >
        {/* Glow when not hovered */}
        {!hovered && (
          <div className="absolute inset-0 pointer-events-none z-0" style={{ background: `radial-gradient(120px circle at ${glowPos.x}% ${glowPos.y}%, rgba(255,221,226,0.18), transparent 70%)` }} />
        )}

        {/* Scan lines on hover */}
        {hovered && (
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="absolute left-0 right-0 h-px bg-background/8" style={{ top: `${25 + i * 18}%` }} />
            ))}
          </div>
        )}

        <div className="relative z-10 flex items-center gap-5">
          {/* Icon box */}
          <div className={`w-14 h-14 border-4 flex-shrink-0 flex items-center justify-center transition-colors duration-200 ${hovered ? "border-background/60 text-background" : "border-foreground text-foreground"}`}>
            <Icon />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className={`font-[family-name:var(--font-display)] text-[9px] tracking-[0.35em] uppercase mb-0.5 transition-colors duration-200 ${hovered ? "text-background/55" : "text-muted-foreground"}`}>
              {contact.label}
            </p>
            <p className={`font-[family-name:var(--font-display)] text-sm md:text-base tracking-wide font-bold truncate transition-colors duration-200 ${hovered ? "text-background" : "text-foreground"}`}>
              {contact.handle}
            </p>
            <p className={`text-xs mt-0.5 transition-colors duration-200 ${hovered ? "text-background/55" : "text-muted-foreground/70"}`}>
              {contact.sub}
            </p>
          </div>

          {/* Arrow */}
          <div className={`font-[family-name:var(--font-display)] text-xl flex-shrink-0 transition-all duration-200 ${hovered ? "translate-x-1 text-background" : "text-foreground/50"}`}>
            →
          </div>
        </div>

        {/* Corner accents */}
        <div className={`absolute top-2 right-2 w-5 h-5 border-t-[3px] border-r-[3px] transition-colors duration-200 ${hovered ? "border-background/30" : "border-foreground"}`} />
        <div className={`absolute bottom-2 left-2 w-5 h-5 border-b-[3px] border-l-[3px] transition-colors duration-200 ${hovered ? "border-background/30" : "border-foreground"}`} />

        {hovered && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#FFDDE2] rotate-45" />}
      </div>
    </a>
  )
}

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="min-h-screen relative overflow-hidden py-20 bg-background">
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, var(--foreground) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="absolute bg-foreground/[0.018]" style={{ width: "2px", height: "200%", right: `${5 + i * 18}%`, top: "-50%", transform: "rotate(-10deg)" }} />
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">

        {/* Section title */}
        <div className="mb-16 transition-all duration-700" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)" }}>
          <div className="inline-block">
            <div className="border-[6px] border-foreground px-8 py-4 bg-background relative">
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl tracking-wider">
                <span className="text-[#FFDDE2]">C</span>ONTACT
              </h2>
              <div className="absolute -top-3 -left-3 bg-foreground text-background px-2 py-1 font-[family-name:var(--font-display)] text-xs">06</div>
            </div>
          </div>
          <p className="mt-6 font-[family-name:var(--font-display)] text-xs tracking-[0.4em] text-muted-foreground uppercase">
            Reach Out ✦ Collaborate ✦ Connect
          </p>
        </div>

        {/* Intro narrator box */}
        <div
          className="mb-12 border-[5px] border-foreground p-6 md:p-8 bg-background relative transition-all duration-700 delay-100"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
        >
          <div className="absolute -top-[14px] left-6 bg-background px-3">
            <span className="font-[family-name:var(--font-display)] text-[9px] tracking-[0.3em] text-muted-foreground uppercase border border-muted-foreground/30 px-2 py-0.5">Narrator</span>
          </div>
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
            I&apos;m actively looking for{" "}
            <span className="font-bold text-foreground">internship opportunities</span>
            {" "}and{" "}
            <span className="font-bold text-foreground">collaborative tech projects</span>
            . If you&apos;d like to work together, have an opportunity, or just want to say hi — feel free to reach out through any channel below!
          </p>
          <div className="absolute -top-3 -right-3 w-7 h-7 border-t-4 border-r-4 border-foreground" />
          <div className="absolute -bottom-3 -left-3 w-7 h-7 border-b-4 border-l-4 border-foreground" />
        </div>

        {/* Contact cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {contacts.map((contact, i) => (
            <ContactCard key={contact.label} contact={contact} index={i} visible={visible} />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-20 transition-all duration-700 delay-600" style={{ opacity: visible ? 1 : 0 }}>
          {/* 3-D grid floor */}
          <div className="relative h-28 overflow-hidden mb-8">
            <div
              className="absolute inset-x-0 top-0 h-full"
              style={{
                backgroundImage: ["linear-gradient(to right, rgba(0,0,0,0.3) 1px, transparent 1px)", "linear-gradient(to bottom, rgba(0,0,0,0.3) 1px, transparent 1px)"].join(","),
                backgroundSize: "40px 40px",
                transform: "perspective(300px) rotateX(65deg)",
                transformOrigin: "center top",
                maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
              }}
            />
          </div>

          <div className="text-center">
            <p className="font-[family-name:var(--font-display)] text-xl tracking-widest mb-2">
              <span className="text-[#FFDDE2]">Navya</span> Bhimavarapu
            </p>
            <p className="font-[family-name:var(--font-display)] text-[10px] tracking-[0.4em] text-muted-foreground">
              © 2024 · CRAFTED WITH ♡ + ∞ CUPS OF TEA
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}