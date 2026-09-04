const stats = [
  {
    main: '15+',
    sub: 'Years of International Business Experience',
  },
  {
    main: 'Source Globally.',
    sub: 'Europe, Asia & Africa Sourcing',
    accent: true,
  },
  {
    main: 'Markets',
    sub: 'GCC, Africa & Asia',
  },
  {
    main: 'Experience',
    sub: 'Global Logistics',
    accent: true,
  },
];

export default function TrustStats() {
  return (
    <section className="stats-strip">
      <div className="shell stats-grid" data-stagger>
        {stats.map((item) => (
          <div className="stat" key={item.main}>
            <strong>{item.main}</strong>
            <span className={item.accent ? 'stat-accent' : ''}>{item.sub}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
