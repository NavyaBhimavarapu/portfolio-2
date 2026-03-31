"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"

function ReadingCat({ size = "normal" }: { size?: "normal" | "corner" | "large" }) {
  const dims: Record<string, [number, number]> = {
    normal: [68, 57],
    corner: [82, 68],
    large:  [96, 80],
  }
  const [w, h] = dims[size]
  return (
    <svg viewBox="0 0 60 50" style={{ width: w, height: h }} className="drop-shadow-lg">
      <ellipse cx="30" cy="43" rx="21" ry="5.5" fill="currentColor" opacity="0.18" />
      <path d="M8,29 Q30,24 52,29 L52,45 Q30,41 8,45 Z" fill="currentColor" opacity="0.90" />
      <path d="M30,29 L30,45" stroke="white" strokeWidth="1" opacity="0.35" />
      <line x1="13" y1="33" x2="28" y2="32" stroke="white" strokeWidth="0.6" opacity="0.25" />
      <line x1="13" y1="36" x2="28" y2="35" stroke="white" strokeWidth="0.6" opacity="0.25" />
      <line x1="13" y1="39" x2="28" y2="38" stroke="white" strokeWidth="0.6" opacity="0.25" />
      <line x1="32" y1="32" x2="47" y2="33" stroke="white" strokeWidth="0.6" opacity="0.25" />
      <line x1="32" y1="35" x2="47" y2="36" stroke="white" strokeWidth="0.6" opacity="0.25" />
      <line x1="32" y1="38" x2="47" y2="39" stroke="white" strokeWidth="0.6" opacity="0.25" />
      <ellipse cx="30" cy="21" rx="13" ry="10" fill="currentColor" />
      <circle cx="30" cy="10" r="9" fill="currentColor" />
      <polygon points="22,5 19,0 26,4" fill="currentColor" />
      <polygon points="38,5 41,0 34,4" fill="currentColor" />
      <polygon points="22.5,4.5 20,1 26,3.8" fill="#FFDDE2" opacity="0.85" />
      <polygon points="37.5,4.5 40,1 34,3.8" fill="#FFDDE2" opacity="0.85" />
      <path d="M26,10 Q28,8 30,10" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M30,10 Q32,8 34,10" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <polygon points="30,13 29,14.5 31,14.5" fill="#FFDDE2" />
      <line x1="18" y1="13"   x2="26" y2="13.5" stroke="white" strokeWidth="0.5" opacity="0.4" />
      <line x1="18" y1="15"   x2="26" y2="14.5" stroke="white" strokeWidth="0.5" opacity="0.4" />
      <line x1="34" y1="13.5" x2="42" y2="13"   stroke="white" strokeWidth="0.5" opacity="0.4" />
      <line x1="34" y1="14.5" x2="42" y2="15"   stroke="white" strokeWidth="0.5" opacity="0.4" />
      <path d="M43,23 Q54,18 50,10" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function Sparkle({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, animation: `twinkle 3s ${delay}s ease-in-out infinite` }}
    >
      <svg viewBox="0 0 16 16" width="10" height="10" className="text-foreground opacity-20">
        <path d="M8 0 L9.5 6.5 L16 8 L9.5 9.5 L8 16 L6.5 9.5 L0 8 L6.5 6.5 Z" fill="currentColor" />
      </svg>
    </div>
  )
}

