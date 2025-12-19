'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Features() {
  return (
    <section className="py-20 px-4" style={{ backgroundColor: '#F05A4E' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-white/90 tracking-[0.3em] text-lg mb-3 uppercase">Explore Miss Gogi</p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display text-white mb-6">
            What is Korean Barbecue?
          </h2>
          <p className="text-white/90 font-display text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Korean BBQ is more than just a meal; it's an interactive dining experience where premium cuts of meat are grilled to perfection at your table. At Miss Gogi, we honor this cherished Korean tradition by offering the finest selection of hand-cut meats, from marbled short ribs to tender ribeye, each prepared with authentic Korean marinades and seasonings.
          </p>
        </motion.div>

        {/* Center - BBQ Image */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative w-100 h-100 md:w-[700px] md:h-[600px] lg:w-[700px] lg:h-[600px] -mt-20">
            <Image
              src="/images/bbq-removed.jpg"
              alt="Korean BBQ Grill"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}