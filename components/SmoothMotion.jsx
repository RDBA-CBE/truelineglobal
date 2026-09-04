'use client';

import { useEffect } from 'react';

export default function SmoothMotion() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let cleanup = () => {};

    (async () => {
      const [{ default: Lenis }, gsapModule, scrollModule] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      const gsap = gsapModule.default;
      const ScrollTrigger = scrollModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
      const raf = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      lenis.on('scroll', ScrollTrigger.update);

      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          },
        );
      });

      gsap.utils.toArray('[data-image-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(0 0 100% 0)', scale: 1.04 },
          {
            clipPath: 'inset(0 0 0% 0)',
            scale: 1,
            duration: 1.05,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          },
        );
      });

      gsap.utils.toArray('[data-stagger]').forEach((wrap) => {
        gsap.fromTo(
          Array.from(wrap.children),
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: { trigger: wrap, start: 'top 88%', once: true },
          },
        );
      });

      // Requirement-to-delivery: run the six stages in order and draw the
      // connector from step 01 through step 06 without changing the layout.
      gsap.utils.toArray('[data-process]').forEach((process) => {
        const progress = process.querySelector('.process-progress');
        const steps = Array.from(process.querySelectorAll('[data-process-step]'));

        if (!progress || !steps.length) return;

        gsap.set(progress, { scaleX: 0, transformOrigin: 'left center' });
        gsap.set(steps, { opacity: 0.42 });
        gsap.set(steps.map((step) => step.querySelector('.process-dot')), {
          scale: 0.55,
          transformOrigin: 'center center',
        });

        const totalDuration = 2.8;
        const interval = totalDuration / Math.max(steps.length - 1, 1);
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: process,
            start: 'top 82%',
            once: true,
          },
        });

        timeline.to(progress, {
          scaleX: 1,
          duration: totalDuration,
          ease: 'none',
        }, 0);

        steps.forEach((step, index) => {
          const dot = step.querySelector('.process-dot');
          const number = step.querySelector('span');
          const title = step.querySelector('strong');
          const copy = step.querySelector('p');
          const at = index * interval;

          timeline.to(step, { opacity: 1, duration: 0.22, ease: 'power1.out' }, at);
          timeline.fromTo(
            dot,
            { scale: 0.55, boxShadow: '0 0 0 0 rgba(204, 173, 109, 0.38)' },
            {
              scale: 1,
              boxShadow: '0 0 0 8px rgba(204, 173, 109, 0)',
              duration: 0.42,
              ease: 'back.out(2)',
            },
            at,
          );
          timeline.fromTo(
            [number, title, copy],
            { y: 7, opacity: 0.55 },
            { y: 0, opacity: 1, duration: 0.38, stagger: 0.035, ease: 'power2.out' },
            at,
          );
        });
      });

      // Supplier map: reveal every country point in the same sequence as the
      // listed supplier countries. The subtle pulse is handled in CSS.
      gsap.utils.toArray('[data-map-network]').forEach((map) => {
        const pointCores = Array.from(map.querySelectorAll('[data-map-point] .map-point-core'));
        if (!pointCores.length) return;

        gsap.fromTo(
          pointCores,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.46,
            stagger: 0.09,
            ease: 'back.out(2.2)',
            scrollTrigger: {
              trigger: map,
              start: 'top 82%',
              once: true,
            },
          },
        );
      });

      cleanup = () => {
        gsap.ticker.remove(raf);
        lenis.destroy();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    })();

    return () => cleanup();
  }, []);

  return null;
}
