'use client';

export const ENQUIRY_MODAL_EVENT =
  'open-enquiry-modal';

export function openEnquiryModal(
  enquiryType = 'Buyer / Importer'
) {
  window.dispatchEvent(
    new CustomEvent(
      ENQUIRY_MODAL_EVENT,
      {
        detail: {
          enquiryType,
        },
      }
    )
  );
}

export default function EnquiryTrigger({
  children = 'Send Enquiry',
  enquiryType = 'Buyer / Importer',
  className = '',
}) {
  const handleClick = () => {
    openEnquiryModal(enquiryType);
  };

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}