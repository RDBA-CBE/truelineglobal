import Image from 'next/image';
import { processSteps } from '@/lib/data';

export default function DeliveryProcess() {
  return (
    <section id="process" className="section process-section section-space">
      <div className="shell">
        <div className="section-head compact-head" data-reveal>
          <h2 className="type-h2">From Requirement to Delivery</h2>
          <span>Process</span>
        </div>

        <div className="process-line" data-process>
          <div className="process-progress" aria-hidden="true" />
          {processSteps.map(([n, t, d]) => (
            <div className="process-step" data-process-step key={n}>
              <i className="process-dot" aria-hidden="true" />
              <span>{n}</span>
              <strong>{t}</strong>
              <p>{d}</p>
            </div>
          ))}
        </div>

        <div className="process-image" data-image-reveal>
          <Image
            src="/images/d-process.webp"
            alt="Timber production and delivery process"
            fill
            sizes="100vw"
          />
        </div>
      </div>
    </section>
  );
}
