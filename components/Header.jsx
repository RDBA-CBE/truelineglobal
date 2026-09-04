'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { navItems } from '@/lib/data';
import EnquiryTrigger from './EnquiryTrigger';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const activationLine = Math.max(130, window.innerHeight * 0.3);
      let currentId = 'home';

      navItems.forEach(([, id]) => {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= activationLine) {
          currentId = id;
        }
      });

      const pageBottom = window.scrollY + window.innerHeight;
      if (pageBottom >= document.documentElement.scrollHeight - 80) {
        currentId = 'contact';
      }

      setActiveId(currentId);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const jump = (id) => {
    setOpen(false);
    setActiveId(id);
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="shell header-inner">
        <button
          className="header-logo-card"
          onClick={() => jump('home')}
          aria-label="TrueLine Global Trading - Home"
        >
          <Image
            src="/images/trueline-logo.svg"
            alt="TrueLine Global Trading"
            width={228}
            height={154}
            priority
            className="header-logo-image"
          />
        </button>

        <nav className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Primary navigation">
          {navItems.map(([label, id]) => (
            <button
              key={id}
              className={activeId === id ? 'is-active' : undefined}
              aria-current={activeId === id ? 'page' : undefined}
              onClick={() => jump(id)}
            >
              {label}
            </button>
          ))}

          <EnquiryTrigger className="mobile-quote" enquiryType="Buyer / Importer">
            Send Your Requirement
          </EnquiryTrigger>
        </nav>

        <EnquiryTrigger className="quote-btn desktop-quote" enquiryType="Buyer / Importer">
          Send Your Requirement
        </EnquiryTrigger>

        <button
          className="menu-btn"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}
