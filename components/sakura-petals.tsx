"use client"

import { useEffect, useState, useRef } from "react"

interface Petal {
  id: number
  x: number
  y: number
  size: number
  rotation: number
  speed: number
  swaySpeed: number
  swayAmount: number
  opacity: number
  type: "petal" | "leaf" | "sparkle" | "mini"
  phase: number
  drift: number // gentle horizontal drift
}

function PetalSVG({ type, opacity }: { type: Petal["type"]; opacity: number }) {
  if (type === "sparkle") {
    return (
      <svg viewBox="0 0 20 20" className="w-full h-full">
        <path d="M10 2 L11.5 8.5 L18 10 L11.5 11.5 L10 18 L8.5 11.5 L2 10 L8.5 8.5 Z" fill="#FFDDE2" opacity={opacity * 0.7} />
      </svg>
    )
  }
  if (type === "mini") {
    return (
      <svg viewBox="0 0 60 60" className="w-full h-full">
        <ellipse cx="30" cy="30" rx="28" ry="14" fill="#FFB6C1" opacity={opacity * 0.9} />
        <ellipse cx="30" cy="30" rx="12" ry="6" fill="#FFDDE2" opacity={opacity * 0.5} />
      </svg>
    )
  }
  if (type === "leaf") {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <ellipse cx="50" cy="50" rx="20" ry="42" fill="#d4f0c0" opacity={opacity * 0.45} />
        <line x1="50" y1="12" x2="50" y2="88" stroke="#a8d89b" strokeWidth="1.5" opacity={opacity * 0.35} />
      </svg>
    )
  }
  // Default sakura petal — slightly more detailed
  return (
    <svg viewBox="0 0 120 60" className="w-full h-full">
      <ellipse cx="60" cy="30" rx="55" ry="24" fill="#FFDDE2" stroke="#FFB6C1" strokeWidth="1.5" opacity={opacity} />
      <ellipse cx="60" cy="30" rx="22" ry="10" fill="#FFB6C1" opacity={opacity * 0.55} />
      <ellipse cx="60" cy="30" rx="8" ry="4" fill="#ff9eb5" opacity={opacity * 0.3} />
    </svg>
  )
}

export function SakuraPetals() {
  const [petals, setPetals] = useState<Petal[]>([])
  const [mounted, setMounted] = useState(false)
  const mouseRef = useRef({ x: -999, y: -999 })
  const animationRef = useRef<number>()

  useEffect(() => {
    setMounted(true)

    const W = window.innerWidth
    const H = window.innerHeight

    const types: Petal["type"][] = ["petal", "petal", "petal", "petal", "petal", "leaf", "sparkle", "mini", "mini"]

    const initialPetals: Petal[] = Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x: Math.random() * W,
      y: Math.random() * H - H * 0.5, // start some already on screen, some above
      size: i % 6 === 0
        ? 5 + Math.random() * 4        // tiny sparkles
        : i % 7 === 0
          ? 6 + Math.random() * 5      // leaves
          : 11 + Math.random() * 14,   // petals
      rotation: Math.random() * 360,
      speed: 0.4 + Math.random() * 0.9,
      swaySpeed: 0.004 + Math.random() * 0.01,
      swayAmount: 20 + Math.random() * 50,
      opacity: 0.45 + Math.random() * 0.55,
      type: types[Math.floor(Math.random() * types.length)],
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.3, // subtle consistent horizontal drift
    }))

    setPetals(initialPetals)

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener("mousemove", handleMouseMove)

    let time = 0
    const animate = () => {
      time += 1
      const W = window.innerWidth
      const H = window.innerHeight

      setPetals((prev) =>
        prev.map((petal) => {
          let newY = petal.y + petal.speed
          // Smooth sinusoidal sway + gentle drift
          let newX = petal.x
            + Math.sin(time * petal.swaySpeed + petal.phase) * 0.55
            + Math.cos(time * petal.swaySpeed * 0.6 + petal.phase) * 0.2
            + petal.drift

          // Slow rotation tied to movement
          const newRotation = petal.rotation + petal.speed * 0.8 + Math.sin(time * petal.swaySpeed) * 0.5

          // Gentle mouse repulsion — softer radius
          const dx = petal.x - mouseRef.current.x
          const dy = petal.y - mouseRef.current.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 90 && dist > 0) {
            const force = (90 - dist) / 90
            newX += (dx / dist) * force * 3.5
            newY += (dy / dist) * force * 2
          }

          // Wrap around edges smoothly
          if (newY > H + 80) {
            newY = -30 - Math.random() * 60
            newX = Math.random() * W
          }
          if (newX < -40) newX = W + 20
          if (newX > W + 40) newX = -20

          return { ...petal, x: newX, y: newY, rotation: newRotation }
        })
      )
      animationRef.current = requestAnimationFrame(animate)
    }
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute"
          style={{
            left: petal.x,
            top: petal.y,
            width: petal.size,
            height: petal.size * (petal.type === "petal" ? 0.55 : petal.type === "mini" ? 0.55 : 1),
            transform: `rotate(${petal.rotation}deg)`,
          }}
        >
          <PetalSVG type={petal.type} opacity={petal.opacity} />
        </div>
      ))}
    </div>
  )
}