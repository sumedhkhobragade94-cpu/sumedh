import { Article } from '../types';

export const ARTICLES: Article[] = [
  {
    id: 'journal-1',
    slug: 'understanding-salicylic-acid-bha',
    title: 'Understanding 2% Salicylic Acid: How BHA Clears Pores From Within',
    category: 'Active Science',
    readTime: '4 min read',
    date: 'August 2026',
    summary: 'Unlike water-soluble AHAs that work on the skin surface, Salicylic Acid is oil-soluble, allowing it to penetrate deep inside the pore lining.',
    content: [
      'Salicylic Acid is a lipid-soluble Beta Hydroxy Acid (BHA). Because human sebum is predominantly lipid-based, water-soluble exfoliating acids (like Glycolic or Lactic acid) cannot easily penetrate deep into congested sebaceous glands.',
      'At an optimal concentration of 2% and a formulated pH between 3.8 and 4.2, Salicylic Acid breaks down desmosomes—the cellular bonds that hold dead skin cells together inside the pore. This action allows trapped sebum and debris to shed naturally rather than forming micro-comedones and inflammatory blemishes.',
      'When integrating a 2% BHA into your daily regimen, consistency outranks frequency. Applying 2 to 3 drops 3 evenings a week supports long-term pore refinement and smooth skin texture without disrupting your epidermal moisture barrier.'
    ],
    relatedProductSlug: 'clarify'
  },
  {
    id: 'journal-2',
    slug: 'niacinamide-for-modern-skin',
    title: 'Why 10% Niacinamide is the Essential Multi-Tasker for Modern Skin',
    category: 'Barrier Health',
    readTime: '3 min read',
    date: 'August 2026',
    summary: 'Niacinamide (Vitamin B3) supports ceramide synthesis, regulates sebum production, and visibly refines pore structure.',
    content: [
      'Niacinamide is a water-soluble form of Vitamin B3 that plays a crucial enzymatic role in cellular energy metabolism (NAD+/NADP+). In topical cosmetic formulations, a 10% concentration offers broad-spectrum restorative benefits across all skin types.',
      'One of its primary actions is stimulating the natural production of ceramides and free fatty acids in the stratum corneum. This fortifies your moisture barrier, preventing trans-epidermal water loss (TEWL) and shielding skin against urban environmental stressors.',
      'Additionally, Niacinamide helps regulate sebum excretion rates and prevents the transfer of melanin pigment granules to surface keratinocytes, visibly fading post-breakout dark marks and promoting a balanced, radiant tone.'
    ],
    relatedProductSlug: 'renew'
  },
  {
    id: 'journal-3',
    slug: 'layering-skincare-actives-guide',
    title: 'The Minimalist Layering Guide: How to Pair BHA & Niacinamide',
    category: 'Routine Science',
    readTime: '5 min read',
    date: 'August 2026',
    summary: 'Mastering a clean, minimal routine without over-exfoliating or causing ingredient clashes.',
    content: [
      'One of the most common skincare pitfalls is product overload. Building an effective routine does not require a 10-step shelf—it requires intentional formulations that work synergistically.',
      'Salicylic Acid and Niacinamide form a classic clinical pairing for congestion and uneven tone. BHA operates at a lower pH (around 4.0) to clear pores, while Niacinamide operates at a neutral pH (around 6.0) to soothe and hydrate.',
      'The optimal approach is an AM/PM split: apply NOVELIS RENEW in the morning to balance oil production and protect against daytime stress, followed by sunscreen. In the evening, apply NOVELIS CLARIFY to clean dry skin, let it absorb for 60 seconds, and seal with your night moisturizer.'
    ],
    relatedProductSlug: 'duo'
  }
];
