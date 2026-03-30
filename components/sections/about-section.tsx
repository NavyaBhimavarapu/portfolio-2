"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"

// ── Reading Cat ──────────────────────────────────────────────────────────────
function ReadingCat({ size = "normal" }: { size?: "normal" | "corner" | "large" }) {
  const dims: Record<string, [number, number]> = {
    normal: [68, 57],
    corner: [82, 68],
    large:  [96, 80],
  }
  const [w, h] = dims[size]
  return (
    <svg viewBox="0 0 60 50" style={{ width: w, height: h }} className="drop-shadow-lg">
      {/* open book shadow */}
      <ellipse cx="30" cy="43" rx="21" ry="5.5" fill="currentColor" opacity="0.18" />
      {/* open book pages */}
      <path d="M8,29 Q30,24 52,29 L52,45 Q30,41 8,45 Z" fill="currentColor" opacity="0.90" />
      {/* book spine */}
      <path d="M30,29 L30,45" stroke="white" strokeWidth="1" opacity="0.35" />
      {/* page lines left */}
      <line x1="13" y1="33" x2="28" y2="32" stroke="white" strokeWidth="0.6" opacity="0.25" />
      <line x1="13" y1="36" x2="28" y2="35" stroke="white" strokeWidth="0.6" opacity="0.25" />
      <line x1="13" y1="39" x2="28" y2="38" stroke="white" strokeWidth="0.6" opacity="0.25" />
      {/* page lines right */}
      <line x1="32" y1="32" x2="47" y2="33" stroke="white" strokeWidth="0.6" opacity="0.25" />
      <line x1="32" y1="35" x2="47" y2="36" stroke="white" strokeWidth="0.6" opacity="0.25" />
      <line x1="32" y1="38" x2="47" y2="39" stroke="white" strokeWidth="0.6" opacity="0.25" />
      {/* body */}
      <ellipse cx="30" cy="21" rx="13" ry="10" fill="currentColor" />
      {/* head */}
      <circle cx="30" cy="10" r="9" fill="currentColor" />
      {/* ears */}
      <polygon points="22,5 19,0 26,4" fill="currentColor" />
      <polygon points="38,5 41,0 34,4" fill="currentColor" />
      <polygon points="22.5,4.5 20,1 26,3.8" fill="#FFDDE2" opacity="0.85" />
      <polygon points="37.5,4.5 40,1 34,3.8" fill="#FFDDE2" opacity="0.85" />
      {/* reading squint eyes */}
      <path d="M26,10 Q28,8 30,10" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M30,10 Q32,8 34,10" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {/* nose */}
      <polygon points="30,13 29,14.5 31,14.5" fill="#FFDDE2" />
      {/* whiskers */}
      <line x1="18" y1="13"   x2="26" y2="13.5" stroke="white" strokeWidth="0.5" opacity="0.4" />
      <line x1="18" y1="15"   x2="26" y2="14.5" stroke="white" strokeWidth="0.5" opacity="0.4" />
      <line x1="34" y1="13.5" x2="42" y2="13"   stroke="white" strokeWidth="0.5" opacity="0.4" />
      <line x1="34" y1="14.5" x2="42" y2="15"   stroke="white" strokeWidth="0.5" opacity="0.4" />
      {/* tail */}
      <path d="M43,23 Q54,18 50,10" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  )
}

// ── Book Stack ────────────────────────────────────────────────────────────────
function BookStack({ count = 3, rotate = 0 }: { count?: number; rotate?: number }) {
  const colors = ["#FFDDE2", "currentColor", "#FFB6C1"]
  return (
    <svg
      viewBox="0 0 32 36"
      style={{ width: 26, height: 30, transform: `rotate(${rotate}deg)` }}
      className="text-foreground opacity-20 hover:opacity-50 transition-opacity duration-500"
    >
      {Array.from({ length: count }).map((_, i) => (
        <rect
          key={i}
          x={2 + i * 0.5}
          y={i * (36 / count)}
          width={28 - i}
          height={36 / count - 1}
          rx="1.5"
          fill={i % 2 === 0 ? colors[i % colors.length] : "currentColor"}
          opacity={1 - i * 0.1}
        />
      ))}
    </svg>
  )
}

// ── Sparkle ───────────────────────────────────────────────────────────────────
function Sparkle({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        animation: `twinkle 3s ${delay}s ease-in-out infinite`,
      }}
    >
      <svg viewBox="0 0 16 16" width="10" height="10" className="text-foreground opacity-20">
        <path d="M8 0 L9.5 6.5 L16 8 L9.5 9.5 L8 16 L6.5 9.5 L0 8 L6.5 6.5 Z" fill="currentColor" />
      </svg>
    </div>
  )
}

