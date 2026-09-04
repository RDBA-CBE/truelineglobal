import Image from 'next/image';

const marketColumns = [
  {
    title: 'GCC',
    items: ['UAE', 'Saudi Arabia', 'Qatar', 'Oman', 'Kuwait', 'Bahrain'],
  },
  {
    title: 'Asia',
    items: ['India', 'Sri Lanka', 'Maldives', 'Pakistan', 'Southeast Asian markets'],
  },
  {
    title: 'Africa',
    items: [
      'South Africa',
      'Uganda',
      'Kenya',
      'Tanzania',
      'Nigeria',
      'Sudan',
      'Other selected African markets',
    ],
  },
];

export default function TradeBridge() {
  return (
    <section id="trade" className="trade-bridge navy-section section-space">
      <div className="shell trade-grid">
        <div className="trade-image" data-image-reveal>
          <Image
            src="/images/connecting-suppliers.webp"
            alt="International building material transport and trade"
            fill
            sizes="(max-width: 900px) 100vw, 36vw"
          />
        </div>

        <div className="trade-copy" data-reveal>
          <p className="eyebrow gold type-eyebrow">Markets We Serve</p>
          <h2 className="type-h2">
            Connecting Suppliers and
            <br />
            Buyers Across Borders
          </h2>
          <p>Our international market experience includes:</p>

          <div className="trade-columns">
            {marketColumns.map((column) => (
              <div className="trade-market-col" key={column.title}>
                <span>{column.title}</span>
                {column.items.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
