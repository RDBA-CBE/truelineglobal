import Image from 'next/image';
import { capabilities } from '@/lib/data';

export default function ExperienceSection() {
  return (
    <section id="about" className="section experience-section navy-section section-space">
      <div className="shell experience-grid">
        <div className="experience-left" data-reveal>
          <p className="eyebrow gold type-eyebrow">Experience &amp; Reach</p>
          <h2 className="type-h2">More Than 15 Years of<br />International Business<br />Experience</h2>
          <div className="experience-image" data-image-reveal><Image src="/images/business-exp.webp" alt="Timber logistics and warehousing" fill sizes="(max-width: 900px) 100vw, 48vw" /></div>
        </div>
        <div className="experience-list" data-stagger>
          <p className="gold lead-label">Our business is supported by extensive professional experience in:</p>
          {capabilities.map(([title, text], i) => (
            <div className="cap-row" key={title}><span>{String(i+1).padStart(2,'0')}</span><strong>{title}</strong><p>{text}</p></div>
          ))}
        </div>
      </div>
    </section>
  );
}
