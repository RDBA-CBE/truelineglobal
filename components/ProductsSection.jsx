'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

/* =========================================================
   PRODUCT DATA
========================================================= */

const productGroups = {
  plywood: {
    title: 'PLYWOOD',
    images: [
      '/images/tg/plywood.webp',
      '/images/tg/Film-Faced-Plywood.webp',
      '/images/tg/Commercial-Plywood.webp',
    ],
    imageAlt: 'Plywood products',

    items: [
      {
        title: 'FILM FACED PLYWOOD',

        paragraphs: [
          'Film faced plywood designed for construction and concrete-formwork applications.',

          'Available in different specifications and grades according to project and market requirements.',
        ],

        applications: [
          'Concrete formwork',
          'Construction projects',
          'Infrastructure projects',
          'Commercial construction',
        ],
      },

      {
        title: 'COMMERCIAL PLYWOOD',

        paragraphs: [
          'Commercial plywood suitable for a variety of construction, furniture, interior, and carpentry applications.',

          'We source plywood according to required specifications, thickness, quality, dimensions, and market requirements.',
        ],
      },
    ],
  },

  panels: {
    title: 'MDF & PANEL PRODUCTS',
    images: [
      '/images/tg/MDF.webp',
      '/images/tg/Melamine-MDF.webp',
      '/images/tg/HMR-MDF.webp',
       '/images/tg/FR-MDF.webp',
      '/images/tg/Jumbo-MDF.webp',
      '/images/tg/Solid-Chipboard.webp',
      '/images/tg/Hollow-Chipboard.webp',
    ],
    imageAlt: 'MDF and panel products',

    items: [
      {
        title: 'MDF',

        paragraphs: [
          'Medium-density fibreboard for furniture, interior, cabinetry, joinery, and other applications.',

          'Available in different specifications depending on customer requirements.',
        ],
      },

      {
        title: 'MELAMINE MDF',
      },

      {
        title: 'HMR MDF',

        paragraphs: [
          'High Moisture Resistant MDF designed for applications where increased moisture resistance is required.',
        ],
      },

      {
        title: 'FR MDF',

        paragraphs: [
          'Fire-retardant MDF for applications requiring enhanced fire-performance characteristics, subject to the applicable product certification and specification.',
        ],
      },

      {
        title: 'JUMBO MDF',

        paragraphs: [
          'Large-format MDF solutions for customers requiring larger sheet dimensions and efficient material utilization.',
        ],
      },

      {
        title: 'SOLID CHIPBOARD',

        paragraphs: [
          'Solid chipboard panels suitable for furniture, interior, construction, and industrial applications.',
        ],
      },

      {
        title: 'HOLLOW CHIPBOARD',

        paragraphs: [
          'Lightweight hollow chipboard solutions designed for applications where weight reduction and material efficiency are important.',
        ],
      },
    ],
  },

  timber: {
    title: 'TIMBER & WOOD',
    subtitle: 'Natural Wood Products',
    intro:
      'Our sourcing network provides access to a variety of softwoods and hardwoods for construction, carpentry, furniture, and other applications.',
    images: [
      '/images/tg/white-wood.webp',
      '/images/tg/pine.webp',
      '/images/tg/beech.webp',
      '/images/tg/malaysian-hardwoods.webp',
      '/images/tg/african-hardwoods.webp',
    ],
    imageAlt: 'Timber and wood products',

    items: [
      {
        title: 'WHITE WOOD',

        paragraphs: [
          'Softwood products suitable for construction, carpentry, packaging, and general timber applications.',
        ],
      },

      {
        title: 'PINE WOOD',

        paragraphs: [
          'Pine timber for construction, furniture, joinery, carpentry, and other applications.',
        ],
      },

      {
        title: 'BEECH WOOD',

        paragraphs: [
          'Beech timber suitable for furniture, joinery, carpentry, and other applications where hardwood characteristics are required.',
        ],
      },

      {
        title: 'MALAYSIAN HARDWOODS',

        paragraphs: [
          'Hardwood products sourced from Malaysia for a range of construction, furniture, joinery, and commercial applications.',
        ],
      },

      {
        title: 'AFRICAN HARDWOODS',

        paragraphs: [
          'Hardwood sourcing from selected African origins based on species, specification, availability, and customer requirements.',
        ],
      },
    ],
  },

  building: {
    title: 'OTHER BUILDING MATERIALS',
    images: [
      '/images/tg/tiles.webp',
      '/images/tg/steel-rebar.webp',
    ],
    imageAlt: 'Other building materials',

    items: [
      {
        title: 'TILES',
      },

      {
        title: 'STEEL REBAR',
      },
    ],
  },
};

