"use client"

import { useState, useEffect, useRef } from "react"

interface Skill {
  name: string
  level: "S" | "A" | "B"
}

const skills: Skill[] = [
  { name: "HTML", level: "S" },
  { name: "CSS", level: "S" },
  { name: "JavaScript", level: "A" },
  { name: "React", level: "A" },
  { name: "Python", level: "B" },
  { name: "Java", level: "B" },
  { name: "Git", level: "A" },
  { name: "Figma", level: "A" },
  { name: "Tailwind CSS", level: "A" },
  { name: "Node.js", level: "B" },
  { name: "Next.js", level: "B" },
  { name: "TypeScript", level: "B" },
]

// Tiny cat peeking from side
function PeekingCat({ side = "right" }: { side?: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 30 35"
      style={{
        width: 24,
        height: 28,
        transform: side === "left" ? "scaleX(-1)" : "none",
      }}
      className="text-foreground opacity-30 hover:opacity-60 transition-opacity duration-500"
    >
      {/* Only head peeking */}
      <circle cx="15" cy="20" r="10" fill="currentColor" />
      <polygon points="8,12 5,5 12,11" fill="currentColor" />
      <polygon points="22,12 25,5 18,11" fill="currentColor" />
      <polygon points="8.5,11 6,6 11.5,10.5" fill="#FFDDE2" opacity="0.8" />
      <polygon points="21.5,11 24,6 18.5,10.5" fill="#FFDDE2" opacity="0.8" />
      <ellipse cx="11" cy="19" rx="2" ry="2.2" fill="white" />
      <ellipse cx="19" cy="19" rx="2" ry="2.2" fill="white" />
      <circle cx="11.3" cy="19.3" r="1.2" fill="#1a1a1a" />
      <circle cx="19.3" cy="19.3" r="1.2" fill="#1a1a1a" />
      <polygon points="15,22.5 14,23.8 16,23.8" fill="#FFDDE2" />
    </svg>
  )
}

// Small floating book
function FloatingBook({ style }: { style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 20" style={{ width: 18, height: 16, ...style }} className="text-foreground opacity-20">
      <rect x="2" y="2" width="20" height="16" rx="2" fill="currentColor" />
      <rect x="2" y="2" width="3" height="16" rx="1" fill="#FFDDE2" opacity="0.7" />
      <line x1="7" y1="6" x2="18" y2="6" stroke="white" strokeWidth="1" opacity="0.3" />
      <line x1="7" y1="9" x2="18" y2="9" stroke="white" strokeWidth="1" opacity="0.3" />
      <line x1="7" y1="12" x2="14" y2="12" stroke="white" strokeWidth="1" opacity="0.3" />
    </svg>
  )
}

