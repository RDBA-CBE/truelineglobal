import Image from 'next/image';

export default function Leadership() {
  return (
    <section id="leadership" className="section leadership-section section-space">
      <div className="shell leadership-grid">
        <div className="leader-card" data-image-reveal>
          <div className="leader-image"><Image src="/images/leader.jpg" alt="Business leadership portrait" fill sizes="(max-width: 800px) 100vw, 36vw" /></div>
          <div className="leader-name"><strong>Ariz Zubair</strong><span>Managing Director</span></div>
        </div>
        <div className="leadership-copy" data-reveal>
          <p className="eyebrow type-eyebrow">Leadership &amp; Experience</p>
          <h2 className="type-h2">Business Leadership</h2>
          <div className="leadership-stats"><div><strong>15+ Years</strong><span>Experience</span></div><div><strong>100+</strong><span>International connections</span></div></div>
          <div className="leadership-lines"><p>International sourcing</p><p>Timber &amp; panel expertise</p><p>Commercial negotiation</p><p>Logistics &amp; documentation</p><p>Supplier relationship management</p><p>Buyer-focused execution</p></div>
          <blockquote>“Reliable sourcing is built on product knowledge, transparent communication and disciplined follow-through.”</blockquote>
        </div>
      </div>
    </section>
  );
}
