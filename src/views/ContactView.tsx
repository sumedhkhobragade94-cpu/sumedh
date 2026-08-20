import React, { useState } from 'react';
import { Mail, Instagram, MessageSquare, Clock, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    orderNumber: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitted(true);
  };

  return (
    <div className="py-12 sm:py-16 bg-[#FAFAFA] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[11px] uppercase font-bold tracking-[0.25em] text-neutral-500 block mb-2">
            WE ARE HERE TO HELP
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
            Contact NOVELIS Support
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1 max-w-md mx-auto">
            Reach out for formula inquiries, order tracking assistance, or routine recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: Support Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-2xs space-y-6">
              <h2 className="text-base font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-100 pb-3">
                Customer Care
              </h2>

              <div className="space-y-4 text-xs text-neutral-600">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-neutral-100 text-neutral-800 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-neutral-900 font-bold">Email Support</strong>
                    <a href="mailto:care@novelis.in" className="text-neutral-600 hover:text-black hover:underline">
                      care@novelis.in
                    </a>
                    <p className="text-[11px] text-neutral-400 mt-0.5">Average response within 12 business hours.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-neutral-100 text-neutral-800 shrink-0">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-neutral-900 font-bold">Instagram Community</strong>
                    <span className="text-neutral-600">@novelis.skinscience</span>
                    <p className="text-[11px] text-neutral-400 mt-0.5">Follow for routine science &amp; batch updates.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-neutral-100 text-neutral-800 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-neutral-900 font-bold">Hours of Operation</strong>
                    <span className="text-neutral-600">Mon – Sat: 10:00 AM – 6:30 PM IST</span>
                    <p className="text-[11px] text-neutral-400 mt-0.5">Closed on National Holidays.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-neutral-100 text-neutral-800 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-neutral-900 font-bold">Fulfillment &amp; Lab Studio</strong>
                    <span className="text-neutral-600">NOVELIS SKIN SCIENCE Labs, Bandra Kurla Complex, Mumbai, Maharashtra 400051</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Note box */}
            <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-xl text-xs text-emerald-900 leading-relaxed">
              <strong>Need immediate order help?</strong> Please have your 6-digit Order ID (e.g. #NOV-839201) ready in your message.
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-2xs">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900">Message Received</h3>
                  <p className="text-xs text-neutral-600 max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out to NOVELIS Care. Our team has logged your ticket and will respond to <strong>{formData.email}</strong> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', orderNumber: '', message: '' });
                    }}
                    className="mt-4 px-6 py-2.5 bg-neutral-900 text-white text-xs font-semibold rounded-lg hover:bg-black"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="text-base font-bold uppercase tracking-wider text-neutral-900 mb-2">
                    Send a Message
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs focus:outline-none focus:border-black"
                        placeholder="e.g. Rohit Sharma"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs focus:outline-none focus:border-black"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-subject" className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                        Subject
                      </label>
                      <select
                        id="contact-subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs focus:outline-none focus:border-black text-neutral-700"
                      >
                        <option value="">Select Topic</option>
                        <option value="Formula Guidance">Formula Guidance</option>
                        <option value="Order Tracking">Order Tracking &amp; Shipping</option>
                        <option value="Return / Replacement">Return / Replacement Request</option>
                        <option value="General Question">General Question</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contact-order-id" className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                        Order ID (Optional)
                      </label>
                      <input
                        id="contact-order-id"
                        type="text"
                        value={formData.orderNumber}
                        onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs focus:outline-none focus:border-black"
                        placeholder="#NOV-XXXXXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs focus:outline-none focus:border-black leading-relaxed"
                      placeholder="Please describe how we can assist you with your routine or order..."
                    />
                  </div>

                  <button
                    id="contact-submit-btn"
                    type="submit"
                    className="w-full py-3 bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase tracking-[0.16em] rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <span>Submit Message</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
