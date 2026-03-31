"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"

const roles = ["Web Developer", "Web Designer", "Frontend Developer"]

function TinyCat({ style }: { style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 35" style={{ width: 28, height: 24, ...style }} className="opacity-30 hover:opacity-70 transition-opacity duration-500">
      <ellipse cx="20" cy="24" rx="11" ry="8" fill="currentColor" />
      <circle cx="20" cy="13" r="8" fill="currentColor" />
      <polygon points="13,8 10,2 17,7" fill="currentColor" />
      <polygon points="27,8 30,2 23,7" fill="currentColor" />
      <polygon points="13.5,7.5 11,3.5 16.5,7" fill="#FFDDE2" opacity="0.8" />
      <polygon points="26.5,7.5 29,3.5 23.5,7" fill="#FFDDE2" opacity="0.8" />
      <ellipse cx="17" cy="13" rx="1.5" ry="1.8" fill="white" />
      <ellipse cx="23" cy="13" rx="1.5" ry="1.8" fill="white" />
      <circle cx="17.2" cy="13.2" r="0.9" fill="#1a1a1a" />
      <circle cx="23.2" cy="13.2" r="0.9" fill="#1a1a1a" />
      <polygon points="20,16 19,17.2 21,17.2" fill="#FFDDE2" />
      <path d="M31,26 Q38,20 35,14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function TinyBooks({ style }: { style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 36 30" style={{ width: 30, height: 25, ...style }} className="opacity-25 hover:opacity-65 transition-opacity duration-500">
      <rect x="3" y="20" width="28" height="7" rx="1" fill="currentColor" />
      <rect x="3" y="20" width="4" height="7" rx="1" fill="#FFDDE2" opacity="0.7" />
      <rect x="5" y="13" width="24" height="7" rx="1" fill="currentColor" opacity="0.8" />
      <rect x="5" y="13" width="3.5" height="7" rx="1" fill="#FFB6C1" opacity="0.7" />
      <rect x="7" y="7" width="20" height="6" rx="1" fill="currentColor" opacity="0.6" transform="rotate(-3 17 10)" />
      <rect x="7" y="7" width="3" height="6" rx="1" fill="#FFDDE2" opacity="0.6" transform="rotate(-3 17 10)" />
    </svg>
  )
}

// Cursor-reactive tilt panel
function TiltPanel({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const cx = (e.clientX - rect.left) / rect.width
    const cy = (e.clientY - rect.top) / rect.height
    setTilt({ x: (cy - 0.5) * -6, y: (cx - 0.5) * 6 })
    setGlowPos({ x: cx * 100, y: cy * 100 })
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: hovered ? "transform 0.08s ease-out" : "transform 0.5s ease-out",
        willChange: "transform",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false) }}
    >
      {hovered && (
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: `radial-gradient(220px circle at ${glowPos.x}% ${glowPos.y}%, rgba(255,221,226,0.14), transparent 70%)`,
            borderRadius: "inherit",
          }}
        />
      )}
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  )
}

// Sunray stripes SVG background for image panel
function SunrayBackground() {
  // 16 thin rays radiating from bottom-center in a semicircle
  const rays: React.ReactNode[] = []
  const numRays = 16
  const cx = 50   // percent origin x
  const cy = 110  // percent origin y (slightly below panel bottom for natural arc)
  const length = 160 // ray length in percentage units

  for (let i = 0; i < numRays; i++) {
    // spread rays from -80deg to +80deg (upward fan)
    const angleDeg = -80 + (160 / (numRays - 1)) * i
    const angleRad = (angleDeg * Math.PI) / 180
    const x2 = cx + length * Math.sin(angleRad)
    const y2 = cy - length * Math.cos(angleRad)

    rays.push(
      <line
        key={i}
        x1={`${cx}%`}
        y1={`${cy}%`}
        x2={`${x2}%`}
        y2={`${y2}%`}
        stroke="black"
        strokeWidth="1.5"
        strokeOpacity="0.07"
      />
    )
  }

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      {rays}
    </svg>
  )
}

