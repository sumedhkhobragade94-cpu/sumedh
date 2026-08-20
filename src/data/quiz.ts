import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is your primary skin concern?',
    subtitle: 'Select the primary priority you want your routine to address.',
    options: [
      {
        label: 'Active Acne & Clogged Pores',
        description: 'Frequent blackheads, whiteheads, surface bumps, and excess T-zone oiliness.',
        scores: { clarify: 4, renew: 1, both: 2 }
      },
      {
        label: 'Uneven Skin Tone & Dark Marks',
        description: 'Post-breakout pigmentation, blotchiness, dull complexion, and enlarged pore texture.',
        scores: { clarify: 1, renew: 4, both: 2 }
      },
      {
        label: 'Both Congestion & Uneven Marks',
        description: 'Struggling with both recurring breakouts and lingering dark spots / textural roughness.',
        scores: { clarify: 3, renew: 3, both: 5 }
      },
      {
        label: 'Dehydration & Weakened Barrier',
        description: 'Skin feels tight, easily sensitized, reactive to weather changes, yet prone to shine.',
        scores: { clarify: 0, renew: 4, both: 2 }
      }
    ]
  },
  {
    id: 2,
    question: 'How does your skin usually feel by midday?',
    subtitle: 'Understand your skin sebum production and natural lipid barrier.',
    options: [
      {
        label: 'Visibly shiny and greasy all over',
        description: 'Heavy sebum breakthrough across forehead, nose, chin, and cheeks.',
        scores: { clarify: 3, renew: 2, both: 3 }
      },
      {
        label: 'Shiny only along the T-zone',
        description: 'Oily forehead and nose, while cheeks feel comfortable or slightly dry.',
        scores: { clarify: 2, renew: 3, both: 4 }
      },
      {
        label: 'Comfortable, balanced, or matte',
        description: 'Minimal shine throughout the day without tightness.',
        scores: { clarify: 1, renew: 3, both: 2 }
      },
      {
        label: 'Tight, dry, or easily flushed',
        description: 'Prone to flaking around the mouth or burning with harsh products.',
        scores: { clarify: 0, renew: 4, both: 1 }
      }
    ]
  },
  {
    id: 3,
    question: 'How often do you experience breakouts?',
    subtitle: 'This helps gauge the intensity of chemical exfoliation your skin needs.',
    options: [
      {
        label: 'Frequently (Multiple active pimples or bumps weekly)',
        description: 'Ongoing congestion needing lipid-soluble pore clearance.',
        scores: { clarify: 4, renew: 1, both: 3 }
      },
      {
        label: 'Occasionally (1–2 spots per month or under stress)',
        description: 'Mild congestion with post-inflammatory marks taking long to fade.',
        scores: { clarify: 2, renew: 3, both: 4 }
      },
      {
        label: 'Rarely, but dealing with leftover marks or texture',
        description: 'Breakouts have settled, but tone is uneven and pores appear stretched.',
        scores: { clarify: 1, renew: 4, both: 3 }
      },
      {
        label: 'Almost never',
        description: 'Focus is strictly on skin barrier health, tone uniformity, and hydration.',
        scores: { clarify: 0, renew: 4, both: 1 }
      }
    ]
  },
  {
    id: 4,
    question: 'What type of daily routine do you prefer?',
    subtitle: 'Consistency is key. We personalize formulas you can maintain comfortably.',
    options: [
      {
        label: 'Ultra Minimal (1 targeted serum step)',
        description: 'Cleanse, one high-impact serum, moisturize & SPF.',
        scores: { clarify: 2, renew: 2, both: 0 }
      },
      {
        label: 'Targeted AM/PM Split (2 focused formulas)',
        description: 'One serum in the morning, one in the evening for synergistic results.',
        scores: { clarify: 1, renew: 1, both: 5 }
      },
      {
        label: 'Complete Science Routine (Synergistic System)',
        description: 'Full layering of pore clarifying actives and barrier reinforcement.',
        scores: { clarify: 1, renew: 1, both: 6 }
      }
    ]
  }
];
