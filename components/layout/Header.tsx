'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [barReachedHeader, setBarReachedHeader] = useState(false)
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  const deliveryOptions = [
    {
      name: 'Uber Eats',
      logo: '/images/uber-eats-logo.png',
      href: 'https://www.ubereats.com/store/miss-gogi-%7C-korean-bbq-restaurant/j1FzTqHvWI2PjOGqqE2pMQ?srsltid=AfmBOopzUEUBibISTh0WDkBhZQziAe31NlpUYFsbi5oXAVhqOfYQ8q_Z',
    },
    {
      name: 'DoorDash',
      logo: '/images/doordash-logo.png',
      href: 'https://www.doordash.com/store/miss-gogi-korean-bbq---6035-peachtree-rd-atlanta-34449757/?srsltid=AfmBOor7RLIYti6GkmJcMXyUnwGSSf-X-x_xEr4UZipflRsA5uhACXnI',
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      // Check if we're on the home page with the Hero section
      const heroElement = document.querySelector('[data-hero-section]')
      // Check if page requests dark header
      const darkHeaderPage = document.querySelector('[data-dark-header]')
      
      if (darkHeaderPage) {
        // Pages with data-dark-header always have black header
        setBarReachedHeader(true)
      } else if (heroElement) {
        // Match the Hero's scroll calculation
        // Hero container is 300vh, so scrollable area is 200vh (300vh - 100vh viewport)
        const heroScrollHeight = window.innerHeight * 2 // 200vh
        const scrollProgress = Math.min(window.scrollY / heroScrollHeight, 1)
        
        // Bar's top edge position from top of viewport
        const barTopFromTop = window.innerHeight * (1 - scrollProgress)
        
        // Header height (h-20 = 80px)
        const headerHeight = headerRef.current?.offsetHeight || 80
        
        // When bar's top edge reaches the bottom of the header, change background
        setBarReachedHeader(barTopFromTop <= headerHeight)
      } else {
        // For other pages, turn black after scrolling 50px
        setBarReachedHeader(window.scrollY > 50)
      }
    }
    
    // Check immediately on mount
    const darkHeaderPage = document.querySelector('[data-dark-header]')
    if (darkHeaderPage) {
      setBarReachedHeader(true)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/about', label: 'ABOUT' },
    { href: '/menu', label: 'MENU' },
  ]

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        barReachedHeader ? 'bg-black' : 'bg-black lg:bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left - Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-smoke-200 hover:text-ember-500 transition-colors font-medium duration-200 text-lg"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Center - Logo */}
          <Link href="/" className="flex items-center justify-center">
            <Image
              src="/images/miss-gogi-logo.svg"
              alt="Miss Gogi Logo"
              width={60}
              height={60}
              className="w-12 h-12 lg:w-14 lg:h-14"
            />
          </Link>

          {/* Right - CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4 flex-1 justify-end">
            <button
              onClick={() => setIsOrderModalOpen(true)}
              className="group px-8 py-3 bg-ember-600 hover:bg-ember-700 text-white text-xl transition-all font-display duration-300 hover:shadow-2xl hover:shadow-ember-600/50 hover:scale-105"
            >
              Order Online
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-smoke-100 hover:text-ember-500 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-charcoal-700">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-smoke-200 hover:text-ember-500 transition-colors text-lg py-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col space-y-3 pt-4">
                <button
                  className="px-6 py-3 bg-ember-600 text-white font-display font-semibold rounded-lg text-center"
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    setIsOrderModalOpen(true)
                  }}
                >
                  Order Online
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Order Online Modal */}
      <AnimatePresence>
        {isOrderModalOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOrderModalOpen(false)}
          >
            <motion.div
              className="rounded-2xl p-8 max-w-lg w-full relative" style={{ backgroundColor: '#FFF8F2' }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-charcoal-500 hover:text-charcoal-900 transition-colors"
                onClick={() => setIsOrderModalOpen(false)}
              >
                <X size={24} />
              </button>

              <h3 className="text-3xl font-display text-charcoal-900 text-center mb-2">
                Order Online
              </h3>
              <p className="text-charcoal-600 text-center mb-4 text-lg">
                Choose your preferred food delivery service.
              </p>

              <div className="grid grid-cols-2 gap-8">
                {deliveryOptions.map((option) => (
                  <a
                    key={option.name}
                    href={option.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-4"
                    onClick={() => setIsOrderModalOpen(false)}
                  >
                    <Image
                      src={option.logo}
                      alt={`${option.name} logo`}
                      width={150}
                      height={80}
                      className="rounded-2xl transition-transform duration-300 hover:scale-110"
                    />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}