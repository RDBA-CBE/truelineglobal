'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, MessageCircle, X } from 'lucide-react';
import { ENQUIRY_MODAL_EVENT } from './EnquiryTrigger';
import { sendEnquiryEmail } from './EmailService';

const initialStatus = { state: 'idle', message: '' };

export default function EnquiryModal() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [enquiryType, setEnquiryType] = useState('Buyer / Importer');
  const [status, setStatus] = useState(initialStatus);
  const dialogRef = useRef(null);
  const formWrapRef = useRef(null);
  const firstFieldRef = useRef(null);

  useEffect(() => {
    setMounted(true);

    const handleOpen = (event) => {
      setEnquiryType(event.detail?.enquiryType || 'Buyer / Importer');
      setStatus(initialStatus);
      setOpen(true);
    };

    window.addEventListener(ENQUIRY_MODAL_EVENT, handleOpen);
    return () => window.removeEventListener(ENQUIRY_MODAL_EVENT, handleOpen);
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    const html = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY;
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    const previous = {
      htmlOverflow: html.style.overflow,
      htmlOverscroll: html.style.overscrollBehavior,
      bodyOverflow: body.style.overflow,
      bodyOverscroll: body.style.overscrollBehavior,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
      bodyWidth: body.style.width,
      bodyPaddingRight: body.style.paddingRight,
    };

    html.classList.add('enquiry-modal-open');
    body.classList.add('enquiry-modal-open');
    html.style.overflow = 'hidden';
    html.style.overscrollBehavior = 'none';
    body.style.overflow = 'hidden';
    body.style.overscrollBehavior = 'none';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';

    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    window.setTimeout(() => firstFieldRef.current?.focus(), 40);

    /*
     * Lenis handles the page wheel globally, so while the document is locked
     * route wheel / trackpad input directly to the enquiry modal scroller.
     * Desktop scrolls the form panel; mobile scrolls the full modal.
     */
    const dialog = dialogRef.current;
    const formWrap = formWrapRef.current;

    const handleWheel = (event) => {
      const formCanScroll =
        formWrap && formWrap.scrollHeight > formWrap.clientHeight + 1;
      const scroller = formCanScroll ? formWrap : dialog;

      if (!scroller || scroller.scrollHeight <= scroller.clientHeight + 1) return;

      event.preventDefault();
      event.stopPropagation();

      let multiplier = 1;
      if (event.deltaMode === 1) multiplier = 24;
      if (event.deltaMode === 2) multiplier = scroller.clientHeight;

      scroller.scrollTop += event.deltaY * multiplier;
    };

    if (dialog) {
      dialog.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (dialog) dialog.removeEventListener('wheel', handleWheel);
      html.classList.remove('enquiry-modal-open');
      body.classList.remove('enquiry-modal-open');
      html.style.overflow = previous.htmlOverflow;
      html.style.overscrollBehavior = previous.htmlOverscroll;
      body.style.overflow = previous.bodyOverflow;
      body.style.overscrollBehavior = previous.bodyOverscroll;
      body.style.position = previous.bodyPosition;
      body.style.top = previous.bodyTop;
      body.style.left = previous.bodyLeft;
      body.style.right = previous.bodyRight;
      body.style.width = previous.bodyWidth;
      body.style.paddingRight = previous.bodyPaddingRight;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = Object.fromEntries(new FormData(form).entries());

    setStatus({ state: 'submitting', message: 'Sending your enquiry…' });

    try {
      await sendEnquiryEmail(formData);
      form.reset();
      setStatus({
        state: 'success',
        message: 'Thank you. Your enquiry has been sent successfully.',
      });
    } catch (error) {
      setStatus({
        state: 'error',
        message: 'Unable to send your enquiry right now.',
      });
    }
  };

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="enquiry-modal-backdrop"
      role="presentation"
      onMouseDown={() => setOpen(false)}
    >
      <div
        ref={dialogRef}
        className="enquiry-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <aside className="enquiry-modal-aside">
          <p className="type-eyebrow">GLOBAL SOURCING</p>
          <h2 id="enquiry-modal-title">Tell Us What You Need.</h2>
          <p>
            Share your product, specification, quantity and destination. Our team
            will review the requirement and explore suitable sourcing options.
          </p>

          <div className="enquiry-modal-points" aria-label="What happens next">
            <span><Check size={16} /> Requirement review</span>
            <span><Check size={16} /> Supplier and origin evaluation</span>
            <span><Check size={16} /> Commercial and logistics coordination</span>
          </div>

 <a
    href="https://wa.me/971564010123"
    target="_blank"
    rel="noopener noreferrer"
    className="enquiry-whatsapp-link"
    aria-label="Enquire via WhatsApp"
  >
    <span className="whatsapp-icon">
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
      >
        <path
          fill="#25D366"
          d="M16.01 3C8.83 3 3 8.82 3 16c0 2.29.6 4.53 1.74 6.51L3.05 29l6.63-1.64A12.93 12.93 0 0 0 16 29c7.18 0 13-5.82 13-13S23.19 3 16.01 3Zm0 23.67c-2.03 0-4.02-.54-5.76-1.57l-.41-.24-3.94.98 1.05-3.83-.27-.42A10.88 10.88 0 0 1 5.13 16c0-6 4.88-10.87 10.88-10.87S26.88 10 26.88 16s-4.87 10.67-10.87 10.67Zm5.96-8.16c-.33-.17-1.94-.96-2.24-1.07-.3-.11-.52-.17-.74.17-.22.33-.85 1.07-1.04 1.29-.19.22-.38.25-.7.08-.33-.17-1.39-.51-2.65-1.63-.98-.87-1.64-1.94-1.83-2.27-.19-.33-.02-.51.14-.68.15-.15.33-.38.49-.57.16-.19.22-.33.33-.55.11-.22.06-.41-.03-.57-.08-.17-.74-1.79-1.02-2.45-.27-.65-.54-.56-.74-.57h-.63c-.22 0-.57.08-.87.41-.3.33-1.14 1.11-1.14 2.71s1.17 3.14 1.33 3.36c.16.22 2.3 3.51 5.57 4.92.78.34 1.39.54 1.86.69.78.25 1.49.22 2.05.13.63-.09 1.94-.79 2.21-1.55.27-.76.27-1.41.19-1.55-.08-.14-.3-.22-.63-.39Z"
        />
      </svg>
    </span>

    <span className="whatsapp-content">
      <strong>Enquire now on WhatsApp</strong>
      <span>+971 56 401 0123</span>
    </span>
  </a>
        </aside>

        <div ref={formWrapRef} className="enquiry-modal-form-wrap">
          <button
            type="button"
            className="enquiry-modal-close"
            onClick={() => setOpen(false)}
            aria-label="Close enquiry form"
          >
            <X size={22} aria-hidden="true" />
          </button>

          <div className="enquiry-form-heading">
            <p className="type-eyebrow">SEND YOUR REQUIREMENT</p>
            <h3>Request a Quote</h3>
          </div>

          <form className="enquiry-form" onSubmit={handleSubmit}>
            <div className="enquiry-form-grid">
              <label className="form-field">
                <span>Full Name *</span>
                <input ref={firstFieldRef} name="name" type="text" autoComplete="name" required />
              </label>

              <label className="form-field">
                <span>Company</span>
                <input name="company" type="text" autoComplete="organization" />
              </label>

              <label className="form-field">
                <span>Email *</span>
                <input name="email" type="email" autoComplete="email" required />
              </label>

              <label className="form-field">
                <span>Phone / WhatsApp</span>
                <input name="phone" type="tel" autoComplete="tel" />
              </label>

              <label className="form-field">
                <span>Country</span>
                <input name="country" type="text" autoComplete="country-name" />
              </label>

              <label className="form-field">
                <span>Enquiry Type *</span>
                <select name="enquiryType" defaultValue={enquiryType} required>
                  <option>Buyer / Importer</option>
                  <option>Manufacturer / Sawmill</option>
                  <option>Distributor / Agent</option>
                  <option>General Enquiry</option>
                </select>
              </label>

              <label className="form-field">
                <span>Product</span>
                <input name="product" type="text" placeholder="e.g. Film Faced Plywood" />
              </label>

              <label className="form-field">
                <span>Quantity</span>
                <input name="quantity" type="text" placeholder="e.g. 2 containers" />
              </label>

              <label className="form-field">
                <span>Required Origin</span>
                <input name="origin" type="text" placeholder="If applicable" />
              </label>

              <label className="form-field">
                <span>Destination</span>
                <input name="destination" type="text" placeholder="City / Port / Country" />
              </label>

              <label className="form-field form-field-wide">
                <span>Specification / Requirement *</span>
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Share grade, dimensions, thickness, quality, application, delivery requirement or any other details."
                  required
                />
              </label>
            </div>

            <input type="text" name="website" className="form-honeypot" tabIndex="-1" autoComplete="off" />

            <div className="enquiry-form-footer">
              <p className={`enquiry-form-status is-${status.state}`} aria-live="polite">
                {status.message}
              </p>

              <button
                className="enquiry-submit"
                type="submit"
                disabled={status.state === 'submitting'}
              >
                {status.state === 'submitting' ? 'Sending…' : 'Send Enquiry'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.body,
  );
}
