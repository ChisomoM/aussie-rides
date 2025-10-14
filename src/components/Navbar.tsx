"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useAuth } from '@/lib/auth-context';
import dynamic from 'next/dynamic';

const AuthForm = dynamic(() => import('@/components/AuthForm'), { ssr: false });
import { useRouter } from 'next/navigation';


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Auth state (if AuthProvider is present)
  let user = null as unknown as { displayName?: string | null; email?: string | null; photoURL?: string | null } | null;
  let signOut = async () => {};
  try {
  const authCtx = useAuth();
  const u = authCtx.user as unknown;
  if (u && typeof u === 'object') user = u as { displayName?: string | null; email?: string | null; photoURL?: string | null };
    signOut = authCtx.signOut;
  } catch {
    // no-op: AuthProvider not mounted
  }
  const router = useRouter();
  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

  // Dropdown state & refs for accessibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const avatarButtonRef = useRef<HTMLButtonElement | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (!isDropdownOpen) return;
      if (!dropdownRef.current) return;
      if (dropdownRef.current.contains(e.target as Node)) return;
      setIsDropdownOpen(false);
    }

    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsDropdownOpen(false);
    }

    window.addEventListener('mousedown', handleOutside);
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('mousedown', handleOutside);
      window.removeEventListener('keydown', handleKey);
    };
  }, [isDropdownOpen]);

  return (
  <header className="bg-white text-gray-900 shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
     
            <Link href="/">
            <Image 
              src="/images/logos/Logo-v2.png" 
              alt="Aussie Rides Logo" 
              width={0} 
              height={0} 
     className="h-8 sm:h-8 md:h-8 w-auto object-contain max-w-[150px] sm:max-w-[180px] md:max-w-[220px]"
              priority
              unoptimized
            />
            </Link>
         
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/#home" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Home
            </Link>
            <Link href="/vehicles" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Vehicles
            </Link>
            <Link href="/#about" className="text-gray-700 hover:text-emerald-600 transition-colors">
              About
            </Link>
            <Link href="/#contact" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Contact
            </Link>
            {user && (
              <Link href="/dashboard" className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">
                Dashboard
              </Link>
            )}
          </nav>

          {user ? (
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <button
                  ref={avatarButtonRef}
                  onClick={() => setIsDropdownOpen((s) => !s)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setIsDropdownOpen((s) => !s);
                    }
                  }}
                  className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
                  aria-haspopup="true"
                  aria-expanded={isDropdownOpen}
                >
                  <Image src={(user.photoURL as string) || '/next.svg'} alt="avatar" width={32} height={32} className="rounded-full" />
                  <span className="text-sm">{user.displayName || user.email?.split('@')[0]}</span>
                </button>
                {isDropdownOpen && (
                  <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg py-1 text-gray-800 z-50" role="menu">
                    <Link href="/dashboard" className="block px-3 py-2 text-sm text-gray-800 hover:bg-gray-50">Dashboard</Link>
                    <Link href="/profile" className="block px-3 py-2 text-sm text-gray-800 hover:bg-gray-50">Profile</Link>
                    <Link href="/settings" className="block px-3 py-2 text-sm text-gray-800 hover:bg-gray-50">Settings</Link>
                    <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-sm text-gray-800 hover:bg-gray-50">Logout</button>
                  </div>
                )}
              </div>
            </div>
          ) : null}

          {/* Right aligned primary action (only when NOT logged in) */}
          {!user && (
            <div className="hidden md:flex items-center ml-6">
              <Link href="/#contact" className="btn btn-sm">
                Enquire Now
              </Link>
              {/* <button
                onClick={() => setShowLoginModal(true)}
                className="ml-4 px-4 py-2 rounded bg-transparent text-gray-800 border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                Login
              </button> */}
            </div>
          )}
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
  <div className="md:hidden bg-white border-t text-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/#home" className="block px-3 py-2 text-gray-700 hover:text-emerald-600">
              Home
            </Link>
            <Link href="/vehicles" className="block px-3 py-2 text-gray-700 hover:text-emerald-600">
              Vehicles
            </Link>
            <Link href="/#about" className="block px-3 py-2 text-gray-700 hover:text-emerald-600">
              About
            </Link>
            <Link href="/#contact" className="block px-3 py-2 text-gray-700 hover:text-emerald-600">
              Contact
            </Link>
            {user && (
              <Link href="/dashboard" className="block px-3 py-2 text-emerald-600 font-semibold hover:text-emerald-700">
                Dashboard
              </Link>
            )}
            {!user && (
              <div>
                <Link href="/#contact" className="w-full text-left btn block mb-2">
                  Enquire Now
                </Link>
                <button onClick={() => { setShowLoginModal(true); setIsMenuOpen(false); }} className="w-full text-left btn">
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {showLoginModal && <AuthForm onClose={() => setShowLoginModal(false)} />}
    </header>
  );
}
