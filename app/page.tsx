import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Features from '@/components/sections/Features'
import Reservations from '@/components/sections/Reservations'
import Reviews from '@/components/sections/Reviews'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <Reviews />
      <Reservations />
      <Footer />
    </main>
  )
}