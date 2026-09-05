import Image from 'next/image';
import { differenceBottom, differenceTop } from '@/lib/data';

export default function DifferenceSection() {
  return (
    <section id="difference" className="section difference-section section-space">
    
      <div className="shell">
        <h2 className="section-title type-h2" data-reveal>
          Experience That Makes a Difference
        </h2>

        <div className="difference-top">
          <div className="numbered-list" data-stagger>
            {differenceTop.map(([number, title, description]) => (
              <div className="numbered-row" key={number}>
                <span>{number}</span>
                <strong>{title}</strong>
                <p>{description}</p>
              </div>
            ))}
          </div>

          <div className="difference-detail" data-image-reveal>
            <Image
              src="/images/exp-differnce-1.webp"
              alt="Timber quality control and measurement"
              fill
              sizes="(max-width: 900px) 100vw, 38vw"
            />
          </div>
        </div>

        <div className="difference-bottom">
          <div className="difference-ship" data-image-reveal>
            <Image
              src="/images/exp-differnce-2.webp"
              alt="International cargo vessel"
              fill
              sizes="(max-width: 900px) 100vw, 42vw"
            />
          </div>

          <div className="simple-list" data-stagger>
            {differenceBottom.map(([title, description]) => (
              <div className="simple-row" key={title}>
                <span>+</span>
                <strong>{title}</strong>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
