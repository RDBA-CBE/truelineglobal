
// Here is the complete, step-by-step guide in English to set up and configure EmailJS from scratch for your Next.js project so that you receive properly formatted quote enquiries directly to your admin email (psmkduraisamy@gmail.com).

// Step 1: Create an EmailJS Account
// Go to the official website: https://www.emailjs.com/

// Click on Sign Up Free and create an account using your email, or sign up directly with Google.

// Once logged in, you will see your EmailJS Dashboard.

// Step 2: Connect Your Email Service (Gmail)
// On the left sidebar of your dashboard, click on Email Services.

// Click the Add New Service button.

// Choose Gmail from the list of available services.

// Click Connect Account and log in with the Gmail account you want to use to send out the emails (e.g., your admin Gmail).

// Once connected, EmailJS will give you a Service ID (e.g., service_zk3hdzj). Copy this ID.

// Step 3: Create the Admin Email Template
// On the left sidebar, click on Email Templates.

// Click Create New Template.

// Name your template (e.g., Quote Admin Template).

// Configure the template fields as follows:

// Subject: New Quote Request from {{fullName}}

// To Email: psmkduraisamy@gmail.com (Your Admin email address)

// From Name: {{fullName}}

// Reply To: {{email}}

// Switch the template editor to Code Editor (HTML mode) and paste the professional template design below:


'use client';

import React, { useState } from 'react';
import { sendEnquiryEmail } from './EmailService';


export default function QuoteForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    country: '',
    enquiryType: 'Buyer / Importer',
    product: '',
    quantity: '',
    requiredOrigin: '',
    destination: '',
    specification: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendEnquiryEmail(formData);
      alert('Enquiry sent successfully!');
      setFormData({
        fullName: '', company: '', email: '', phone: '', country: '',
        enquiryType: 'Buyer / Importer', product: '', quantity: '',
        requiredOrigin: '', destination: '', specification: ''
      });
    } catch (error) {
      alert('Something went wrong, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Request a Quote</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name *</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className="w-full p-2 border rounded text-black" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Company</label>
          <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full p-2 border rounded text-black" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email *</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-2 border rounded text-black" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone / WhatsApp</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded text-black" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Country</label>
          <input type="text" name="country" value={formData.country} onChange={handleChange} className="w-full p-2 border rounded text-black" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Enquiry Type *</label>
          <select name="enquiryType" value={formData.enquiryType} onChange={handleChange} className="w-full p-2 border rounded text-black">
            <option value="Buyer / Importer">Buyer / Importer</option>
            <option value="Supplier / Exporter">Supplier / Exporter</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Product</label>
          <input type="text" name="product" placeholder="e.g. Film Faced Plywood" value={formData.product} onChange={handleChange} className="w-full p-2 border rounded text-black" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Quantity</label>
          <input type="text" name="quantity" placeholder="e.g. 2 containers" value={formData.quantity} onChange={handleChange} className="w-full p-2 border rounded text-black" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Required Origin</label>
          <input type="text" name="requiredOrigin" placeholder="If applicable" value={formData.requiredOrigin} onChange={handleChange} className="w-full p-2 border rounded text-black" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Destination</label>
          <input type="text" name="destination" placeholder="City / Port / Country" value={formData.destination} onChange={handleChange} className="w-full p-2 border rounded text-black" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Specification / Requirement *</label>
        <textarea name="specification" rows={4} placeholder="Share grade, dimensions, thickness..." value={formData.specification} onChange={handleChange} required className="w-full p-2 border rounded text-black"></textarea>
      </div>

      <button type="submit" disabled={loading} className="w-full bg-[#0a192f] text-white p-3 rounded font-bold hover:bg-opacity-90">
        {loading ? 'Sending Enquiry...' : 'SEND ENQUIRY'}
      </button>
    </form>
  );
}