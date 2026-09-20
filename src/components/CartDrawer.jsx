import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, CheckCircle2 } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout,
}) {
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const grandTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'LAKSHMI10') {
      setDiscountPercent(10);
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon. Try "LAKSHMI10" for 10% off!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex sm:pl-10 w-full justify-end">
        <div className="w-full sm:w-screen sm:max-w-md border-l border-zinc-200 rounded-none sm:rounded-l-3xl p-4 sm:p-6 flex flex-col justify-between bg-white shadow-2xl animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-zinc-200">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-black" />
              <h2 className="font-heading font-black text-lg sm:text-xl text-black">Your Cart</h2>
              <span className="badge-neon bg-black text-white border-black text-[10px] sm:text-xs">
                {cartItems.reduce((acc, i) => acc + i.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-black hover:bg-zinc-200 transition-all"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto py-3 sm:py-4 space-y-3 sm:space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-bold text-lg text-black">Your cart is empty</h3>
                <p className="text-zinc-600 text-xs max-w-xs">
                  Explore our 3D bicycle collection and genuine spare parts to add items to your shopping cart.
                </p>
                <button
                  onClick={onClose}
                  className="btn-primary py-2.5 px-6 text-xs rounded-xl"
                >
                  Browse Cycles
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.selectedColor || ''}-${item.selectedSize || ''}`}
                  className="p-3 sm:p-3.5 rounded-xl border border-zinc-200 bg-zinc-50 flex items-center gap-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg bg-white border border-zinc-200 shrink-0"
                  />
                  
                  <div className="flex-1 min-w-0 pr-1">
                    <h4 className="font-heading font-bold text-xs sm:text-sm text-black truncate">
                      {item.name}
                    </h4>
                    <div className="text-[10px] text-zinc-500 flex items-center gap-2 mt-0.5 font-medium">
                      {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                      {item.selectedColor && (
                        <span className="flex items-center gap-1">
                          Color:{' '}
                          <span
                            className="w-2.5 h-2.5 rounded-full inline-block border border-zinc-300"
                            style={{ backgroundColor: item.selectedColor }}
                          />
                        </span>
                      )}
                    </div>
                    <div className="font-heading font-black text-xs sm:text-sm text-black mt-1">
                      ₹{item.price.toLocaleString('en-IN')}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-end gap-1.5 sm:gap-2 shrink-0">
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-zinc-400 hover:text-black p-1 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>

                    <div className="flex items-center gap-1 bg-white border border-zinc-200 rounded-lg p-0.5 sm:p-1">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:text-black"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3 text-zinc-600" />
                      </button>
                      <span className="text-xs font-bold text-black px-1 min-w-[16px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:text-black"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3 text-zinc-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {cartItems.length > 0 && (
            <div className="pt-4 border-t border-zinc-200 space-y-4">
              
              {/* Promo Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. LAKSHMI10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 focus:border-black rounded-xl pl-9 pr-3 py-2 text-xs text-black uppercase focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-secondary py-2 px-3 text-xs rounded-xl"
                  >
                    Apply
                  </button>
                </div>
                {couponApplied && (
                  <div className="text-[11px] text-black flex items-center gap-1 font-bold">
                    <CheckCircle2 className="w-3 h-3 text-black" />
                    <span>Coupon LAKSHMI10 applied! 10% Discount active.</span>
                  </div>
                )}
                {couponError && (
                  <div className="text-[11px] text-zinc-600 font-semibold">{couponError}</div>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-zinc-600 font-medium">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold text-black">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-black font-bold">
                    <span>Coupon Discount (10%):</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-500">
                  <span>Standard Delivery:</span>
                  <span className="text-black font-bold">FREE</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-zinc-200 text-sm font-bold text-black">
                  <span>Grand Total:</span>
                  <span className="text-xl text-black font-heading font-black">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenCheckout(grandTotal);
                }}
                className="btn-primary w-full py-3.5 text-sm rounded-xl flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
