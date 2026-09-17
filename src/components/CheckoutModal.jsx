import React, { useState } from 'react';
import { X, CreditCard, QrCode, Truck, CheckCircle2, Printer, Bike, Loader2 } from 'lucide-react';

// ─── YOUR RAZORPAY TEST KEY ──────────────────────────────────────────────────
// Replace with your live key from https://dashboard.razorpay.com when going live
const RAZORPAY_KEY_ID = 'rzp_test_YourKeyHere'; // ← Paste your Razorpay Key ID here
// ─────────────────────────────────────────────────────────────────────────────

const WHATSAPP_NUMBER = '919263211963'; // LS Cycle Store WhatsApp

function sendWhatsApp(orderId, shipping, paymentMethod, totalAmount, cartItems, paymentStatus) {
  const itemsSummary = cartItems && cartItems.length > 0
    ? cartItems.map((item, i) =>
        `${i + 1}. *${item.name}* x${item.quantity} — ₹${(item.price * item.quantity).toLocaleString('en-IN')}`
      ).join('\n')
    : 'Bicycle Order';

  const message =
    `🚲 *LS CYCLE STORE — NEW ORDER* 🚲\n\n` +
    `🆔 *Order ID:* ${orderId}\n` +
    `✅ *Payment:* ${paymentStatus}\n\n` +
    `👤 *Customer:* ${shipping.fullName}\n` +
    `📞 *Phone:* ${shipping.phone}\n` +
    `📍 *Address:* ${shipping.address}, ${shipping.city} — ${shipping.pincode}\n` +
    `💳 *Method:* ${paymentMethod.toUpperCase()}\n\n` +
    `🛒 *ITEMS:*\n${itemsSummary}\n\n` +
    `💰 *TOTAL: ₹${totalAmount.toLocaleString('en-IN')}*`;

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
}

