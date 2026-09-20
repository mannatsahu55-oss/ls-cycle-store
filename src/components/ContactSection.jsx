import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Bike, Wrench } from 'lucide-react';

export default function ContactSection({ onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    cycleType: 'Gear Cycle',
    serviceType: 'General Tune-Up',
    date: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (onShowToast) {
      onShowToast('Repair drop-off scheduled successfully! Redirecting to WhatsApp...');
    }

    const message = `*LS CYCLE STORE - REPAIR DROP-OFF BOOKING*\n\n` +
      `👤 *Name:* ${formData.name}\n` +
      `📞 *Phone:* ${formData.phone}\n` +
      `🚲 *Cycle Type:* ${formData.cycleType}\n` +
      `🔧 *Service Package:* ${formData.serviceType}\n` +
      `📅 *Preferred Drop-Off Date:* ${formData.date || 'Tomorrow'}\n` +
      (formData.notes ? `📝 *Notes:* ${formData.notes}\n` : '');

    const whatsappUrl = `https://wa.me/919263211969?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-zinc-50 border-t border-zinc-200">
      
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="section-tag">
            <MapPin className="w-4 h-4 text-black" />
            <span>Visit Or Contact Us</span>
          </div>
          <h2 className="section-heading text-black">
            LS CYCLE STORE <span className="gradient-text">LOCATION & SERVICE BOOKING</span>
          </h2>
          <p className="section-subtext mx-auto">
            Drop by our flagship workshop or schedule a guaranteed repair slot below. Instant check-in available for Lakshmi Srinivasa Cycle Store customers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left 5 Cols: Store Details & Operating Hours */}
          <div className="lg:col-span-5 space-y-8">
            <div className="glass-panel p-8 rounded-3xl border-zinc-200 bg-white shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-black p-[2px]">
                  <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                    <Bike className="w-6 h-6 text-black" />
                  </div>
                </div>
                <div>
                  <h3 className="font-heading font-black text-xl text-black">
                    LS CYCLE STORE
                  </h3>
                  <p className="text-xs text-zinc-600 font-semibold">
                    LAKSHMI SRINIVASA CYCLE STORE
                  </p>
                </div>
              </div>

              {/* Info Items */}
              <div className="space-y-4 text-sm pt-2">
                <div className="flex items-start gap-3 text-zinc-700">
                  <MapPin className="w-5 h-5 text-black shrink-0 mt-1" />
                  <div>
                    <strong className="block text-black">Workshop & Showroom Address</strong>
                    <span>Beside DTDC Courier, Opposite South HCU Gate, Gopanpalle, Hyderabad, Telangana 500019</span>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Lakshmi+Srinivasa+Cycle+Store+Kanchi+Gachibowli+Rd+Hyderabad"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-xs font-semibold text-emerald-600 hover:text-emerald-700 underline mt-1"
                    >
                      View Location on Google Maps 📍
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-zinc-700">
                  <Phone className="w-5 h-5 text-black shrink-0" />
                  <div>
                    <strong className="block text-black">Direct Workshop Hotline / WhatsApp</strong>
                    <span>+91 92632 11969 / +91 79954 57086</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-zinc-700">
                  <Mail className="w-5 h-5 text-black shrink-0" />
                  <div>
                    <strong className="block text-black">Email Support</strong>
                    <span>support@lscyclestore.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-zinc-700">
                  <Clock className="w-5 h-5 text-black shrink-0 mt-1" />
                  <div>
                    <strong className="block text-black">Store Operating Hours</strong>
                    <span>Monday – Saturday: 9:00 AM – 9:00 PM</span>
                    <br />
                    <span>Sunday: 10:00 AM – 6:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Embed & Link */}
            <div className="glass-panel p-3 rounded-3xl border-zinc-200 bg-white shadow-sm overflow-hidden relative group">
              <div className="w-full h-64 rounded-2xl relative border border-zinc-200 overflow-hidden">
                <iframe
                  title="Lakshmi Srinivasa Cycle Store Location"
                  src="https://maps.google.com/maps?q=Lakshmi%20Srinivasa%20Cycle%20Store%20Gopanpalle%20Hyderabad&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 filter contrast-[1.05]"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                
                {/* Overlay link button to exact Google Maps place link */}
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Lakshmi+Srinivasa+Cycle+Store+Kanchi+Gachibowli+Rd+Hyderabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 bg-black hover:bg-zinc-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 transition-all hover:scale-105 z-10"
                >
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>Open Lakshmi Srinivasa Cycle Store in Maps</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right 7 Cols: Repair Drop-off Booking Form */}
          <div className="lg:col-span-7">
            <div className="border border-zinc-200 p-4 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-white shadow-sm">
              <div className="flex items-center justify-between mb-5 sm:mb-8 pb-3 sm:pb-4 border-b border-zinc-200">
                <div>
                  <h3 className="font-heading font-black text-xl sm:text-2xl text-black">
                    REPAIR DROP-OFF BOOKING
                  </h3>
                  <p className="text-zinc-600 text-xs mt-0.5 sm:mt-1">
                    Select your preferred date & service package for immediate intake.
                  </p>
                </div>
                <Wrench className="w-6 h-6 sm:w-8 sm:h-8 text-black opacity-30 shrink-0" />
              </div>

              {submitted ? (
                <div className="py-8 sm:py-12 text-center space-y-4 animate-in zoom-in-95 duration-300">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black text-white mx-auto flex items-center justify-center shadow-md">
                    <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <h4 className="font-heading font-bold text-xl sm:text-2xl text-black">
                    Booking Confirmed!
                  </h4>
                  <p className="text-zinc-700 text-xs sm:text-sm max-w-md mx-auto">
                    Thank you <strong className="text-black">{formData.name}</strong>. Your repair drop-off slot is reserved for <strong className="text-black">{formData.date || 'Tomorrow'}</strong>. Reference Token: <span className="text-black font-mono font-bold">LS-REPAIR-{Math.floor(1000 + Math.random() * 9000)}</span>
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-secondary py-2.5 px-6 text-xs rounded-xl"
                  >
                    Book Another Service
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="text-xs font-bold text-zinc-700 mb-1 block">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-black focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-zinc-700 mb-1 block">Mobile Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-black focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="text-xs font-bold text-zinc-700 mb-1 block">Cycle Type *</label>
                      <select
                        value={formData.cycleType}
                        onChange={(e) => setFormData({ ...formData, cycleType: e.target.value })}
                        className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-black focus:outline-none cursor-pointer transition-colors font-medium truncate"
                      >
                        <option value="Gear Cycle">Gear Cycle</option>
                        <option value="Normal Cycle">Normal Cycle</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-zinc-700 mb-1 block">Preferred Drop-Off Date *</label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-black focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-700 mb-1 block">Select Service Package *</label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-black focus:outline-none cursor-pointer transition-colors truncate"
                    >
                      <option value="Basic Safety Check">Basic Safety Check (₹499)</option>
                      <option value="Pro Tune-Up">Pro Tune-Up (₹1,499)</option>
                      <option value="Master Overhaul">Master Overhaul (₹2,999)</option>
                      <option value="E-Bike Diagnostics">E-Bike Diagnostics (₹1,999)</option>
                      <option value="Custom Repair">Custom Repair / Specific Issue</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-700 mb-1 block">Issue Description or Special Requests</label>
                    <textarea
                      rows={3}
                      placeholder="Describe any squeaks, gear slipping, brake bleeding requests, etc..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-black focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full py-3.5 sm:py-4 text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 mt-3 sm:mt-4 shadow-md"
                  >
                    <Send className="w-4 h-4 shrink-0" />
                    <span className="whitespace-nowrap">Confirm Drop-Off Appointment</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
