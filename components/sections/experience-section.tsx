"use client"

import { useState, useEffect, useRef, useCallback } from "react"

interface Experience {
  role: string
  company: string
  period: string
  type: "work" | "achievement"
  description: string
  tags: string[]
  badge?: string
  chapter: string
}

const experiences: Experience[] = [
  {
    role: "Virtual Intern",
    company: "Shadowfox",
    period: "feb 01-mar 04",
    type: "work",
    chapter: "Arc 01",
    description: "Working on real-world project simulations involving frontend and backend development. Actively improving problem-solving skills, code quality, and understanding of structured development workflows in a remote environment.",
    tags: ["Frontend", "Backend", "Web Development"],
    badge: "● web developer",
  },
  {
    role: "Hackathon Finalist",
    company: "TechSprint IARE",
    period: "2024",
    type: "achievement",
    chapter: "Arc 02",
    description: "Competed in TechSprint IARE — a high-intensity hackathon focused on innovative problem-solving. Collaborated in a team to design and build an AI-powered healthcare solution, placing in the Top 10 out of all participating teams.",
    tags: ["Hackathon", "Team Collaboration", "AI", "Problem Solving"],
    badge: "🏆 TOP 10",
  },
]

function ExperienceCard({ exp, index, visible }: { exp: Experience; index: number; visible: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const cx = (e.clientX - rect.left) / rect.width
    const cy = (e.clientY - rect.top) / rect.height
    setTilt({ x: (cy - 0.5) * -7, y: (cx - 0.5) * 7 })
    setGlowPos({ x: cx * 100, y: cy * 100 })
  }, [])

  const isWork = exp.type === "work"

  return (
    <div
      ref={ref}
      className="relative cursor-default"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : index % 2 === 0 ? "translateX(-40px)" : "translateX(40px)",
        transition: `opacity 0.7s ease ${index * 200}ms, transform 0.7s ease ${index * 200}ms`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false) }}
    >
      {/* Shadow layer */}
      <div className="absolute inset-0 border-[5px] border-foreground bg-foreground translate-x-2 translate-y-2 -z-10" />

      <div
        className={`border-[5px] border-foreground relative overflow-hidden transition-colors duration-200 ${hovered ? "bg-foreground text-background" : "bg-background text-foreground"}`}
        style={{
          transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: hovered ? "transform 0.08s ease-out, background-color 0.2s, color 0.2s" : "transform 0.5s ease-out, background-color 0.2s",
          willChange: "transform",
        }}
      >
        {/* Cursor glow */}
        {!hovered && (
          <div className="absolute inset-0 pointer-events-none z-0" style={{ background: `radial-gradient(200px circle at ${glowPos.x}% ${glowPos.y}%, rgba(255,221,226,0.12), transparent 70%)` }} />
        )}

        {/* Scan lines on hover */}
        {hovered && (
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="absolute left-0 right-0 h-px bg-background/8" style={{ top: `${16 + i * 14}%` }} />
            ))}
          </div>
        )}

        <div className="flex flex-col md:flex-row">

          {/* Left accent strip */}
          <div className={`md:w-2 flex-shrink-0 min-h-[8px] md:min-h-0 transition-colors duration-200 ${isWork ? (hovered ? "bg-background" : "bg-foreground") : "bg-[#FFDDE2]"}`} />

          {/* Content */}
          <div className="flex-1 p-7 md:p-10 relative z-10">

            {/* Top row: chapter + badge + period */}
            <div className="flex items-start justify-between flex-wrap gap-3 mb-5">
              <div className="flex items-center gap-3 flex-wrap">
                {/* Chapter label */}
                <div className={`border-2 px-2 py-0.5 font-[family-name:var(--font-display)] text-[9px] tracking-[0.3em] uppercase transition-colors duration-200 ${hovered ? "border-background text-background" : "border-muted-foreground/50 text-muted-foreground"}`}>
                  {exp.chapter}
                </div>

                {/* Type pill */}
                <div className={`px-3 py-1 font-[family-name:var(--font-display)] text-[9px] tracking-[0.25em] uppercase transition-colors duration-200 ${
                  isWork
                    ? hovered ? "bg-background text-foreground" : "bg-foreground text-background"
                    : "bg-[#FFDDE2] text-foreground"
                }`}>
                  {isWork ? "Work" : "Achievement"}
                </div>

                {/* Badge */}
                {exp.badge && (
                  <span className={`font-[family-name:var(--font-display)] text-[10px] font-bold tracking-wider transition-colors duration-200 ${hovered ? "text-background/80" : "text-[#FFDDE2]"}`}>
                    {exp.badge}
                  </span>
                )}
              </div>

              {/* Period */}
              <span className={`font-[family-name:var(--font-display)] text-sm tracking-widest transition-colors duration-200 ${hovered ? "text-background/60" : "text-muted-foreground"}`}>
                {exp.period}
              </span>
            </div>

            {/* Role + company */}
            <h3 className={`font-[family-name:var(--font-display)] text-2xl md:text-3xl lg:text-4xl tracking-wide mb-1 leading-tight transition-colors duration-200 ${hovered ? "text-background" : "text-foreground"}`}>
              {exp.role}
            </h3>
            <p className={`font-[family-name:var(--font-display)] text-base md:text-lg mb-6 tracking-wider transition-colors duration-200 ${hovered ? "text-background/70" : "text-[#FFDDE2]"}`}>
              @ {exp.company}
            </p>

            {/* Description with manga speech-bubble feel */}
            <div className={`border-l-4 pl-5 mb-6 transition-colors duration-200 ${hovered ? "border-background/40" : "border-[#FFDDE2]"}`}>
              <p className={`text-base leading-relaxed transition-colors duration-200 ${hovered ? "text-background/80" : "text-muted-foreground"}`}>
                {exp.description}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {exp.tags.map((tag) => (
                <span
                  key={tag}
                  className={`font-[family-name:var(--font-display)] text-[10px] tracking-wide px-3 py-1.5 border-2 transition-all duration-150 ${hovered ? "border-background/50 text-background/70" : "border-foreground/40 hover:border-foreground text-foreground"}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Corner accents */}
        <div className={`absolute top-3 right-3 w-6 h-6 border-t-4 border-r-4 transition-colors duration-200 ${hovered ? "border-background/40" : "border-foreground"}`} />
        <div className={`absolute bottom-3 left-3 w-6 h-6 border-b-4 border-l-4 transition-colors duration-200 ${hovered ? "border-background/40" : "border-foreground"}`} />

        {/* Hover impact diamond */}
        {hovered && <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#FFDDE2] rotate-45" />}
      </div>
    </div>
  )
}

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="min-h-screen relative overflow-hidden py-20 bg-background">
      {/* Halftone */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, var(--foreground) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />

      {/* Speed lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="absolute bg-foreground/[0.015]" style={{ width: "2px", height: "200%", left: `${15 + i * 20}%`, top: "-50%", transform: "rotate(12deg)" }} />
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">

        {/* Section title */}
        <div className="mb-16 transition-all duration-700" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)" }}>
          <div className="inline-block">
            <div className="border-[6px] border-foreground px-8 py-4 bg-background relative">
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl tracking-wider">
                <span className="text-[#FFDDE2]">E</span>XPERIENCE
              </h2>
              <div className="absolute -top-3 -left-3 bg-foreground text-background px-2 py-1 font-[family-name:var(--font-display)] text-xs">05</div>
            </div>
          </div>
          <p className="mt-6 font-[family-name:var(--font-display)] text-xs tracking-[0.4em] text-muted-foreground uppercase">
            Arc: The Journey So Far
          </p>
        </div>

        {/* Cards — with connecting element between them */}
        <div className="space-y-6 relative">
          {/* Connecting vertical bar */}
          <div
            className="absolute left-6 top-0 bottom-0 w-[3px] bg-gradient-to-b from-foreground via-[#FFDDE2] to-foreground/10 hidden md:block transition-all duration-1000"
            style={{ opacity: visible ? 0.25 : 0 }}
          />

          {experiences.map((exp, i) => (
            <div key={i} className="md:pl-16 relative">
              {/* Timeline node */}
              <div
                className="absolute left-[18px] top-10 w-5 h-5 border-4 border-foreground hidden md:flex items-center justify-center transition-all duration-500 z-10"
                style={{
                  opacity: visible ? 1 : 0,
                  transitionDelay: `${i * 200 + 400}ms`,
                  background: exp.type === "achievement" ? "#FFDDE2" : "var(--background)",
                }}
              >
                <div className="w-2 h-2 bg-foreground" />
              </div>
              <ExperienceCard exp={exp} index={i} visible={visible} />
            </div>
          ))}
        </div>

        {/* Footer — "to be continued" manga panel */}
        <div
          className="mt-16 transition-all duration-700 delay-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
        >
          <div className="border-[5px] border-dashed border-foreground/30 p-6 flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="font-[family-name:var(--font-display)] text-xs tracking-[0.4em] text-muted-foreground uppercase mb-1">Next Chapter</p>
              <p className="font-[family-name:var(--font-display)] text-lg tracking-wide">The story continues... ✦</p>
            </div>
            <a
              href="#contact"
              className="px-5 py-2.5 bg-foreground text-background font-[family-name:var(--font-display)] text-sm tracking-wide border-2 border-foreground hover:bg-[#FFDDE2] hover:text-foreground transition-all duration-200"
            >
              Let&apos;s Write It Together →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}