'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function DrinkSpecials() {
  return (
    <section className="py-20 px-4" style={{ backgroundColor: '#FFF8F2' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-display text-black text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Current Drink Specials
        </motion.h2>

        {/* Specials Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mb-16 items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Beer Buckets - Tuesdays & Thursdays */}
          <div className="flex justify-center">
            <Image
              src="/images/tue-thur.png"
              alt="Beer Buckets - Tuesdays & Thursdays - Buy 4 Get 1 Free"
              width={400}
              height={500}
              className="w-full h-auto"
            />
          </div>

          {/* Cocktails - Wednesdays */}
          <div className="flex justify-center">
            <Image
              src="/images/wed.png"
              alt="Cocktails 50% off Wednesdays"
              width={400}
              height={500}
              className="w-full h-auto"
            />
          </div>

          {/* Wine - Mondays */}
          <div className="flex justify-center">
            <Image
              src="/images/mon.png"
              alt="Wine Mondays 50% off"
              width={400}
              height={500}
              className="w-full h-auto"
            />
          </div>
        </motion.div>

        {/* Hours Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
        </motion.div>
      </div>
    </section>
  )
}

