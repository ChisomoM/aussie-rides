import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative text-white overflow-hidden" style={{
      background: 'linear-gradient(135deg, #121b2d 0%, #0d433b 100%)'
    }}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-emerald-500/20 to-transparent"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Premium Luxury
                <br />
                <span className="text-emerald-300">Vehicles</span>
                <br />
                <span className="text-3xl lg:text-4xl text-emerald-100 font-normal">in Zambia</span>
              </h1>
              <p className="text-xl text-emerald-100 max-w-lg leading-relaxed">
                Experience affordable luxury with Zambia&apos;s premier car dealership. From sleek GWM models to world-class luxury vehicles, we bring you exceptional quality and unmatched customer service.
              </p>
            </div>

            {/* Premium Certified Badge */}
            {/* <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-4 w-fit">
              <div className="w-12 h-12 bg-emerald-400 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-900" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-emerald-300">Premium Quality</div>
                <div className="text-sm text-emerald-100">Certified Excellence</div>
              </div>
            </div> */}

            <div className="flex gap-4 flex-wrap">
              <Link
                href="/vehicles"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center"
              >
                Browse Cars
                <svg className="ml-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link 
                href="/contact" 
                className="border-2 border-emerald-300 text-emerald-300 hover:bg-emerald-300 hover:text-emerald-900 font-semibold px-8 py-4 rounded-lg transition-colors"
              >
                Book Test Drive
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative">
              <Image 
                src="/images/hero/gwm-p-series-white-exterior-front.jpeg" 
                alt="Luxury car showcase" 
                width={600} 
                height={400} 
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
                priority
              />
              {/* Overlay badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center">
                  <svg className="h-8 w-8 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div className="ml-3">
                    <p className="font-semibold text-gray-900">Premium Quality</p>
                    <p className="text-sm text-gray-600">Certified Excellence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
