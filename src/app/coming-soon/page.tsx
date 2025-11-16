"use client"

import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center px-4">
      <div className="w-full  min-w-lg max-w-lg">
        <DotLottieReact
          src="https://lottie.host/cb6405ad-c5f4-4f06-8008-4ae5ff6237ca/U3ipuE8F1g.lottie"
          loop
          autoplay
        />
      </div>
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          Coming Soon
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
          We&apos;re working hard to bring you the best experience on Aussie Rides.
          Stay tuned for exciting updates and new features!
        </p>
      </div>
      
    </div>
  );
}