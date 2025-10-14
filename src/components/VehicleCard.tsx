import Image from "next/image";

export default function VehicleCard(props: {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string;
  transmission: string;
  images: string[];
  is_featured?: boolean;
  is_rental?: boolean;
  is_sale?: boolean;
  features?: string[];
}) {
  const formatPrice = (price: number) => {
    return `From $${price.toLocaleString()}`;
  };

  return (
    <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
      <div className="relative h-48 bg-gray-100">
        <Image 
          src={props.images[0] || "/next.svg"} 
          alt={`${props.make} ${props.model}`} 
          fill 
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {props.is_featured && (
          <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Featured
          </div>
        )}
        {props.is_rental && (
          <div className="absolute bottom-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Available for Rent
          </div>
        )}
        {props.is_sale && (
          <div className="absolute bottom-4 right-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            For Sale
          </div>
        )}
        <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
          {props.year}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{props.make} {props.model}</h3>
            <p className="text-emerald-600 font-medium">Luxury SUV</p>
          </div>
          <span className="text-2xl font-bold text-emerald-600">{formatPrice(props.price)}</span>
        </div>
        
        {props.features && (
          <div className="grid grid-cols-2 gap-2 mb-4">
            {props.features.map((feature, index) => (
              <span key={index} className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                {feature}
              </span>
            ))}
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {props.mileage === 0 ? 'New' : `${props.mileage.toLocaleString()} km`}
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            {props.fuel}
          </div>
        </div>
        
        <div className="flex gap-2">
          <button className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors">
            View Details
          </button>
          <button className="flex-1 border border-emerald-600 text-emerald-600 py-2 px-4 rounded-lg hover:bg-emerald-50 transition-colors">
            Test Drive
          </button>
        </div>
      </div>
    </article>
  );
}
