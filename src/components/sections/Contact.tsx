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
    message: "Name must be at least 2 characters.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }).max(500, {
    message: "Message must not exceed 500 characters."
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
    // Here you would typically send the data to your backend
    toast({
      title: "Appointment Requested!",
      description: "Thank you for your message. We will contact you shortly.",
    });
    form.reset();
  }

  return (
    <section id="contact" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl font-headline">Get in Touch</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Ready for a transformation? Contact us for a quote or to book an appointment.
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
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                            <Input placeholder="John Doe" {...field} />
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
                        <FormLabel>Phone Number</FormLabel>
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
                        <FormLabel>How can we help?</FormLabel>
                        <FormControl>
                            <Textarea
                            placeholder="Tell us about your car and the service you need..."
                            className="resize-none"
                            {...field}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Request Appointment</Button>
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
                        <span className="text-muted-foreground">Odesa, Ukraine</span>
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
