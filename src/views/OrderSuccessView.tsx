import React from 'react';
import { Order } from '../types';
import { CheckCircle2, Package, Truck, ArrowRight, Sparkles, MapPin, CreditCard } from 'lucide-react';

interface OrderSuccessViewProps {
  order: Order;
  onNavigateHome: () => void;
  onTrackOrder?: (orderId: string) => void;
}

export const OrderSuccessView: React.FC<OrderSuccessViewProps> = ({
  order,
  onNavigateHome,
  onTrackOrder
}) => {
  return (
    <div className="py-16 sm:py-20 bg-[#FAFAFA] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Success Card */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-8 sm:p-12 shadow-sm text-center space-y-8 animate-fadeIn">
          
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-2xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] uppercase font-bold tracking-[0.25em] text-emerald-700">
              THANK YOU FOR YOUR ORDER
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
              Order Confirmed
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
              We have received your order and our laboratory team is preparing your fresh 30 ml batch.
            </p>
          </div>

          {/* Order Details Banner */}
          <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="text-left">
              <span className="text-neutral-400 block font-medium">Order Number:</span>
              <strong className="text-neutral-900 font-mono text-sm font-bold">#{order.orderNumber}</strong>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-neutral-400 block font-medium">Estimated Express Delivery:</span>
              <strong className="text-emerald-800 font-bold">{order.estimatedDelivery}</strong>
            </div>
          </div>

          {/* Tracking Step Progress */}
          <div className="py-4 border-y border-neutral-100">
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="space-y-1">
                <span className="w-7 h-7 rounded-full bg-neutral-900 text-white font-bold text-xs flex items-center justify-center mx-auto">
                  ✓
                </span>
                <strong className="block text-neutral-900 text-[11px]">Confirmed</strong>
                <span className="text-[10px] text-neutral-400">Payment Verified</span>
              </div>
              <div className="space-y-1">
                <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center mx-auto">
                  2
                </span>
                <strong className="block text-neutral-900 text-[11px]">Lab Packaging</strong>
                <span className="text-[10px] text-neutral-400">Within 24 Hours</span>
              </div>
              <div className="space-y-1">
                <span className="w-7 h-7 rounded-full bg-neutral-100 text-neutral-400 font-bold text-xs flex items-center justify-center mx-auto">
                  3
                </span>
                <strong className="block text-neutral-500 text-[11px]">Out for Delivery</strong>
                <span className="text-[10px] text-neutral-400">Live SMS Updates</span>
              </div>
            </div>
          </div>

          {/* Items Summary */}
          <div className="text-left space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-100 pb-2">
              Purchased Formulas
            </h3>

            <div className="divide-y divide-neutral-100">
              {order.items.map((item) => (
                <div key={item.product.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-neutral-50 overflow-hidden border border-neutral-200 shrink-0">
                      <img
                        src={item.product.images.primary}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-neutral-900 uppercase">
                        NOVELIS {item.product.name}
                      </h4>
                      <p className="text-[11px] text-neutral-500">
                        {item.product.concentration} • Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-neutral-900">
                    ₹{item.product.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-neutral-50 p-4 rounded-xl space-y-1.5 text-xs text-neutral-600 border border-neutral-100">
              <div className="flex justify-between">
                <span>Payment Method:</span>
                <span className="font-bold uppercase text-neutral-900">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Address:</span>
                <span className="font-medium text-neutral-800 text-right max-w-xs">
                  {order.shippingAddress.streetAddress}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-neutral-900 border-t border-neutral-200 pt-2 mt-2">
                <span>Total Paid:</span>
                <span>₹{order.total}</span>
              </div>
            </div>
          </div>

          {/* Routine prep tips */}
          <div className="p-5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-left text-xs text-emerald-950 space-y-2">
            <strong className="flex items-center gap-1.5 text-emerald-900 font-bold">
              <Sparkles className="w-4 h-4 text-emerald-700" /> While you wait for delivery:
            </strong>
            <p className="text-[11px] leading-relaxed text-emerald-900/80">
              Ensure you have a mild, fragrance-free cleanser and a daily broad-spectrum SPF 30+ ready. Remember to perform a 24-hour patch test behind your ear before full-face application.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            {onTrackOrder && (
              <button
                id="order-success-track-live-btn"
                onClick={() => onTrackOrder(order.id)}
                className="flex-1 py-3.5 bg-black hover:bg-neutral-800 text-white text-[10px] font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-2xs active:scale-98"
              >
                <Truck className="w-4 h-4 text-[#8A9A5B]" />
                <span>Track Live Laboratory &amp; Dispatch</span>
              </button>
            )}

            <button
              id="order-success-return-home"
              onClick={onNavigateHome}
              className="px-6 py-3.5 border border-gray-200 hover:border-black text-neutral-800 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors"
            >
              Back to Formulas
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
