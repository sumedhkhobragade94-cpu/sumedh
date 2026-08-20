import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory data stores for orders, reviews, newsletter subscribers, and support tickets
interface StoredOrder {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: any[];
  shippingAddress: any;
  paymentMethod: string;
  paymentStatus: string;
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  estimatedDelivery: string;
  trackingStatus: 'confirmed' | 'processing' | 'shipped' | 'delivered';
  timeline: {
    status: string;
    description: string;
    timestamp: string;
    completed: boolean;
  }[];
}

const ordersStore = new Map<string, StoredOrder>();
const newsletterSubscribers = new Set<string>();
const contactTickets: any[] = [];
const customReviews: Record<string, any[]> = {
  clarify: [
    {
      id: 'rev-1',
      author: 'Ananya S.',
      rating: 5,
      skinType: 'Oily / Acne-Prone',
      date: '2 days ago',
      title: 'Cleared persistent forehead congestion in 10 days',
      content: 'I love that this formula is not sticky at all. It feels like water, absorbs in 10 seconds, and has zero irritating fragrance. My blackheads around the nose reduced noticeably by week 2.',
      verified: true
    },
    {
      id: 'rev-2',
      author: 'Rohan M.',
      rating: 5,
      skinType: 'Combination',
      date: '1 week ago',
      title: 'Gentle yet clinical strength',
      content: 'Most 2% salicylic acids sting my barrier, but NOVELIS got the pH and soothing base just right. 3 drops every other night is now my holy grail PM step.',
      verified: true
    }
  ],
  renew: [
    {
      id: 'rev-3',
      author: 'Pooja K.',
      rating: 5,
      skinType: 'Combination / Hyperpigmentation',
      date: '4 days ago',
      title: 'Post-acne marks faded so much faster',
      content: 'Pairing Renew in the AM with my mineral sunscreen transformed my skin texture. Oiliness in the T-zone is balanced without any dryness.',
      verified: true
    },
    {
      id: 'rev-4',
      author: 'Vikram D.',
      rating: 5,
      skinType: 'Dry & Sensitive',
      date: '2 weeks ago',
      title: 'No flush, pure hydration and barrier strength',
      content: 'Clean ingredients list. 10% Niacinamide with Zinc PCA calms redness instantly after shaving.',
      verified: true
    }
  ]
};

// Seed sample orders for demo tracking
const seedOrderId = 'NOV-84291';
ordersStore.set(seedOrderId, {
  id: seedOrderId,
  orderNumber: seedOrderId,
  createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
  items: [
    {
      product: {
        id: 'clarify-salicylic-2',
        slug: 'clarify',
        name: 'CLARIFY',
        fullName: 'NOVELIS CLARIFY Salicylic Acid 2%',
        concentration: 'Salicylic Acid 2%',
        size: '30 ml',
        price: 599
      },
      quantity: 1
    },
    {
      product: {
        id: 'renew-niacinamide-10',
        slug: 'renew',
        name: 'RENEW',
        fullName: 'NOVELIS RENEW Niacinamide 10% + Zinc 1%',
        concentration: 'Niacinamide 10% + Zinc 1%',
        size: '30 ml',
        price: 599
      },
      quantity: 1
    }
  ],
  shippingAddress: {
    fullName: 'Demo Customer',
    email: 'customer@example.com',
    phone: '+91 98765 43210',
    streetAddress: '42 Science Park Avenue',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560001'
  },
  paymentMethod: 'upi',
  paymentStatus: 'paid',
  subtotal: 1198,
  shippingFee: 0,
  discount: 100,
  total: 1098,
  estimatedDelivery: '3–4 Business Days',
  trackingStatus: 'shipped',
  timeline: [
    {
      status: 'Order Confirmed',
      description: 'Payment verified and batch allocated from sterile laboratory storage.',
      timestamp: 'Yesterday, 10:30 AM',
      completed: true
    },
    {
      status: 'Quality & UV Inspection',
      description: 'Amber pipette bottle seals checked for nitrogen purge stability.',
      timestamp: 'Yesterday, 02:15 PM',
      completed: true
    },
    {
      status: 'Dispatched with Express Courier',
      description: 'Handed over to BlueDart Air Express. Tracking AWB: BD-984712093IN',
      timestamp: 'Today, 08:45 AM',
      completed: true
    },
    {
      status: 'Out for Delivery',
      description: 'Courier agent en route to recipient address.',
      timestamp: 'Estimated Tomorrow',
      completed: false
    }
  ]
});

