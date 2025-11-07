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
import { Mail, Phone, MapPin, Send } from 'lucide-react';

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
      description: "Дякуємо! Ми зв'яжемося з вами найближчим часом.",
      className: "bg-gray-800 text-white border-primary/50",
    });
    form.reset();
  }

  return (
    <section id="contact" className="py-20 md:py-32 bg-black text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400">Зв'яжіться з нами</h2>
          <p className="mt-4 text-lg text-gray-300">
            Готові до перевтілення вашого авто? Залиште заявку, і наш менеджер зв'яжеться з вами для консультації та точного розрахунку вартості.
          </p>
        </div>
        <div className="mt-12 max-w-xl mx-auto">
            <div className="glassmorphism-form p-6 md:p-8 rounded-2xl">
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Ваше ім'я</FormLabel>
                        <FormControl>
                            <Input placeholder="Іван" {...field} />
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
                            <Input placeholder="+380 (XX) XXX-XX-XX" type="tel" {...field} />
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
                        <FormLabel>Опишіть ваше завдання (необов'язково)</FormLabel>
                        <FormControl>
                            <Textarea
                            placeholder="Наприклад: 'Toyota Camry 2018, подряпина на задньому бампері'"
                            className="resize-none"
                            {...field}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type="submit" className="w-full text-lg bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-105 transition-transform hover:shadow-[0_0_15px_hsl(var(--primary))]">
                        <Send className="mr-2 h-5 w-5" />
                        Відправити заявку
                    </Button>
                </form>
                </Form>
                <div className="mt-8 pt-6 border-t border-primary/20 space-y-4 text-sm">
                    <div className="flex items-center gap-4">
                        <Phone className="h-5 w-5 text-primary" />
                        <a href="tel:+380000000000" className="text-gray-300 hover:text-primary">+380 (00) 000-00-00</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <Mail className="h-5 w-5 text-primary" />
                        <a href="mailto:contact@odesa.auto" className="text-gray-300 hover:text-primary">contact@odesa.auto</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <MapPin className="h-5 w-5 text-primary" />
                        <span className="text-gray-300">м. Одеса, Україна</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
