"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import OdesaAutoLogo from './OdesaAutoLogo';

const navLinks = [
  { href: '#services', label: 'Послуги' },
  { href: '#calculator', label: 'Калькулятор' },
  { href: '#pricing', label: 'Ціни' },
  { href: '#gallery', label: 'Наші роботи' },
  { href: '#testimonials', label: 'Відгуки' },
  { href: '#contact', label: 'Контакти' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'bg-black/70 backdrop-blur-xl border-b border-primary/20' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-3" prefetch={false}>
          <OdesaAutoLogo className="h-10 w-10 text-primary" />
          <span className="text-2xl font-bold text-white tracking-wider">Odesa Auto</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-300 transition-colors hover:text-primary hover:drop-shadow-[0_0_5px_hsl(var(--primary))]"
              prefetch={false}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
            <Button asChild className="hidden md:flex bg-primary/90 text-primary-foreground hover:bg-primary hover:scale-105 transition-transform hover:shadow-[0_0_15px_hsl(var(--primary))]">
                <Link href="#contact">
                    Зв'язатись
                </Link>
            </Button>
            <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Відкрити меню</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-black/80 backdrop-blur-xl border-l border-primary/20 text-white">
                <div className="flex flex-col gap-6 p-6">
                    <Link href="/" className="mb-4 flex items-center gap-2" prefetch={false} onClick={() => setIsMobileMenuOpen(false)}>
                    <Sparkles className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold">Odesa Auto</span>
                    </Link>
                    <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <Link
                        key={link.href}
                        href={link.href}
                        className="text-lg font-medium text-gray-200 transition-colors hover:text-primary"
                        prefetch={false}
                        onClick={() => setIsMobileMenuOpen(false)}
                        >
                        {link.label}
                        </Link>
                    ))}
                    </nav>
                    <Button asChild className="mt-6">
                        <Link href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                            Записатись на консультацію
                        </Link>
                    </Button>
                </div>
                </SheetContent>
            </Sheet>
            </div>
        </div>
      </div>
    </header>
  );
}
