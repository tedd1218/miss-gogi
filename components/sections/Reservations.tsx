'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Reservations() {
  const policies = [
    {
      icon: '/images/user-group-stroke-rounded.svg',
      title: 'Party Size',
      description: 'Reservations are only available for parties of 5 or more.',
    },
    {
      icon: '/images/24-hours-clock-stroke-rounded.svg',
      title: 'Advance Booking',
      description: 'Reservations must be made 24 hours in advance.',
    },
    {
      icon: '/images/calendar-block-01-stroke-rounded.svg',
      title: 'Same-Day Notice',
      description: 'Same-day reservations may not be accommodated.',
    },
  ]

  return (
    <section id="reservations" className="py-20 px-4" style={{ backgroundColor: '#E8DFD5' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-black/70 tracking-[0.3em] text-lg mb-3 uppercase">Reservation Policy</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-charcoal-900">
            Before You Book
          </h2>
        </motion.div>

        {/* Policy Columns */}
        <motion.div
          className="grid md:grid-cols-3 gap-12 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {policies.map((policy, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center"
            >
              {/* Icon */}
              <div className="mb-6">
                <Image
                  src={policy.icon}
                  alt={policy.title}
                  width={56}
                  height={56}
                  className="w-14 h-14"
                />
              </div>
              
              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-display text-charcoal-900 mb-3">
                {policy.title}
              </h3>
              
              {/* Description */}
              <p className="text-charcoal-700 text-lg leading-relaxed">
                {policy.description}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Make A Reservation Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <a
            href="https://www.opentable.com/r/miss-gogi-doraville"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-8 py-4 bg-ember-600 hover:bg-ember-700 text-white text-xl transition-all font-display duration-300 hover:shadow-2xl hover:shadow-ember-600/50 hover:scale-105"
          >
            Make A Reservation
          </a>
          
          <p className="mt-8 text-charcoal-600">
            Or call us at{' '}
            <a
              href="tel:7702203003"
              className="text-ember-600 hover:text-ember-700 font-semibold"
            >
              (770) 220-3003
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}