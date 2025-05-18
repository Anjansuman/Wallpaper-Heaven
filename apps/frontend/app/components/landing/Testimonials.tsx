"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: "Emma Richardson",
    role: "Interior Designer",
    quote: "The quality of these wallpapers is absolutely outstanding. My clients are always impressed with the texture and depth they bring to spaces.",
    avatar: "/images/testimonial-1.jpg",
  },
  {
    id: 2,
    name: "Michael Johnson",
    role: "Home Owner",
    quote: "Transformed our living room completely. The pattern quality is exceptional and the installation guidance was extremely helpful.",
    avatar: "/images/testimonial-2.jpg",
  },
  {
    id: 3,
    name: "Sarah Williams",
    role: "Architect",
    quote: "I've incorporated Wallpaper Heaven products in several of my projects. They add character and sophistication to every space.",
    avatar: "/images/testimonial-3.jpg",
  },
  {
    id: 4,
    name: "David Chen",
    role: "Property Developer",
    quote: "The premium quality is apparent. These wallpapers have become our go-to for creating standout spaces in our development projects.",
    avatar: "/images/testimonial-4.jpg",
  },
];

export default function Testimonials() {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const testimonialsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.from('.testimonials-title', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.testimonials-title',
        start: 'top bottom-=100',
      },
    });

    if (testimonialsRef.current) {
      gsap.from(testimonialsRef.current, {
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: testimonialsRef.current,
          start: 'top bottom-=100',
        },
      });
    }

    requestAnimationFrame(() => {
      const slider = sliderRef.current;
      const cards = slider?.querySelectorAll('.testimonial-card') || [];

      if (!slider || cards.length === 0) return;

      const totalWidth = Array.from(cards).reduce((acc, card) => {
        return acc + (card as HTMLElement).offsetWidth + 24;
      }, 0);

      gsap.to('.testimonials-track', {
        x: `-=${totalWidth / 2}`,
        duration: 30,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % (totalWidth / 2)),
        },
      });

      slider.addEventListener('mouseenter', () => {
        gsap.globalTimeline.timeScale(0);
      });

      slider.addEventListener('mouseleave', () => {
        gsap.globalTimeline.timeScale(1);
      });
    });
  }, []);

  return (
    <section
      ref={testimonialsRef}
      className="py-20 bg-gray-50 relative overflow-hidden"
    >
      <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
      <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>

      <div className="container mx-auto px-4">
        <h2 className="testimonials-title text-4xl md:text-5xl font-semibold text-center mb-4">
          Customer Stories
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Hear from designers and homeowners who have transformed their spaces with our premium wallpapers.
        </p>
      </div>

      <div
        ref={sliderRef}
        className="relative overflow-hidden py-8"
      >
        <div className="testimonials-track flex gap-6 py-4">
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${index}`}
              className="testimonial-card flex-shrink-0 bg-white p-6 rounded-lg shadow-md w-80"
            >
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="object-cover rounded-full"
                  />
                </div>
                <div>
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
