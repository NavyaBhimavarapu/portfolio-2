"use client"

import { useState, useEffect, useRef, useCallback } from "react"

interface Project {
  title: string
  subtitle: string
  description: string
  tags: string[]
  badge?: string
  githubUrl: string
  image: string
}

const projects: Project[] = [
  {
    title: "GoldenBatch AI",
    subtitle: "Pharma ML Platform",
    description: "An intelligent batch-processing and predictive analytics platform for pharmaceutical manufacturing. Uses XGBoost to predict tablet quality before production, enabling real-time optimization of manufacturing settings to reduce waste and energy consumption.",
    tags: ["FastAPI", "XGBoost", "Scikit-learn", "SQLite", "Python"],
    badge: "✦ ML-Powered",
    githubUrl: "https://github.com/padmakruthi/goldenbatch-ai",
    image: "/GB2.png",
  },
  {
    title: "Echo Health",
    subtitle: "AI-Powered Patient Portal",
    description: "Top 10 Finalist at TechSprint IARE. AI-powered patient portal with pill validation and multilingual support for independent medication management. Built during Agentic AI hackathon.",
    tags: ["AI", "Healthcare", "HTML", "CSS", "JavaScript"],
    badge: "🏆 Top 10 Finalist",
    githubUrl: "https://github.com/padmakruthi/echohealth",
    image: "/EH.png",
  },
  {
    title: "Prescription Scanner",
    subtitle: "OCR + NLP Web App",
    description: "An OCR and NLP based web application that scans prescriptions and provides voice output in multiple languages. Bridges the gap between medical documentation and everyday accessibility.",
    tags: ["EasyOCR", "Python", "Flask", "HTML", "JavaScript"],
    badge: "",
    githubUrl: "https://github.com/NavyaBhimavarapu/PrescriptionScanner",
    image: "/PS.png",
  },
  {
    title: "PhotoBooth",
    subtitle: "Realtime Camera App",
    description: "A real-time PhotoBooth web application that captures pictures with filters using Canvas API and WebRTC. Fun, interactive, and fully browser-native — no installs required.",
    tags: ["Canvas API", "WebRTC", "HTML", "CSS", "JavaScript"],
    badge: "",
    githubUrl: "https://navyabhimavarapu.github.io/PhotoBooth/",
    image: "/PB.png",
  },
]

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

/**
 * A single small manga corner accent — always 52×52 px, pinned to its corner.
 * Uses CSS transform to flip for the other three corners so we only draw once.
 */
function MangaCorner({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const SIZE = 52

  const posStyle: React.CSSProperties = {
    position: "absolute",
    width: SIZE,
    height: SIZE,
    pointerEvents: "none",
    zIndex: 25,
    ...(position === "tl" && { top: 0, left: 0 }),
    ...(position === "tr" && { top: 0, right: 0 }),
    ...(position === "bl" && { bottom: 0, left: 0 }),
    ...(position === "br" && { bottom: 0, right: 0 }),
  }

  const flipX = position === "tr" || position === "br"
  const flipY = position === "bl" || position === "br"
  const svgTransform = `scale(${flipX ? -1 : 1}, ${flipY ? -1 : 1})`

  return (
    <div style={posStyle}>
      <svg
        viewBox="0 0 52 52"
        width={SIZE}
        height={SIZE}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: svgTransform, transformOrigin: "26px 26px", display: "block" }}
      >
        {/* L-bracket */}
        <path d="M4 30 L4 4 L30 4" stroke="currentColor" strokeWidth="2" strokeLinecap="square" opacity="0.75" />
        {/* Pivot square */}
        <rect x="2" y="2" width="4" height="4" fill="currentColor" opacity="0.55" />
        {/* Speed lines */}
        <line x1="4" y1="4" x2="34" y2="20" stroke="currentColor" strokeWidth="0.65" opacity="0.28" />
        <line x1="4" y1="4" x2="38" y2="13" stroke="currentColor" strokeWidth="0.65" opacity="0.28" />
        <line x1="4" y1="4" x2="20" y2="38" stroke="currentColor" strokeWidth="0.65" opacity="0.28" />
        <line x1="4" y1="4" x2="13" y2="38" stroke="currentColor" strokeWidth="0.45" opacity="0.18" />
        {/* Tick marks */}
        <line x1="17" y1="4" x2="17" y2="8" stroke="currentColor" strokeWidth="1.1" opacity="0.4" />
        <line x1="25" y1="4" x2="25" y2="7" stroke="currentColor" strokeWidth="0.8" opacity="0.28" />
        <line x1="4" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="1.1" opacity="0.4" />
        <line x1="4" y1="25" x2="7" y2="25" stroke="currentColor" strokeWidth="0.8" opacity="0.28" />
        {/* Dot cluster */}
        <circle cx="15" cy="15" r="1.1" fill="currentColor" opacity="0.18" />
        <circle cx="21" cy="11" r="0.8" fill="currentColor" opacity="0.13" />
        <circle cx="11" cy="21" r="0.8" fill="currentColor" opacity="0.13" />
      </svg>
    </div>
  )
}

