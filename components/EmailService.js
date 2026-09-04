'use client';

import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_txoc0be';
const ADMIN_TEMPLATE_ID = 'template_qyok2ea';
const PUBLIC_KEY = 'Wp8hElj8QnN1Oi_gY';
const ADMIN_EMAIL = 'rdba.developer@gmail.com';

export async function sendEnquiryEmail(formData) {
  const adminParams = {
    /*
     * Recipient
     */
    to_email: ADMIN_EMAIL,

    /*
     * Required fields
     */
    fullName: formData.fullName?.trim() || '',
    email: formData.email?.trim() || '',
    enquiryType:
      formData.enquiryType?.trim() || 'Buyer / Importer',
    specification:
      formData.specification?.trim() || '',

    /*
     * Optional fields
     */
    company: formData.company?.trim() || '',
    phone: formData.phone?.trim() || '',
    country: formData.country?.trim() || '',
    product: formData.product?.trim() || '',
    quantity: formData.quantity?.trim() || '',
    requiredOrigin:
      formData.requiredOrigin?.trim() || '',
    destination:
      formData.destination?.trim() || '',

    /*
     * Extra information
     */
    time: new Date().toLocaleString(),

    pageUrl:
      typeof window !== 'undefined'
        ? window.location.href
        : '',
  };

  try {
    const response = await emailjs.send(
      SERVICE_ID,
      ADMIN_TEMPLATE_ID,
      adminParams,
      {
        publicKey: PUBLIC_KEY,
      }
    );

    return response;
  } catch (error) {
    console.error('EmailJS send error:', error);
    throw error;
  }
}