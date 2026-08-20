import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'clarify-salicylic-2',
    slug: 'clarify',
    name: 'CLARIFY',
    fullName: 'NOVELIS CLARIFY Salicylic Acid 2% Anti-Acne Solution',
    tagline: 'Targeted BHA Exfoliant for Blemish-Prone Skin',
    concentration: 'Salicylic Acid 2%',
    keyIngredient: 'Salicylic Acid (BHA)',
    category: 'Acne Care',
    tags: ['Acne & Blemishes', 'Pores & Congestion', 'Oil Control', 'BHA Exfoliant'],
    size: '30 ml',
    price: 599,
    originalPrice: 699,
    inStock: true,
    shortDescription: 'A lightweight exfoliating serum designed for blemish-prone and oily skin.',
    fullDescription: 'NOVELIS CLARIFY is a precision-formulated water-based chemical exfoliant powered by 2% pure Salicylic Acid (Beta Hydroxy Acid). Engineered with optimal bioavailability at pH 3.8–4.2, it penetrates deep into lipid-rich pores to dissolve accumulated sebum, cellular debris, and surface congestion without stripping the protective moisture barrier.',
    benefits: [
      'Helps improve the appearance of blemishes',
      'Helps unclog pores',
      'Helps control excess oil',
      'Supports smoother-looking skin'
    ],
    packaging: '30 ml amber glass dropper bottle with white dropper and premium white box.',
    accentColor: {
      bg: '#4F6D54',
      text: '#2F4834',
      border: '#C5D6C8',
      light: '#F2F6F3'
    },
    bottleSpecs: {
      glass: 'UV-protective amber glass (30 ml)',
      dropper: 'Medical-grade white rubber pipette with glass pipette',
      box: 'Rigid matte textured FSC white carton with debossed minimal typography',
      ph: '3.8 – 4.2',
      texture: 'Weightless, clear water-fluid with instant quick-absorption'
    },
    images: {
      primary: '/src/assets/images/product_clarify_1787246126360.jpg',
      texture: '/src/assets/images/clarify_texture_1787246148757.jpg',
      lifestyle: '/src/assets/images/hero_skincare_duo_1787246110419.jpg'
    },
    howToUse: {
      when: 'PM (Evening Routine)',
      frequency: '2 to 3 times per week initially, building to daily night use as tolerated.',
      steps: [
        'Cleanse skin thoroughly with a gentle, non-stripping cleanser and pat completely dry.',
        'Dispense 2 to 3 drops onto fingertips or directly onto target areas.',
        'Smooth gently over face and neck, avoiding the eye contour and lips. Do not rinse.',
        'Wait 60 seconds before applying your non-comedogenic moisturizer.',
        'Always wear broad-spectrum SPF 30+ during daytime.'
      ],
      pairWith: ['NOVELIS RENEW (alternated or layered after drying)', 'Gentle barrier moisturizer'],
      avoidWith: ['Strong physical scrubs or high-concentration Retinoids in the exact same application step']
    },
    ingredientsList: 'Aqua, Salicylic Acid (2.0% w/w), Pentylene Glycol, Propanediol, Sodium Hydroxide, Hydroxyethylcellulose, Phenoxyethanol, Ethylhexylglycerin, Disodium EDTA.',
    ingredientHighlights: [
      {
        name: 'Salicylic Acid (BHA)',
        percentage: '2.0%',
        role: 'Lipid-Soluble Chemical Exfoliant',
        purpose: 'Penetrates oil glands to dissolve dead skin cells and clear pore blockages.'
      },
      {
        name: 'Pentylene Glycol',
        percentage: '3.0%',
        role: 'Humectant & Penetration Enhancer',
        purpose: 'Boosts moisture retention and helps active delivery without tackiness.'
      },
      {
        name: 'Propanediol',
        percentage: '2.5%',
        role: 'Skin Conditioner',
        purpose: 'Balances hydration and softens surface skin texture.'
      },
      {
        name: 'Hydroxyethylcellulose',
        percentage: '0.8%',
        role: 'Non-greasy Bio-Polymer',
        purpose: 'Provides silky slip and optimal spreadability without pore-clogging film.'
      }
    ],
    suitableFor: [
      'Oily and shiny skin',
      'Blemish-prone and congested skin',
      'Skin with visible blackheads and enlarged pores',
      'Combination skin with T-zone congestion'
    ],
    caution: [
      'Perform a patch test behind the ear or on inner forearm 24 hours before first use.',
      'Do not apply on compromised, peeling, or broken skin.',
      'Avoid direct contact with eyes and mucous membranes. If contact occurs, rinse thoroughly with cool water.',
      'Mild tingling is normal upon initial application. If persistent redness occurs, reduce usage frequency.'
    ],
    faqs: [
      {
        question: 'Can I use NOVELIS CLARIFY every single day?',
        answer: 'If you are new to Salicylic Acid, we recommend starting with 2 to 3 evenings per week. Once your skin builds tolerance, it can be safely used every evening.'
      },
      {
        question: 'Will CLARIFY cause skin purging?',
        answer: 'Because Salicylic Acid accelerates skin cell turnover and clears congested follicles, some users may experience temporary micro-purging for 2-3 weeks as underlying blockages surface.'
      },
      {
        question: 'Can I use CLARIFY with NOVELIS RENEW?',
        answer: 'Yes. Niacinamide (RENEW) and Salicylic Acid (CLARIFY) complement each other exceptionally well. You can apply CLARIFY in the evening and RENEW in the morning, or layer RENEW after CLARIFY has absorbed.'
      }
    ]
  },
  {
    id: 'renew-niacinamide-10',
    slug: 'renew',
    name: 'RENEW',
    fullName: 'NOVELIS RENEW Niacinamide 10% Face Serum',
    tagline: 'Multi-Action Restorative Serum for Even Tone & Hydration',
    concentration: 'Niacinamide 10%',
    keyIngredient: 'Niacinamide (Vitamin B3) + Zinc PCA 1%',
    category: 'Brightening',
    tags: ['Pore Minimizing', 'Even Tone', 'Hydration', 'Skin Barrier', 'Soothe & Calm'],
    size: '30 ml',
    price: 599,
    originalPrice: 699,
    inStock: true,
    shortDescription: 'A lightweight niacinamide serum designed to support a more even-looking, hydrated complexion.',
    fullDescription: 'NOVELIS RENEW is an essential multi-functional restorative formula combining high-potency 10% pure Niacinamide (Vitamin B3) with 1% Zinc PCA and bio-identical Hyaluronic Acid. Designed to refine pore texture, diminish the look of post-blemish marks, replenish moisture reserves, and reinforce the epidermal barrier in modern climates.',
    benefits: [
      'Helps minimize the appearance of pores',
      'Helps even the appearance of skin tone',
      'Supports skin hydration',
      'Helps soothe the appearance of stressed skin'
    ],
    packaging: '30 ml transparent/glossy dark glass dropper bottle with black dropper and premium white box.',
    accentColor: {
      bg: '#4A6B82',
      text: '#28465B',
      border: '#BACBD8',
      light: '#F0F5F9'
    },
    bottleSpecs: {
      glass: 'Glossy dark transparent amber-slate glass (30 ml)',
      dropper: 'Precision black matte pipette with glass dropper tip',
      box: 'Rigid matte textured FSC white carton with debossed minimal typography',
      ph: '5.5 – 6.0',
      texture: 'Silky, lightweight hydrating fluid with zero residue'
    },
    images: {
      primary: '/src/assets/images/product_renew_1787246137486.jpg',
      texture: '/src/assets/images/renew_texture_1787246160626.jpg',
      lifestyle: '/src/assets/images/hero_skincare_duo_1787246110419.jpg'
    },
    howToUse: {
      when: 'AM & PM (Morning & Evening Routine)',
      frequency: 'Daily, twice a day.',
      steps: [
        'Cleanse face thoroughly and gently pat skin until lightly damp.',
        'Dispense 2 to 3 drops onto palm or fingertips.',
        'Press evenly into face, neck, and décolletage with light upward motions.',
        'Allow 30 seconds for complete absorption.',
        'Follow with your daily moisturizer and daytime sunscreen.'
      ],
      pairWith: ['NOVELIS CLARIFY', 'Hyaluronic Acid', 'Ceramide creams', 'Daily Sunscreen'],
      avoidWith: ['No major incompatibilities. If pairing with pure Vitamin C (L-Ascorbic Acid), use at alternating times (e.g. Vitamin C in AM, RENEW in PM).']
    },
    ingredientsList: 'Aqua, Niacinamide (10.0% w/w), Glycerin, Zinc PCA (1.0% w/w), Sodium Hyaluronate, Propanediol, Xanthan Gum, Phenoxyethanol, Ethylhexylglycerin, Citric Acid.',
    ingredientHighlights: [
      {
        name: 'Niacinamide (Vitamin B3)',
        percentage: '10.0%',
        role: 'Skin Restorer & Sebum Regulator',
        purpose: 'Visibly refines pores, fades discoloration, and bolsters barrier lipid synthesis.'
      },
      {
        name: 'Zinc PCA',
        percentage: '1.0%',
        role: 'Mineral Balancing Complex',
        purpose: 'Helps regulate surface sebum and calms visible skin reactivity.'
      },
      {
        name: 'Sodium Hyaluronate',
        percentage: '0.5%',
        role: 'Multi-Depth Humectant',
        purpose: 'Draws moisture deep into dermal layers to sustain plump hydration.'
      },
      {
        name: 'Glycerin',
        percentage: '4.0%',
        role: 'Plant-derived Hydrator',
        purpose: 'Provides long-lasting moisture balance and protects against dehydration.'
      }
    ],
    suitableFor: [
      'All skin types (Normal, Oily, Dry, Combination)',
      'Skin with enlarged or visible pores',
      'Uneven skin tone and post-breakout marks',
      'Dehydrated, dull, or stressed urban skin'
    ],
    caution: [
      'Perform a patch test prior to initial application.',
      'If irritation or rash occurs, rinse thoroughly with water and discontinue use.',
      'Keep out of reach of children. Store in a cool, dry place away from direct sunlight.'
    ],
    faqs: [
      {
        question: 'Can sensitive skin use a 10% Niacinamide concentration?',
        answer: 'Yes, our formula is buffered with soothing Zinc PCA and hydrating hyaluronic acid to minimize irritation. If you have hypersensitive skin, test a drop on your forearm first.'
      },
      {
        question: 'How long before I notice visible results with RENEW?',
        answer: 'Hydration and skin softness are noticeable immediately. Reductions in excess shine and pore appearance typically become visible after 2 to 4 weeks of consistent twice-daily application.'
      },
      {
        question: 'Is RENEW sticky or greasy under makeup?',
        answer: 'No. RENEW has a feather-light, quick-absorbing watery fluid texture that leaves a soft, shine-free velvet finish perfect as a base under sunscreen or makeup.'
      }
    ]
  }
];

export const BUNDLE_PAIR = {
  id: 'the-clarify-renew-duo',
  slug: 'duo',
  name: 'THE COMPLETE SCIENCE DUO',
  fullName: 'NOVELIS CLARIFY + RENEW 2-Step Daily System',
  tagline: 'Targeted BHA Clarity & Barrier Niacinamide Hydration',
  price: 1099,
  originalPrice: 1398,
  savings: 'Save ₹299 (21% OFF)',
  description: 'Our foundational two-bottle clinical routine. Use CLARIFY in the evening to decongest pores and control oil, and RENEW morning and night to balance sebum, even tone, and lock in hydration.',
  items: [PRODUCTS[0], PRODUCTS[1]],
  image: '/src/assets/images/hero_skincare_duo_1787246110419.jpg'
};