export default function CheckoutModal({ isOpen, onClose, totalAmount, cartItems, onClearCart }) {
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [shipping, setShipping] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  });
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [rzpPaymentId, setRzpPaymentId] = useState('');

  if (!isOpen) return null;

  // ── Razorpay payment flow ────────────────────────────────────────────────
  const launchRazorpay = (generatedId) => {
    if (!window.Razorpay) {
      alert('Razorpay SDK failed to load. Please check your internet connection.');
      setIsProcessing(false);
      return;
    }

    const amountInPaise = Math.round(totalAmount * 100); // Razorpay uses paise

    const options = {
      key: RAZORPAY_KEY_ID,
      amount: amountInPaise,
      currency: 'INR',
      name: 'LS Cycle Store',
      description: `Order ${generatedId}`,
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E🚲%3C/text%3E%3C/svg%3E",
      handler: function (response) {
        // Payment successful — response.razorpay_payment_id is the payment ID
        const pid = response.razorpay_payment_id || generatedId;
        setRzpPaymentId(pid);
        setOrderId(generatedId);
        setOrderComplete(true);
        setIsProcessing(false);
        sendWhatsApp(
          generatedId,
          shipping,
          paymentMethod,
          totalAmount,
          cartItems,
          `PAID via Razorpay — ID: ${pid}`
        );
        if (onClearCart) onClearCart();
      },
      prefill: {
        name: shipping.fullName,
        contact: shipping.phone,
      },
      notes: {
        order_id: generatedId,
        address: `${shipping.address}, ${shipping.city} - ${shipping.pincode}`,
      },
      theme: { color: '#000000' },
      modal: {
        ondismiss: () => {
          setIsProcessing(false);
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on('payment.failed', function (response) {
      setIsProcessing(false);
      alert(`Payment failed: ${response.error.description}`);
    });
    rzp.open();
  };

  // ── Form submit handler ──────────────────────────────────────────────────
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const generatedId = 'LSC-' + Math.floor(100000 + Math.random() * 900000);
    setIsProcessing(true);

    if (paymentMethod === 'cod') {
      // Cash on Delivery — no Razorpay, just confirm & send WhatsApp
      setOrderId(generatedId);
      setOrderComplete(true);
      setIsProcessing(false);
      sendWhatsApp(generatedId, shipping, paymentMethod, totalAmount, cartItems, 'CASH ON DELIVERY');
      if (onClearCart) onClearCart();
    } else {
      // UPI / Card — launch Razorpay
      launchRazorpay(generatedId);
    }
  };

  const handleClose = () => {
    setOrderComplete(false);
    setOrderId('');
    setRzpPaymentId('');
    setIsProcessing(false);
    setShipping({ fullName: '', phone: '', address: '', city: '', pincode: '' });
    setPaymentMethod('upi');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto border border-zinc-200">

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-black hover:bg-zinc-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {orderComplete ? (
          /* ── ORDER SUCCESS SCREEN ── */
          <div className="py-6 space-y-6 text-center">
            <div className="no-print w-16 h-16 rounded-full bg-black text-white mx-auto flex items-center justify-center shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div id="printable-receipt" className="space-y-6">
              <div>
                <span className="no-print badge-neon text-xs">
                  {paymentMethod === 'cod' ? 'Order Confirmed — COD' : 'Payment Successful'}
                </span>
                <h2 className="font-heading font-black text-3xl text-black mt-2">
                  Thank You For Your Order!
                </h2>
                <p className="text-zinc-600 text-xs mt-1">
                  Order ID: <strong className="text-black font-mono">{orderId}</strong>
                </p>
                {rzpPaymentId && (
                  <p className="text-zinc-500 text-xs mt-0.5">
                    Razorpay Payment ID: <strong className="text-black font-mono">{rzpPaymentId}</strong>
                  </p>
                )}
              </div>

              {/* Invoice Card */}
              <div className="bg-zinc-50 border border-zinc-200 p-6 rounded-2xl text-left space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
                  <div className="flex items-center gap-2">
                    <Bike className="w-5 h-5 text-black" />
                    <span className="font-heading font-bold text-sm text-black">LS CYCLE STORE INVOICE</span>
                  </div>
                  <span className="text-xs text-zinc-500">{new Date().toLocaleDateString('en-IN')}</span>
                </div>

                <div className="text-xs space-y-1.5 text-zinc-700 font-medium">
                  <div><strong className="text-black">Customer:</strong> {shipping.fullName}</div>
                  <div><strong className="text-black">Phone:</strong> {shipping.phone}</div>
                  <div><strong className="text-black">Delivery:</strong> {shipping.address}, {shipping.city} — {shipping.pincode}</div>
                  <div><strong className="text-black">Payment:</strong> {paymentMethod.toUpperCase()}</div>
                </div>

                {/* Items */}
                {cartItems && cartItems.length > 0 && (
                  <div className="pt-3 border-t border-zinc-100 space-y-1">
                    {cartItems.map((item, i) => (
                      <div key={i} className="flex justify-between text-xs">
                        <span className="text-zinc-700">{item.name} × {item.quantity}</span>
                        <span className="font-semibold text-black">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-3 border-t border-zinc-200 flex justify-between items-center">
                  <span className="text-xs font-bold text-zinc-600">Total Paid:</span>
                  <span className="font-heading font-black text-2xl text-black">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            <div className="no-print flex items-center justify-center gap-3 flex-wrap">
              {/* Re-send WhatsApp */}
              <button
                onClick={() => sendWhatsApp(orderId, shipping, paymentMethod, totalAmount, cartItems,
                  paymentMethod === 'cod' ? 'CASH ON DELIVERY' : `PAID via Razorpay — ID: ${rzpPaymentId}`
                )}
                className="py-2.5 px-5 text-xs rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors border-0"
              >
                📲 Send via WhatsApp
              </button>
              <button
                onClick={() => window.print()}
                className="btn-secondary py-2.5 px-5 text-xs rounded-xl flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                Print Receipt
              </button>
              <button onClick={handleClose} className="btn-primary py-2.5 px-6 text-xs rounded-xl">
                Done
              </button>
            </div>
          </div>

        ) : (
          /* ── CHECKOUT FORM ── */
          <form onSubmit={handlePlaceOrder} className="space-y-6">
            <div>
              <h2 className="font-heading font-black text-2xl text-black">CHECKOUT & PAYMENT</h2>
              <p className="text-zinc-500 text-xs mt-1">Enter your shipping details and choose a payment method.</p>
            </div>

            {/* Shipping Details */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-black uppercase tracking-wider flex items-center gap-1.5">
                <Truck className="w-4 h-4" />
                <span>1. Shipping Details</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text" required placeholder="Full Name *"
                  value={shipping.fullName}
                  onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })}
                  className="bg-zinc-50 border border-zinc-200 focus:border-black rounded-xl px-4 py-2.5 text-xs text-black focus:outline-none transition-colors"
                />
                <input
                  type="tel" required placeholder="Mobile Phone *"
                  value={shipping.phone}
                  onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
                  className="bg-zinc-50 border border-zinc-200 focus:border-black rounded-xl px-4 py-2.5 text-xs text-black focus:outline-none transition-colors"
                />
              </div>
              <input
                type="text" required placeholder="Street Address / House No *"
                value={shipping.address}
                onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-xl px-4 py-2.5 text-xs text-black focus:outline-none transition-colors"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text" required placeholder="City *"
                  value={shipping.city}
                  onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                  className="bg-zinc-50 border border-zinc-200 focus:border-black rounded-xl px-4 py-2.5 text-xs text-black focus:outline-none transition-colors"
                />
                <input
                  type="text" required placeholder="PIN Code *"
                  value={shipping.pincode}
                  onChange={(e) => setShipping({ ...shipping, pincode: e.target.value })}
                  className="bg-zinc-50 border border-zinc-200 focus:border-black rounded-xl px-4 py-2.5 text-xs text-black focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-black uppercase tracking-wider flex items-center gap-1.5">
                <CreditCard className="w-4 h-4" />
                <span>2. Select Payment Method</span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {/* UPI / GPay */}
                <button
                  type="button" onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-xl border text-center text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'upi' ? 'border-black bg-black text-white shadow-md' : 'border-zinc-200 bg-zinc-50 text-zinc-600 hover:border-zinc-400'
                  }`}
                >
                  <QrCode className="w-5 h-5" />
                  <span>UPI / GPay</span>
                  {paymentMethod === 'upi' && <span className="text-[9px] opacity-70">via Razorpay</span>}
                </button>

                {/* Card */}
                <button
                  type="button" onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-center text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'card' ? 'border-black bg-black text-white shadow-md' : 'border-zinc-200 bg-zinc-50 text-zinc-600 hover:border-zinc-400'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Card</span>
                  {paymentMethod === 'card' && <span className="text-[9px] opacity-70">via Razorpay</span>}
                </button>

                {/* Cash on Delivery */}
                <button
                  type="button" onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-xl border text-center text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'cod' ? 'border-black bg-black text-white shadow-md' : 'border-zinc-200 bg-zinc-50 text-zinc-600 hover:border-zinc-400'
                  }`}
                >
                  <Truck className="w-5 h-5" />
                  <span>Cash on Delivery</span>
                </button>
              </div>

              {/* Razorpay badge for online payments */}
              {paymentMethod !== 'cod' && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 border border-blue-100 text-xs text-blue-700 font-medium">
                  <svg viewBox="0 0 30 30" className="w-4 h-4 flex-shrink-0" fill="none">
                    <path d="M15 0C6.716 0 0 6.716 0 15c0 8.284 6.716 15 15 15 8.284 0 15-6.716 15-15C30 6.716 23.284 0 15 0z" fill="#072654"/>
                    <path d="M19.5 8l-5.5 9h4l-3 5 9-11h-5l3-3H19.5z" fill="#3395FF"/>
                  </svg>
                  Secured by Razorpay — UPI, Cards, Net Banking & Wallets supported
                </div>
              )}
            </div>

            {/* Total + CTA */}
            <div className="pt-4 border-t border-zinc-200 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-zinc-500">Total Payable:</span>
                <div className="font-heading font-black text-2xl text-black">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="btn-primary py-3.5 px-8 text-sm rounded-xl flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `${paymentMethod === 'cod' ? 'Confirm Order' : 'Pay Now — ₹' + totalAmount.toLocaleString('en-IN')}`
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
