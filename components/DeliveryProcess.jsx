import Image from 'next/image';
import { MessageSquare, Handshake, GitMerge } from 'lucide-react';
import { processSteps } from '@/lib/data';

export default function DeliveryProcess() {
  return (
    <section id="process" className="section process-section section-space">
      <div className="shell">

        <div className="section-head compact-head" data-reveal>
          <h2 className="type-h2">From Requirement to Delivery</h2>
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
            src="/images/brand/process.webp"
            alt="Timber production and delivery process"
            fill
            sizes="100vw"
          />
        </div>

        <div className="process-bottom" data-reveal>
          <ul className="process-bottom-pillars" aria-label="Our approach">
            <li>
              <MessageSquare size={28} strokeWidth={1.5} />
              <strong>Clear</strong>
              <span>Communication</span>
            </li>
            <li>
              <Handshake size={28} strokeWidth={1.5} />
              <strong>Established</strong>
              <span>Partnerships</span>
            </li>
            <li>
              <GitMerge size={28} strokeWidth={1.5} />
              <strong>Coordinated</strong>
              <span>Execution</span>
            </li>
          </ul>
          <div className="process-bottom-cols">
            <div className="process-bottom-col">
              <h3>Our Process</h3>
              <p>From receiving your enquiry to coordinating final delivery, we manage each stage with attention to quality, efficiency, and transparency. Through our established network of partner sawmills and manufacturing facilities with whom we have existing agreements, we coordinate sourcing and supply while keeping you clearly informed throughout the process.</p>
            </div>
            <div className="process-bottom-col">
              <h3>Our Commitment to Transparent Communication</h3>
              <p>At every stage, we maintain clear and timely communication with our customers, providing updates on sourcing, order placement, production, packing, logistics, documentation, and shipment progress. Our established relationships with partner sawmills and factories enable us to coordinate requirements efficiently while ensuring greater visibility and consistency throughout the order journey.</p>
            </div>
          </div>
        </div>
        <p>At Trueline Global Trading, we believe successful international trade is built on trusted partnerships, transparent communication, and disciplined coordination. By working with established partner sawmills and factories under existing agreements, we create a dependable link between customer requirements and reliable supply sources, managing the journey from requirement to delivery with clarity and commitment.</p>

      </div>
    </section>
  );
}