function TiltPanel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const cx = (e.clientX - rect.left) / rect.width
    const cy = (e.clientY - rect.top) / rect.height
    setTilt({ x: (cy - 0.5) * -5, y: (cx - 0.5) * 5 })
    setGlowPos({ x: cx * 100, y: cy * 100 })
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: hovered ? "transform 0.08s ease-out" : "transform 0.45s ease-out",
        willChange: "transform",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false) }}
    >
      {hovered && (
        <div
          className="absolute inset-0 pointer-events-none z-0 rounded-[inherit]"
          style={{
            background: `radial-gradient(220px circle at ${glowPos.x}% ${glowPos.y}%, rgba(255,221,226,0.13), transparent 70%)`,
          }}
        />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}

function StatCard({ num, label, delay }: { num: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [glow, setGlow] = useState({ x: 50, y: 50, show: false })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    setGlow({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      show: true,
    })
  }, [])

  return (
    <div
      ref={ref}
      className="border-2 border-foreground px-5 py-3 bg-background hover:bg-foreground hover:text-background transition-all duration-200 cursor-default group relative overflow-hidden"
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
      <span className="relative z-10 font-[family-name:var(--font-display)] text-2xl group-hover:text-background">
        {num}
      </span>
      <span className="relative z-10 text-sm text-muted-foreground ml-2 group-hover:text-background/60">
        {label}
      </span>
    </div>
  )
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [catPos, setCatPos] = useState({ x: 60, y: 5 })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCatPos({ x: 5 + Math.random() * 55, y: 5 + Math.random() * 40 })
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; transform: scale(1) rotate(0deg); }
          50%       { opacity: 0.35; transform: scale(1.2) rotate(180deg); }
        }
      `}</style>

      <section id="about" ref={sectionRef} className="min-h-screen relative overflow-hidden py-20 bg-background">

        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{ backgroundImage: "radial-gradient(circle, var(--foreground) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />

        {/* Diagonal stripe texture */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-foreground/[0.018]"
              style={{ width: "2px", height: "200%", left: `${10 + i * 18}%`, top: "-50%", transform: "rotate(-15deg)" }}
            />
          ))}
        </div>

        {/* Sparkles */}
        {[
          { x: 85, y: 10 }, { x: 92, y: 35 }, { x: 78, y: 55 },
          { x: 5, y: 20 },  { x: 10, y: 60 },
        ].map((pos, i) => (
          <Sparkle key={i} x={pos.x} y={pos.y} delay={i * 0.6} />
        ))}

        {/* Wandering cat */}
        <div
          className="absolute text-foreground opacity-65 transition-all duration-[3000ms] ease-in-out pointer-events-none"
          style={{ bottom: `${catPos.y + 5}%`, left: `${catPos.x + 5}%` }}
        >
          <ReadingCat size="large" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">

          {/* Section header */}
          <div
            className="mb-12 flex items-center gap-4 transition-all duration-700"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)" }}
          >
            <div className="h-1 w-12 bg-foreground" />
            <div className="border-[3px] border-foreground px-6 py-3 bg-background relative">
              <span className="font-[family-name:var(--font-display)] text-3xl md:text-4xl tracking-wider">
                <span className="text-[#FFDDE2]">A</span>BOUT
              </span>
              <div className="absolute -top-3 -left-3 bg-foreground text-background px-2 py-1 font-[family-name:var(--font-display)] text-xs">
                02
              </div>
            </div>
          </div>

          {/* Main tilt panel */}
          <div
            className="transition-all duration-700 delay-200"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)" }}
          >
            <TiltPanel className="border-2 border-foreground bg-background relative overflow-hidden">

              <div className="flex flex-col lg:flex-row min-h-[500px]">

                {/* LEFT — photo */}
                <div className="lg:w-[38%] border-b lg:border-b-0 lg:border-r border-foreground/20 bg-secondary/5 relative overflow-hidden flex items-end justify-center min-h-[300px] lg:min-h-full">

                  {/* Stripe overlay */}
                  <div className="absolute inset-0 overflow-hidden opacity-[0.04]">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute bg-foreground"
                        style={{ width: "2px", height: "150%", left: `${10 + i * 16}%`, top: "-25%", transform: "rotate(6deg)" }}
                      />
                    ))}
                  </div>

                  {/* "The protagonist" badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <div className="bg-background border-2 border-foreground px-3 py-1.5">
                      <p className="font-[family-name:var(--font-display)] text-[9px] tracking-[0.15em] uppercase text-muted-foreground">
                        The protagonist
                      </p>
                    </div>
                    <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[8px] border-t-foreground ml-4" />
                  </div>

                  {/* Photo */}
                  <img
                    src="/my image2.png"
                    alt="Navya"
                    className="relative z-10 w-full h-full object-contain object-bottom max-h-[420px]"
                  />
                  {/* Corner ticks */}
                  <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-foreground z-20" />
                  <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-foreground z-20" />
                </div>

                {/* RIGHT — text */}
                <div className="lg:w-[62%] p-8 md:p-12 relative flex flex-col justify-center gap-5">

                  <p className="text-lg md:text-xl leading-relaxed">
                    Hello! I&apos;m{" "}
                    <span className="font-bold bg-foreground text-background px-2 py-0.5">
                      Navya Bhimavarapu
                    </span>
                    , a second-year CS undergrad at IARE — an aspiring full-stack developer who loves turning complex logic into seamless digital experiences.
                  </p>

                  <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
                    I thrive at the intersection of clean code and intuitive design, building responsive, high-impact web applications. From pixel-perfect UIs to robust backends, I love every layer of the stack.
                  </p>

                  <p className="text-base leading-relaxed text-muted-foreground/80 border-l-4 border-[#FFDDE2] pl-4 italic">
                    When I&apos;m not coding, you&apos;ll find me lost in a good book — manga counts too. ✨
                  </p>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-3">
                    {[
                      { num: "4+", label: "Projects" },
                      { num: "10+", label: "Technologies" },
                      { num: "∞",  label: "Books Read" },
                    ].map((stat, i) => (
                      <StatCard key={stat.label} num={stat.num} label={stat.label} delay={i * 80} />
                    ))}
                  </div>
                  
                    {/* Reading cat accent */}
                  <div className="absolute top-4 right-6 text-foreground opacity-50 hover:opacity-70 transition-opacity duration-500">
                    <ReadingCat size="corner" />
                  </div>
          

                  {/* Corner ticks */}
                  <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-foreground" />
                  <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-foreground" />
                </div>
              </div>
            </TiltPanel>
          </div>

        </div>
      </section>
    </>
  )
}