const characterImages = ["/my-image1.png", "/my-image.png"]

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [imgIndex, setImgIndex] = useState(0)
  const intervalRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (!isHovering) { setRoleIndex(0); return }
    setRoleIndex(1)
    const interval = setInterval(() => setRoleIndex((prev) => (prev + 1) % roles.length), 1500)
    return () => clearInterval(interval)
  }, [isHovering])

  // Auto-cycle images every 2.5s — instant swap, no fade
  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setImgIndex((prev) => (prev + 1) % characterImages.length)
    }, 2500)
    return () => clearInterval(intervalRef.current)
  }, [])

  return (
    <section id="home" className="min-h-screen relative overflow-hidden bg-background pt-20">
      {/* Speed lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="absolute bg-foreground/[0.03]" style={{ width: "2px", height: "200%", right: `${i * 7}%`, top: "-50%", transform: `rotate(${12 + i * 0.5}deg)` }} />
        ))}
      </div>

      {/* Tiny cat — bottom-left */}
      <div className="absolute bottom-16 left-6 z-20 text-foreground animate-bounce" style={{ animationDuration: "3s" }}>
        <TinyCat />
      </div>

      {/* Tiny books — top-right */}
      <div className="absolute top-32 right-8 z-5 text-foreground" style={{ transform: "rotate(8deg)" }}>
        <TinyBooks />
      </div>

      <div className="relative z-10 min-h-[calc(100vh-5rem)] flex items-center">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-12 gap-4 md:gap-6 items-stretch min-h-[70vh]">

            {/* Left text panel — cursor reactive tilt */}
            <div className="col-span-12 lg:col-span-7 flex items-center">
              <TiltPanel className="w-full border-[6px] border-foreground p-8 md:p-12 bg-background relative group">
                {/* FIX: "01" label properly positioned above heading */}
                <div className="absolute -top-4 -left-3 bg-foreground text-background px-3 py-1.5 font-[family-name:var(--font-display)] text-sm leading-none">01</div>

                <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl mb-6 mt-2">
                  <span className="text-[#FFDDE2]">Hello, I&apos;m Navya</span>
                </h1>

                <p className="font-[family-name:var(--font-display)] text-3xl md:text-5xl lg:text-6xl mb-3">And I&apos;m a</p>

                <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl mb-8">
                  <span
                    className="relative inline-block cursor-pointer"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <span
                      className="relative z-10 px-3 py-1 inline-block transition-all duration-300"
                      style={{ background: isHovering ? "#FFDDE2" : "var(--foreground)", color: isHovering ? "var(--foreground)" : "var(--background)" }}
                    >
                      {roles[roleIndex]}
                    </span>
                  </span>
                </h2>

                <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-lg">
                  CS undergrad at IARE, passionate about Web Development and Design. Building innovative solutions and continuously expanding my skills.
                </p>

                {/* CTA buttons */}
                <div className="flex flex-wrap gap-3 mt-8">
                  <a href="#projects" className="px-5 py-2.5 bg-foreground text-background font-[family-name:var(--font-display)] text-sm tracking-wide border-2 border-foreground hover:bg-[#FFDDE2] hover:text-foreground transition-all duration-200">
                    View Work ↓
                  </a>
                  <a href="#contact" className="px-5 py-2.5 bg-transparent text-foreground font-[family-name:var(--font-display)] text-sm tracking-wide border-2 border-foreground hover:bg-foreground hover:text-background transition-all duration-200">
                    Contact Me
                  </a>
                </div>

                <div className="absolute top-3 right-3 w-6 h-6 border-t-4 border-r-4 border-foreground" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b-4 border-l-4 border-foreground" />

                <div className="absolute -bottom-3 right-10 text-foreground" style={{ transform: "scaleX(-1)" }}>
                  <TinyCat style={{ width: 42, height: 28, opacity: 0.35 }} />
                </div>
              </TiltPanel>
            </div>

            {/* Right image panel */}
            <div className="col-span-12 lg:col-span-5 flex items-center">
              <TiltPanel
                className="w-full h-full min-h-[400px] md:min-h-[500px] lg:min-h-full border-[6px] border-foreground bg-secondary/5 relative overflow-hidden"
              >
                {/* "!" badge */}
                <div className="absolute -top-4 -right-3 bg-[#FFDDE2] text-foreground px-3 py-1.5 font-[family-name:var(--font-display)] text-sm z-20">!</div>

                {/* Sunray background */}
                <SunrayBackground />

                {/* Image — instant swap, no fade, perfectly centered and bottom-aligned */}
                <div className="absolute inset-0 flex items-end justify-center z-10">
                  <img
                    key={imgIndex}
                    src={characterImages[imgIndex]}
                    alt="Character"
                    className="w-full h-full object-contain object-bottom"
                    style={{ display: "block" }}
                    onError={(e) => {
                      const t = e.target as HTMLImageElement
                      if (!t.src.endsWith("/my-image.png")) t.src = "/my-image.png"
                    }}
                  />
                </div>

                {/* Dot indicators */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
                  {characterImages.map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                      style={{
                        background: i === imgIndex ? "var(--foreground)" : "var(--muted-foreground)",
                        opacity: i === imgIndex ? 1 : 0.3,
                      }}
                    />
                  ))}
                </div>

                {/* Corner brackets */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-foreground z-20" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-foreground z-20" />
              </TiltPanel>
            </div>

          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="font-[family-name:var(--font-display)] text-[10px] tracking-[0.4em] text-muted-foreground">SCROLL</span>
        <div className="w-px h-8 bg-foreground/40 animate-pulse" />
      </div>
    </section>
  )
}