/* =========================================================
   SHORT CONTENT DISPLAYED IN MAIN MOSAIC
========================================================= */

const plywood = [
  { label: 'Film Faced Plywood',  image: '/images/tg/Film-Faced-Plywood.webp' },
  { label: 'Commercial Plywood',  image: '/images/tg/Commercial-Plywood.webp' },
];

const timber = [
  { label: 'White Wood',          image: '/images/tg/white-wood.webp' },
  { label: 'Pine Wood',           image: '/images/tg/pine.webp' },
  { label: 'Beech Wood',          image: '/images/tg/beech.webp' },
  { label: 'Malaysian Hardwoods', image: '/images/tg/malaysian-hardwoods.webp' },
  { label: 'African Hardwoods',   image: '/images/tg/african-hardwoods.webp' },
];

const panels = [
  { label: 'MDF',               image: '/images/tg/MDF.webp' },
  { label: 'Melamine MDF',      image: '/images/tg/Melamine-MDF.webp' },
  { label: 'HMR MDF',          image: '/images/tg/HMR-MDF.webp' },
  { label: 'FR MDF',           image: '/images/tg/FR-MDF.webp' },
  { label: 'Jumbo MDF',        image: '/images/tg/Jumbo-MDF.webp' },
  { label: 'Solid Chipboard',  image: '/images/tg/Solid-Chipboard.webp' },
  { label: 'Hollow Chipboard', image: '/images/tg/Hollow-Chipboard.webp' },
];

const building = [
  { label: 'Tiles',       image: '/images/tg/tiles.webp' },
  { label: 'Steel Rebar', image: '/images/tg/steel-rebar.webp' },
];


/* =========================================================
   HOVER IMAGE — crossfades between two src values
========================================================= */

function HoverImage({ defaultSrc, activeSrc, alt, sizes, priority }) {
  const [displayed, setDisplayed] = useState(defaultSrc);
  const [fading, setFading]       = useState(null);

  useEffect(() => {
    const next = activeSrc || defaultSrc;
    if (next === displayed) return;
    setFading(displayed);
    setDisplayed(next);
    const t = setTimeout(() => setFading(null), 420);
    return () => clearTimeout(t);
  }, [activeSrc, defaultSrc]);

  return (
    <>
      <Image
        key={displayed}
        src={displayed}
        alt={alt}
        fill
        sizes={sizes}
        className="product-img"
        priority={priority}
        style={{ opacity: 1, transition: 'opacity 0.4s ease' }}
      />
      {fading && (
        <Image
          key={`fade-${fading}`}
          src={fading}
          alt=""
          fill
          sizes={sizes}
          className="product-img"
          aria-hidden
          style={{ opacity: 0, transition: 'opacity 0.4s ease', pointerEvents: 'none' }}
        />
      )}
    </>
  );
}


function KnowMoreButton({ product, onClick }) {
  return (
    <button
      type="button"
      className="product-know-more"
      onClick={() => onClick(product)}
      aria-label={`Know more about ${product}`}
    >
      <span>Know More</span>

      <span
        className="product-know-more-arrow"
        aria-hidden="true"
      >
        ↗
      </span>
    </button>
  );
}


/* =========================================================
   PRODUCT DETAILS MODAL
========================================================= */

