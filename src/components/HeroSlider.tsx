import { useState, useEffect, useRef } from 'react';
import { getOptimizedImageUrl } from "../utils/imageUtils";

const banners = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1555529771-835f59fc5efe?auto=format&fit=crop&q=80&w=2000",
    alt: "Mega Fashion Week - 50% Off",
    link: "/category/fashion"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=2000",
    alt: "Electronics Fest Sale",
    link: "/category/electronics"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&q=80&w=2000",
    alt: "Super Deals on Smart Devices",
    link: "/category/smart-devices"
  }
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const isDragging = useRef(false);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  // Auto-play logic
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered]);

  // Touch and Mouse handlers for swipe/drag tracking
  const handleDragStart = (clientX: number) => {
    touchStartX.current = clientX;
    isDragging.current = false;
  };

  const handleDragEnd = (clientX: number) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - clientX;

    if (Math.abs(diff) > 5) {
      isDragging.current = true;
    }

    // Minimum swipe threshold of 50px
    if (diff > 50) {
      nextSlide(); // Swiped left
    } else if (diff < -50) {
      prevSlide(); // Swiped right
    }
    touchStartX.current = null; // Reset
  };

  return (
    <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 mt-0">
      <div 
        className="relative w-full overflow-hidden rounded-none group cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          if (touchStartX.current !== null) {
            touchStartX.current = null;
          }
        }}
        onTouchStart={(e) => {
          setIsHovered(true);
          handleDragStart(e.touches[0].clientX);
        }}
        onTouchEnd={(e) => {
          setIsHovered(false);
          handleDragEnd(e.changedTouches[0].clientX);
        }}
        onTouchCancel={() => {
          setIsHovered(false);
          touchStartX.current = null;
        }}
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseUp={(e) => handleDragEnd(e.clientX)}
      >
        {/* Slider Track - Smooth responsive aspect ratios */}
        <div 
          className="flex w-full aspect-[16/8] sm:aspect-[21/9] md:aspect-[3/1] transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {banners.map((banner) => (
            <a 
              key={banner.id} 
              href={banner.link}
              onClick={(e) => {
                if (isDragging.current) {
                  e.preventDefault();
                }
              }}
              className="min-w-full h-full flex-shrink-0 cursor-pointer block"
              draggable={false}
            >
              <img
                src={getOptimizedImageUrl(banner.image, 1200)}
                alt={banner.alt}
                className="w-full h-full object-cover select-none pointer-events-none"
                draggable={false}
              />
            </a>
          ))}
        </div>

        {/* Dot Indicators */}
        <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
                index === currentIndex 
                  ? 'bg-indigo-600 w-6 sm:w-8' 
                  : 'bg-white/70 hover:bg-white'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
