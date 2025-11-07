import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';

const projects = [
  { beforeId: 'before-1', afterId: 'after-1', title: 'Відновлення крила' },
  { beforeId: 'before-2', afterId: 'after-2', title: 'Повне перефарбування' },
  { beforeId: 'before-3', afterId: 'after-3', title: 'Ремонт бампера' },
];

export default function Gallery() {
  const projectImages = projects.map(p => ({
    ...p,
    beforeImage: PlaceHolderImages.find(img => img.id === p.beforeId),
    afterImage: PlaceHolderImages.find(img => img.id === p.afterId),
  }));

  return (
    <section id="gallery" className="py-20 md:py-32 bg-muted">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl font-headline">Доведені результати</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Слова – це добре, але фотографії краще. Подивіться на перетворення, які ми виконали.
          </p>
        </div>
        <div className="mt-12">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {projectImages.map((project, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="grid grid-cols-2">
                          <div className="relative">
                            {project.beforeImage && (
                              <Image
                                src={project.beforeImage.imageUrl}
                                alt={`До: ${project.title}`}
                                width={600}
                                height={400}
                                className="aspect-video object-cover"
                                data-ai-hint={project.beforeImage.imageHint}
                              />
                            )}
                             <Badge variant="destructive" className="absolute top-2 left-2">До</Badge>
                          </div>
                          <div className="relative">
                            {project.afterImage && (
                              <Image
                                src={project.afterImage.imageUrl}
                                alt={`Після: ${project.title}`}
                                width={600}
                                height={400}
                                className="aspect-video object-cover"
                                data-ai-hint={project.afterImage.imageHint}
                              />
                            )}
                             <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">Після</Badge>
                          </div>
                        </div>
                         <div className="p-4">
                          <h3 className="font-semibold">{project.title}</h3>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-14" />
            <CarouselNext className="mr-14" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
