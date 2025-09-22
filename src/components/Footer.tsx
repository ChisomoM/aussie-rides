"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
         <Image
         src= {"/images/logos/Logo-v1.png"}
         width={0}
         height={0}
        // className="h-8 sm:h-12 md:h-12 w-auto object-contain max-w-[150px] sm:max-w-[180px] md:max-w-[220px]"
         className="h-8 sm:h-8 md:h-8 w-auto object-contain max-w-[150px] sm:max-w-[180px] md:max-w-[220px]"
         alt="Aussie Rides Logo"
         unoptimized
         ></Image>
            </div>
            <p className="text-gray-400 mb-4">Zambia&apos;s premier destination for luxury vehicles. Experience affordable luxury with exceptional service.</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-emerald-400 transition-colors">Home</Link></li>
              <li><Link href="/vehicles" className="text-gray-400 hover:text-emerald-400 transition-colors">Vehicles</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-emerald-400 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-emerald-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Car Sales</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Car Rentals</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Financing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Trade-ins</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2">
              <p className="text-gray-400 flex items-center">
                <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Great East Road, Lusaka, Zambia
              </p>
              <p className="text-gray-400 flex items-center">
                <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                +260 XXX XXX XXX
              </p>
              <p className="text-gray-400 flex items-center">
                <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                info@aussierides.com
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Aussie Rides. All rights reserved. | Bringing affordable luxury to Zambia.</p>
        </div>
      </div>
    </footer>
  );
}
