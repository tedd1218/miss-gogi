'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { X } from 'lucide-react'

export default function AboutPage() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null)

  const galleryImages = [
    { src: '/images/porkbelly.jpg', alt: 'Pork Belly' },
    { src: '/images/scallops.jpg', alt: 'Scallops' },
    { src: '/images/shrimp.jpg', alt: 'Shrimp' },
    { src: '/images/spicypork-lunch.jpg', alt: 'Spicy Pork Lunch' },
    { src: '/images/steak.jpg', alt: 'Steak' },
    { src: '/images/mixmeats.jpg', alt: 'Mixed Meats' },
    { src: '/images/marinatedgalbimeat.jpg', alt: 'Marinated Galbi Meat' },
    { src: '/images/kimchifriedrice.jpg', alt: 'Kimchi Fried Rice' },
    { src: '/images/kimchijiggae.jpg', alt: 'Kimchi Jjigae' },
    { src: '/images/marinated.jpg', alt: 'Marinated Meat' },
    { src: '/images/marinatedbeef.jpg', alt: 'Marinated Beef' },
    { src: '/images/galbi.jpg', alt: 'Galbi' },
    { src: '/images/flanksteak.jpg', alt: 'Flank Steak' },
    { src: '/images/deonjang.jpg', alt: 'Doenjang Jjigae' },
    { src: '/images/choppedgalbi.jpg', alt: 'Chopped Galbi' },
    { src: '/images/buddaejiggae.jpg', alt: 'Budae Jjigae' },
    { src: '/images/brisket.jpg', alt: 'Brisket' },
    { src: '/images/bibimbap.jpg', alt: 'Bibimbap' },
    { src: '/images/beefbulgogi-lunch.jpg', alt: 'Beef Bulgogi Lunch' },
    { src: '/images/beef.jpg', alt: 'Beef' },
    { src: '/images/beef-sides.jpg', alt: 'Beef with Sides' },
  ]

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4" style={{ backgroundColor: '#F7A072' }}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-white/90 tracking-[0.3em] text-lg mb-3 uppercase">Our Story</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display text-white mb-6">
              About Us
            </h1>
            <p className="text-white/90 font-display text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Miss Gogi is an authentic Korean BBQ restaurant located in the heart of the H-Mart plaza in Doraville, GA. We offer a true K-BBQ experience with premium beef, pork, chicken, and seafood grilled right at your table, alongside freshly prepared Korean dishes and house-made banchan crafted with the finest ingredients. Beyond BBQ, our menu features comforting favorites like tofu soup, buckwheat noodles, and ramen, plus a curated selection of soju, sake, and Korean plum wine. With a vibrant, welcoming atmosphere, Miss Gogi is the perfect spot for a quick lunch, a celebratory feast, or a memorable meal with family and friends.
            </p>
            <br/>
            <p className="text-white/90 font-display text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed">
              At Miss Gogi, we believe that great food brings people together. Our mission is to provide an authentic Korean BBQ experience that honors tradition while creating lasting memories for our guests. Every dish we serve is crafted with care, using fresh ingredients and time-honored recipes passed down through generations. From our signature marinated meats to our homemade banchan, we pour our heart into every detail.
            </p>
          </motion.div>

          {/* Featured Image */}
          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative w-full max-w-4xl aspect-video rounded-lg overflow-hidden">
              <Image
                src="/images/mixed-removed.jpg"
                alt="Miss Gogi Korean BBQ"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-4" style={{ backgroundColor: '#28282B' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-white/80 tracking-[0.3em] text-lg mb-3 uppercase text-center">Gallery</p>
            <h1 className="text-4xl md:text-5xl font-display text-white text-center mb-10">
              Explore The Food
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={index}
                  className="relative aspect-square overflow-hidden rounded-lg bg-black/20 cursor-pointer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2, delay: index * 0.02 }}
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            <motion.div
              className="relative w-full max-w-5xl max-h-[85vh] aspect-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={1200}
                height={800}
                className="object-contain w-full h-full max-h-[85vh] rounded-lg"
              />
              <p className="text-white/80 text-center mt-4 text-lg">{selectedImage.alt}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  )
}

