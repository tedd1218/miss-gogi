'use client'

import { motion } from 'framer-motion'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function MenuPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Menu Section */}
      <section className="pt-32 pb-20 px-4" style={{ backgroundColor: '#E9DED5' }} data-dark-header>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-charcoal-600 tracking-[0.3em] text-lg mb-3 uppercase">Explore</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display text-charcoal-900 mb-6">
              Our Menu
            </h1>
          </motion.div>

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-16 max-w-4xl mx-auto">
            {/* Food Menu Column */}
            <motion.div
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img 
                src="/images/serving-food-stroke-rounded.svg" 
                alt="Food Menu" 
                className="w-20 h-20 mb-6"
              />
              <a 
                href="/foodmenu.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 bg-ember-600 hover:bg-ember-700 text-white text-xl transition-all font-display duration-300 hover:shadow-2xl hover:shadow-ember-600/50 hover:scale-105"
              >
                View Food Menu
              </a>
            </motion.div>

            {/* Drink Menu Column */}
            <motion.div
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <img 
                src="/images/drink-stroke-rounded.svg" 
                alt="Drink Menu" 
                className="w-20 h-20 mb-6"
              />
              <a 
                href="#" 
                className="group px-8 py-4 bg-ember-600 hover:bg-ember-700 text-white text-xl transition-all font-display duration-300 hover:shadow-2xl hover:shadow-ember-600/50 hover:scale-105"
              >
                View Drink Menu
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

