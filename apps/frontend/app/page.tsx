import Navbar from './components/landing/Navbar';
import Hero from './components/landing/Hero';
import FeaturedGrid from './components/landing/Feature-grid';
import Testimonials from './components/landing/Testimonials';
import Footer from './components/landing/Footer';
import Script from 'next/script';

export default function Home() {
  return (
    <main>
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
        strategy="beforeInteractive"
      />
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"
        strategy="beforeInteractive"
      />
      
      <Navbar />
      <Hero />
      <FeaturedGrid />
      <Testimonials />
      <Footer />
    </main>
  );
}