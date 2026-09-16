'use client';

import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_0emsbde';
const TEMPLATE_ID = 'template_z81f8g9';
const PUBLIC_KEY = 'Gg876jBj2IFChURun';

export async function sendEnquiryEmail(formData) {
  const params = {
    name: formData.name?.trim() || '',
    email: formData.email?.trim() || '',
    enquiryType: formData.enquiryType?.trim() || 'Buyer / Importer',
    message: formData.message?.trim() || '',
    company: formData.company?.trim() || '',
    phone: formData.phone?.trim() || '',
    country: formData.country?.trim() || '',
    product: formData.product?.trim() || '',
    quantity: formData.quantity?.trim() || '',
    origin: formData.origin?.trim() || '',
    destination: formData.destination?.trim() || '',
    time: new Date().toLocaleString(),
    pageUrl: typeof window !== 'undefined' ? window.location.href : '',
  };

  return emailjs.send(SERVICE_ID, TEMPLATE_ID, params, { publicKey: PUBLIC_KEY });
}