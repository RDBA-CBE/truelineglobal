import Image from 'next/image';
import { regions, supplierMapPoints } from '@/lib/data';

export default function SupplierNetwork() {
  return (
    <section id="network" className="section network-section">
      <div className="shell">
        <div className="section-head split-head network-head" data-reveal>
          <h2 className="type-h2">Our Global Supplier Network</h2>
          <p className="body-content">
            We source products from established manufacturing and supply markets
            across Europe, Asia, and Africa.
          </p>
        </div>

        <div className="network-image" data-image-reveal>
          <Image
            src="/images/global-network.webp"
            alt="Global timber supplier warehouse"
            fill
            sizes="100vw"
          />
        </div>

        <div className="network-divider" />

        <div className="network-bottom">
          <div className="network-regions-wrap">
            <div className="region-grid" data-stagger>
              {Object.entries(regions).map(([region, countries]) => (
                <div className="region-col" key={region}>
                  <span className="kicker type-eyebrow">{region}</span>
                  {countries.map((country) => (
                    <p key={country}>{country}</p>
                  ))}
                </div>
              ))}
            </div>

            <p className="network-note body-content" data-reveal>
              Our multi-country sourcing approach allows us to evaluate different
              origins based on product quality, specifications, availability,
              pricing, lead times, and customer requirements.
            </p>
          </div>

          <div className="map-wrap" data-map-network data-reveal>
            <div className="map-canvas">
              <Image
                src="/images/world-map-reference.png"
                alt="World map showing international supplier network"
                width={580}
                height={415}
                className="world-map-image"
              />

              <div className="map-points" aria-label="Supplier countries shown on the map">
                {supplierMapPoints.map((point, index) => (
                  <span
                    className="map-point"
                    data-map-point
                    key={point.country}
                    style={{
                      left: `${point.x}%`,
                      top: `${point.y}%`,
                      '--map-delay': `${(index % 7) * 0.22}s`,
                    }}
                    title={`${point.country} — ${point.region}`}
                    aria-label={`${point.country}, ${point.region}`}
                  >
                    <span className="map-point-core" aria-hidden="true" />
                    <span className="map-point-label">{point.country}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
       
    </section>
   
  );
}
