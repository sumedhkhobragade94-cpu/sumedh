import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, Package, CheckCircle2, Clock, Truck, ShieldCheck, MapPin, AlertCircle, ArrowRight } from 'lucide-react';

interface LiveOrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderNumber?: string;
}

export const LiveOrderTrackerModal: React.FC<LiveOrderTrackerModalProps> = ({
  isOpen,
  onClose,
  initialOrderNumber = 'NOV-84291'
}) => {
  const [orderQuery, setOrderQuery] = useState<string>(initialOrderNumber);
  const [orderData, setOrderData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFetchOrder = async (orderIdToFetch?: string) => {
    const id = (orderIdToFetch || orderQuery).trim().toUpperCase();
    if (!id) return;
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(id)}`);
      const data = await res.json();
      if (data.success && data.order) {
        setOrderData(data.order);
      } else {
        setErrorMsg(data.message || `No active shipment found for #${id}.`);
        setOrderData(null);
      }
    } catch (err: any) {
      setErrorMsg('Failed to connect to NOVELIS tracking server. Please check connection.');
      setOrderData(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-fetch demo order on first open if empty
  React.useEffect(() => {
    if (isOpen && !orderData) {
      handleFetchOrder('NOV-84291');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-white border border-gray-100 shadow-2xl z-10 max-h-[90vh] flex flex-col overflow-hidden text-[#111]"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
            <div className="flex items-center gap-2.5">
              <Package className="w-4 h-4 text-[#8A9A5B]" />
              <h3 className="text-xs uppercase font-bold tracking-[0.25em] text-[#111]">
                Live Order &amp; Lab Dispatch Tracking
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-black transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="p-6 border-b border-gray-100 bg-white">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleFetchOrder();
              }}
              className="flex gap-2"
            >
              <div className="relative flex-1">
                <input
                  type="text"
                  value={orderQuery}
                  onChange={(e) => setOrderQuery(e.target.value)}
                  placeholder="Enter Order ID (e.g. NOV-84291)"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 text-xs font-mono text-black focus:outline-none focus:border-black uppercase tracking-wider"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="px-5 py-2.5 bg-black hover:bg-neutral-800 text-white text-[10px] font-bold uppercase tracking-[0.2em] transition-colors flex items-center gap-1.5 shrink-0"
              >
                <Search className="w-3.5 h-3.5" />
                <span>{isLoading ? 'Searching...' : 'Track'}</span>
              </button>
            </form>

            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] text-gray-400">Quick Test:</span>
              <button
                type="button"
                onClick={() => {
                  setOrderQuery('NOV-84291');
                  handleFetchOrder('NOV-84291');
                }}
                className="text-[10px] font-mono text-[#8A9A5B] hover:underline"
              >
                #NOV-84291 (Active Demo)
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            {errorMsg && (
              <div className="p-4 bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {orderData && (
              <div className="space-y-6">
                {/* Order Summary Strip */}
                <div className="p-4 bg-[#fcfcfc] border border-gray-100 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-gray-400 block font-mono">
                      Order Reference
                    </span>
                    <span className="text-base font-bold font-mono text-black">
                      #{orderData.orderNumber}
                    </span>
                  </div>

                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-gray-400 block">
                      Estimated Arrival
                    </span>
                    <span className="text-xs font-bold text-[#8A9A5B] font-mono">
                      {orderData.estimatedDelivery || '3–4 Business Days'}
                    </span>
                  </div>

                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-gray-400 block">
                      Carrier Status
                    </span>
                    <span className="inline-block px-2 py-0.5 text-[9px] uppercase font-bold tracking-wider bg-black text-white">
                      {orderData.trackingStatus}
                    </span>
                  </div>
                </div>

                {/* 2D Animated Tracking Timeline */}
                <div className="space-y-4">
                  <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400">
                    Live Lab &amp; Transit Log
                  </h4>

                  <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
                    {orderData.timeline?.map((step: any, idx: number) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="relative"
                      >
                        {/* Step Marker Dot */}
                        <div
                          className={`absolute -left-[27px] top-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            step.completed
                              ? 'bg-[#8A9A5B] border-[#8A9A5B] text-white'
                              : 'bg-white border-gray-300'
                          }`}
                        >
                          {step.completed && <CheckCircle2 className="w-2.5 h-2.5" />}
                        </div>

                        <div className="flex items-baseline justify-between gap-2">
                          <h5 className={`text-xs font-bold ${step.completed ? 'text-black' : 'text-gray-400'}`}>
                            {step.status}
                          </h5>
                          <span className="text-[10px] font-mono text-gray-400">
                            {step.timestamp}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                          {step.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Items & Shipping Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div className="bg-gray-50 p-3.5 space-y-2">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-gray-400 block">
                      Delivering To
                    </span>
                    <p className="text-xs font-bold text-black">{orderData.shippingAddress.fullName}</p>
                    <p className="text-[11px] text-gray-500 leading-tight">
                      {orderData.shippingAddress.streetAddress}, {orderData.shippingAddress.city}, {orderData.shippingAddress.state} - {orderData.shippingAddress.pincode}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-3.5 space-y-2">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-gray-400 block">
                      Order Summary ({orderData.items?.length} items)
                    </span>
                    <div className="space-y-1">
                      {orderData.items?.map((it: any, i: number) => (
                        <div key={i} className="flex justify-between text-[11px]">
                          <span className="text-gray-700">
                            {it.product.name} × {it.quantity}
                          </span>
                          <span className="font-mono font-bold">₹{it.product.price * it.quantity}</span>
                        </div>
                      ))}
                      <div className="pt-1.5 border-t border-gray-200 flex justify-between text-xs font-bold">
                        <span>Total Paid:</span>
                        <span className="font-mono">₹{orderData.total}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-500">
            <span>NOVELIS Real-Time Express Logistics API</span>
            <button
              onClick={onClose}
              className="font-bold text-black uppercase tracking-wider hover:underline"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
