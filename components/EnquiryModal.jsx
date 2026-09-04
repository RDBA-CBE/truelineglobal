'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, X } from 'lucide-react';
import { ENQUIRY_MODAL_EVENT } from './EnquiryTrigger';

const initialStatus = { state: 'idle', message: '' };

export default function EnquiryModal() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [enquiryType, setEnquiryType] = useState('Buyer / Importer');
  const [status, setStatus] = useState(initialStatus);
  const dialogRef = useRef(null);
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

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
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
    const formData = new FormData(form);

    setStatus({ state: 'submitting', message: 'Sending your enquiry…' });

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || 'Unable to send your enquiry right now.');
      }

      form.reset();
      setStatus({
        state: 'success',
        message: 'Thank you. Your enquiry has been sent successfully.',
      });
    } catch (error) {
      setStatus({
        state: 'error',
        message: error.message || 'Unable to send your enquiry right now.',
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
        </aside>

        <div className="enquiry-modal-form-wrap">
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