function ProductModal({ productKey, onClose }) {
  const product = productGroups[productKey];
  const modalRef = useRef(null);
  const contentRef = useRef(null);
  const [slide, setSlide] = useState(0);

  useEffect(() => { setSlide(0); }, [productKey]);

  const images = product?.images ?? [];
  const prev = () => setSlide(s => (s - 1 + images.length) % images.length);
  const next = () => setSlide(s => (s + 1) % images.length);

  useEffect(() => {
    if (!product) return undefined;

    const html = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY;
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    const previous = {
      htmlOverflow: html.style.overflow,
      htmlOverscrollBehavior: html.style.overscrollBehavior,
      htmlScrollBehavior: html.style.scrollBehavior,
      bodyOverflow: body.style.overflow,
      bodyOverscrollBehavior: body.style.overscrollBehavior,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
      bodyWidth: body.style.width,
      bodyPaddingRight: body.style.paddingRight,
    };

    /*
     * Hard-lock the document at its current position.
     * This prevents mouse-wheel/trackpad events from moving the page
     * behind the modal in Chrome, Edge, Firefox and Safari.
     */
    html.classList.add('product-modal-open');
    body.classList.add('product-modal-open');

    html.style.overflow = 'hidden';
    html.style.overscrollBehavior = 'none';

    body.style.overflow = 'hidden';
    body.style.overscrollBehavior = 'none';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    /*
     * Route mouse-wheel / trackpad movement anywhere inside the modal
     * to the right-side content panel. This also means scrolling works
     * while the pointer is over the image.
     */
    const modal = modalRef.current;
    const content = contentRef.current;

    const handleWheel = (event) => {
      if (!content) return;

      event.preventDefault();
      event.stopPropagation();

      let multiplier = 1;

      if (event.deltaMode === 1) multiplier = 24;
      if (event.deltaMode === 2) multiplier = content.clientHeight;

      content.scrollTop += event.deltaY * multiplier;
    };

    if (modal) {
      modal.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);

      if (modal) {
        modal.removeEventListener('wheel', handleWheel);
      }

      html.classList.remove('product-modal-open');
      body.classList.remove('product-modal-open');

      html.style.overflow = previous.htmlOverflow;
      html.style.overscrollBehavior = previous.htmlOverscrollBehavior;

      body.style.overflow = previous.bodyOverflow;
      body.style.overscrollBehavior = previous.bodyOverscrollBehavior;
      body.style.position = previous.bodyPosition;
      body.style.top = previous.bodyTop;
      body.style.left = previous.bodyLeft;
      body.style.right = previous.bodyRight;
      body.style.width = previous.bodyWidth;
      body.style.paddingRight = previous.bodyPaddingRight;

      /* Restore the exact page position without a smooth-scroll jump. */
      html.style.scrollBehavior = 'auto';
      window.scrollTo(0, scrollY);
      html.style.scrollBehavior = previous.htmlScrollBehavior;
    };
  }, [product, onClose]);

  if (!product) return null;

  const modal = (
    <div
      className="product-modal-backdrop"
      role="presentation"
      onMouseDown={onClose}
    >
      <div
        ref={modalRef}
        className="product-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="product-modal-close"
          aria-label="Close product details"
          onClick={onClose}
        >
          ×
        </button>

        <div className="product-modal-media">
          {images.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={i === 0 ? product.imageAlt : ''}
              fill
              sizes="(max-width: 820px) 100vw, 45vw"
              className="product-modal-img"
              style={{
                opacity: i === slide ? 1 : 0,
                transition: 'opacity 0.45s ease',
                zIndex: i === slide ? 1 : 0,
              }}
            />
          ))}

          {images.length > 1 && (
            <>
              <button
                className="modal-slide-btn modal-slide-prev"
                onClick={prev}
                aria-label="Previous image"
              >‹</button>
              <button
                className="modal-slide-btn modal-slide-next"
                onClick={next}
                aria-label="Next image"
              >›</button>
              <div className="modal-slide-dots">
                {images.map((_, i) => (
                  <button
                    key={i}
                    className={`modal-slide-dot${i === slide ? ' is-active' : ''}`}
                    onClick={() => setSlide(i)}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div ref={contentRef} className="product-modal-content">
          <span className="eyebrow">OUR PRODUCTS</span>

          <h2 id="product-modal-title" className="type-h3">
            {product.title}
          </h2>

          {product.subtitle && (
            <h3 className="product-modal-subtitle">{product.subtitle}</h3>
          )}

          {product.intro && (
            <p className="body-content product-modal-intro">
              {product.intro}
            </p>
          )}

          <div className="product-modal-items">
            {product.items.map((item) => (
              <article className="product-modal-item" key={item.title}>
                <h3>{item.title}</h3>

                {item.paragraphs?.map((paragraph, index) => (
                  <p key={`${item.title}-${index}`}>{paragraph}</p>
                ))}

                {item.applications && (
                  <div className="product-modal-applications">
                    <strong>Applications:</strong>

                    <ul>
                      {item.applications.map((application) => (
                        <li key={application}>{application}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}


/* =========================================================
   PRODUCTS SECTION
========================================================= */

export default function ProductsSection() {
  const [activeProduct, setActiveProduct] = useState(null);
  const [hovered, setHovered] = useState({});

  const closeModal = () => setActiveProduct(null);

  const onEnter = (group, image) => setHovered(h => ({ ...h, [group]: image }));
  const onLeave = (group)        => setHovered(h => ({ ...h, [group]: null }));

  return (
    <>
      <section
        id="products"
        className="products-section section-space"
      >
        <div className="products-shell">

          {/* =================================================
              HEADING
          ================================================= */}

          <div
            className="products-heading"
            data-reveal
          >
            <h2 className="products-main-title type-h2">
              Timber, Panels &amp; Building
              <br />
              Materials for Global Markets
            </h2>

            <p className="products-intro body-content">
              We specialize in sourcing and trading a
              wide range of wood-based panels,
              timber, and construction-related
              materials.
            </p>
          </div>


          {/* =================================================
              PRODUCTS MOSAIC
          ================================================= */}

          <div
            className="products-mosaic"
            data-stagger
          >

            {/* ===============================================
                TOP ROW
            =============================================== */}

            <div className="products-row products-row-top">

              {/* PLYWOOD IMAGE */}

              <div className="product-media product-plywood-image">
                <HoverImage
                  defaultSrc="/images/tg/plywood.webp"
                  activeSrc={hovered.plywood}
                  alt="Plywood products"
                  sizes="(max-width: 820px) 100vw, 35vw"
                  priority={false}
                />
              </div>


              {/* PLYWOOD CARD */}

              <div className="product-info product-plywood-info">
                <h3>PLYWOOD</h3>

                <ul>
                  {plywood.map((item) => (
                    <li
                      key={item.label}
                      onMouseEnter={() => onEnter('plywood', item.image)}
                      onMouseLeave={() => onLeave('plywood')}
                    >
                      {item.label}
                    </li>
                  ))}
                </ul>

                <KnowMoreButton product="plywood" onClick={setActiveProduct} />
              </div>


              {/* PANELS IMAGE */}

              <div className="product-media product-panels-image">
                <HoverImage
                  defaultSrc="/images/tg/MDF.webp"
                  activeSrc={hovered.panels}
                  alt="MDF and panel products"
                  sizes="(max-width: 820px) 100vw, 18vw"
                />
              </div>


              {/* PANELS CARD */}

              <div className="product-info product-dark product-panels-info">
                <h3>MDF &amp; PANEL PRODUCTS</h3>

                <ul>
                  {panels.map((item) => (
                    <li
                      key={item.label}
                      onMouseEnter={() => onEnter('panels', item.image)}
                      onMouseLeave={() => onLeave('panels')}
                    >
                      {item.label}
                    </li>
                  ))}
                </ul>

                <KnowMoreButton product="panels" onClick={setActiveProduct} />
              </div>
            </div>


            {/* ===============================================
                BOTTOM ROW
            =============================================== */}

            <div className="products-row products-row-bottom">

              {/* TIMBER IMAGE */}

              <div className="product-media product-timber-image">
                <HoverImage
                  defaultSrc="/images/tg/timber-wood.webp"
                  activeSrc={hovered.timber}
                  alt="Timber and wood products"
                  sizes="(max-width: 820px) 100vw, 25vw"
                />
              </div>


              {/* TIMBER CARD */}

              <div className="product-info product-timber-info">
                <h3>TIMBER &amp; WOOD</h3>

                <ul>
                  {timber.map((item) => (
                    <li
                      key={item.label}
                      onMouseEnter={() => onEnter('timber', item.image)}
                      onMouseLeave={() => onLeave('timber')}
                    >
                      {item.label}
                    </li>
                  ))}
                </ul>

                <KnowMoreButton product="timber" onClick={setActiveProduct} />
              </div>


              {/* OTHER MATERIALS CARD */}

              <div className="product-info product-building-info">
                <h3>
                  OTHER BUILDING
                  <br />
                  MATERIALS
                </h3>

                <ul>
                  {building.map((item) => (
                    <li
                      key={item.label}
                      onMouseEnter={() => onEnter('building', item.image)}
                      onMouseLeave={() => onLeave('building')}
                    >
                      {item.label}
                    </li>
                  ))}
                </ul>

                <KnowMoreButton product="building" onClick={setActiveProduct} />
              </div>


              {/* OTHER MATERIALS IMAGE */}

              <div className="product-media product-building-image">
                <HoverImage
                  defaultSrc="/images/tg/other-materials.webp"
                  activeSrc={hovered.building}
                  alt="Other building materials"
                  sizes="(max-width: 820px) 100vw, 18vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ===================================================
          MODAL
      =================================================== */}

      <ProductModal
        productKey={activeProduct}
        onClose={closeModal}
      />
    </>
  );
}