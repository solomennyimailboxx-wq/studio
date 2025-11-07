"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import LocationMap from "./LocationMap";
import { Mail, Phone, MapPin } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Ім'я повинно містити принаймні 2 символи.",
  }),
  phone: z.string().min(10, {
    message: "Будь ласка, введіть дійсний номер телефону.",
  }),
  message: z.string().min(10, {
    message: "Повідомлення повинно містити принаймні 10 символів.",
  }).max(500, {
    message: "Повідомлення не повинно перевищувати 500 символів."
  }),
});

export default function Contact() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Тут ви зазвичай надсилаєте дані на свій бекенд
    toast({
      title: "Заявку надіслано!",
      description: "Дякуємо за ваше повідомлення. Ми зв'яжемося з вами найближчим часом.",
    });
    form.reset();
  }

  return (
    <section id="contact" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl font-headline">Зв'яжіться з нами</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Готові до перевтілення? Зв'яжіться з нами для розрахунку вартості або запису на прийом.
          </p>
        </div>
        <div className="mt-12 grid gap-12 lg:grid-cols-2">
            <div className="space-y-8">
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Ваше ім'я</FormLabel>
                        <FormControl>
                            <Input placeholder="Іван Петров" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Номер телефону</FormLabel>
                        <FormControl>
                            <Input placeholder="+380 (XX) XXX-XX-XX" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Чим можемо допомогти?</FormLabel>
                        <FormControl>
                            <Textarea
                            placeholder="Розкажіть нам про своє авто та потрібну послугу..."
                            className="resize-none"
                            {...field}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Записатися на прийом</Button>
                </form>
                </Form>
                <div className="space-y-4 text-sm">
                    <div className="flex items-center gap-4">
                        <Phone className="h-5 w-5 text-primary" />
                        <a href="tel:+380000000000" className="text-muted-foreground hover:text-primary">+380 (00) 000-00-00</a>
                    </div>
                     <div className="flex items-center gap-4">
                        <Mail className="h-5 w-5 text-primary" />
                        <a href="mailto:contact@odesa.auto" className="text-muted-foreground hover:text-primary">contact@odesa.auto</a>
                    </div>
                     <div className="flex items-center gap-4">
                        <MapPin className="h-5 w-5 text-primary" />
                        <span className="text-muted-foreground">Одеса, Україна</span>
                    </div>
                </div>
            </div>
            <div className="overflow-hidden rounded-lg">
                <LocationMap />
            </div>
        </div>
      </div>
    </section>
  );
}
