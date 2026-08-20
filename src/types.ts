export interface Product {
  id: string;
  slug: string;
  name: string;
  fullName: string;
  tagline: string;
  concentration: string;
  keyIngredient: string;
  category: 'Serums' | 'Acne Care' | 'Brightening' | 'Hydration';
  tags: string[];
  size: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  packaging: string;
  accentColor: {
    bg: string;
    text: string;
    border: string;
    light: string;
  };
  bottleSpecs: {
    glass: string;
    dropper: string;
    box: string;
    ph: string;
    texture: string;
  };
  images: {
    primary: string;
    texture: string;
    lifestyle?: string;
  };
  howToUse: {
    when: string;
    frequency: string;
    steps: string[];
    pairWith: string[];
    avoidWith?: string[];
  };
  ingredientsList: string;
  ingredientHighlights: {
    name: string;
    percentage?: string;
    role: string;
    purpose: string;
  }[];
  suitableFor: string[];
  caution: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  streetAddress: string;
  apartment?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: 'upi' | 'card' | 'cod';
  paymentStatus: 'paid' | 'pending';
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  estimatedDelivery: string;
  trackingStatus: 'confirmed' | 'processing' | 'shipped' | 'delivered';
}

export interface QuizQuestion {
  id: number;
  question: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    scores: {
      clarify: number;
      renew: number;
      both: number;
    };
  }[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  summary: string;
  content: string[];
  relatedProductSlug: string;
}

export interface FAQItem {
  id: string;
  category: 'Usage' | 'Formulation' | 'Orders & Shipping' | 'Safety';
  question: string;
  answer: string;
}
