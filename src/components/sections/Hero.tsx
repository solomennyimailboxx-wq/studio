import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-car');

  return (
    <section className="relative h-[80vh] min-h-[500px] w-full">
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
      <div className="relative z-10 flex h-full items-center justify-center text-center">
        <div className="container mx-auto px-4 text-white">
          <div className="md:glassmorphism rounded-xl md:p-12">
            <h1 className="font-headline text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Досконалість у кожній деталі.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/90 md:text-xl">
              Експертні послуги з кузовного ремонту та фарбування в Одесі. Ми повертаємо ваше авто до життя.
            </p>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="#contact">
                Записатися на прийом
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground text-primary-foreground bg-transparent hover:bg-primary-foreground/10">
              <Link href="#gallery">
                Дивитися наші роботи <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
