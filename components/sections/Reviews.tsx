'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Reviews() {
  const reviews = [
    {
      publication: 'Eater',
      logo: '/images/eater-logo.jpg',
      link: 'https://atlanta.eater.com/maps/best-korean-bbq-atlanta-map#miss-gogi',
      quote: `"With so many Korean barbecue restaurants now around Atlanta, it can be overwhelming to decide where to go. Eater readers often tag Miss Gogi as their go-to for Korean barbecue. Located in a corner restaurant space with lots of natural light, Miss Gogi offers a large variety of meats to choose from on the menu. In addition to a la carte meats, there's also the option to order meat combos and all-you-can-eat meals here. Miss Gogi resides in the same complex as Super H Mart, Shoya Izakaya, and J-Bistro."`,
      author: 'Candy Hom',
      articleTitle: "Atlanta's Best Korean Barbecue Restaurants",
    },
    {
      publication: 'The Infatuation',
      logo: '/images/infatuation-logo.png',
      link: 'https://www.theinfatuation.com/atlanta/reviews/miss-gogi',
      quote: `"Miss Gogi gives us [an] excellent $40 AYCE offering. Eleven protein options means there's enough variety to satisfy everyone in your group. Think meaty jumbo shrimp and seasoned prime steak that tastes even better when dunked in the savory garlic sauce. Plus, you can roll up with a crew because this KBBQ spot has tables big enough to hold an impromptu family reunion or a meal with your whole accounting department (who will no doubt appreciate the good deal)."`,
      author: 'Juli Horsford',
      articleTitle: "The Best Korean BBQ Restaurants In Atlanta",
    },
  ]

  return (
    <section className="py-20 px-4" style={{ backgroundColor: '#FFF8F2' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-black/70 tracking-[0.3em] text-lg mb-3 uppercase">As Featured In</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display text-charcoal-900">
            What They&apos;re Saying
          </h2>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Publication Logo */}
              <div className="flex justify-center mb-6">
                <a
                  href={review.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform duration-300 hover:scale-105 hover:opacity-80"
                >
                  <Image
                    src={review.logo}
                    alt={review.publication}
                    width={200}
                    height={60}
                    className="h-30 md:h-40 w-auto object-contain"
                  />
                </a>
              </div>
              
              {/* Quote */}
              <blockquote className="text-lg md:text-xl text-charcoal-700 leading-relaxed font-display italic">
                {review.quote}
              </blockquote>
              
              {/* Author Attribution */}
              <p className="mt-4 text-base text-charcoal-600 font-display">
                — {review.author}
                {review.articleTitle && (
                  <span className="italic">, {review.articleTitle}</span>
                )}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