function GoldenBatchPlaceholder() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-background/60 relative">
      <svg viewBox="0 0 280 200" className="w-4/5 h-4/5 opacity-25" fill="none">
        {[...Array(5)].map((_, i) => (
          <line key={`h${i}`} x1="20" y1={40 + i * 30} x2="260" y2={40 + i * 30} stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
        ))}
        {[...Array(7)].map((_, i) => (
          <line key={`v${i}`} x1={20 + i * 40} y1="20" x2={20 + i * 40} y2="180" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
        ))}
        {[60, 90, 70, 120, 95, 110].map((h, i) => (
          <rect key={i} x={35 + i * 36} y={170 - h} width="22" height={h} fill="currentColor" opacity={0.55 + i * 0.04} rx="2" />
        ))}
        <polyline points="35,120 71,90 107,105 143,60 179,75 215,55" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {[35, 71, 107, 143, 179, 215].map((x, i) => {
          const ys = [120, 90, 105, 60, 75, 55]
          return <circle key={i} cx={x} cy={ys[i]} r="3.5" fill="currentColor" />
        })}
        <text x="95" y="18" fontSize="10" fill="currentColor" fontFamily="monospace" opacity="0.5">QUALITY SCORE PREDICTION</text>
      </svg>
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <span className="font-[family-name:var(--font-display)] text-[9px] tracking-[0.3em] opacity-30 uppercase">GoldenBatch AI · Pharma ML</span>
      </div>
    </div>
  )
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState<"left" | "right">("right")

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const navigate = useCallback((dir: "left" | "right") => {
    if (isAnimating) return
    setDirection(dir)
    setIsAnimating(true)
    setTimeout(() => {
      setActiveIndex((prev) => {
        if (dir === "right") return (prev + 1) % projects.length
        return (prev - 1 + projects.length) % projects.length
      })
      setIsAnimating(false)
    }, 350)
  }, [isAnimating])

  useEffect(() => {
    const interval = setInterval(() => navigate("right"), 5000)
    return () => clearInterval(interval)
  }, [navigate])

  const project = projects[activeIndex]
  const hasImage = project.image && project.image.length > 0

  return (
    <section id="projects" ref={sectionRef} className="min-h-screen relative overflow-hidden py-20 bg-background">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{ backgroundImage: "radial-gradient(circle, var(--foreground) 1px, transparent 1px)", backgroundSize: "32px 32px" }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">

        {/* Section title */}
        <div
          className="mb-16 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)" }}
        >
          <div className="inline-block">
            <div className="border-[3px] border-foreground px-8 py-4 bg-background relative">
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl tracking-wider">
                <span className="text-[#FFDDE2]">F</span>EATURED <span className="text-[#FFDDE2]">W</span>ORKS
              </h2>
              <div className="absolute -top-3 -left-3 bg-foreground text-background px-2 py-1 font-[family-name:var(--font-display)] text-xs">04</div>
            </div>
          </div>
          <p className="mt-6 font-[family-name:var(--font-display)] text-xs tracking-[0.4em] text-muted-foreground uppercase">Arc: The Build Log</p>
        </div>

        {/* Main panel */}
        <div
          className="transition-all duration-700 delay-200"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)" }}
        >
          {/* Counter badge — outside overflow-hidden so it's never clipped */}
          <div className="relative">
            <div className="absolute -top-3.5 left-4 bg-[#FFDDE2] text-foreground px-3 py-1 font-[family-name:var(--font-display)] text-xs z-30">
              {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </div>
          </div>

          <div className="border-2 border-foreground/70 bg-background relative overflow-hidden">

            {/* Nav arrows */}
            <button
              onClick={() => navigate("left")}
              className="absolute left-0 top-0 bottom-0 w-10 z-30 flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-200 group"
              aria-label="Previous"
            >
              <span className="font-[family-name:var(--font-display)] text-xl group-hover:scale-125 transition-transform opacity-50 group-hover:opacity-100">‹</span>
            </button>
            <button
              onClick={() => navigate("right")}
              className="absolute right-0 top-0 bottom-0 w-10 z-30 flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-200 group"
              aria-label="Next"
            >
              <span className="font-[family-name:var(--font-display)] text-xl group-hover:scale-125 transition-transform opacity-50 group-hover:opacity-100">›</span>
            </button>

            {/* Sliding content */}
            <div
              className="flex flex-col lg:flex-row min-h-[520px] transition-all duration-[350ms]"
              style={{
                opacity: isAnimating ? 0 : 1,
                transform: isAnimating ? `translateX(${direction === "right" ? "-40px" : "40px"})` : "translateX(0)",
              }}
            >
              {/* Image side */}
              <div className="lg:w-[45%] border-b lg:border-b-0 lg:border-r border-foreground/15 bg-muted/5 relative overflow-hidden min-h-[280px] lg:min-h-full flex items-center justify-center">

                {/* Very subtle diagonal texture */}
                <div className="absolute inset-0 opacity-[0.025]">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="absolute bg-foreground" style={{ width: "1px", height: "150%", left: `${i * 14}%`, top: "-25%", transform: "rotate(5deg)" }} />
                  ))}
                </div>

                {/* Badge */}
                {project.badge && (
                  <div className="absolute top-4 left-4 z-30 bg-foreground text-background px-2.5 py-1 font-[family-name:var(--font-display)] text-[10px] tracking-wide">
                    {project.badge}
                  </div>
                )}

                {/* Letterboxed image */}
                <div className="relative w-full h-full flex items-center justify-center px-10 py-8">
                  {hasImage ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-contain max-h-[320px] lg:max-h-[400px]"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
                    />
                  ) : (
                    <GoldenBatchPlaceholder />
                  )}
                </div>

                {/* Manga corner accents — small, pinned */}
                <MangaCorner position="tl" />
                <MangaCorner position="tr" />
                <MangaCorner position="bl" />
                <MangaCorner position="br" />
              </div>

              {/* Text side */}
              <div className="lg:w-[55%] p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <div className="mb-4">
                    <span className="font-[family-name:var(--font-display)] text-[10px] tracking-[0.4em] text-muted-foreground uppercase border border-muted-foreground/30 px-2 py-1">
                      {project.subtitle}
                    </span>
                  </div>

                  <h3 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl mb-6 tracking-wide">
                    {project.title}
                  </h3>

                  <p className="text-base md:text-lg leading-relaxed text-muted-foreground mb-8">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-[family-name:var(--font-display)] text-[10px] tracking-wide px-3 py-1.5 border border-foreground/40 hover:bg-foreground hover:text-background transition-all duration-150 cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background font-[family-name:var(--font-display)] text-sm tracking-wide hover:bg-[#FFDDE2] hover:text-foreground transition-all duration-200"
                  >
                    <GithubIcon /> View Code
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-3 mt-6">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (isAnimating || i === activeIndex) return
                  setDirection(i > activeIndex ? "right" : "left")
                  setIsAnimating(true)
                  setTimeout(() => { setActiveIndex(i); setIsAnimating(false) }, 350)
                }}
                aria-label={`Go to project ${i + 1}`}
              >
                <div
                  className="border border-foreground/50 transition-all duration-300"
                  style={{
                    width: i === activeIndex ? 28 : 10,
                    height: 10,
                    background: i === activeIndex ? "var(--foreground)" : "transparent",
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}