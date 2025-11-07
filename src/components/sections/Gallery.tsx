import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const projects = [
  { beforeId: 'before-1', afterId: 'after-1', title: 'Відновлення крила', description: 'Повне усунення глибокої вм\'ятини та відновлення геометрії.' },
  { beforeId: 'before-2', afterId: 'after-2', title: 'Повне перефарбування', description: 'Перефарбування з вицвілого червоного у глибокий чорний металік.' },
  { beforeId: 'before-3', afterId: 'after-3', title: 'Ремонт бампера', description: 'Ремонт тріщин та подряпин з ідеальним підбором кольору.' },
  { beforeId: 'before-4', afterId: 'after-4', title: 'Полірування кузова', description: 'Відновлення блиску та захист лакофарбового покриття.' },
];

export default function Gallery() {
  const projectImages = projects.map(p => ({
    ...p,
    beforeImage: PlaceHolderImages.find(img => img.id === p.beforeId),
    afterImage: PlaceHolderImages.find(img => img.id === p.afterId),
  }));

  return (
    <section id="gallery" className="py-20 md:py-32 bg-gray-900/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">Перетворення, що говорять самі за себе</h2>
          <p className="mt-4 text-lg text-gray-300">
            Ми не просто ремонтуємо автомобілі — ми повертаємо їм душу. Подивіться на магію, яку творять наші майстри.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectImages.map((project, index) => (
            <Card key={index} className="overflow-hidden bg-gray-900 border border-primary/20 shadow-lg rounded-2xl group">
              <CardContent className="p-0">
                <div className="grid grid-cols-2 relative">
                   <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center border-2 border-primary z-10 text-primary font-bold text-lg group-hover:scale-125 transition-transform">
                            vs
                        </div>
                    </div>
                  <div className="relative aspect-[4/3]">
                    {project.beforeImage && (
                      <Image
                        src={project.beforeImage.imageUrl}
                        alt={`До: ${project.title}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        data-ai-hint={project.beforeImage.imageHint}
                      />
                    )}
                     <Badge variant="destructive" className="absolute top-2 left-2 z-20">До</Badge>
                  </div>
                  <div className="relative aspect-[4/3]">
                    {project.afterImage && (
                      <Image
                        src={project.afterImage.imageUrl}
                        alt={`Після: ${project.title}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        data-ai-hint={project.afterImage.imageHint}
                      />
                    )}
                     <Badge className="absolute top-2 right-2 z-20 bg-primary text-primary-foreground">Після</Badge>
                  </div>
                </div>
                 <div className="p-6 bg-black">
                  <h3 className="font-semibold text-xl text-white">{project.title}</h3>
                  <p className="text-gray-400 mt-1">{project.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
