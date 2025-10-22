import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    id: 'testimonial-1',
    name: 'Andriy P.',
    quote: "My car looks better than when I bought it! The attention to detail is incredible. Truly professional work. Highly recommend Odesa Auto.",
    avatarHint: 'man portrait',
  },
  {
    id: 'testimonial-2',
    name: 'Olena K.',
    quote: "They handled a complex body repair for me, and the result is seamless. You can't even tell there was damage. Fast, friendly, and fair pricing.",
    avatarHint: 'woman portrait',
  },
  {
    id: 'testimonial-3',
    name: 'Serhiy V.',
    quote: "The paint job is flawless. The color matching was perfect, and the finish is like glass. I'm extremely satisfied with the service and the outcome.",
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
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl font-headline">What Our Clients Say</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We're proud of our work, and our customers are too.
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
                    <p className="text-sm text-muted-foreground">Satisfied Customer</p>
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
