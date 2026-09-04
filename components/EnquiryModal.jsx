'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, X } from 'lucide-react';

import { ENQUIRY_MODAL_EVENT } from './EnquiryTrigger';
import { sendEnquiryEmail } from './EmailService';

const initialStatus = {
  state: 'idle',
  message: '',
};

const DEFAULT_ENQUIRY_TYPE = 'Buyer / Importer';

const VALID_ENQUIRY_TYPES = [
  'Buyer / Importer',
  'Supplier / Exporter',
];

function normalizeEnquiryType(value) {
  if (VALID_ENQUIRY_TYPES.includes(value)) {
    return value;
  }

  return DEFAULT_ENQUIRY_TYPE;
}

export default function EnquiryModal() {
  const [mounted, setMounted] = useState(false);

  const [open, setOpen] = useState(false);

  const [enquiryType, setEnquiryType] = useState(
    DEFAULT_ENQUIRY_TYPE
  );

  const [status, setStatus] = useState(initialStatus);

  const dialogRef = useRef(null);
  const firstFieldRef = useRef(null);

  /*
   * =========================================================
   * INITIALIZE MODAL
   * =========================================================
   */
  useEffect(() => {
    setMounted(true);

    const handleOpen = (event) => {
      const requestedType = normalizeEnquiryType(
        event.detail?.enquiryType
      );

      setEnquiryType(requestedType);

      setStatus(initialStatus);

      setOpen(true);
    };

    window.addEventListener(
      ENQUIRY_MODAL_EVENT,
      handleOpen
    );

    return () => {
      window.removeEventListener(
        ENQUIRY_MODAL_EVENT,
        handleOpen
      );
    };
  }, []);

  /*
   * =========================================================
   * LOCK PAGE SCROLL WHILE MODAL IS OPEN
   * =========================================================
   */
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const html = document.documentElement;
    const body = document.body;

    const scrollY = window.scrollY;

    const scrollbarWidth =
      window.innerWidth - html.clientWidth;

    const previous = {
      htmlOverflow: html.style.overflow,

      htmlOverscroll:
        html.style.overscrollBehavior,

      bodyOverflow:
        body.style.overflow,

      bodyOverscroll:
        body.style.overscrollBehavior,

      bodyPosition:
        body.style.position,

      bodyTop:
        body.style.top,

      bodyLeft:
        body.style.left,

      bodyRight:
        body.style.right,

      bodyWidth:
        body.style.width,

      bodyPaddingRight:
        body.style.paddingRight,
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

    if (scrollbarWidth > 0) {
      body.style.paddingRight =
        `${scrollbarWidth}px`;
    }

    /*
     * ESC key closes modal
     */
    const handleKeyDown = (event) => {
      if (
        event.key === 'Escape' &&
        status.state !== 'submitting'
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      'keydown',
      handleKeyDown
    );

    /*
     * Automatically focus first field
     */
    const focusTimer = window.setTimeout(() => {
      firstFieldRef.current?.focus();
    }, 50);

    return () => {
      window.clearTimeout(focusTimer);

      document.removeEventListener(
        'keydown',
        handleKeyDown
      );

      html.classList.remove('enquiry-modal-open');
      body.classList.remove('enquiry-modal-open');

      html.style.overflow =
        previous.htmlOverflow;

      html.style.overscrollBehavior =
        previous.htmlOverscroll;

      body.style.overflow =
        previous.bodyOverflow;

      body.style.overscrollBehavior =
        previous.bodyOverscroll;

      body.style.position =
        previous.bodyPosition;

      body.style.top =
        previous.bodyTop;

      body.style.left =
        previous.bodyLeft;

      body.style.right =
        previous.bodyRight;

      body.style.width =
        previous.bodyWidth;

      body.style.paddingRight =
        previous.bodyPaddingRight;

      window.scrollTo(0, scrollY);
    };
  }, [open, status.state]);

  /*
   * =========================================================
   * CLOSE MODAL
   * =========================================================
   */
  const closeModal = () => {
    if (status.state === 'submitting') {
      return;
    }

    setOpen(false);
  };

  /*
   * =========================================================
   * EMAILJS FORM SUBMISSION
   * =========================================================
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    /*
     * Prevent duplicate submissions
     */
    if (status.state === 'submitting') {
      return;
    }

    const form = event.currentTarget;

    const formData = new FormData(form);

    /*
     * =====================================================
     * HONEYPOT
     *
     * This field is hidden from normal users.
     * Bots may fill it.
     * =====================================================
     */
    const honeypot =
      formData.get('website')?.toString().trim();

    if (honeypot) {
      console.warn('Spam submission blocked.');

      return;
    }

    /*
     * =====================================================
     * BUILD FORM DATA
     * =====================================================
     */
    const enquiryData = {
      /*
       * Required
       */
      fullName:
        formData
          .get('fullName')
          ?.toString()
          .trim() || '',

      email:
        formData
          .get('email')
          ?.toString()
          .trim() || '',

      enquiryType:
        formData
          .get('enquiryType')
          ?.toString()
          .trim() ||
        DEFAULT_ENQUIRY_TYPE,

      specification:
        formData
          .get('specification')
          ?.toString()
          .trim() || '',

      /*
       * Optional
       */
      company:
        formData
          .get('company')
          ?.toString()
          .trim() || '',

      phone:
        formData
          .get('phone')
          ?.toString()
          .trim() || '',

      country:
        formData
          .get('country')
          ?.toString()
          .trim() || '',

      product:
        formData
          .get('product')
          ?.toString()
          .trim() || '',

      quantity:
        formData
          .get('quantity')
          ?.toString()
          .trim() || '',

      requiredOrigin:
        formData
          .get('requiredOrigin')
          ?.toString()
          .trim() || '',

      destination:
        formData
          .get('destination')
          ?.toString()
          .trim() || '',
    };

    /*
     * =====================================================
     * VALIDATE REQUIRED FIELDS
     * =====================================================
     */
    if (!enquiryData.fullName) {
      setStatus({
        state: 'error',
        message: 'Please enter your full name.',
      });

      firstFieldRef.current?.focus();

      return;
    }

    if (!enquiryData.email) {
      setStatus({
        state: 'error',
        message:
          'Please enter your email address.',
      });

      return;
    }

    if (!enquiryData.enquiryType) {
      setStatus({
        state: 'error',
        message:
          'Please select an enquiry type.',
      });

      return;
    }

    if (!enquiryData.specification) {
      setStatus({
        state: 'error',
        message:
          'Please enter your specification or requirement.',
      });

      return;
    }

    /*
     * =====================================================
     * SENDING
     * =====================================================
     */
    setStatus({
      state: 'submitting',
      message: 'Sending your enquiry…',
    });

    try {
      /*
       * Send through EmailJS
       */
      await sendEnquiryEmail(enquiryData);

      /*
       * Reset form
       */
      form.reset();

      /*
       * Reset controlled select
       */
      setEnquiryType(
        DEFAULT_ENQUIRY_TYPE
      );

      /*
       * Success
       */
      setStatus({
        state: 'success',
        message:
          'Thank you. Your enquiry has been sent successfully.',
      });
    } catch (error) {
      console.error(
        'Enquiry submission failed:',
        error
      );

      setStatus({
        state: 'error',
        message:
          'Unable to send your enquiry right now. Please try again.',
      });
    }
  };

  /*
   * =========================================================
   * DON'T RENDER BEFORE CLIENT LOAD
   * =========================================================
   */
  if (!mounted || !open) {
    return null;
  }

  /*
   * =========================================================
   * MODAL HTML
   * =========================================================
   */
  return createPortal(
    <div
      className="enquiry-modal-backdrop"
      role="presentation"
      onMouseDown={closeModal}
    >
      <div
        ref={dialogRef}
        className="enquiry-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-modal-title"
        onMouseDown={(event) => {
          event.stopPropagation();
        }}
      >
        {/* ==============================================
            LEFT CONTENT
        ============================================== */}

        <aside className="enquiry-modal-aside">

          <p className="type-eyebrow">
            GLOBAL SOURCING
          </p>

          <h2 id="enquiry-modal-title">
            Tell Us What You Need.
          </h2>

          <p>
            Share your product, specification,
            quantity and destination. Our team
            will review the requirement and
            explore suitable sourcing options.
          </p>

          <div
            className="enquiry-modal-points"
            aria-label="What happens next"
          >
            <span>
              <Check
                size={16}
                aria-hidden="true"
              />

              Requirement review
            </span>

            <span>
              <Check
                size={16}
                aria-hidden="true"
              />

              Supplier and origin evaluation
            </span>

            <span>
              <Check
                size={16}
                aria-hidden="true"
              />

              Commercial and logistics
              coordination
            </span>
          </div>

        </aside>


        {/* ==============================================
            RIGHT FORM
        ============================================== */}

        <div className="enquiry-modal-form-wrap">

          {/* CLOSE BUTTON */}

          <button
            type="button"
            className="enquiry-modal-close"
            onClick={closeModal}
            disabled={
              status.state === 'submitting'
            }
            aria-label="Close enquiry form"
          >
            <X
              size={22}
              aria-hidden="true"
            />
          </button>


          {/* FORM HEADING */}

          <div className="enquiry-form-heading">

            <p className="type-eyebrow">
              SEND YOUR REQUIREMENT
            </p>

            <h3>
              Request a Quote
            </h3>

          </div>


          {/* ==============================================
              FORM
          ============================================== */}

          <form
            className="enquiry-form"
            onSubmit={handleSubmit}
          >

            <div className="enquiry-form-grid">


              {/* FULL NAME - REQUIRED */}

              <label className="form-field">

                <span>
                  Full Name *
                </span>

                <input
                  ref={firstFieldRef}
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  disabled={
                    status.state ===
                    'submitting'
                  }
                />

              </label>


              {/* COMPANY - OPTIONAL */}

              <label className="form-field">

                <span>
                  Company
                </span>

                <input
                  name="company"
                  type="text"
                  autoComplete="organization"
                  disabled={
                    status.state ===
                    'submitting'
                  }
                />

              </label>


              {/* EMAIL - REQUIRED */}

              <label className="form-field">

                <span>
                  Email *
                </span>

                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  disabled={
                    status.state ===
                    'submitting'
                  }
                />

              </label>


              {/* PHONE - OPTIONAL */}

              <label className="form-field">

                <span>
                  Phone / WhatsApp
                </span>

                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  disabled={
                    status.state ===
                    'submitting'
                  }
                />

              </label>


              {/* COUNTRY - OPTIONAL */}

              <label className="form-field">

                <span>
                  Country
                </span>

                <input
                  name="country"
                  type="text"
                  autoComplete="country-name"
                  disabled={
                    status.state ===
                    'submitting'
                  }
                />

              </label>


              {/* ENQUIRY TYPE - REQUIRED */}

              <label className="form-field">

                <span>
                  Enquiry Type *
                </span>

                <select
                  name="enquiryType"
                  value={enquiryType}
                  onChange={(event) => {
                    setEnquiryType(
                      event.target.value
                    );
                  }}
                  required
                  disabled={
                    status.state ===
                    'submitting'
                  }
                >

                  <option value="Buyer / Importer">
                    Buyer / Importer
                  </option>

                  <option value="Supplier / Exporter">
                    Supplier / Exporter
                  </option>

                </select>

              </label>


              {/* PRODUCT - OPTIONAL */}

              <label className="form-field">

                <span>
                  Product
                </span>

                <input
                  name="product"
                  type="text"
                  placeholder="e.g. Film Faced Plywood"
                  disabled={
                    status.state ===
                    'submitting'
                  }
                />

              </label>


              {/* QUANTITY - OPTIONAL */}

              <label className="form-field">

                <span>
                  Quantity
                </span>

                <input
                  name="quantity"
                  type="text"
                  placeholder="e.g. 2 containers"
                  disabled={
                    status.state ===
                    'submitting'
                  }
                />

              </label>


              {/* REQUIRED ORIGIN - OPTIONAL */}

              <label className="form-field">

                <span>
                  Required Origin
                </span>

                <input
                  name="requiredOrigin"
                  type="text"
                  placeholder="If applicable"
                  disabled={
                    status.state ===
                    'submitting'
                  }
                />

              </label>


              {/* DESTINATION - OPTIONAL */}

              <label className="form-field">

                <span>
                  Destination
                </span>

                <input
                  name="destination"
                  type="text"
                  placeholder="City / Port / Country"
                  disabled={
                    status.state ===
                    'submitting'
                  }
                />

              </label>


              {/* SPECIFICATION - REQUIRED */}

              <label
                className="form-field form-field-wide"
              >

                <span>
                  Specification / Requirement *
                </span>

                <textarea
                  name="specification"
                  rows="5"
                  placeholder="Share grade, dimensions, thickness, quality, application, delivery requirement or any other details."
                  required
                  disabled={
                    status.state ===
                    'submitting'
                  }
                />

              </label>

            </div>


            {/* ==========================================
                HONEYPOT
            ========================================== */}

            <input
              type="text"
              name="website"
              className="form-honeypot"
              tabIndex="-1"
              autoComplete="off"
              aria-hidden="true"
            />


            {/* ==========================================
                STATUS + BUTTON
            ========================================== */}

            <div className="enquiry-form-footer">

              <p
                className={`enquiry-form-status is-${status.state}`}
                aria-live="polite"
                aria-atomic="true"
              >
                {status.message}
              </p>


              <button
                className="enquiry-submit"
                type="submit"
                disabled={
                  status.state ===
                  'submitting'
                }
              >

                {status.state ===
                'submitting'
                  ? 'Sending Enquiry…'
                  : 'Send Enquiry'}

              </button>

            </div>

          </form>

        </div>

      </div>

    </div>,

    document.body
  );
}