// ── Cursor-reactive tilt wrapper ──────────────────────────────────────────────
function TiltPanel({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt]       = useState({ x: 0, y: 0 })
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const cx = (e.clientX - rect.left) / rect.width
    const cy = (e.clientY - rect.top)  / rect.height
    setTilt({ x: (cy - 0.5) * -6, y: (cx - 0.5) * 6 })
    setGlowPos({ x: cx * 100, y: cy * 100 })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 })
    setHovered(false)
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: hovered ? "transform 0.08s ease-out" : "transform 0.45s ease-out",
        willChange: "transform",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* cursor glow */}
      {hovered && (
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: `radial-gradient(200px circle at ${glowPos.x}% ${glowPos.y}%, rgba(255,221,226,0.13), transparent 70%)`,
            borderRadius: "inherit",
          }}
        />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}

// ── Stat card with its own cursor glow ───────────────────────────────────────
function StatCard({ num, label, delay }: { num: string; label: string; delay: number }) {
  const ref  = useRef<HTMLDivElement>(null)
  const [glow, setGlow] = useState({ x: 50, y: 50, show: false })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    setGlow({
      x: ((e.clientX - rect.left) / rect.width)  * 100,
      y: ((e.clientY - rect.top)  / rect.height) * 100,
      show: true,
    })
  }, [])

  return (
    <div
      ref={ref}
      className="border-4 border-foreground px-6 py-4 bg-background hover:bg-foreground hover:text-background transition-all duration-200 cursor-default group relative overflow-hidden"
      style={{ transitionDelay: `${delay}ms` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setGlow((g) => ({ ...g, show: false }))}
    >
      {glow.show && (
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: `radial-gradient(60px circle at ${glow.x}% ${glow.y}%, rgba(255,221,226,0.38), transparent 70%)`,
          }}
        />
      )}
      <span className="relative z-10 font-[family-name:var(--font-display)] text-3xl group-hover:text-background">
        {num}
      </span>
      <span className="relative z-10 text-sm text-muted-foreground ml-2 group-hover:text-background/60">
        {label}
      </span>
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────
export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [catPos, setCatPos]   = useState({ x: 0, y: 0 })

  // Entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Wandering cat — window.setInterval returns a plain number, no type ambiguity
  useEffect(() => {
    const wander = () =>
      setCatPos({ x: Math.random() * 60, y: Math.random() * 30 })
    const t = window.setInterval(wander, 4000)
    return () => window.clearInterval(t)
  }, [])

  return (
    <>
      {/* Plain <style> tag — no "jsx" prop needed in Next.js App Router */}
      <style>{`
        @keyframes twinkle {
          0%,100% { opacity:0.08; transform:scale(0.8) rotate(0deg);   }
          50%      { opacity:0.35; transform:scale(1.2) rotate(180deg); }
        }
      `}</style>

      <section
        id="about"
        ref={sectionRef}
        className="min-h-screen relative overflow-hidden py-20 bg-background"
      >
        {/* Halftone dots */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(circle, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Diagonal speed lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-foreground/[0.018]"
              style={{
                width: "2px",
                height: "200%",
                left: `${10 + i * 18}%`,
                top: "-50%",
                transform: "rotate(-15deg)",
              }}
            />
          ))}
        </div>

        {/* Sparkles */}
        {[
          { x: 85, y: 10 }, { x: 92, y: 35 }, { x: 78, y: 55 },
          { x: 5,  y: 20 }, { x: 10, y: 60 },
        ].map((pos, i) => (
          <Sparkle key={i} x={pos.x} y={pos.y} delay={i * 0.6} />
        ))}

        {/* Decorative book stacks */}
        <div className="absolute top-12 right-12" style={{ transform: "rotate(-5deg)" }}>
          <BookStack count={4} rotate={-8} />
        </div>
        <div className="absolute bottom-20 left-10">
          <BookStack count={3} rotate={5} />
        </div>
        <div className="absolute top-1/2 right-6">
          <BookStack count={2} rotate={12} />
        </div>

        {/* Wandering reading cat — large & visible */}
        <div
          className="absolute text-foreground opacity-65 transition-all duration-[3000ms] ease-in-out pointer-events-none"
          style={{ bottom: `${catPos.y + 5}%`, left: `${catPos.x + 5}%` }}
        >
          <ReadingCat size="large" />
        </div>

        {/* ── Content ── */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">

          {/* Section header */}
          <div
            className="mb-12 flex items-center gap-4 transition-all duration-700"
            style={{
              opacity:   visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <div className="h-1 w-12 bg-foreground" />
            <div className="border-[5px] border-foreground px-6 py-3 bg-background">
              <span className="font-[family-name:var(--font-display)] text-3xl md:text-4xl tracking-wider">
                <span className="text-[#FFDDE2]">A</span>BOUT
              </span>
            </div>
          </div>

          {/* ── Main tilt panel ── */}
          <div
            className="transition-all duration-700 delay-200"
            style={{
              opacity:   visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(40px)",
            }}
          >
            <TiltPanel className="border-[8px] border-foreground bg-background p-8 md:p-12 relative overflow-hidden">
              <div className="absolute -top-5 -left-4 bg-foreground text-background px-4 py-2 font-[family-name:var(--font-display)] text-lg z-20">
                02
              </div>

              {/* Narrator box */}
              <div className="max-w-md mb-10">
                <div className="bg-background border-4 border-foreground p-4 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-foreground" />
                  <p className="font-[family-name:var(--font-display)] text-[11px] tracking-[0.15em] uppercase text-muted-foreground">
                    The protagonist&apos;s origin story...
                  </p>
                </div>
              </div>

              {/* About text */}
              <div className="max-w-3xl space-y-6">
                <p className="text-lg md:text-xl leading-relaxed">
                  Hello! I&apos;m{" "}
                  <span className="font-bold bg-foreground text-background px-2 py-0.5">
                    Navya Bhimavarapu
                  </span>
                  , an aspiring full-stack developer with a passion for creating seamless,
                  user-centric digital experiences.
                </p>

                <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                  I believe in transforming complex logic into elegant solutions. Currently
                  pursuing my journey in technology, mastering both frontend aesthetics and
                  backend architecture.
                </p>

                <p className="text-base leading-relaxed text-muted-foreground/80 border-l-4 border-[#FFDDE2] pl-4 italic">
                  When I&apos;m not coding, you&apos;ll find me lost in a good book — manga counts too.
                </p>

                {/* Stat cards */}
                <div className="flex flex-wrap gap-4 pt-6">
                  {[
                    { num: "3+", label: "Projects" },
                    { num: "5+", label: "Technologies" },
                    { num: "∞",  label: "Books Read" },
                  ].map((stat, i) => (
                    <StatCard key={stat.label} num={stat.num} label={stat.label} delay={i * 80} />
                  ))}
                </div>
              </div>

              {/* Corner reading cat — bigger & darker */}
              <div className="absolute bottom-4 right-8 text-foreground opacity-70 hover:opacity-90 transition-opacity duration-500">
                <ReadingCat size="corner" />
              </div>

              <div className="absolute -top-3 -right-3 w-8 h-8 border-t-[5px] border-r-[5px] border-foreground" />
              <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-[5px] border-l-[5px] border-foreground" />
            </TiltPanel>
          </div>

          {/* ── Character + grid floor ── */}
          <div
            className="mt-20 relative transition-all duration-700 delay-[400ms]"
            style={{
              opacity:   visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(40px)",
            }}
          >
            <div className="absolute top-[calc(100%-140px)] left-0 right-0 h-[3px] bg-foreground z-10" />

            <div className="relative flex justify-center">
              <TiltPanel className="relative z-20 w-72 h-96 md:w-96 md:h-[450px] -mb-[140px]">
                <div className="w-full h-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center bg-background/80">
                  <div className="text-center text-muted-foreground px-8">
                    <div className="w-32 h-32 md:w-40 md:h-40 border-2 border-dashed border-muted-foreground/40 flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl opacity-20">?</span>
                    </div>
                    <p className="font-[family-name:var(--font-display)] text-xs tracking-wider">[IMAGE]</p>
                    <p className="text-xs mt-3 opacity-50 leading-relaxed">Character</p>
                  </div>
                </div>
               
              </TiltPanel>
            </div>

            {/* 3-D perspective grid floor */}
            <div className="relative h-48 overflow-hidden">
              <div
                className="absolute inset-x-0 top-0 h-full"
                style={{
                  backgroundImage: [
                    "linear-gradient(to right, rgba(0,0,0,0.4) 1px, transparent 1px)",
                    "linear-gradient(to bottom, rgba(0,0,0,0.4) 1px, transparent 1px)",
                  ].join(","),
                  backgroundSize: "50px 50px",
                  transform: "perspective(400px) rotateX(65deg)",
                  transformOrigin: "center top",
                  maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}