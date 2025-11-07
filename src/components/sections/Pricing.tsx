import { CheckCircle } from 'lucide-react';

const pricingTiers = [
  {
    name: 'Локальне фарбування',
    price: 'від $150',
    description: 'Ідеально для усунення подряпин та невеликих пошкоджень на одній деталі.',
    features: [
      'Комп\'ютерний підбір кольору',
      'Фарбування однієї деталі (бампер, крило)',
      'Локальне полірування зони ремонту',
    ],
  },
  {
    name: 'Повне фарбування',
    price: 'від $2500',
    description: 'Для повної зміни кольору або відновлення всього кузова.',
    features: [
      'Повне розбирання та збирання авто',
      'Усунення дрібних дефектів кузова',
      '3 шари лаку для максимального блиску',
      'Повне полірування всього автомобіля',
    ],
    isFeatured: true,
  },
  {
    name: 'PDR (Видалення вм\'ятин)',
    price: 'від $50',
    description: 'Швидке та ефективне видалення вм\'ятин без пошкодження фарби.',
    features: [
      'Збереження заводського ЛФП',
      'Ремонт вм\'ятин від граду, паркування',
      'Тривалість робіт від 30 хвилин',
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-32 bg-black text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400">Прозорі ціни — чесний результат</h2>
          <p className="mt-4 text-lg text-gray-300">
            Ми пропонуємо зрозумілі тарифи на наші послуги. Нижче наведено орієнтовний прайс. Точна вартість розраховується індивідуально після огляду.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-4 lg:gap-8">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl p-1 ${tier.isFeatured ? 'bg-gradient-to-b from-primary to-primary/50' : 'bg-gray-800'}`}
            >
              <div className="flex h-full flex-col rounded-[15px] bg-gray-900 p-8">
                <h3 className="text-2xl font-bold text-white">{tier.name}</h3>
                <p className="mt-4 text-4xl font-bold tracking-tighter text-white">
                  {tier.price}
                </p>
                <p className="mt-2 text-gray-400">{tier.description}</p>
                <ul className="mt-6 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
