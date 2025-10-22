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
          title: "File too large",
          description: "Please upload an image smaller than 4MB.",
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
      toast({ variant: "destructive", title: "No image uploaded", description: "Please upload a photo of your car." });
      return;
    }
    if (!customization.trim()) {
      toast({ variant: "destructive", title: "No customization described", description: "Please describe the change you want to see." });
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
        console.error("AI Visualization failed:", error);
        toast({
          variant: "destructive",
          title: "Visualization Failed",
          description: "Something went wrong. Please try again.",
        });
      }
    });
  };

  return (
    <section id="visualizer" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl font-headline">AI-Powered Visualizer</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Upload a photo of your car and see your ideas come to life.
          </p>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>1. Upload & Describe</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="car-photo" className="font-medium">Car Photo</label>
                <div className="flex items-center gap-4">
                  <label htmlFor="car-photo" className="flex-1">
                    <Input id="car-photo" type="file" accept="image/*" onChange={handleFileChange} className="cursor-pointer" />
                  </label>
                  <Upload className="h-6 w-6 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="customization-desc" className="font-medium">Customization Description</label>
                <Textarea
                  id="customization-desc"
                  placeholder="e.g., 'Paint the car glossy black', 'Remove the dent on the front bumper'"
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
                Visualize
              </Button>
            </CardContent>
          </Card>
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>2. See the Result</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col items-center gap-2">
                <h3 className="font-semibold">Original</h3>
                <div className="aspect-video w-full overflow-hidden rounded-lg border">
                  <Image
                    src={originalImageFile ? URL.createObjectURL(originalImageFile) : (placeholder?.imageUrl || '')}
                    alt="Original car"
                    width={600}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
               <div className="flex flex-col items-center gap-2">
                <h3 className="font-semibold">Visualized</h3>
                <div className="aspect-video w-full overflow-hidden rounded-lg border bg-muted/50 flex items-center justify-center">
                  {isPending ? (
                     <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  ) : visualizedImage ? (
                    <Image
                      src={visualizedImage}
                      alt="Visualized car customization"
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
