'use client';

export const ENQUIRY_MODAL_EVENT = 'trueline:open-enquiry';

export default function EnquiryTrigger({
  children,
  className = '',
  enquiryType = 'Buyer / Importer',
  ariaLabel,
}) {
  const openModal = () => {
    window.dispatchEvent(
      new CustomEvent(ENQUIRY_MODAL_EVENT, {
        detail: { enquiryType },
      }),
    );
  };

  return (
    <button
      type="button"
      className={className}
      onClick={openModal}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
