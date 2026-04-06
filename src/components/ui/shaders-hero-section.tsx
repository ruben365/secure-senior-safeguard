"use client"

import { PulsingBorder, MeshGradient } from "@paper-design/shaders-react"
import { motion } from "framer-motion"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { Shield, ArrowRight, Phone, Users, Zap, Star, Lock, Award, ShieldCheck, AlertTriangle } from "lucide-react"
import { SITE } from "@/config/site"
import invisionLogo from "@/assets/shield-logo.png"

interface ShaderBackgroundProps {
  children: React.ReactNode
}

export function ShaderBackground({ children }: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="min-h-screen w-full relative overflow-hidden">
      {/* SVG Filters */}
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
              result="tint"
            />
          </filter>
          <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Background Shaders — InVision blue/indigo glassmorphism palette */}
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={["#0f172a", "#1e3a5f", "#0c1529", "#1a2744", "#0b1120"]}
        speed={0.25}
      />
      <MeshGradient
        className="absolute inset-0 w-full h-full opacity-30"
        colors={["#0f172a", "#93c5fd", "#3b82f6", "#000000"]}
        speed={0.15}
      />
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_80%,rgba(59,130,246,0.15),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(99,102,241,0.1),transparent_50%)] pointer-events-none" />

      {children}
    </div>
  )
}

export function PulsingCircle() {
  return (
    <div className="absolute bottom-24 right-8 z-30 hidden md:block">
      <div className="relative w-20 h-20 flex items-center justify-center">
        <PulsingBorder
          colors={["#93c5fd", "#60a5fa", "#3b82f6", "#10b981", "#f59e0b", "#818cf8", "#6366f1"]}
          colorBack="#00000000"
          speed={1.5}
          roundness={1}
          thickness={0.1}
          softness={0.2}
          intensity={5}
          spotsPerColor={5}
          spotSize={0.1}
          pulse={0.1}
          smoke={0.5}
          smokeSize={4}
          scale={0.65}
          rotation={0}
          frame={9161408.251009725}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
          }}
        />

        <motion.svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{ transform: "scale(1.6)" }}
        >
          <defs>
            <path id="circle" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
          </defs>
          <text className="fill-white/70" style={{ fontSize: "7.5px" }}>
            <textPath href="#circle" startOffset="0%">
              AI Protection Active • Shield Online • Threats Blocked • Family Safe •
            </textPath>
          </text>
        </motion.svg>
      </div>
    </div>
  )
}

export function HeroContent() {
  return (
    <div className="relative z-20 container mx-auto px-6 lg:px-12">
      <div className="min-h-[calc(100vh-68px)] flex flex-col justify-center pb-24 pt-8 max-w-3xl">
        {/* Live status badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/[0.08] relative"
            style={{ filter: "url(#glass-effect)" }}
          >
            <div className="absolute top-0 left-2 right-2 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent rounded-full" />
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
            </span>
            <span className="text-white/90 text-sm font-medium relative z-10">
              2,847 threats blocked this month
            </span>
            <div className="w-px h-4 bg-white/15" />
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Live</span>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tight"
        >
          AI-Powered{" "}
          <span className="bg-gradient-to-r from-blue-300 via-sky-300 to-blue-300 bg-clip-text text-transparent">
            Scam Protection
          </span>
          <br className="hidden sm:block" />
          for Your Family
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl mb-10"
        >
          Real-time deepfake detection, voice clone analysis, and phishing prevention.
          Veteran-founded in Ohio — protecting 500+ families and counting.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-col sm:flex-row gap-4 mb-12"
        >
          <Link
            to="/training#pricing"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white text-black font-semibold text-sm transition-all duration-200 hover:bg-white/90 hover:scale-[1.02] shadow-lg shadow-white/10"
          >
            <Shield className="mr-2 w-4 h-4" />
            Start Protection — From $79
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
          <a
            href={SITE.phone.tel}
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white/[0.06] backdrop-blur-sm border border-white/20 text-white font-semibold text-sm transition-all duration-200 hover:bg-white/10 hover:border-white/30"
          >
            <Phone className="mr-2 w-4 h-4" />
            Call {SITE.phone.display}
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          {[
            { value: "500+", label: "Families Protected", icon: Users },
            { value: "$1.2M", label: "Saved From Scams", icon: ShieldCheck },
            { value: "99.8%", label: "Detection Rate", icon: Shield },
            { value: "< 2min", label: "Response Time", icon: Zap },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] p-4 hover:bg-white/[0.07] transition-colors duration-200"
            >
              <div className="flex items-center gap-3">
                <stat.icon className="w-5 h-5 text-blue-300/70 flex-shrink-0" />
                <div>
                  <div className="text-lg font-extrabold text-white leading-none">{stat.value}</div>
                  <div className="text-[10px] font-semibold text-white/40 uppercase tracking-wider mt-1">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

/* Floating threat shield card (desktop only) */
export function FloatingShieldCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 1.0 }}
      className="hidden xl:block absolute top-[18%] right-[5%] z-20"
    >
      <div className="px-5 py-4 rounded-2xl bg-white/[0.05] backdrop-blur-2xl border border-white/[0.08] shadow-2xl max-w-[220px]">
        <div className="absolute top-0 left-2 right-2 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">Protected</div>
            <div className="text-[10px] text-emerald-400 font-semibold">Shield Active</div>
          </div>
        </div>
        <div className="h-px bg-white/[0.06] mb-3" />
        <div className="space-y-2.5">
          {["Voice Cloning", "Deepfake AI", "Phishing"].map((threat) => (
            <div key={threat} className="flex items-center justify-between">
              <span className="text-xs text-white/50">{threat}</span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] font-bold text-emerald-400">Blocked</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* Floating rating card (desktop only) */
export function FloatingRatingCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20, y: 10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.7, delay: 1.2 }}
      className="hidden xl:block absolute bottom-[28%] right-[8%] z-20"
    >
      <div className="px-5 py-4 rounded-2xl bg-white/[0.05] backdrop-blur-2xl border border-white/[0.08] shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <div>
            <div className="text-sm font-bold text-white">5.0 Rating</div>
            <div className="text-[10px] text-white/50 font-medium">Rated by Ohio Families</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* Floating alert card — mid-right (desktop only) */
export function FloatingAlertCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 1.4 }}
      className="hidden xl:block absolute top-[52%] right-[3%] z-20"
    >
      <div className="px-4 py-3 rounded-xl bg-white/[0.05] backdrop-blur-2xl border border-white/[0.08] shadow-2xl">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 text-red-400" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Threat Blocked</div>
            <div className="text-[10px] text-white/40">Voice clone — just now</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* Bottom trust bar */
export function TrustBar() {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/[0.06] bg-black/30 backdrop-blur-md">
      <div className="container mx-auto px-6 lg:px-12 py-3.5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm font-bold text-white">
              5.0 — Rated by Ohio Families
            </span>
          </div>
          <div className="hidden md:flex items-center gap-3">
            {[
              { icon: Award, text: `${SITE.veteranDiscountPercent}% Veteran Discount` },
              { icon: Lock, text: `${SITE.moneyBackGuaranteeDays}-Day Money Back` },
              { icon: Shield, text: "Privacy-First Approach" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06]">
                <item.icon className="w-3.5 h-3.5 text-blue-300/70" />
                <span className="text-[11px] font-semibold text-white/60">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
