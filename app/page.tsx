"use client"

import { Navigation } from "@/components/navigation"
import { SakuraPetals } from "@/components/sakura-petals"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { SkillsSection } from "@/components/sections/skills-section"

export default function Portfolio() {
  return (
    <main className="relative">
      <Navigation />
      <SakuraPetals />
      
      <HeroSection />
      <AboutSection />
      <SkillsSection />
    </main>
  )
}
