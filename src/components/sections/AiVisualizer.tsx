"use client";

import { useState, useTransition } from 'react';
import Image from 'next/image';
import { aiPoweredVisualizer } from '@/ai/flows/ai-powered-visualizer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Sparkles, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AiVisualizer() {
  const [photoDataUri, setPhotoDataUri] = useState<string | null>(null);
  const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
  const [customization, setCustomization] = useState<string>('');
  const [visualizedImage, setVisualizedImage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const placeholder = PlaceHolderImages.find(p => p.id === 'user-car-placeholder');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        toast({
          variant: "destructive",
          title: "Файл занадто великий",
          description: "Будь ласка, завантажте зображення розміром менше 4 МБ.",
        });
        return;
      }
      setOriginalImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoDataUri(reader.result as string);
        setVisualizedImage(null); // Clear previous visualization
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVisualize = () => {
    if (!photoDataUri) {
      toast({ variant: "destructive", title: "Зображення не завантажено", description: "Будь ласка, завантажте фото вашого авто." });
      return;
    }
    if (!customization.trim()) {
      toast({ variant: "destructive", title: "Не описано кастомізацію", description: "Будь ласка, опишіть зміни, які ви хочете побачити." });
      return;
    }

    startTransition(async () => {
      try {
        const result = await aiPoweredVisualizer({
          photoDataUri: photoDataUri,
          customizationDescription: customization,
        });
        setVisualizedImage(result.visualizedImage);
      } catch (error) {
        console.error("Помилка візуалізації ШІ:", error);
        toast({
          variant: "destructive",
          title: "Помилка візуалізації",
          description: "Щось пішло не так. Будь ласка, спробуйте ще раз.",
        });
      }
    });
  };

  return (
    <section id="visualizer" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl font-headline">ШІ-візуалізатор</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Завантажте фото свого авто та втілюйте свої ідеї в життя.
          </p>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>1. Завантажте та опишіть</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="car-photo" className="font-medium">Фото авто</label>
                <div className="flex items-center gap-4">
                  <label htmlFor="car-photo" className="flex-1">
                    <Input id="car-photo" type="file" accept="image/*" onChange={handleFileChange} className="cursor-pointer" />
                  </label>
                  <Upload className="h-6 w-6 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="customization-desc" className="font-medium">Опис кастомізації</label>
                <Textarea
                  id="customization-desc"
                  placeholder="напр., 'Пофарбувати машину в глянсовий чорний', 'Прибрати вм'ятину на передньому бампері'"
                  value={customization}
                  onChange={(e) => setCustomization(e.target.value)}
                  rows={3}
                />
              </div>
              <Button onClick={handleVisualize} disabled={isPending} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Візуалізувати
              </Button>
            </CardContent>
          </Card>
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>2. Перегляньте результат</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col items-center gap-2">
                <h3 className="font-semibold">Оригінал</h3>
                <div className="aspect-video w-full overflow-hidden rounded-lg border">
                  <Image
                    src={originalImageFile ? URL.createObjectURL(originalImageFile) : (placeholder?.imageUrl || '')}
                    alt="Оригінальне авто"
                    width={600}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
               <div className="flex flex-col items-center gap-2">
                <h3 className="font-semibold">Візуалізація</h3>
                <div className="aspect-video w-full overflow-hidden rounded-lg border bg-muted/50 flex items-center justify-center">
                  {isPending ? (
                     <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  ) : visualizedImage ? (
                    <Image
                      src={visualizedImage}
                      alt="Візуалізована кастомізація авто"
                      width={600}
                      height={400}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Sparkles className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
