import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero3D from './components/Hero3D';
import CycleSales from './components/CycleSales';
import ServicesSection from './components/ServicesSection';
import SparePartsSection from './components/SparePartsSection';
import ContactSection from './components/ContactSection';
import BikeModal from './components/BikeModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import ServiceBookingModal from './components/ServiceBookingModal';
import ToastNotification from './components/ToastNotification';
import Footer from './components/Footer';
import './index.css';

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedBikeForModal, setSelectedBikeForModal] = useState(null);
  
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedServicePackage, setSelectedServicePackage] = useState(null);

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutTotal, setCheckoutTotal] = useState(0);

  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 4000);
  };

  // Add to cart handler
  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) =>
          item.id === product.id &&
          item.selectedColor === product.selectedColor &&
          item.selectedSize === product.selectedSize
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });

    showToast(`Added "${product.name}" to your shopping cart!`);
  };

  // Update cart item quantity
  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveCartItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  // Remove item from cart
  const handleRemoveCartItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear cart
  const handleClearCart = () => {
    setCartItems([]);
  };

  // Open booking modal for a package
  const handleBookPackage = (pkg) => {
    setSelectedServicePackage(pkg);
    setIsBookingModalOpen(true);
  };

  // Open checkout modal
  const handleOpenCheckout = (total) => {
    setCheckoutTotal(total);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-body selection:bg-black selection:text-white">
      {/* Header Navigation */}
      <Navbar
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenBooking={() => handleBookPackage(null)}
      />

      {/* Hero Section with 3D Kona Cycle Showcase */}
      <Hero3D
        onOpenBooking={() => handleBookPackage(null)}
        onShopClick={() => {
          const el = document.getElementById('cycles');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Cycle Sales (E-Commerce) */}
      <CycleSales
        onAddToCart={handleAddToCart}
        onSelectBike={(bike) => setSelectedBikeForModal(bike)}
      />

      {/* Service & Repair (3D Floating Gears) */}
      <ServicesSection onBookPackage={handleBookPackage} />

      {/* Spare Parts Catalog */}
      <SparePartsSection onAddToCart={handleAddToCart} />

      {/* Contact Us & Repair Drop-Off */}
      <ContactSection onShowToast={showToast} />

      {/* Footer */}
      <Footer />

      {/* Modals & Slide-Out Drawers */}
      <BikeModal
        bike={selectedBikeForModal}
        onClose={() => setSelectedBikeForModal(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onOpenCheckout={handleOpenCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        totalAmount={checkoutTotal}
        cartItems={cartItems}
        onClearCart={handleClearCart}
      />

      <ServiceBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        selectedPackage={selectedServicePackage}
        onShowToast={showToast}
      />

      {/* Flash Toast Notifications */}
      <ToastNotification
        message={toastMessage}
        onClose={() => setToastMessage('')}
      />
    </div>
  );
}
