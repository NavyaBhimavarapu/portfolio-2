"use client"

import React, { useState, useEffect, useRef } from "react"

const roles = ["Web Developer", "Web Designer", "Frontend Developer"]

// Tiny cat SVG component
function TinyCat({ style }: { style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 40 35" style={{ width: 28, height: 24, ...style }} className="opacity-30 hover:opacity-70 transition-opacity duration-500">
      {/* body */}
      <ellipse cx="20" cy="24" rx="11" ry="8" fill="currentColor" />
      {/* head */}
      <circle cx="20" cy="13" r="8" fill="currentColor" />
      {/* ears */}
      <polygon points="13,8 10,2 17,7" fill="currentColor" />
      <polygon points="27,8 30,2 23,7" fill="currentColor" />
      {/* inner ears */}
      <polygon points="13.5,7.5 11,3.5 16.5,7" fill="#FFDDE2" opacity="0.8" />
      <polygon points="26.5,7.5 29,3.5 23.5,7" fill="#FFDDE2" opacity="0.8" />
      {/* eyes */}
      <ellipse cx="17" cy="13" rx="1.5" ry="1.8" fill="white" />
      <ellipse cx="23" cy="13" rx="1.5" ry="1.8" fill="white" />
      <circle cx="17.2" cy="13.2" r="0.9" fill="#1a1a1a" />
      <circle cx="23.2" cy="13.2" r="0.9" fill="#1a1a1a" />
      {/* nose */}
      <polygon points="20,16 19,17.2 21,17.2" fill="#FFDDE2" />
      {/* tail */}
      <path d="M31,26 Q38,20 35,14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  )
}

// Tiny book stack SVG
function TinyBooks({ style }: { style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 36 30" style={{ width: 30, height: 25, ...style }} className="opacity-25 hover:opacity-65 transition-opacity duration-500">
      {/* bottom book */}
      <rect x="3" y="20" width="28" height="7" rx="1" fill="currentColor" />
      <rect x="3" y="20" width="4" height="7" rx="1" fill="#FFDDE2" opacity="0.7" />
      {/* middle book */}
      <rect x="5" y="13" width="24" height="7" rx="1" fill="currentColor" opacity="0.8" />
      <rect x="5" y="13" width="3.5" height="7" rx="1" fill="#FFB6C1" opacity="0.7" />
      {/* top book - slightly tilted */}
      <rect x="7" y="7" width="20" height="6" rx="1" fill="currentColor" opacity="0.6" transform="rotate(-3 17 10)" />
      <rect x="7" y="7" width="3" height="6" rx="1" fill="#FFDDE2" opacity="0.6" transform="rotate(-3 17 10)" />
    </svg>
  )
}

// Character images array - cycles on hover
const characterImages = [
  "/my-image1.png",
  "/my-image.png",
]

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [imgIndex, setImgIndex] = useState(0)
  const [isPanelHovering, setIsPanelHovering] = useState(false)
  const [imgTransitioning, setImgTransitioning] = useState(false)
  const intervalRef = useRef<number | undefined>(undefined)

  // Role cycling
  useEffect(() => {
    if (!isHovering) {
      setRoleIndex(0)
      return
    }
    setRoleIndex(1)
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }, 1500)
    return () => clearInterval(interval)
  }, [isHovering])

  // Image cycling on panel hover
  useEffect(() => {
    if (!isPanelHovering) return
    intervalRef.current = window.setInterval(() => {
      setImgTransitioning(true)
      setTimeout(() => {
        setImgIndex((prev) => (prev + 1) % characterImages.length)
        setImgTransitioning(false)
      }, 300)
    }, 1200)
    return () => clearInterval(intervalRef.current)
  }, [isPanelHovering])

  return (
    // ✅ FIX: Added pt-20 so content starts below the fixed navbar (navbar is ~80px tall)
    <section id="home" className="min-h-screen relative overflow-hidden bg-background pt-20">
      {/* Speed lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-foreground/[0.03]"
            style={{
              width: "2px",
              height: "200%",
              right: `${i * 7}%`,
              top: "-50%",
              transform: `rotate(${12 + i * 0.5}deg)`,
            }}
          />
        ))}
      </div>

      {/* Tiny cat — bottom-left corner */}
      <div className="absolute bottom-16 left-6 z-20 text-foreground animate-bounce" style={{ animationDuration: "3s" }}>
        <TinyCat />
      </div>

      {/* Tiny books — top-right behind panel */}
      <div className="absolute top-32 right-8 z-5 text-foreground" style={{ transform: "rotate(8deg)" }}>
        <TinyBooks />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-[calc(100vh-5rem)] flex items-center">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">

          <div className="grid grid-cols-12 gap-4 md:gap-6 items-stretch min-h-[70vh]">

            {/* Left text panel */}
            <div className="col-span-12 lg:col-span-7 flex items-center">
              <div className="w-full border-[6px] border-foreground p-8 md:p-12 bg-background relative group">
                <div className="absolute -top-4 -left-3 bg-foreground text-background px-3 py-1.5 font-[family-name:var(--font-display)] text-sm">
                  01
                </div>

                <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl mb-6">
                  <span className="text-[#FFDDE2]">Hello, I&apos;m Navya</span>
                </h1>

                {/* ✅ FIX: Removed the duplicate "And i'm a" — was rendered twice before */}
                <p className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl mb-6">
                  And I&apos;m a
                </p>

                <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl mb-8">
                  <span
                    className="relative inline-block cursor-pointer"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <span
                      className="relative z-10 px-3 py-1 inline-block transition-all duration-300"
                      style={{
                        background: isHovering ? "#FFDDE2" : "var(--foreground)",
                        color: isHovering ? "var(--foreground)" : "var(--background)",
                      }}
                    >
                      {roles[roleIndex]}
                    </span>
                  </span>
                </h2>

                <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-lg">
                  Passionate about technology, I specialize in Web Development and Designing.
                  Building innovative solutions and continuously expanding my skills.
                </p>

                {/* Decorative corner marks */}
                <div className="absolute top-3 right-3 w-6 h-6 border-t-4 border-r-4 border-foreground" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b-4 border-l-4 border-foreground" />

                {/* Tiny cat peeking from bottom-right of text panel */}
                <div className="absolute -bottom-3 right-10 text-foreground" style={{ transform: "scaleX(-1)" }}>
                  <TinyCat style={{ width: 42, height: 28, opacity: 2.35 }} />
                </div>
              </div>
            </div>

            {/* Right image panel — hover to cycle images */}
            <div className="col-span-12 lg:col-span-5 flex items-center">
              <div
                className="w-full h-full min-h-[400px] md:min-h-[500px] lg:min-h-full border-[6px] border-foreground bg-secondary/5 relative overflow-hidden cursor-pointer"
                onMouseEnter={() => setIsPanelHovering(true)}
                onMouseLeave={() => setIsPanelHovering(false)}
              >
                <div className="absolute -top-4 -right-3 bg-[#FFDDE2] text-foreground px-3 py-1.5 font-[family-name:var(--font-display)] text-sm z-20">
                  !
                </div>

                {/* Hover hint */}
                {!isPanelHovering && (
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center z-20">
                    <span className="font-[family-name:var(--font-display)] text-[9px] tracking-[0.3em] text-muted-foreground animate-pulse">
                      .......
                    </span>
                  </div>
                )}

                {/* Speed lines */}
                <div className="absolute inset-0 overflow-hidden opacity-[0.06]">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute bg-foreground"
                      style={{
                        width: "3px",
                        height: "150%",
                        left: `${10 + i * 12}%`,
                        top: "-25%",
                        transform: "rotate(8deg)",
                      }}
                    />
                  ))}
                </div>

                {/* ✅ FIX: Image uses object-cover + full panel size for proper display */}
                <div className="absolute inset-0 flex items-end justify-center">
                  <img
                    src={characterImages[imgIndex]}
                    alt="Character"
                    className="w-full h-full object-contain object-bottom transition-all duration-300"
                    style={{
                      opacity: imgTransitioning ? 0 : 1,
                      transform: imgTransitioning ? "scale(0.95)" : "scale(1)",
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      if (!target.src.endsWith("/my-image.png")) {
                        target.src = "/my-image.png"
                      }
                    }}
                  />
                </div>

                {/* Image index dots */}
                <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
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

                <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-foreground" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-foreground" />
              </div>
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