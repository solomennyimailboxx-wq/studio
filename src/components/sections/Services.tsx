import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PaintBucket, Hammer, Wrench, ShieldCheck, Car } from 'lucide-react';

const services = [
  {
    icon: <Wrench className="h-10 w-10 text-primary" />,
    title: 'Кузовний ремонт',
    description: 'Відновлення геометрії кузова після ДТП, рихтування, зварювальні роботи будь-якої складності. Повертаємо ідеальні форми.',
  },
  {
    icon: <PaintBucket className="h-10 w-10 text-primary" />,
    title: 'Професійне фарбування',
    description: 'Повне або локальне фарбування з комп\'ютерним підбором кольору. Використовуємо преміальні матеріали для бездоганного результату.',
  },
  {
    icon: <Hammer className="h-10 w-10 text-primary" />,
    title: 'Видалення вм\'ятин (PDR)',
    description: 'Сучасна технологія безфарбового видалення вм\'ятин. Зберігаємо заводське покриття, економимо ваш час і гроші.',
  },
  {
    icon: <Car className="h-10 w-10 text-primary" />,
    title: 'Полірування та кераміка',
    description: 'Відновлювальне та захисне полірування кузова. Нанесення керамічних покриттів для дзеркального блиску та захисту від подряпин.',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-32 bg-black text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400">Що ми робимо найкраще</h2>
          <p className="mt-4 text-lg text-gray-300">
            Наш досвід та технології дозволяють надавати повний спектр послуг для відновлення і захисту вашого автомобіля.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div key={index} className="p-1 rounded-2xl bg-gradient-to-b from-primary/30 to-black hover:from-primary/50 transition-all">
                <div className="flex flex-col items-center text-center p-8 h-full rounded-[14px] bg-gray-900/90 backdrop-blur-sm">
                    <div className="mb-4 rounded-full p-4 bg-black border-2 border-primary/50">{service.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                    <p className="text-gray-400">{service.description}</p>
                </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