// Lazy initialize Gemini API client
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!geminiClient && process.env.GEMINI_API_KEY) {
    geminiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return geminiClient;
}

// ----------------------------------------------------
// API ROUTES
// ----------------------------------------------------

// 1. Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    app: 'NOVELIS SKIN SCIENCE API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    features: ['routine-diagnose', 'orders', 'tracking', 'reviews', 'lab-simulation']
  });
});

// 2. Active compatibility & molecular lab simulation endpoint
app.post('/api/lab/simulate-compatibility', (req: Request, res: Response) => {
  try {
    const { primaryActive, secondaryActive } = req.body;
    
    // Matrix of clinical interactions
    let compatibilityStatus = 'optimal';
    let phRange = '3.8 – 6.0';
    let safetyScore = 96;
    let recommendation = 'Safe to layer or alternate between AM and PM routines.';
    let scientificMechanism = 'Both actives have complementary biological targets without competitive receptor inhibition.';

    if (primaryActive === 'salicylic_acid' && secondaryActive === 'niacinamide') {
      compatibilityStatus = 'optimal';
      phRange = 'Clarify (pH 3.8–4.2) PM • Renew (pH 5.5–6.0) AM';
      safetyScore = 98;
      recommendation = 'Gold Standard Synergy: BHA unclogs sebum pores, while Niacinamide repairs barrier ceramides and reduces redness.';
      scientificMechanism = 'Salicylic Acid is lipophilic and dissolves pore debris; Niacinamide stimulates keratinocyte differentiation and suppresses melanosome transfer.';
    } else if (primaryActive === 'salicylic_acid' && secondaryActive === 'retinoid') {
      compatibilityStatus = 'caution';
      phRange = 'pH 3.8 vs pH 5.5';
      safetyScore = 72;
      recommendation = 'Alternate nights (Skin Cycling). Do not layer at the exact same minute to prevent barrier irritation.';
      scientificMechanism = 'Simultaneous chemical exfoliation and accelerated cellular turnover may transiently impair the lipid mantle.';
    } else if (primaryActive === 'niacinamide' && secondaryActive === 'zinc_pca') {
      compatibilityStatus = 'optimal';
      phRange = 'pH 5.5 – 6.0';
      safetyScore = 99;
      recommendation = 'Pre-formulated synergy in NOVELIS RENEW. Zero irritation, high anti-inflammatory outcome.';
      scientificMechanism = 'Zinc PCA inhibits 5-alpha-reductase reducing sebum output, while Niacinamide enhances stratum corneum barrier lipids.';
    }

    res.json({
      success: true,
      data: {
        compatibilityStatus,
        phRange,
        safetyScore,
        recommendation,
        scientificMechanism,
        testedAt: new Date().toISOString()
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 3. Clinical Skin Routine Diagnostic Endpoint
app.post('/api/routine/diagnose', async (req: Request, res: Response) => {
  try {
    const { skinType, primaryConcern, oilLevel, sensitivity, experienceLevel } = req.body;

    let primaryRecommendation = 'both';
    let amRoutine = [
      { step: 1, action: 'Gentle Water-Splash Cleanse', product: 'Lukewarm Water' },
      { step: 2, action: 'Tone & Barrier Support', product: 'NOVELIS RENEW (10% Niacinamide + 1% Zinc PCA)', drops: '2-3 drops' },
      { step: 3, action: 'Barrier Hydration', product: 'Lightweight Gel Moisturizer' },
      { step: 4, action: 'Broad Spectrum UV Defense', product: 'Mineral SPF 50+ PA++++' }
    ];

    let pmRoutine = [
      { step: 1, action: 'Gentle Cleanser', product: 'pH 5.5 Non-Stripping Cleanser' },
      { step: 2, action: 'Targeted Pore Exfoliation', product: 'NOVELIS CLARIFY (2% Salicylic Acid BHA)', drops: '2-3 drops' },
      { step: 3, action: 'Moisture Barrier Lock', product: 'Ceramide Rich Cream' }
    ];

    let rationale = 'Balanced approach: unclog pore congestion at night with lipid-soluble BHA, and regulate morning sebum and pigment with Niacinamide.';

    if (primaryConcern === 'acne' || primaryConcern === 'pores' || oilLevel === 'very_oily') {
      primaryRecommendation = 'clarify';
      rationale = 'Focused anti-acne regimen prioritizing deep follicular clearance, reducing active papules and blackheads with 2% Salicylic Acid.';
    } else if (primaryConcern === 'pigmentation' || primaryConcern === 'dullness' || skinType === 'dry') {
      primaryRecommendation = 'renew';
      rationale = 'Focused barrier brightening regimen prioritizing cellular renewal, evening skin tone, and fortifying ceramide synthesis with 10% Niacinamide.';
    }

    // AI Enrichment if Gemini API Key is available
    const ai = getGeminiClient();
    let aiDermatologistNote = null;
    if (ai) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `You are a clinical cosmetic dermatologist for NOVELIS SKIN SCIENCE. 
          A user with ${skinType || 'combination'} skin, primary concern "${primaryConcern || 'blemishes'}", oil level "${oilLevel || 'moderate'}", and sensitivity "${sensitivity || 'normal'}" is requesting advice.
          Provide a concise 2-sentence clinical guidance note explaining why pure Salicylic Acid 2% (pH 3.8) and/or Niacinamide 10% + Zinc 1% fits their routine.`
        });
        aiDermatologistNote = response.text;
      } catch (err) {
        console.warn('Gemini diagnosis note skipped:', err);
      }
    }

    res.json({
      success: true,
      diagnosis: {
        primaryRecommendation,
        skinProfile: {
          skinType: skinType || 'Combination',
          primaryConcern: primaryConcern || 'Blemishes & Texture',
          barrierHealthScore: sensitivity === 'high' ? 'Delicate' : 'Resilient'
        },
        rationale,
        aiDermatologistNote,
        amRoutine,
        pmRoutine,
        suggestedProducts: primaryRecommendation === 'both' ? ['clarify', 'renew'] : [primaryRecommendation]
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 4. Create Order / Checkout endpoint
app.post('/api/orders', (req: Request, res: Response) => {
  try {
    const { items, shippingAddress, paymentMethod, couponCode } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ success: false, message: 'Cart items are required.' });
    }

    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.email) {
      return res.status(400).json({ success: false, message: 'Shipping address is incomplete.' });
    }

    // Calculate subtotal
    const subtotal = items.reduce((sum: number, item: any) => sum + (item.product.price * item.quantity), 0);
    
    // Validate coupon code
    let discount = 0;
    let couponApplied = null;
    if (couponCode) {
      const code = couponCode.trim().toUpperCase();
      if (code === 'NOVELIS10' || code === 'WELCOME10') {
        discount = Math.round(subtotal * 0.10);
        couponApplied = '10% Off Clinical Welcome Discount';
      } else if (code === 'SCIENCE20' || code === 'DUO20') {
        discount = Math.round(subtotal * 0.20);
        couponApplied = '20% Off Duo Formula Discount';
      } else if (code === 'FREESHIP') {
        discount = subtotal > 799 ? 0 : 50;
        couponApplied = 'Free Shipping Code';
      }
    }

    const shippingFee = subtotal >= 799 ? 0 : 50;
    const total = Math.max(0, subtotal - discount + shippingFee);

    // Generate unique order reference
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `NOV-${randomDigits}`;
    const orderId = orderNumber;

    const newOrder: StoredOrder = {
      id: orderId,
      orderNumber,
      createdAt: new Date().toISOString(),
      items,
      shippingAddress,
      paymentMethod: paymentMethod || 'upi',
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      subtotal,
      shippingFee,
      discount,
      total,
      estimatedDelivery: '3–4 Business Days',
      trackingStatus: 'confirmed',
      timeline: [
        {
          status: 'Order Confirmed',
          description: `Order received and confirmed for ${shippingAddress.fullName}.`,
          timestamp: 'Just now',
          completed: true
        },
        {
          status: 'Lab Batch Quality Inspection',
          description: 'Pipette seal and pH balance testing in cleanroom prior to dispatch.',
          timestamp: 'Scheduled Today',
          completed: false
        },
        {
          status: 'Courier Dispatch',
          description: 'BlueDart / Delhivery Air Express handover.',
          timestamp: 'Scheduled Tomorrow',
          completed: false
        },
        {
          status: 'Delivered',
          description: 'Delivered safely at your doorstep.',
          timestamp: 'Estimated 3–4 Days',
          completed: false
        }
      ]
    };

    ordersStore.set(orderId, newOrder);

    res.status(201).json({
      success: true,
      message: 'Order created successfully.',
      order: newOrder,
      couponApplied
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 5. Get Order by Order Number / ID for tracking
app.get('/api/orders/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const order = ordersStore.get(id) || ordersStore.get(id.toUpperCase());

  if (!order) {
    return res.status(404).json({
      success: false,
      message: `Order #${id} not found in NOVELIS tracking system.`
    });
  }

  res.json({
    success: true,
    order
  });
});

// 6. Reviews endpoint (Fetch & Submit)
app.get('/api/reviews/:slug', (req: Request, res: Response) => {
  const { slug } = req.params;
  const reviews = customReviews[slug] || [];
  res.json({ success: true, reviews });
});

app.post('/api/reviews', (req: Request, res: Response) => {
  try {
    const { productSlug, author, rating, skinType, title, content } = req.body;
    if (!productSlug || !author || !content) {
      return res.status(400).json({ success: false, message: 'Missing required review fields.' });
    }

    const newReview = {
      id: `rev-${Date.now()}`,
      author,
      rating: Number(rating) || 5,
      skinType: skinType || 'Combination',
      date: 'Just now',
      title: title || 'Verified Experience',
      content,
      verified: true
    };

    if (!customReviews[productSlug]) {
      customReviews[productSlug] = [];
    }
    customReviews[productSlug].unshift(newReview);

    res.status(201).json({
      success: true,
      message: 'Thank you for submitting your verified experience!',
      review: newReview
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 7. Newsletter subscription
app.post('/api/newsletter', (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Valid email address is required.' });
    }

    newsletterSubscribers.add(email.toLowerCase().trim());

    res.json({
      success: true,
      message: 'Successfully subscribed to the NOVELIS Science Dispatch.',
      welcomePromoCode: 'NOVELIS10',
      discountInfo: 'Use code NOVELIS10 at checkout for 10% off your order.'
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 8. Contact support inquiry
app.post('/api/contact', (req: Request, res: Response) => {
  try {
    const { name, email, subject, message, orderNumber } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
    }

    const ticketId = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
    const ticket = {
      ticketId,
      name,
      email,
      subject: subject || 'General Skincare Inquiry',
      orderNumber: orderNumber || null,
      message,
      createdAt: new Date().toISOString(),
      status: 'received',
      estimatedResponseTime: 'Within 4 business hours'
    };

    contactTickets.push(ticket);

    res.status(201).json({
      success: true,
      message: 'Your inquiry has been logged. Our cosmetic science team will respond promptly.',
      ticket
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ----------------------------------------------------
// VITE MIDDLEWARE & STATIC SERVING
// ----------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NOVELIS Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
