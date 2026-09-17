import React, { useState } from 'react';
import { X, Wrench, Calendar, Clock, Bike, Send, CheckCircle2 } from 'lucide-react';

export default function ServiceBookingModal({ isOpen, onClose, selectedPackage, onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    cycleType: 'Gear Cycle',
    date: '',
    timeSlot: '10:00 AM - 12:00 PM',
    notes: '',
  });

  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmed(true);
    if (onShowToast) {
      onShowToast('Service appointment booked! Redirecting to WhatsApp...');
    }

    const message = `*LS CYCLE STORE - SERVICE APPOINTMENT BOOKING*\n\n` +
      `👤 *Name:* ${formData.name}\n` +
      `📞 *Phone:* ${formData.phone}\n` +
      `🚲 *Cycle Type:* ${formData.cycleType}\n` +
      `🔧 *Package:* ${selectedPackage?.title || 'General Maintenance'}\n` +
      `📅 *Date:* ${formData.date || 'Scheduled'}\n` +
      `⏰ *Time Slot:* ${formData.timeSlot}\n` +
      (formData.notes ? `📝 *Notes:* ${formData.notes}\n` : '');

    const whatsappUrl = `https://wa.me/919263211969?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg glass-panel border-zinc-200 rounded-3xl overflow-hidden p-6 sm:p-8 shadow-2xl bg-white">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-black hover:bg-zinc-200"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmed ? (
          <div className="py-8 text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-black text-white mx-auto flex items-center justify-center shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-heading font-black text-2xl text-black">
              Appointment Booked!
            </h3>
            <p className="text-zinc-600 text-xs leading-relaxed max-w-sm mx-auto">
              We look forward to servicing your bicycle at Lakshmi Srinivasa Cycle Store. Details sent to WhatsApp!
            </p>
            <div className="glass-panel p-3.5 rounded-xl border-zinc-200 text-xs text-left space-y-1 bg-zinc-50 font-medium text-zinc-800">
              <div><strong>Package:</strong> {selectedPackage?.title || 'General Maintenance'}</div>
              <div><strong>Time Slot:</strong> {formData.date || 'Scheduled'} ({formData.timeSlot})</div>
              <div><strong>Cycle Type:</strong> {formData.cycleType}</div>
            </div>
            <div className="flex gap-2 justify-center pt-2">
              <a
                href={`https://wa.me/919263211969?text=${encodeURIComponent(
                  `*LS CYCLE STORE - SERVICE APPOINTMENT BOOKING*\n\n` +
                  `👤 *Name:* ${formData.name}\n` +
                  `📞 *Phone:* ${formData.phone}\n` +
                  `🚲 *Cycle Type:* ${formData.cycleType}\n` +
                  `🔧 *Package:* ${selectedPackage?.title || 'General Maintenance'}\n` +
                  `📅 *Date:* ${formData.date || 'Scheduled'}\n` +
                  `⏰ *Time Slot:* ${formData.timeSlot}\n` +
                  (formData.notes ? `📝 *Notes:* ${formData.notes}\n` : '')
                )}`}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary py-2.5 px-5 text-xs rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 border-none"
              >
                Send via WhatsApp
              </a>
              <button
                onClick={onClose}
                className="btn-primary py-2.5 px-6 text-xs rounded-xl"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center">
                <Wrench className="w-5 h-5 text-black" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl text-black">
                  BOOK SERVICE APPOINTMENT
                </h3>
                <p className="text-xs text-zinc-600 font-semibold">
                  {selectedPackage ? selectedPackage.title : 'Lakshmi Srinivasa Cycle Workshop'}
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <input
                type="text"
                required
                placeholder="Full Name *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-xl px-4 py-2.5 text-xs text-black focus:outline-none"
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="tel"
                  required
                  placeholder="Phone Number *"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-zinc-50 border border-zinc-200 focus:border-black rounded-xl px-4 py-2.5 text-xs text-black focus:outline-none"
                />
                <select
                  required
                  value={formData.cycleType}
                  onChange={(e) => setFormData({ ...formData, cycleType: e.target.value })}
                  className="bg-zinc-50 border border-zinc-200 focus:border-black rounded-xl px-3 py-2.5 text-xs text-black focus:outline-none cursor-pointer font-medium"
                >
                  <option value="Gear Cycle">Gear Cycle</option>
                  <option value="Normal Cycle">Normal Cycle</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="bg-zinc-50 border border-zinc-200 focus:border-black rounded-xl px-4 py-2.5 text-xs text-black focus:outline-none"
                />
                <select
                  value={formData.timeSlot}
                  onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                  className="bg-zinc-50 border border-zinc-200 focus:border-black rounded-xl px-3 py-2.5 text-xs text-black focus:outline-none cursor-pointer"
                >
                  <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                  <option value="12:00 PM - 02:00 PM">12:00 PM - 02:00 PM</option>
                  <option value="03:00 PM - 05:00 PM">03:00 PM - 05:00 PM</option>
                  <option value="06:00 PM - 08:00 PM">06:00 PM - 08:00 PM</option>
                </select>
              </div>

              <textarea
                rows={2}
                placeholder="Notes or issues (optional)..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-xl px-4 py-2.5 text-xs text-black focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full py-3.5 text-xs rounded-xl flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Confirm & Send to WhatsApp</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
