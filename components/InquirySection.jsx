import Image from 'next/image';
import EnquiryTrigger from './EnquiryTrigger';

const requirements = [
  'Product',
  'Specification',
  'Quantity',
  'Required origin, if applicable',
  'Destination',
];

export default function InquirySection() {
  return (
    <section id="inquiry" className="inquiry-section">
      <div className="inquiry-grid">
        <article className="inquiry-card" data-reveal>
          <div className="inquiry-image">
            <Image
              src="/images/for-traders.webp"
              alt="Building material inventory"
              fill
              sizes="50vw"
            />
          </div>

          <div className="inquiry-content">
            <p className="eyebrow type-eyebrow">For Traders / Importers</p>
            <h3 className="type-h3">Looking for Reliable Building Material Suppliers?</h3>
            <p className="body-content">
              Send us your requirement and we will work on sourcing it from
              suitable origins. Please include:
            </p>

            <div className="requirement-list">
              {requirements.map((item) => (
                <div className="requirement-row" key={item}>
                  {item}
                </div>
              ))}
            </div>

            <EnquiryTrigger
              className="btn btn-dark inquiry-btn"
              enquiryType="Buyer / Importer"
            >
              Request a Quote
            </EnquiryTrigger>
          </div>
        </article>

        <article className="inquiry-card inquiry-card-alt" data-reveal>
          <div className="inquiry-image">
            <Image
              src="/images/for-manufacture.webp"
              alt="Timber manufacturing and sawmill"
              fill
              sizes="50vw"
            />
          </div>

          <div className="inquiry-content">
            <p className="eyebrow type-eyebrow">For Manufacturers &amp; Sawmills</p>
            <h3 className="type-h3">Looking to Expand Into New Markets?</h3>
            <p className="body-content">
              We are interested in developing relationships with reliable manufacturers and suppliers of wood-based panels, timber, and construction-related products.

            </p>
            <p className="inquiry-secondary-copy body-content">
             Our international market experience and customer relationships can create opportunities for suppliers looking to expand their presence across selected markets.
            </p>

            <EnquiryTrigger
              className="btn btn-line inquiry-btn"
              enquiryType="Manufacturer / Sawmill"
            >
              Become a Supply Partner
            </EnquiryTrigger>
          </div>
        </article>
      </div>
    </section>
  );
}
