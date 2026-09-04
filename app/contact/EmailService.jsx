import emailjs from '@emailjs/browser';

const SERVICE_ID = "service_txoc0be";
const ADMIN_TEMPLATE_ID = "template_qyok2ea";
const PUBLIC_KEY = "Wp8hElj8QnN1Oi_gY";
const ADMIN_EMAIL = "rdba.developer@gmail.com";


export async function sendEnquiryEmail(formData) {
  const adminParams = {
    to_email: ADMIN_EMAIL,
    time: new Date().toLocaleString(),
    ...formData,
  };

  await emailjs.send(SERVICE_ID, ADMIN_TEMPLATE_ID, adminParams, PUBLIC_KEY);
}
