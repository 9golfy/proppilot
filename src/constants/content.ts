import { LanguageContent, PartnerItem } from '@/types';

export const LANGUAGES: { code: 'EN' | 'TH' | 'ZH'; name: string }[] = [
  { code: 'EN', name: 'English' },
  { code: 'TH', name: 'Thai' },
  { code: 'ZH', name: 'Chinese' },
];

export const TRANSLATIONS: Record<'EN' | 'TH' | 'ZH', LanguageContent> = {
  EN: {
    nav: {
      home: "Home",
      aiSales: "AI Sales",
      pricing: "Pricing",
      forAgencies: "For Agencies",
      login: "Log in",
      startFree: "Start Free",
    },
    hero: {
      badge: "The #1 AI Marketing Platform for Real Estate",
      headlinePart1: "Sell Properties",
      headlinePart2: "with AI",
      description: "Upload a property once. We'll instantly create beautiful listings, AI sales videos, social posts, and lead pagesโ€”ready to share across all your channels.",
      primaryCta: "Generate AI Sales Video",
      secondaryCta: "Watch Demo",
      socialProof: "Join 12,000+ agents growing their business",
    },
    stats: {
      rating: "4.9/5",
      ratingLabel: "User Rating",
      videos: "50K+",
      videosLabel: "Videos Generated",
      enhanced: "200K+",
      enhancedLabel: "Properties Enhanced",
      agents: "12K+",
      agentsLabel: "Active Agents",
    },
    partners: {
      title: "Trusted by top agents and agencies",
    },
    customizer: {
      title: "Interactive AI Content Lab",
      inputPlaceholder: "Enter property address (e.g., 742 Evergreen Terrace) to simulate autopilot generation...",
      submitBtn: "Run Autopilot",
      statusText: "Processing Real Estate assets...",
    }
  },
  TH: {
    nav: {
      home: "เธซเธเนเธฒเนเธฃเธ",
      aiSales: "เธเธฒเธฃเธเธฒเธขเธ”เนเธงเธข AI",
      pricing: "เธฃเธฒเธเธฒ",
      forAgencies: "เธชเธณเธซเธฃเธฑเธเน€เธญเน€เธเธเธเธต",
      login: "เน€เธเนเธฒเธชเธนเนเธฃเธฐเธเธ",
      startFree: "เน€เธฃเธดเนเธกเธ•เนเธเนเธเนเธเธฒเธเธเธฃเธต",
    },
    hero: {
      badge: "เนเธเธฅเธ•เธเธญเธฃเนเธกเธเธฒเธฃเธ•เธฅเธฒเธ” AI เธญเธฑเธเธ”เธฑเธ 1 เธชเธณเธซเธฃเธฑเธเธญเธชเธฑเธเธซเธฒเธฃเธดเธกเธ—เธฃเธฑเธเธขเน",
      headlinePart1: "เธเธฒเธขเนเธ”เนเน€เธฃเนเธงเธเธถเนเธ",
      headlinePart2: "เธ”เนเธงเธข AI เธญเธฑเธ•เนเธเธกเธฑเธ•เธด",
      description: "เธญเธฑเธเนเธซเธฅเธ”เธเนเธญเธกเธนเธฅเธเนเธฒเธเน€เธเธตเธขเธเธเธฃเธฑเนเธเน€เธ”เธตเธขเธง เนเธซเนเน€เธฃเธฒเธชเธฃเนเธฒเธเธเธณเธเธฃเธฃเธขเธฒเธขเธชเธธเธ”เธซเธฃเธน เธงเธดเธ”เธตเนเธญเนเธเธฐเธเธณเธเธฒเธฃเธเธฒเธขเนเธ”เธข AI เนเธเธชเธ•เนเนเธเน€เธเธตเธขเธฅเธกเธตเน€เธ”เธตเธข เนเธฅเธฐเธซเธเนเธฒเน€เธเธเน€เธเนเธเธฃเธฒเธขเธเธทเนเธญเธเธนเนเธชเธเนเธเนเธ”เธขเธ—เธฑเธเธ—เธต เธเธฃเนเธญเธกเนเธเธฃเนเธ—เธธเธเธเนเธญเธเธ—เธฒเธ",
      primaryCta: "เธชเธฃเนเธฒเธเธงเธดเธ”เธตเนเธญเธเธฒเธขเธ”เนเธงเธข AI",
      secondaryCta: "เธ”เธนเธงเธดเธ”เธตเนเธญเธชเธฒเธเธดเธ•",
      socialProof: "เน€เธเนเธฒเธฃเนเธงเธกเธเธฑเธเธ•เธฑเธงเนเธ—เธเธเธงเนเธฒ 12,000+ เธเธเธ—เธตเนเธเธณเธฅเธฑเธเธเธขเธฒเธขเธเธธเธฃเธเธดเธ",
    },
    stats: {
      rating: "4.9/5",
      ratingLabel: "เธเธฐเนเธเธเธเธฒเธเธเธนเนเนเธเนเธเธฒเธ",
      videos: "50K+",
      videosLabel: "เธงเธดเธ”เธตเนเธญเธ—เธตเนเธชเธฃเนเธฒเธเธเธถเนเธ",
      enhanced: "200K+",
      enhancedLabel: "เธ—เธฃเธฑเธเธขเนเธชเธดเธเธ—เธตเนเนเธ”เนเธฃเธฑเธเธเธฒเธฃเธเธฃเธฑเธเธเธฃเธธเธ",
      agents: "12K+",
      agentsLabel: "เธ•เธฑเธงเนเธ—เธเธ—เธตเนเนเธเนเธเธฒเธเธญเธขเธนเน",
    },
    partners: {
      title: "เนเธ”เนเธฃเธฑเธเธเธงเธฒเธกเนเธงเนเธงเธฒเธเนเธเธเธฒเธเธ•เธฑเธงเนเธ—เธเนเธฅเธฐเธเธฃเธดเธฉเธฑเธ—เธเธฑเนเธเธเธณ",
    },
    customizer: {
      title: "เธซเนเธญเธเนเธฅเนเธเน€เธเธทเนเธญเธซเธฒ AI เนเธเธเนเธ•เนเธ•เธญเธ",
      inputPlaceholder: "เนเธชเนเธ—เธตเนเธญเธขเธนเนเธญเธชเธฑเธเธซเธฒเธฃเธดเธกเธ—เธฃเธฑเธเธขเนเน€เธเธทเนเธญเธเธณเธฅเธญเธเธเธฒเธฃเธชเธฃเนเธฒเธเน€เธเธทเนเธญเธซเธฒเธญเธฑเธ•เนเธเธกเธฑเธ•เธด...",
      submitBtn: "เน€เธฃเธดเนเธกเธเธฒเธฃเธ—เธณเธเธฒเธเธญเธฑเธ•เนเธเธกเธฑเธ•เธด",
      statusText: "เธเธณเธฅเธฑเธเธเธฃเธฐเธกเธงเธฅเธเธฅเธเนเธญเธกเธนเธฅเธญเธชเธฑเธเธซเธฒเธฃเธดเธกเธ—เธฃเธฑเธเธขเน...",
    }
  },
  ZH: {
    nav: {
      home: "้ฆ–้กต",
      aiSales: "AI ๆบ่ฝ้”€ๅ”ฎ",
      pricing: "ไปทๆ ผๆ–นๆก",
      forAgencies: "ๆบๆไธ“ๅบ",
      login: "็ปๅฝ•",
      startFree: "ๅ…่ดนๅผ€ๅง",
    },
    hero: {
      badge: "ๆฟๅฐไบง้ขๅๆ’ๅ็ฌฌไธ€็ AI ่ฅ้”€ๅนณๅฐ",
      headlinePart1: "้”€ๅ”ฎๆ•็ๅคงๅน…ๆๅ",
      headlinePart2: "AI ๅ…จ่ชๅจๆ็ฎก",
      description: "ๅช้€ไธไผ ไธ€ๆฌกๆฟไบงไฟกๆฏ๏ผ็ณป็ปไพฟ่ฝ็ซๅณ็”ๆ็ฒพ็พ็ๆฟๆบๆ–ๆกใ€AI ้”€ๅ”ฎๅฎฃไผ ่ง้ข‘ใ€็คพไบคๅช’ไฝ“ๅพๆ–ไปฅๅ่ทๅฎข่ฝๅฐ้กต๏ผ้ๆ—ถๅไบซ่ณๅ…จๆธ ้“ใ€",
      primaryCta: "็”ๆ AI ๆฟไบง้”€ๅ”ฎ่ง้ข‘",
      secondaryCta: "่ง็ๆผ”็คบ",
      socialProof: "ๅ ๅ…ฅ 12,000+ ๅๆญฃๅจไปฅๆญคๅฎ็ฐไธๅกๅข้•ฟ็็ป็บชไบบ่กๅ—",
    },
    stats: {
      rating: "4.9/5",
      ratingLabel: "็”จๆท่ฏๅ",
      videos: "50K+",
      videosLabel: "ๅทฒ็”ๆ่ง้ข‘",
      enhanced: "200K+",
      enhancedLabel: "ๆฟไบงไฟกๆฏๅทฒไผๅ–",
      agents: "12K+",
      agentsLabel: "ๆดป่ท็ป็บชไบบ",
    },
    partners: {
      title: "ๆทฑๅ—้กถๅฐ–ๆฟไบง็ป็บชไบบไธๆๅกๆบๆ็ไฟก่ต–",
    },
    customizer: {
      title: "AI ไบคไบ’ๅ…ๅฎนๅฎ้ชๅฎค",
      inputPlaceholder: "่พ“ๅ…ฅๆฟไบงๅฐๅ€๏ผๅฆ๏ผๆฏ”ๅผ—ๅฉๅฑฑๅบ 100 ๅท๏ผๆฅๆจกๆ่ชๅจ็”ๆ...",
      submitBtn: "็ซๅณ่ฟ่ก่ชๅจ็”ๆ",
      statusText: "ๆบ่ฝๆฟไบง่ตไบง็”ๆไธญ...",
    }
  }
};

export const WORKFLOW_CARDS_INITIAL = [
  {
    id: 1,
    title: "AI Property Description",
    sub: "Generated",
    completed: true,
    active: true,
    icon: "FileText",
  },
  {
    id: 2,
    title: "AI Sales Video",
    sub: "Ready to share",
    completed: true,
    active: true,
    icon: "Video",
  },
  {
    id: 3,
    title: "Social Media Posts",
    sub: "Facebook, TikTok, IG",
    completed: true,
    active: true,
    icon: "Share2",
  },
  {
    id: 4,
    title: "SEO Landing Page",
    sub: "Published",
    completed: true,
    active: true,
    icon: "Globe",
  }
];

export const PARTNERS: PartnerItem[] = [
  { name: "RE/MAX", logoText: "RE/MAX" },
  { name: "ERA REAL ESTATE", logoText: "ERA" },
  { name: "COLDWELL BANKER", logoText: "COLDWELL BANKER" },
  { name: "KELLER WILLIAMS", logoText: "kw KELLERWILLIAMS" },
  { name: "CENTURY 21", logoText: "CENTURY 21" }
];

