"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Image 
              src="/Group 1.png" 
              alt="Aussie Rides Logo" 
              width={40} 
              height={40} 
              className="h-8 w-8"
            />
            <Link href="/" className="ml-2 text-2xl font-bold text-gray-900">
              Aussie Rides
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Home
            </Link>
            <Link href="/vehicles" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Vehicles
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-emerald-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button className="btn btn-sm">
              Book Test Drive
            </button>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-emerald-600">
              Home
            </Link>
            <Link href="/vehicles" className="block px-3 py-2 text-gray-700 hover:text-emerald-600">
              Vehicles
            </Link>
            <Link href="/about" className="block px-3 py-2 text-gray-700 hover:text-emerald-600">
              About
            </Link>
            <Link href="/contact" className="block px-3 py-2 text-gray-700 hover:text-emerald-600">
              Contact
            </Link>
            <button className="w-full text-left btn">
              Book Test Drive
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
