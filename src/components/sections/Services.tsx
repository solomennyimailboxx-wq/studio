import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PaintBucket, Hammer, Wrench } from 'lucide-react';

const services = [
  {
    icon: <Wrench className="h-10 w-10 text-primary" />,
    title: 'Кузовні роботи',
    description: 'Від дрібних подряпин до серйозних пошкоджень після ДТП, ми відновлюємо кузов вашого автомобіля до початкового стану з точністю та турботою.',
  },
  {
    icon: <PaintBucket className="h-10 w-10 text-primary" />,
    title: 'Фарбування',
    description: 'Використовуючи високоякісні матеріали та передові технології, ми забезпечуємо бездоганне фарбування, підбір кольору та індивідуальне оздоблення.',
  },
  {
    icon: <Hammer className="h-10 w-10 text-primary" />,
    title: 'Видалення вм\'ятин',
    description: 'Наша послуга безфарбового видалення вм\'ятин (PDR) ефективно усуває вм\'ятини та пошкодження, зберігаючи заводське покриття вашого авто.',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl font-headline">Наша експертиза</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Ми пропонуємо повний спектр послуг для задоволення всіх потреб вашого авто.
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
