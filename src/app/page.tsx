import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Brands from '@/components/sections/Brands';
import RepairCalculator from '@/components/sections/RepairCalculator';
import Pricing from '@/components/sections/Pricing';
import Gallery from '@/components/sections/Gallery';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <Brands />
        <RepairCalculator />
        <Pricing />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
