export type PlanKey = 'free' | 'plus' | 'pro';

export type Plan = {
  key: PlanKey;
  name: string;
  badge: string;
  monthlyPrice: string;
  annualPrice: string;
  annualNote: string;
  description: string;
  audience: string;
  highlighted: boolean;
  ctaLabel: string;
  ctaHref: string;
  limits: {
    tutorRequestsPerDay: string;
    imageUploadsPerMonth: string;
    savedConversations: string;
  };
  features: string[];
};

export const plans: Plan[] = [
  {
    key: 'free',
    name: 'Free',
    badge: 'Start here',
    monthlyPrice: '$0',
    annualPrice: '$0',
    annualNote: 'Free beta access',
    description:
      'A simple way to try TutoVera across all subject branches with text-based tutoring and basic saved history.',
    audience: 'Best for light use, testing the platform, and occasional study support.',
    highlighted: false,
    ctaLabel: 'Start Free',
    ctaHref: '/tutor',
    limits: {
      tutorRequestsPerDay: '10/day',
      imageUploadsPerMonth: 'Not included',
      savedConversations: 'Basic history'
    },
    features: [
      'All subject branches',
      'Student workspaces',
      'Parent workspaces',
      'Text-based tutoring',
      'Saved history with limits',
      'Read aloud',
      'Translation',
      'Math graphing',
      'Tables and math formatting',
      'No image upload or worksheet-photo support'
    ]
  },
  {
    key: 'plus',
    name: 'Plus',
    badge: 'Most popular',
    monthlyPrice: '$9.99',
    annualPrice: '$99.99/year',
    annualNote: 'Annual plan saves about 2 months',
    description:
      'For regular students and parents who want higher usage, longer history, and paid-only image support.',
    audience: 'Best for students, parents, and families using TutoVera regularly.',
    highlighted: true,
    ctaLabel: 'Join Plus Waitlist',
    ctaHref: '/contact',
    limits: {
      tutorRequestsPerDay: '100/day',
      imageUploadsPerMonth: '100/month',
      savedConversations: 'Extended history'
    },
    features: [
      'Everything in Free',
      'Higher tutor request limits',
      'Paid-only image upload enabled',
      'Worksheet/photo help with monthly cap',
      'Extended saved history',
      'Mistake diagnosis',
      'Practice generation',
      'Parent support across all subjects',
      'Priority beta access',
      'Better fit for regular study routines'
    ]
  },
  {
    key: 'pro',
    name: 'Pro',
    badge: 'Highest access',
    monthlyPrice: '$19.99',
    annualPrice: '$199.99/year',
    annualNote: 'Annual plan saves about 2 months',
    description:
      'For heavier study, larger image usage, advanced workflows, and early access to future subject tools.',
    audience: 'Best for serious users, heavier study periods, and advanced learning workflows.',
    highlighted: false,
    ctaLabel: 'Join Pro Waitlist',
    ctaHref: '/contact',
    limits: {
      tutorRequestsPerDay: '300/day',
      imageUploadsPerMonth: '500/month',
      savedConversations: 'Highest history allowance'
    },
    features: [
      'Everything in Plus',
      'Highest tutor request limits',
      'Larger image and worksheet cap',
      'Advanced worksheet/photo help',
      'Longer session context',
      'Advanced subject tools',
      'Deeper revision workflows',
      'Early access to simulators and diagrams',
      'Best access for future premium tools',
      'Generous high-usage limits without calling it unlimited'
    ]
  }
];

export function getPlan(planKey: PlanKey) {
  return plans.find((plan) => plan.key === planKey) || plans[0];
}

export function getPaidPlans() {
  return plans.filter((plan) => plan.key !== 'free');
}

export function planAllowsImageProcessing(planKey: PlanKey) {
  return planKey === 'plus' || planKey === 'pro';
}