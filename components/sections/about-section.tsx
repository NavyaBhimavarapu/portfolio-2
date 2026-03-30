"use client"

import { useEffect, useRef, useState } from "react"

// Tiny reading cat SVG
function ReadingCat() {
  return (
    <svg
      viewBox="0 0 60 50"
      style={{ width: 50, height: 42 }}
      className="text-neutral-900 drop-shadow-md"
    >
      {/* open book */}
      <ellipse cx="30" cy="42" rx="20" ry="5" fill="currentColor" opacity="0.25" />
      <path d="M10,30 Q30,26 50,30 L50,44 Q30,40 10,44 Z" fill="currentColor" opacity="0.7" />
      <path d="M30,30 L30,44" stroke="currentColor" strokeWidth="1" opacity="0.5" />

      {/* body */}
      <ellipse cx="30" cy="22" rx="12" ry="9" fill="currentColor" />

      {/* head */}
      <circle cx="30" cy="11" r="8" fill="currentColor" />

      {/* ears */}
      <polygon points="23,6 20,1 26,5" fill="currentColor" />
      <polygon points="37,6 40,1 34,5" fill="currentColor" />
      <polygon points="23.5,5.5 21,2 25.5,5" fill="#FFDDE2" opacity="0.9" />
      <polygon points="36.5,5.5 39,2 34.5,5" fill="#FFDDE2" opacity="0.9" />

      {/* eyes */}
      <path
        d="M27,11 Q28.5,9.5 30,11"
        stroke="white"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M30,11 Q31.5,9.5 33,11"
        stroke="white"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* nose */}
      <polygon points="30,13.5 29,14.8 31,14.8" fill="#FFDDE2" />

      {/* tail */}
      <path
        d="M42,24 Q52,20 48,12"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Tiny book stack
function BookStack({ count = 3, rotate = 0 }: { count?: number; rotate?: number }) {
  const colors = ["#FFDDE2", "currentColor", "#FFB6C1"]
  return (
    <svg viewBox="0 0 32 36" style={{ width: 26, height: 30, transform: `rotate(${rotate}deg)` }} className="text-foreground opacity-20 hover:opacity-50 transition-opacity duration-500">
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

// Floating sparkle for atmosphere
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

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [catPos, setCatPos] = useState({ x: 0, y: 0 })

  // Intersection observer for entrance animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Subtle cat wander
  useEffect(() => {
    const wander = () => {
      setCatPos({
        x: Math.random() * 60,
        y: Math.random() * 30,
      })
    }
    const t = setInterval(wander, 4000)
    return () => clearInterval(t)
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen relative overflow-hidden py-20 bg-background"
    >
      {/* Subtle halftone dot pattern background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Diagonal panel lines — subtle */}
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

      {/* Floating sparkles */}
      {[
        { x: 85, y: 10 }, { x: 92, y: 35 }, { x: 78, y: 55 },
        { x: 5, y: 20 }, { x: 10, y: 60 },
      ].map((pos, i) => (
        <Sparkle key={i} x={pos.x} y={pos.y} delay={i * 0.6} />
      ))}

      {/* Tiny scattered book stacks */}
      <div className="absolute top-12 right-12 z-5" style={{ transform: "rotate(-5deg)" }}>
        <BookStack count={4} rotate={-8} />
      </div>
      <div className="absolute bottom-20 left-10 z-5">
        <BookStack count={3} rotate={5} />
      </div>
      <div className="absolute top-1/2 right-6 z-5">
        <BookStack count={2} rotate={12} />
      </div>

      {/* Wandering tiny cat — bottom area */}
      <div
        className="absolute z-5 text-foreground opacity-25 transition-all duration-[3000ms] ease-in-out"
        style={{
          bottom: `${catPos.y + 5}%`,
          left: `${catPos.x + 5}%`,
        }}
      >
        <ReadingCat />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">

        {/* Section header */}
        <div
          className="mb-12 flex items-center gap-4 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
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

        {/* Main panel */}
        <div
          className="border-[8px] border-foreground bg-background p-8 md:p-12 relative transition-all duration-700 delay-200"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(40px)",
          }}
        >
          <div className="absolute -top-5 -left-4 bg-foreground text-background px-4 py-2 font-[family-name:var(--font-display)] text-lg">
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
              , an aspiring full-stack developer with a passion for creating seamless, user-centric digital experiences.
            </p>

            <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
              I believe in transforming complex logic into elegant solutions. Currently pursuing my journey 
              in technology, mastering both frontend aesthetics and backend architecture.
            </p>

            {/* Extra personality line */}
            <p className="text-base leading-relaxed text-muted-foreground/80 border-l-4 border-[#FFDDE2] pl-4 italic">
              When I&apos;m not coding, you&apos;ll find me lost in a good book — manga counts too.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 pt-6">
              {[
                { num: "3+", label: "Projects" },
                { num: "5+", label: "Technologies" },
                { num: "∞", label: "Books Read" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="border-4 border-foreground px-6 py-4 bg-background hover:bg-foreground hover:text-background transition-all duration-200 cursor-default group"
                  style={{
                    transitionDelay: `${i * 80}ms`,
                  }}
                >
                  <span className="font-[family-name:var(--font-display)] text-3xl group-hover:text-background">{stat.num}</span>
                  <span className="text-sm text-muted-foreground ml-2 group-hover:text-background/60">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reading cat in corner of panel */}
          <div className="absolute bottom-4 right-8 text-foreground opacity-30 hover:opacity-60 transition-opacity duration-500">
            <ReadingCat />
          </div>

          <div className="absolute -top-3 -right-3 w-8 h-8 border-t-[5px] border-r-[5px] border-foreground" />
          <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-[5px] border-l-[5px] border-foreground" />
        </div>

        {/* Character + Grid floor section */}
        <div
          className="mt-20 relative transition-all duration-700 delay-400"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(40px)",
          }}
        >
          <div className="absolute top-[calc(100%-140px)] left-0 right-0 h-[3px] bg-foreground z-10" />

          <div className="relative flex justify-center">
            <div className="relative z-20 w-72 h-96 md:w-96 md:h-[450px] -mb-[140px]">
              <div className="w-full h-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center bg-background/80">
                <div className="text-center text-muted-foreground px-8">
                  <div className="w-32 h-32 md:w-40 md:h-40 border-2 border-dashed border-muted-foreground/40 flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl opacity-20">?</span>
                  </div>
                  <p className="font-[family-name:var(--font-display)] text-xs tracking-wider">[IMAGE]</p>
                  <p className="text-xs mt-3 opacity-50 leading-relaxed">Character</p>
                </div>
              </div>

              {/* Tiny cat sitting on top of the image box */}
              <div className="absolute -top-8 -right-6 text-foreground opacity-40 hover:opacity-70 transition-opacity duration-500 z-30">
                <svg viewBox="0 0 40 35" style={{ width: 32, height: 28 }} className="text-foreground">
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
              </div>
            </div>
          </div>

          {/* 3D perspective grid floor */}
          <div className="relative h-48 overflow-hidden">
            <div
              className="absolute inset-x-0 top-0 h-full"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(0,0,0,0.4) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(0,0,0,0.4) 1px, transparent 1px)
                `,
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

      {/* Keyframes for sparkle + wander */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; transform: scale(0.8) rotate(0deg); }
          50% { opacity: 0.4; transform: scale(1.2) rotate(180deg); }
        }
      `}</style>
    </section>
  )
}