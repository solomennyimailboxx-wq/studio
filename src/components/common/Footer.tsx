import Link from 'next/link';
import { Car } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <Car className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">Odesa Auto</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Odesa Auto. Всі права захищено.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary" prefetch={false}>
              Політика конфіденційності
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary" prefetch={false}>
              Умови надання послуг
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
