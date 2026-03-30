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
  type: "petal" | "leaf" | "sparkle"
  phase: number
}

function PetalSVG({ type, opacity }: { type: Petal["type"]; opacity: number }) {
  if (type === "sparkle") {
    return (
      <svg viewBox="0 0 20 20" className="w-full h-full">
        <path
          d="M10 2 L11.5 8.5 L18 10 L11.5 11.5 L10 18 L8.5 11.5 L2 10 L8.5 8.5 Z"
          fill="#FFDDE2"
          opacity={opacity * 0.6}
        />
      </svg>
    )
  }
  if (type === "leaf") {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <ellipse cx="50" cy="50" rx="20" ry="40" fill="#d4f0c0" opacity={opacity * 0.5} />
        <line x1="50" y1="15" x2="50" y2="85" stroke="#a8d89b" strokeWidth="2" opacity={opacity * 0.4} />
      </svg>
    )
  }
  // Default sakura petal
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <ellipse cx="50" cy="50" rx="45" ry="22" fill="#FFDDE2" stroke="#FFB6C1" strokeWidth="2" opacity={opacity} />
      <ellipse cx="50" cy="50" rx="18" ry="8" fill="#FFB6C1" opacity={opacity * 0.6} />
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

    const types: Petal["type"][] = ["petal", "petal", "petal", "petal", "leaf", "sparkle"]

    const initialPetals: Petal[] = Array.from({ length: 22 }, (_, i) => ({
      id: i,
      x: Math.random() * W,
      y: Math.random() * H - H,
      size: i % 5 === 0 ? 7 + Math.random() * 5 : 10 + Math.random() * 12,
      rotation: Math.random() * 360,
      speed: 0.5 + Math.random() * 1,
      swaySpeed: 0.006 + Math.random() * 0.014,
      swayAmount: 25 + Math.random() * 55,
      opacity: 0.5 + Math.random() * 0.5,
      type: types[Math.floor(Math.random() * types.length)],
      phase: Math.random() * Math.PI * 2,
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
          let newX = petal.x + Math.sin(time * petal.swaySpeed + petal.phase) * 0.6
          let newRotation = petal.rotation + petal.speed * 1.2

          // Mouse repulsion
          const dx = petal.x - mouseRef.current.x
          const dy = petal.y - mouseRef.current.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100 && dist > 0) {
            const force = (100 - dist) / 100
            newX += (dx / dist) * force * 5
            newY += (dy / dist) * force * 3
          }

          // Wrap
          if (newY > H + 60) {
            newY = -30
            newX = Math.random() * W
          }
          if (newX < -30) newX = W + 20
          if (newX > W + 30) newX = -20

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
            height: petal.size,
            transform: `rotate(${petal.rotation}deg)`,
          }}
        >
          <PetalSVG type={petal.type} opacity={petal.opacity} />
        </div>
      ))}
    </div>
  )
}