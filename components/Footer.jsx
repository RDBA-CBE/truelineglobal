import Logo from './Logo';
import EnquiryTrigger from './EnquiryTrigger';

export default function Footer() {
  return (
    <footer id="contact" className="site-footer">
      <div className="footer-main">
        <div className="shell footer-top">
          <div className="footer-brand">
            <Logo />
            <h3 className="footer-heading">Source Globally. Trade Confidently.</h3>
            <p>
              Trueline Global Trading connects reliable manufacturers and suppliers
              with customers across global markets, trading building materials and
              construction products.
            </p>
          </div>

          <EnquiryTrigger className="footer-cta" enquiryType="Buyer / Importer">
            Send Your Requirement
          </EnquiryTrigger>
        </div>

        <div className="shell footer-grid">
          <div>
            <span>Company</span>
            <a href="#top">Home</a>
            <a href="#about">About</a>
            <a href="#network">Global Sourcing</a>
            <a href="#trade">Markets</a>
            <a href="#contact">Contact</a>
          </div>

          <div>
            <span>Products</span>
            <a href="#products">Film Faced Plywood</a>
            <a href="#products">Commercial Plywood</a>
            <a href="#products">MDF &amp; Boards</a>
            <a href="#products">Timber &amp; Wood</a>
            <a href="#products">Tiles</a>
            <a href="#products">Steel Rebar</a>
          </div>

          <div>
            <span>Business</span>
            <a href="#inquiry">For Traders / Importers</a>
            <EnquiryTrigger className="footer-link-button" enquiryType="Buyer / Importer">
              Request a Quote
            </EnquiryTrigger>
            <a href="#inquiry">For Manufacturers &amp; Sawmills</a>
            <EnquiryTrigger className="footer-link-button" enquiryType="Manufacturer / Sawmill">
              Become a Supply Partner
            </EnquiryTrigger>
          </div>

          <div>
            <span>Contact</span>
            <p className="footer-contact-name">Trueline Global Trading</p>
            <p>Dubai, United Arab Emirates</p>
            <a className="footer-email" href="mailto:info@truelineglobal.net">
              info@truelineglobal.net
            </a>
            <p>+971 XXXXXXX</p>
          </div>
        </div>
      </div>

      <div className="footer-wood" aria-hidden="true" />

      <div className="footer-copyright">
        © 2026 Trueline Global Trading. All rights reserved. Concept by Repute.
      </div>
    </footer>
  );
}
