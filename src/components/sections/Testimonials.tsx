import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    id: 'testimonial-1',
    name: 'Андрій П.',
    quote: "Моя машина виглядає краще, ніж коли я її купив! Увага до деталей неймовірна. Справжня професійна робота. Дуже рекомендую Odesa Auto.",
    avatarHint: 'man portrait',
  },
  {
    id: 'testimonial-2',
    name: 'Олена К.',
    quote: "Вони виконали для мене складний кузовний ремонт, і результат бездоганний. Навіть не скажеш, що було пошкодження. Швидко, дружелюбно та за справедливою ціною.",
    avatarHint: 'woman portrait',
  },
  {
    id: 'testimonial-3',
    name: 'Сергій В.',
    quote: "Фарбування бездоганне. Підбір кольору був ідеальним, а покриття - як скло. Я надзвичайно задоволений сервісом та результатом.",
    avatarHint: 'person smiling',
  },
];

export default function Testimonials() {
  const testimonialsWithImages = testimonials.map(t => ({
    ...t,
    image: PlaceHolderImages.find(p => p.id === t.id)
  }));

  return (
    <section id="testimonials" className="py-20 md:py-32 bg-muted">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl font-headline">Що кажуть наші клієнти</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Ми пишаємося своєю роботою, і наші клієнти теж.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          {testimonialsWithImages.map((testimonial) => (
            <Card key={testimonial.id} className="flex flex-col">
              <CardContent className="flex flex-1 flex-col justify-between p-6">
                 <Quote className="h-8 w-8 text-primary/50 mb-4" />
                <p className="flex-1 text-muted-foreground">"{testimonial.quote}"</p>
                <div className="mt-6 flex items-center gap-4">
                  <Avatar>
                    {testimonial.image && (
                      <AvatarImage src={testimonial.image.imageUrl} alt={testimonial.name} data-ai-hint={testimonial.avatarHint} />
                    )}
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">Задоволений клієнт</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
