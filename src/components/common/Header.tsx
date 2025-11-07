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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 p-4">
      <div
        className={cn(
          'w-full h-20 rounded-2xl transition-all duration-300',
          'bg-black/50 backdrop-blur-xl border border-primary/20'
        )}
      >
        <div className="container mx-auto flex h-full items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-3" prefetch={false}>
            <OdesaAutoLogo className="h-10 w-10 text-primary" />
            <span className="text-2xl font-bold text-white tracking-wider">Odesa Auto</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium text-gray-300 transition-colors duration-300 hover:text-primary after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
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
      </div>
    </header>
  );
}
