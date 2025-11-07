import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-car');

  return (
    <section className="relative h-screen min-h-[700px] w-full flex items-center justify-center">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          data-ai-hint={heroImage.imageHint}
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/80" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black" />
      
      <div className="relative z-10 flex flex-col items-center text-center text-white px-4">
        <div className="bg-black/30 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <h1 className="font-bold tracking-tighter text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="block">Мистецтво кузовного ремонту</span>
                <span className="block text-primary text-3xl sm:text-4xl md:text-5xl mt-2 md:mt-4 drop-shadow-[0_0_8px_hsl(var(--primary))]">в Одесі</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-200 md:text-xl">
                Повертаємо вашому авто заводський вигляд та ідеальний блиск. Професійне фарбування, рихтування та видалення вм'ятин з гарантією якості.
            </p>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="w-full sm:w-auto text-lg bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-105 transition-transform hover:shadow-[0_0_15px_hsl(var(--primary))]">
              <Link href="#calculator">
                Розрахувати вартість
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto text-lg border-white/50 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm">
              <Link href="#services">
                Наші послуги
              </Link>
            </Button>
        </div>
      </div>
      <div className="absolute bottom-10 z-10">
        <Link href="#services" aria-label="Дізнатись більше">
            <ArrowDown className="h-8 w-8 text-white/50 animate-bounce"/>
        </Link>
      </div>
    </section>
  );
}
