'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  
  const [titleClip, setTitleClip] = useState('inset(100% 0 0 0)')
  const [subtitleClip, setSubtitleClip] = useState('inset(100% 0 0 0)')
  const [buttonsClip, setButtonsClip] = useState('inset(100% 0 0 0)')
  
  // Track scroll progress within the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })
  
  // Map scroll progress to cover height (0% to 100%)
  const coverHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  
  // Fade out buttons and scroll indicator
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  
  // Calculate clip-path based on bar position relative to text elements
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const viewportHeight = window.innerHeight
    const barTopFromBottom = progress * viewportHeight // Bar's top edge position from bottom
    const barTopFromTop = viewportHeight - barTopFromBottom // Bar's top edge position from top
    
    // Calculate clip for title
    if (titleRef.current) {
      const rect = titleRef.current.getBoundingClientRect()
      const elementTop = rect.top
      const elementBottom = rect.bottom
      const elementHeight = rect.height
      
      if (barTopFromTop >= elementBottom) {
        // Bar hasn't reached the element yet
        setTitleClip('inset(100% 0 0 0)')
      } else if (barTopFromTop <= elementTop) {
        // Bar has passed the element completely
        setTitleClip('inset(0% 0 0 0)')
      } else {
        // Bar is intersecting the element
        const coveredFromBottom = elementBottom - barTopFromTop
        const coverPercent = (coveredFromBottom / elementHeight) * 100
        const topInset = 100 - coverPercent
        setTitleClip(`inset(${topInset}% 0 0 0)`)
      }
    }
    
    // Calculate clip for subtitle
    if (subtitleRef.current) {
      const rect = subtitleRef.current.getBoundingClientRect()
      const elementTop = rect.top
      const elementBottom = rect.bottom
      const elementHeight = rect.height
      
      if (barTopFromTop >= elementBottom) {
        setSubtitleClip('inset(100% 0 0 0)')
      } else if (barTopFromTop <= elementTop) {
        setSubtitleClip('inset(0% 0 0 0)')
      } else {
        const coveredFromBottom = elementBottom - barTopFromTop
        const coverPercent = (coveredFromBottom / elementHeight) * 100
        const topInset = 100 - coverPercent
        setSubtitleClip(`inset(${topInset}% 0 0 0)`)
      }
    }
    
    // Calculate clip for buttons - reveal as bar passes through
    if (buttonsRef.current) {
      const rect = buttonsRef.current.getBoundingClientRect()
      const elementTop = rect.top
      const elementBottom = rect.bottom
      const elementHeight = rect.height
      
      if (barTopFromTop >= elementBottom) {
        // Bar hasn't reached the buttons yet
        setButtonsClip('inset(100% 0 0 0)')
      } else if (barTopFromTop <= elementTop) {
        // Bar has passed the buttons completely
        setButtonsClip('inset(0% 0 0 0)')
      } else {
        // Bar is intersecting the buttons - reveal proportionally
        const coveredFromBottom = elementBottom - barTopFromTop
        const coverPercent = (coveredFromBottom / elementHeight) * 100
        const topInset = 100 - coverPercent
        setButtonsClip(`inset(${topInset}% 0 0 0)`)
      }
    }
  })

  return (
    <div ref={containerRef} className="relative h-[300vh]" data-hero-section>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0" style={{ backgroundColor: '#2a2520' }}>
          <Image
            src="/images/pork-belly-filter-compressed.png"
            alt="Cooking pork belly"
            fill
            className="object-cover"
            quality={90}
            priority
            sizes="100vw"
          />
          
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-black/10" />
          
          {/* Scroll-activated cover that moves up */}
          <motion.div
            className="absolute bottom-0 left-0 right-0"
            style={{ height: coverHeight, backgroundColor: '#F5EDE4' }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Text container with color reveal effect */}
            <div ref={titleRef} className="relative">
              {/* Base text layer - original color */}
              <h1 className="text-5xl md:text-8xl lg:text-[200px] font-normal font-display text-smoke-100">
                MISS GOGI
              </h1>
              
              {/* Overlay text layer - colored, revealed from bottom via clip-path */}
              <h1 
                className="absolute inset-0 text-5xl md:text-8xl lg:text-[200px] font-normal font-display text-ember-500"
                style={{ clipPath: titleClip }}
                aria-hidden="true"
              >
                MISS GOGI
              </h1>
            </div>
            
            {/* Subtitle with same effect */}
            <div ref={subtitleRef} className="relative mb-6">
              <motion.p
                className="text-xl md:text-3xl lg:text-4xl font-display text-smoke-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                A TASTE OF KOREAN BARBEQUE
              </motion.p>
              
              <motion.p
                className="absolute inset-0 text-xl md:text-3xl lg:text-4xl font-display text-ember-500"
                style={{ clipPath: subtitleClip }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                aria-hidden="true"
              >
                A TASTE OF KOREAN BARBEQUE
              </motion.p>
            </div>

            <div
              ref={buttonsRef}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              style={{ clipPath: buttonsClip }}
            >
              <Link
                href="#reservations"
                className="group px-8 py-4 bg-ember-600 hover:bg-ember-700 text-white text-xl transition-all font-display duration-300 hover:shadow-2xl hover:shadow-ember-600/50 hover:scale-105"
              >
                Make A Reservation
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator - fades out as you scroll */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          style={{ opacity: contentOpacity }}
        >
          <ChevronDown className="text-smoke-300" size={32} />
        </motion.div>
      </div>
    </div>
  )
}