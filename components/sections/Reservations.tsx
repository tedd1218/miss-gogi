'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function Reservations() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    time: '02:30 PM',
    partySize: '',
  })
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

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

  const timeOptions = [
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
    '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM',
    '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM',
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          date: selectedDate ? selectedDate.toISOString() : '',
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          time: '02:30 PM',
          partySize: '',
        })
        setSelectedDate(null)
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

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

        {/* Reservation Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-[#D5CCC2] p-8 md:px-12 md:pt-12 md:pb-8 rounded-2xl shadow-lg">
            {/* Form Header */}
            <div className="text-center mb-8">
              <h3 className="text-3xl md:text-4xl font-display text-charcoal-900">
                Reservation Form
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                {/* First Name */}
                <div>
                  <label htmlFor="firstName" className="block font-display text-charcoal-800 text-lg mb-2">
                    First Name <span className="text-ember-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 border-2 border-charcoal-300 bg-white/50 text-charcoal-900 rounded-sm focus:outline-none focus:border-ember-500 focus:ring-1 focus:ring-ember-500 transition-all duration-200"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor="lastName" className="block font-display text-charcoal-800 text-lg mb-2">
                    Last Name <span className="text-ember-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 border-2 border-charcoal-300 bg-white/50 text-charcoal-900 rounded-sm focus:outline-none focus:border-ember-500 focus:ring-1 focus:ring-ember-500 transition-all duration-200"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block font-display text-charcoal-800 text-lg mb-2">
                    Email <span className="text-ember-600">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 border-2 border-charcoal-300 bg-white/50 text-charcoal-900 rounded-sm focus:outline-none focus:border-ember-500 focus:ring-1 focus:ring-ember-500 transition-all duration-200"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block font-display text-charcoal-800 text-lg mb-2">
                    Phone <span className="text-ember-600">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(000) 000-0000"
                    required
                    className="w-full px-4 py-4 border-2 border-charcoal-300 bg-white/50 text-charcoal-900 placeholder:text-charcoal-400 rounded-sm focus:outline-none focus:border-ember-500 focus:ring-1 focus:ring-ember-500 transition-all duration-200"
                  />
                </div>

                {/* Select a date */}
                <div>
                  <label htmlFor="date" className="block font-display text-charcoal-800 text-lg mb-2">
                    Date <span className="text-ember-600">*</span>
                  </label>
                  <DatePicker
                    id="date"
                    selected={selectedDate}
                    onChange={(date: Date | null) => setSelectedDate(date)}
                    minDate={new Date()} // Allow same-day reservations
                    placeholderText="Select a date"
                    dateFormat="MM/dd/yyyy"
                    required
                    className="w-full px-4 py-4 border-2 border-charcoal-300 bg-white/50 text-charcoal-900 rounded-sm focus:outline-none focus:border-ember-500 focus:ring-1 focus:ring-ember-500 transition-all duration-200 cursor-pointer"
                    calendarClassName="miss-gogi-calendar"
                    wrapperClassName="w-full"
                  />
                </div>

                {/* Time */}
                <div>
                  <label htmlFor="time" className="block font-display text-charcoal-800 text-lg mb-2">
                    Time <span className="text-ember-600">*</span>
                  </label>
                  <select
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 border-2 border-charcoal-300 bg-white/50 text-charcoal-900 rounded-sm focus:outline-none focus:border-ember-500 focus:ring-1 focus:ring-ember-500 transition-all duration-200 appearance-none cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', backgroundSize: '20px' }}
                  >
                    {timeOptions.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Party Size */}
                <div>
                  <label htmlFor="partySize" className="block font-display text-charcoal-800 text-lg mb-2">
                    Party Size <span className="text-ember-600">*</span>
                  </label>
                  <input
                    type="number"
                    id="partySize"
                    name="partySize"
                    value={formData.partySize}
                    onChange={handleChange}
                    min="5"
                    placeholder="Minimum 5 guests"
                    required
                    className="w-full px-4 py-4 border-2 border-charcoal-300 bg-white/50 text-charcoal-900 placeholder:text-charcoal-400 rounded-sm focus:outline-none focus:border-ember-500 focus:ring-1 focus:ring-ember-500 transition-all duration-200"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-ember-600 hover:bg-ember-700 text-white text-lg font-display rounded-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl hover:shadow-ember-600/30 hover:scale-[1.02]"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Request'}
                  </button>
                </div>
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="mt-8 p-4 bg-green-100 border border-green-300 rounded-sm">
                  <p className="text-center text-green-800 text-lg font-display">
                    ✓ Reservation request sent successfully!
                  </p>
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="mt-8 p-4 bg-red-100 border border-red-300 rounded-sm">
                  <p className="text-center text-red-700 text-lg font-display">
                    Something went wrong. Please try again or call us at (770) 220-3003.
                  </p>
                </div>
              )}
            </form>

            <p className="mt-8 text-charcoal-600 text-center text-lg">
              Or call us at{' '}
              <a
                href="tel:7702203003"
                className="text-ember-600 hover:text-ember-700 font-semibold transition-colors"
              >
                (770) 220-3003
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}