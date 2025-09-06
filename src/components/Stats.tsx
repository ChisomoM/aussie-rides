import { Check, Shield, Clock, Headphones } from 'lucide-react';

export default function Stats() {
  const stats = [
    {
      icon: Check,
      value: "100%+",
      label: "Customer Satisfaction"
    },
    {
      icon: Shield,
      value: "98%",
      label: "Quality Guarantee"
    },
    {
      icon: Clock,
      value: "<24 Hrs",
      label: "Fast Response"
    },
    {
      icon: Headphones,
      value: "24/7",
      label: "Customer Support"
    }
  ];

  return (
    <section className="text-white py-16 relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #323b4b 0%, #205f4f 100%)'
    }}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-emerald-500/20 to-transparent"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center space-y-4 group">
                <div className="flex justify-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white shadow-xl transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl">
                    <IconComponent className="w-6 h-6" strokeWidth={2} />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-emerald-400 tracking-tight">{stat.value}</div>
                  <div className="text-slate-300 text-base font-medium">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
