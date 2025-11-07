import Link from 'next/link';
import OdesaAutoLogo from './OdesaAutoLogo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-primary/20 py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3">
            <OdesaAutoLogo className="h-8 w-8 text-primary" />
            <span className="text-lg font-semibold text-white">Odesa Auto</span>
          </div>
          <p className="text-sm text-gray-400">
            &copy; {currentYear} Odesa Auto. Мистецтво перевтілення вашого авто.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm text-gray-400 hover:text-primary" prefetch={false}>
              Політика конфіденційності
            </Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-primary" prefetch={false}>
              Умови надання послуг
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
