"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { DollarSign, Truck, Users, MessageSquare, Gift, ArrowRight } from "lucide-react"
import Image from "next/image"

interface BannerSlideProps {
  title: string
  subtitle?: string
  value?: string
  cta?: string
  icon?: React.ElementType
  color: string
  image?: string
}

function BannerSlide({ title, subtitle, value, cta = "Learn More", icon: Icon, color, image }: BannerSlideProps) {
  return (
    <div className={`min-w-[200px] h-[100px] ${color} rounded-xl p-3 mr-3 flex-shrink-0 relative overflow-hidden`}>
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="space-y-0.5">
          <h3 className="text-xs font-bold text-white leading-tight">{title}</h3>
          {subtitle && <p className="text-white/90 text-[10px] leading-tight">{subtitle}</p>}
          {value && <p className="text-sm font-bold text-white mt-0.5">{value}</p>}
        </div>
        {cta && (
          <button className="inline-flex items-center text-white text-[10px] font-semibold group">
            {cta}
            <ArrowRight className="ml-1 h-2 w-2 transition-transform group-hover:translate-x-0.5" />
          </button>
        )}
      </div>
      {Icon && (
        <div className="absolute right-1 bottom-1 opacity-10">
          <Icon className="w-10 h-10" />
        </div>
      )}
      {image && (
        <div className="absolute right-1 bottom-1">
          <Image 
            src={image}
            alt={title}
            width={1200}
            height={400}
            className="w-10 h-10 object-cover rounded-xl"
          />
        </div>
      )}
    </div>
  )
}

export function BannerSlider() {
  const bannerRef = useRef<HTMLDivElement>(null)
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0)

  const bannerSlides: BannerSlideProps[] = [
    {
      title: "Monthly Revenue",
      value: "¥123,456",
      color: "bg-gradient-to-r from-blue-600 to-blue-700",
      icon: DollarSign,
    },
    {
      title: "Active Orders",
      value: "28",
      color: "bg-gradient-to-r from-green-600 to-green-700",
      icon: Truck,
    },
    {
      title: "Unlock Limits",
      subtitle: "Get Business Account",
      color: "bg-gradient-to-r from-purple-600 to-purple-700",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      title: "New Users",
      value: "+156",
      color: "bg-gradient-to-r from-orange-500 to-red-600",
      icon: Users,
    },
    {
      title: "SMS Sent",
      value: "10,234",
      color: "bg-gradient-to-r from-teal-500 to-cyan-600",
      icon: MessageSquare,
    },
    {
      title: "Refer & Earn",
      subtitle: "Get ¥100 bonus",
      color: "bg-gradient-to-r from-pink-500 to-rose-600",
      icon: Gift,
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % bannerSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [bannerSlides.length])

  useEffect(() => {
    if (bannerRef.current) {
      bannerRef.current.scrollTo({
        left: currentBannerIndex * 203,
        behavior: "smooth",
      })
    }
  }, [currentBannerIndex])

  return (
    <div className="relative">
      <div ref={bannerRef} className="flex overflow-x-hidden">
        {bannerSlides.map((slide, index) => (
          <BannerSlide key={index} {...slide} />
        ))}
      </div>
      <div className="absolute bottom-1 left-0 right-0 flex justify-center space-x-1">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              index === currentBannerIndex ? "bg-white w-3" : "bg-white/50"
            }`}
            onClick={() => setCurrentBannerIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}

