"use client";

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DirectionAwareHover } from '../../components/ui/direction-aware-hover';

const wallpapers = [
  {
    id: 1,
    title: "Botanicals",
    category: "Floral",
    image: "/col1.jpeg",
  },
  {
    id: 2,
    title: "Modern Geometric",
    category: "Minimalist",
    image: "/col2.jpeg",
  },
  {
    id: 3,
    title: "Baroque Revival",
    category: "Classic",
    image: "/col3.jpeg",
  },
  {
    id: 4,
    title: "Pastel Dreams",
    category: "Abstract",
    image: "/col4.jpeg",
  },
  {
    id: 5,
    title: "Vintage Floral",
    category: "Floral",
    image: "/col5.jpeg",
  },
  {
    id: 6,
    title: "Nordic Lines",
    category: "Minimalist",
    image: "/col1.jpeg",
  },
  {
    id: 7,
    title: "Nordic Lines",
    category: "Minimalist",
    image: "/col2.jpeg",
  },
  {
    id: 8,
    title: "Nordic Lines",
    category: "Minimalist",
    image: "/col3.jpeg",
  },
];

const categories = ["All", "Floral", "Minimalist", "Classic", "Abstract"];

export default function TopCollections() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredWallpapers, setFilteredWallpapers] = useState(wallpapers);
  const gridRef = useRef(null);

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredWallpapers(wallpapers);
    } else {
      setFilteredWallpapers(wallpapers.filter(item => item.category === activeCategory));
    }

    if (gridRef.current) {
      gsap.fromTo('.wallpaper-card',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.5,
          ease: 'power2.out'
        }
      );
    }
  }, [activeCategory]);

  return (
    <section id="collections" className="py-20 ">
      <div className="container mx-auto">
        <h2 className="section-title font-serif text-4xl md:text-5xl font-semibold text-center mb-4">
          Featured Collections
        </h2>
        <p className="text-gray-600 font-serif text-[20px] text-center mb-12 max-w-2xl mx-auto">
          Explore our selection of premium wallpapers, designed to transform any space into a stunning environment.
        </p>

        {/* Filter Categories */}
        <div className="categories-container flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`category-pill px-6 py-2 rounded-[8px] text-sm font-medium transition-all duration-300 ${activeCategory === category
                  ? 'bg-black text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800 hover:shadow-md'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* wallpaper grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-[90px] gap-y-8 place-items-center"
        >
          {filteredWallpapers.map((wallpaper) => (
            <div
              key={wallpaper.id}
              className="wallpaper-card"
            >
              <DirectionAwareHover
                imageUrl={wallpaper.image}
                className="h-80 w-80 rounded-lg shadow-md"
                imageClassName="object-cover"
              >
                <div className="space-y-1">
                  <h3 className="text-xl font-medium">{wallpaper.title}</h3>
                  <p className="text-sm opacity-80">{wallpaper.category}</p>
                </div>
              </DirectionAwareHover>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-3 border border-black text-black font-medium rounded-full hover:bg-black hover:text-white cursor-pointer transition-colors duration-300">
            View All Collections
          </button>
        </div>
      </div>
    </section>
  );
}