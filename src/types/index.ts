export type LanguageType = 'English' | 'Thai' | 'Chinese';

export interface WorkflowCard {
  id: number;
  title: string;
  sub: string;
  completed: boolean;
  active: boolean;
  icon: string;
}

export interface StatsItem {
  value: string;
  label: string;
}

export interface PartnerItem {
  name: string;
  logoText: string;
}

export interface LanguageContent {
  nav: {
    home: string;
    aiSales: string;
    pricing: string;
    forAgencies: string;
    login: string;
    startFree: string;
  };
  hero: {
    badge: string;
    headlinePart1: string;
    headlinePart2: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    socialProof: string;
  };
  stats: {
    rating: string;
    ratingLabel: string;
    videos: string;
    videosLabel: string;
    enhanced: string;
    enhancedLabel: string;
    agents: string;
    agentsLabel: string;
  };
  partners: {
    title: string;
  };
  customizer: {
    title: string;
    inputPlaceholder: string;
    submitBtn: string;
    statusText: string;
  };
}