export function SkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="min-h-screen relative overflow-hidden py-20 bg-background"
    >
      {/* Subtle halftone bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: "radial-gradient(circle, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Radial burst lines */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-foreground/[0.015] origin-center"
            style={{
              width: "2px",
              height: "150%",
              transform: `rotate(${i * 22.5}deg)`,
            }}
          />
        ))}
      </div>

      {/* Tiny decorations */}
      <div className="absolute top-16 right-8 animate-bounce" style={{ animationDuration: "4s" }}>
        <FloatingBook />
      </div>
      <div className="absolute top-32 left-6">
        <FloatingBook style={{ transform: "rotate(-15deg)" }} />
      </div>

      {/* Peeking cats at section edges */}
      <div className="absolute bottom-24 right-0 text-foreground" style={{ transform: "translateX(6px)" }}>
        <PeekingCat side="right" />
      </div>
      <div className="absolute top-1/2 left-0 text-foreground" style={{ transform: "translateX(-6px)" }}>
        <PeekingCat side="left" />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">

        {/* Section title */}
        <div
          className="mb-16 relative transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <div className="inline-block">
            <div className="border-[6px] border-foreground px-8 py-4 bg-background relative">
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl tracking-wider">
                <span className="text-[#FFDDE2]">S</span>KILLS
              </h2>
              <div className="absolute -top-3 -left-3 bg-foreground text-background px-2 py-1 font-[family-name:var(--font-display)] text-xs">
                03
              </div>
            </div>
          </div>
          <p className="mt-6 font-[family-name:var(--font-display)] text-xs tracking-[0.4em] text-muted-foreground uppercase">
            Ability Inventory
          </p>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className="relative group"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ease ${index * 60}ms, transform 0.5s ease ${index * 60}ms`,
              }}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div
                className={`
                  border-[4px] border-foreground p-5 md:p-6
                  transition-all duration-200 relative overflow-hidden cursor-pointer
                  ${hoveredSkill === skill.name
                    ? "bg-foreground text-background translate-x-1 -translate-y-1"
                    : "bg-background text-foreground hover:translate-x-0.5 hover:-translate-y-0.5"
                  }
                `}
                style={{
                  animation: hoveredSkill === skill.name ? "shake 0.3s ease-in-out" : "none",
                }}
              >
                {/* Rank badge */}
                <div className={`
                  absolute top-2 right-2 w-7 h-7 flex items-center justify-center
                  font-[family-name:var(--font-display)] text-sm font-bold
                  border-[3px] transition-all duration-200
                  ${skill.level === "S" ? "border-[#FFDDE2] text-[#FFDDE2]" : ""}
                  ${skill.level === "A" && hoveredSkill === skill.name ? "border-background text-background" : ""}
                  ${skill.level === "A" && hoveredSkill !== skill.name ? "border-foreground text-foreground" : ""}
                  ${skill.level === "B" && hoveredSkill === skill.name ? "border-background/60 text-background/60" : ""}
                  ${skill.level === "B" && hoveredSkill !== skill.name ? "border-muted-foreground text-muted-foreground" : ""}
                `}>
                  {skill.level}
                </div>

                <span className={`
                  font-[family-name:var(--font-display)] text-[10px] tracking-wider
                  ${hoveredSkill === skill.name ? "text-background/30" : "text-muted-foreground/50"}
                `}>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="font-[family-name:var(--font-display)] text-lg md:text-xl tracking-wide mt-2">
                  {skill.name}
                </h3>

                {/* Scan lines on hover */}
                {hoveredSkill === skill.name && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute left-0 right-0 h-px bg-background/10"
                        style={{ top: `${25 + i * 20}%` }}
                      />
                    ))}
                  </div>
                )}

                {/* Impact corner */}
                {hoveredSkill === skill.name && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#FFDDE2]" />
                )}
              </div>

              {/* Shadow layer */}
              <div className="absolute inset-0 border-[4px] border-foreground bg-foreground -z-10 translate-x-2 translate-y-2" />
            </div>
          ))}
        </div>

        {/* Legend */}
        <div
          className="mt-16 flex justify-center gap-8 flex-wrap transition-all duration-700 delay-500"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          {[
            { rank: "S", label: "Master" },
            { rank: "A", label: "Advanced" },
            { rank: "B", label: "Learning" },
          ].map((item) => (
            <div key={item.rank} className="flex items-center gap-3 group cursor-default">
              <div className={`
                w-8 h-8 border-[3px] border-foreground flex items-center justify-center
                font-[family-name:var(--font-display)] text-sm
                transition-all duration-200 group-hover:scale-110
                ${item.rank === "S" ? "bg-[#FFDDE2]" : "bg-background"}
              `}>
                {item.rank}
              </div>
              <span className="font-[family-name:var(--font-display)] text-sm tracking-wide">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(4px) translateY(-4px); }
          25% { transform: translateX(6px) translateY(-2px); }
          50% { transform: translateX(2px) translateY(-6px); }
          75% { transform: translateX(5px) translateY(-3px); }
        }
      `}</style>
    </section>
  )
}