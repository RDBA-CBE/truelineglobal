const values = [
  {
    number: '01',
    title: 'TRUST',
    description:
      'International trade depends on reliable relationships. We aim to build partnerships that last beyond a single transaction.',
  },
  {
    number: '02',
    title: 'INTEGRITY',
    description:
      'We believe in transparent communication and professional business practices.',
  },
  {
    number: '03',
    title: 'QUALITY',
    description:
      'We focus on matching customers with products and suppliers that meet their required specifications.',
  },
  {
    number: '04',
    title: 'RESPONSIVENESS',
    description:
      'Global trade moves quickly. We aim to respond efficiently to customer requirements and market opportunities.',
  },
  {
    number: '05',
    title: 'LONG-TERM PARTNERSHIPS',
    description:
      'Our objective is to build sustainable relationships with customers, suppliers, distributors, and business partners.',
  },
];

export default function ValuesSection() {
  return (
    <section
      id="values"
      className="values-section section-space"
    >
      <div className="values-shell">

        {/* =========================================
            SECTION HEADING
        ========================================= */}

        <div
          className="values-head"
          data-reveal
        >
          <div className="values-head-left">
            <p className="eyebrow">
              OUR VALUES
            </p>

            <h2 className="type-h2 values-title">
              Trust. Integrity.
              <br />
              Quality. Commitment.
            </h2>
          </div>

          <p className="body-content values-intro">
            The principles that guide how we build
            relationships, manage opportunities, and
            conduct business across international
            markets.
          </p>
        </div>


        {/* =========================================
            VALUE GRID
        ========================================= */}

        <div
          className="values-grid"
          data-stagger
        >
          {values.map((value, index) => (
            <article
              className={`value-card ${
                index === 0
                  ? 'value-card-featured'
                  : ''
              }`}
              key={value.title}
            >
              <div className="value-card-top">
                <span className="value-number">
                  {value.number}
                </span>

                <span
                  className="value-mark"
                  aria-hidden="true"
                />
              </div>

              <div className="value-card-content">
                <h3>{value.title}</h3>

                <p>
                  {value.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}