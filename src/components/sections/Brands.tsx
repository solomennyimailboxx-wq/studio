import Image from 'next/image';

const brands = [
  { name: 'Audi', logo: '/logos/audi.svg' },
  { name: 'BMW', logo: '/logos/bmw.svg' },
  { name: 'Mercedes-Benz', logo: '/logos/mercedes.svg' },
  { name: 'Volkswagen', logo: '/logos/vw.svg' },
  { name: 'Toyota', logo: '/logos/toyota.svg' },
  { name: 'Lexus', logo: '/logos/lexus.svg' },
  { name: 'Porsche', logo: '/logos/porsche.svg' },
  { name: 'Honda', logo: '/logos/honda.svg' },
];

export default function Brands() {
  return (
    <div className="py-16 bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <h3 className="text-center text-lg font-semibold text-gray-400 tracking-wider">ПРАЦЮЄМО З УСІМА ВІДОМИМИ МАРКАМИ АВТО</h3>
        <div className="mt-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10"></div>
          <div className="w-full overflow-hidden">
            <div className="flex animate-shine">
              {[...brands, ...brands].map((brand, index) => (
                <div key={index} className="flex-shrink-0 mx-8 flex items-center justify-center h-16 w-32 grayscale hover:grayscale-0 transition-all duration-300">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={100}
                    height={50}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
