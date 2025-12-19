import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-charcoal-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-4 gap-12 items-start">
          {/* Brand */}
          <div>
            <div className="mb-4 -mt-2 -ml-2">
              <Image
                src="/images/miss-gogi-logo-full.jpg"
                alt="Miss Gogi Logo"
                width={300}
                height={200}
                className="w-[200px] h-auto object-contain"
              />
            </div>
            <p className="text-smoke-300 text-base leading-relaxed">
              Miss Gogi is a Korean BBQ restaurant located in Doraville, GA where you can enjoy traditional Korean barbecue cooked on tabletop grills and served with banchan accompaniments.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-3xl font-display text-smoke-100 mb-6">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', href: '/' },
                { label: 'About', href: '/about' },
                { label: 'Menu', href: '/menu' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-smoke-300 hover:text-ember-500 transition-colors text-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-3xl font-display text-smoke-100 mb-6">Hours</h4>
            <div className="space-y-4">
              <div>
                <p className="text-smoke-300">Mon-Thu: 11:30am - 10:00pm</p>
                <p className="text-smoke-300">Fri-Sun: 11:30am - 10:30pm</p>
                <p className="text-smoke-300 italic">Kitchen Closes 30 Minutes Before</p>
              </div>
            </div>
          </div>

          {/* Find Us */}
          <div>
            <h4 className="text-3xl font-display text-smoke-100 mb-6">Find Us</h4>
            <div className="space-y-3">
              <p className="text-smoke-300 flex items-start gap-2">
                <MapPin size={16} className="text-ember-500 flex-shrink-0 mt-1" />
                <span>
                  6035 Peachtree Rd Ste C115,
                  <br />
                  Doraville, GA 30360
                </span>
              </p>
              <p className="text-smoke-300 flex items-center gap-2">
                <Phone size={16} className="text-ember-500" />
                <a href="tel:7702203003" className="hover:text-ember-500 transition-colors">
                  (770) 220-3003
                </a>
              </p>
              <p className="text-smoke-300 flex items-center gap-2">
                <Mail size={16} className="text-ember-500" />
                <a
                  href="mailto:missgogibbq1@gmail.com"
                  className="hover:text-ember-500 transition-colors"
                >
                  missgogibbq1@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-charcoal-800 mt-8 pt-6 text-center text-smoke-400 text-sm">
          <p>© {new Date().getFullYear()} Miss Gogi Korean BBQ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}