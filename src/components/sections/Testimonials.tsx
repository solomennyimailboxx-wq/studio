import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    id: 'testimonial-1',
    name: 'Андрій П.',
    car: 'Volkswagen Passat',
    quote: "Ремонтував крило і бампер після невеликого ДТП. Зробили ідеально! Колір підібрали один в один, зазори як на заводі. Машина виглядає новою. Дуже рекомендую Odesa Auto!",
    avatarHint: 'man portrait',
  },
  {
    id: 'testimonial-2',
    name: 'Олена К.',
    car: 'Mazda 6',
    quote: "Після граду на даху та капоті було безліч вм'ятин. Майстри за допомогою PDR все вирівняли без фарбування! Я в захваті від технології та професіоналізму команди.",
    avatarHint: 'woman portrait',
  },
  {
    id: 'testimonial-3',
    name: 'Сергій В.',
    car: 'BMW X5',
    quote: "Замовляв повне полірування та нанесення кераміки. Результат перевершив очікування. Глибокий колір, неймовірний блиск. Машина ніби щойно з салону. Дякую!",
    avatarHint: 'person smiling',
  },
];

export default function Testimonials() {
  const testimonialsWithImages = testimonials.map(t => ({
    ...t,
    image: PlaceHolderImages.find(p => p.id === t.id)
  }));

  return (
    <section id="testimonials" className="py-20 md:py-32 bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">Нам довіряють найцінніше</h2>
          <p className="mt-4 text-lg text-gray-300">
            Ми пишаємося своєю репутацією. Але найкраще про нашу роботу говорять відгуки задоволених клієнтів.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          {testimonialsWithImages.map((testimonial) => (
            <div key={testimonial.id} className="glassmorphism-card p-8 rounded-2xl flex flex-col">
              <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />)}
              </div>
              <p className="flex-1 text-gray-300 italic">"{testimonial.quote}"</p>
              <div className="mt-6 flex items-center gap-4 pt-6 border-t border-primary/20">
                <Avatar className="h-12 w-12 border-2 border-primary/50">
                  {testimonial.image && (
                    <AvatarImage src={testimonial.image.imageUrl} alt={testimonial.name} data-ai-hint={testimonial.avatarHint} />
                  )}
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.car}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
