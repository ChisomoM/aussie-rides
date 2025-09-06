import Image from "next/image";

export default function ComprehensiveSolutions() {
  const solutions = [
    {
      title: "Luxury Vehicle Acquisition",
      description: "Discover exclusive premium vehicles from our distinguished fleet. Each vehicle undergoes rigorous inspection to ensure the pinnacle of luxury standards and prestigious ownership for discerning clients.",
      features: [
        "Premium vehicle inspection and certification",
        "Exclusive sourcing and luxury standards",
        "Bespoke financing and leasing solutions",
        "White-glove delivery and handover experience"
      ],
      image: "/next.svg",
      buttonText: "Explore Collection",
      buttonStyle: "bg-emerald-500 text-white hover:bg-emerald-600"
    },
    {
      title: "Executive Vehicle Rentals", 
      description: "Premium short-term luxury vehicle solutions for executives, special occasions, and distinguished guests seeking the finest automotive experiences for their lifestyle and business needs.",
      features: [
        "Flexible rental terms and premium packages",
        "Concierge and white-glove delivery services",
        "Corporate and executive vehicle programs",
        "Insurance and comprehensive coverage options"
      ],
      image: "/next.svg",
      buttonText: "Reserve Now",
      buttonStyle: "border border-gray-300 text-gray-700 hover:bg-gray-50"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="text-emerald-500 text-sm font-semibold mb-2 uppercase tracking-wider">
            Premium Services
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Comprehensive Luxury Solutions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tailored automotive excellence designed to exceed expectations and fulfill 
            your lifestyle and business needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {solutions.map((solution, index) => (
            <div key={index} className="bg-gray-50 rounded-xl overflow-hidden">
              <div className="h-64 relative">
                <Image
                  src={solution.image}
                  alt={solution.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{solution.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{solution.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {solution.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`px-6 py-3 rounded-lg transition-colors ${solution.buttonStyle}`}>
                  {solution.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
