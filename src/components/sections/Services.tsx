import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PaintBucket, Hammer, Wrench } from 'lucide-react';

const services = [
  {
    icon: <Wrench className="h-10 w-10 text-primary" />,
    title: 'Bodywork',
    description: 'From minor scratches to major collision damage, we restore your vehicle\'s body to its original condition with precision and care.',
  },
  {
    icon: <PaintBucket className="h-10 w-10 text-primary" />,
    title: 'Painting',
    description: 'Using high-quality materials and advanced techniques, we provide flawless paint jobs, color matching, and custom finishes.',
  },
  {
    icon: <Hammer className="h-10 w-10 text-primary" />,
    title: 'Dent Repair',
    description: 'Our paintless dent repair (PDR) service removes dents and dings efficiently, preserving your car\'s factory finish.',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl font-headline">Our Expertise</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We offer a comprehensive range of services to meet all your auto body needs.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <Card key={index} className="flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader className="items-center">
                <div className="mb-4 rounded-full bg-primary/10 p-4">{service.icon}</div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
