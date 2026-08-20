import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShippingAddress, Order } from '../types';
import { ShieldCheck, CreditCard, Smartphone, Banknote, Lock, ArrowLeft, ArrowRight, CheckCircle2, Truck } from 'lucide-react';

interface CheckoutViewProps {
  onOrderComplete: (order: Order) => void;
  onBackToShop: () => void;
}

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi NCR', 'Chandigarh'
];

export const CheckoutView: React.FC<CheckoutViewProps> = ({ onOrderComplete, onBackToShop }) => {
  const { items, subtotal, shippingFee, discount, total, clearCart } = useCart();

  const [address, setAddress] = useState<ShippingAddress>({
    fullName: '',
    email: '',
    phone: '',
    streetAddress: '',
    apartment: '',
    city: '',
    state: 'Maharashtra',
    pincode: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (items.length === 0) {
    return (
      <div className="py-20 text-center max-w-md mx-auto px-4">
        <h2 className="text-xl font-bold text-neutral-900">Your bag is empty</h2>
        <p className="text-xs text-neutral-500 mt-2">Add your chosen NOVELIS formulas to proceed with checkout.</p>
        <button
          onClick={onBackToShop}
          className="mt-6 px-6 py-2.5 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider rounded-lg"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation
    if (!address.fullName.trim() || !address.email.trim() || !address.phone.trim() || !address.streetAddress.trim() || !address.city.trim() || !address.pincode.trim()) {
      setErrorMessage('Please fill in all required shipping address fields.');
      return;
    }

    if (paymentMethod === 'upi' && !upiId.includes('@')) {
      setErrorMessage('Please enter a valid UPI ID (e.g. yourname@okhdfcbank or yourname@paytm).');
      return;
    }

    setIsProcessing(true);

    // Simulate Payment Gateway (e.g. Razorpay SDK bridge)
    setTimeout(() => {
      const orderNum = `NOV-${Math.floor(100000 + Math.random() * 900000)}`;
      const newOrder: Order = {
        id: `order_${Date.now()}`,
        orderNumber: orderNum,
        createdAt: new Date().toISOString(),
        items: [...items],
        shippingAddress: address,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
        subtotal,
        shippingFee,
        discount,
        total,
        estimatedDelivery: '3 to 4 business days',
        trackingStatus: 'confirmed'
      };

      clearCart();
      setIsProcessing(false);
      onOrderComplete(newOrder);
    }, 1500);
  };

  return (
    <div className="py-12 bg-[#FAFAFA] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Checkout Header */}
        <div className="flex items-center justify-between pb-6 border-b border-neutral-200 mb-8">
          <button
            onClick={onBackToShop}
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-black"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Shopping</span>
          </button>
          <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
            <Lock className="w-3.5 h-3.5 text-emerald-700" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Shipping & Payment */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* 1. Contact & Shipping Address */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-2xs space-y-5">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                  1. Shipping Information
                </h2>
                <span className="text-[11px] text-neutral-400">All fields required</span>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="chk-name" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      id="chk-name"
                      type="text"
                      required
                      placeholder="e.g. Priya Nair"
                      value={address.fullName}
                      onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label htmlFor="chk-phone" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      Mobile Number *
                    </label>
                    <input
                      id="chk-phone"
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="chk-email" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Email Address (For Order Tracking) *
                  </label>
                  <input
                    id="chk-email"
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={address.email}
                    onChange={(e) => setAddress({ ...address, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label htmlFor="chk-address" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Street Address / House / Flat No. *
                  </label>
                  <input
                    id="chk-address"
                    type="text"
                    required
                    placeholder="Building, street, landmark"
                    value={address.streetAddress}
                    onChange={(e) => setAddress({ ...address, streetAddress: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs focus:outline-none focus:border-black"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="chk-city" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      City *
                    </label>
                    <input
                      id="chk-city"
                      type="text"
                      required
                      placeholder="City"
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label htmlFor="chk-state" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      State *
                    </label>
                    <select
                      id="chk-state"
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs focus:outline-none focus:border-black font-medium text-neutral-800"
                    >
                      {INDIAN_STATES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="chk-pin" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      PIN Code *
                    </label>
                    <input
                      id="chk-pin"
                      type="text"
                      maxLength={6}
                      required
                      placeholder="6 digits"
                      value={address.pincode}
                      onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs focus:outline-none focus:border-black font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Payment Method */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-2xs space-y-5">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900">
                  2. Select Payment Method
                </h2>
                <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Razorpay Secured
                </span>
              </div>

              {/* Options */}
              <div className="space-y-3">
                
                {/* UPI */}
                <label className={`p-4 rounded-xl border flex items-start gap-3.5 cursor-pointer transition-all ${
                  paymentMethod === 'upi' ? 'border-neutral-900 bg-neutral-50/70' : 'border-neutral-200 hover:border-neutral-300'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                    className="mt-1 accent-black"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <strong className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-emerald-800" />
                        UPI Instant (GPay / PhonePe / Paytm / QR)
                      </strong>
                      <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                        Fastest
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-500 mt-0.5">Zero convenience fee. Verified instant dispatch.</p>

                    {paymentMethod === 'upi' && (
                      <div className="mt-3 pt-3 border-t border-neutral-200/80">
                        <label htmlFor="chk-upi-id" className="block text-[11px] font-bold text-neutral-700 mb-1">
                          Enter UPI ID (VPA)
                        </label>
                        <input
                          id="chk-upi-id"
                          type="text"
                          placeholder="e.g. mobile@upi or username@okhdfcbank"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          className="w-full sm:w-80 px-3 py-2 bg-white border border-neutral-300 rounded-lg text-xs font-mono focus:outline-none focus:border-black"
                        />
                      </div>
                    )}
                  </div>
                </label>

                {/* Card */}
                <label className={`p-4 rounded-xl border flex items-start gap-3.5 cursor-pointer transition-all ${
                  paymentMethod === 'card' ? 'border-neutral-900 bg-neutral-50/70' : 'border-neutral-200 hover:border-neutral-300'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="mt-1 accent-black"
                  />
                  <div className="flex-1">
                    <strong className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-neutral-700" />
                      Credit / Debit Card (Visa, Mastercard, RuPay)
                    </strong>
                    <p className="text-[11px] text-neutral-500 mt-0.5">Processed securely through encrypted 3D-Secure gateway.</p>

                    {paymentMethod === 'card' && (
                      <div className="mt-3 pt-3 border-t border-neutral-200/80 space-y-2.5">
                        <input
                          type="text"
                          placeholder="Card Number (16 digits)"
                          maxLength={19}
                          value={cardDetails.number}
                          onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-xs font-mono focus:outline-none focus:border-black"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="MM / YY"
                            maxLength={5}
                            value={cardDetails.expiry}
                            onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-xs font-mono focus:outline-none focus:border-black"
                          />
                          <input
                            type="password"
                            placeholder="CVV"
                            maxLength={4}
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-lg text-xs font-mono focus:outline-none focus:border-black"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </label>

                {/* COD */}
                <label className={`p-4 rounded-xl border flex items-start gap-3.5 cursor-pointer transition-all ${
                  paymentMethod === 'cod' ? 'border-neutral-900 bg-neutral-50/70' : 'border-neutral-200 hover:border-neutral-300'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-1 accent-black"
                  />
                  <div className="flex-1">
                    <strong className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-2">
                      <Banknote className="w-4 h-4 text-neutral-700" />
                      Cash on Delivery (COD)
                    </strong>
                    <p className="text-[11px] text-neutral-500 mt-0.5">Pay in cash or digital QR upon doorstep arrival.</p>
                  </div>
                </label>

              </div>
            </div>

          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-neutral-200 shadow-2xs space-y-5 sticky top-24">
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-100 pb-3">
                Order Summary ({items.reduce((s, i) => s + i.quantity, 0)} Items)
              </h2>

              {/* Items */}
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3 items-center">
                    <div className="w-12 h-12 rounded-lg bg-neutral-100 overflow-hidden border border-neutral-200 shrink-0">
                      <img
                        src={item.product.images.primary}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-neutral-900 truncate uppercase">
                        NOVELIS {item.product.name}
                      </h4>
                      <p className="text-[11px] text-neutral-500">
                        Qty: {item.quantity} × ₹{item.product.price}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-neutral-900">
                      ₹{item.product.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 text-xs text-neutral-600 border-t border-neutral-100 pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-neutral-900">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-neutral-900 border-t border-neutral-200 pt-3">
                  <span>Total Amount</span>
                  <span>₹{total}</span>
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs font-medium border border-red-200">
                  {errorMessage}
                </div>
              )}

              {/* Place Order Button */}
              <button
                id="place-order-btn"
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-neutral-900 hover:bg-black disabled:bg-neutral-400 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span>CONFIRMING PAYMENT...</span>
                ) : (
                  <>
                    <span>COMPLETE ORDER • ₹{total}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center text-[11px] text-neutral-400 space-y-1">
                <p>100% Secure Checkout • Direct from NOVELIS Labs</p>
                <p>Dispatch within 24 hours with SMS Tracking</p>
              </div>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
