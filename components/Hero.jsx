'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const heroSlides = [
  
 {
    src: '/images/banner-3.webp',
    alt: 'Connecting Global Sources to Growing Markets',
  },
  {
     src: '/images/banner-4.webp',
    alt: 'Connecting Global Sources to Growing Markets',
  },
    {
    src: '/images/banner-5.webp',
    alt: 'Connecting Global Sources to Growing Markets',
  },
  {
     src: '/images/banner-6.webp',
    alt: 'Connecting Global Sources to Growing Markets',
  },
 {
    src: '/images/banner-7.webp',
    alt: 'Connecting Global Sources to Growing Markets',
  },
  {
     src: '/images/banner-8.webp',
    alt: 'Connecting Global Sources to Growing Markets',
  },
   {
     src: '/images/banner-9.webp',
    alt: 'Connecting Global Sources to Growing Markets',
  },
];

const AUTOPLAY_DELAY = 5500;
const SWIPE_THRESHOLD = 44;

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStartX = useRef(null);

  const showPrevious = () => {
    setActiveSlide((current) =>
      current === 0 ? heroSlides.length - 1 : current - 1,
    );
  };

  const showNext = () => {
    setActiveSlide((current) => (current + 1) % heroSlides.length);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener?.('change', updateMotionPreference);

    return () => mediaQuery.removeEventListener?.('change', updateMotionPreference);
  }, []);

  useEffect(() => {
    if (isPaused || reducedMotion || heroSlides.length < 2) return undefined;

    const timer = window.setTimeout(showNext, AUTOPLAY_DELAY);
    return () => window.clearTimeout(timer);
  }, [activeSlide, isPaused, reducedMotion]);

  const handleTouchStart = (event) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;

    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const distance = touchEndX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(distance) < SWIPE_THRESHOLD) return;
    if (distance > 0) showPrevious();
    else showNext();
  };

  return (
    <section id="home" className="hero section-grid-bg mt-45">
      <div className="shell hero-grid">
        <div className="hero-copy" data-reveal>
          <p className="hero-eyebrow type-eyebrow">TrueLine Global Trading</p>

          <h1 className="type-h1">
            Connecting Global Sources to Growing Markets
          </h1>

          <p className="hero-subhead">
            International Trading
            <span>|</span>
            Building Materials
            <span>|</span>
            Global Sourcing
          </p>

          <p className="hero-text body-content">
           Trueline Global Trading connects trusted manufacturers and suppliers with global markets, specializing in building materials and construction products. Backed by 15+ years of expertise in international trade, sourcing, logistics, and business development, we deliver reliable solutions, competitive value, and seamless supply chain coordination.
           <br></br><b>Source Globally. Trade Confidently.</b>
          </p>

          <div className="hero-actions">
            <a className="btn btn-dark" href="#products">
              Explore Our Products
            </a>

            <a className="btn btn-line" href="#contact">
              Contact Us
            </a>
          </div>
        </div>

        <div
          className="hero-media-wrap"
          role="region"
          aria-roledescription="carousel"
          aria-label="Global trading highlights"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
          }}
        >
          <div
            className="hero-media"
            data-image-reveal
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {heroSlides.map((slide, index) => (
              <div
                key={slide.src}
                className={`hero-slide${index === activeSlide ? ' is-active' : ''}`}
                aria-hidden={index !== activeSlide}
              >
                <Image
                  src={slide.src}
                  alt={index === activeSlide ? slide.alt : ''}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 980px) calc(100vw - 44px), (max-width: 1366px) 58vw, 790px"
                  draggable={false}
                />
              </div>
            ))}
          </div>

          <div className="hero-controls">
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Show previous hero image"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={showNext}
              aria-label="Show next hero image"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
