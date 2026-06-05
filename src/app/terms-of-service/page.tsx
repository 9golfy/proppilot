import type { Metadata } from 'next';
import LegalPage from '@/components/legal/LegalPage';

export const metadata: Metadata = {
  title: 'Terms of Service | PropPilot.ai',
  description: 'Terms of Service for using PropPilot.ai to create, preview, schedule, and publish property marketing content.',
};

const sections = [
  {
    title: '1. Use of Service',
    paragraphs: [
      'PropPilot.ai helps users create, preview, schedule, and publish property marketing content using AI-assisted tools.',
      'You agree to use the service only for lawful purposes and in compliance with applicable laws and platform policies.',
    ],
  },
  {
    title: '2. User Content',
    paragraphs: [
      'You are responsible for the content you upload, generate, edit, schedule, or publish through PropPilot.ai, including property information, images, videos, captions, and social media posts.',
      'You confirm that you have the necessary rights to use and publish the content.',
    ],
  },
  {
    title: '3. Social Media Publishing',
    paragraphs: [
      'When you connect a social media account such as Facebook, you authorize PropPilot.ai to perform actions that you approve, such as displaying available Pages and publishing posts to selected Pages.',
      'PropPilot.ai will not publish content without your action or permission.',
      'You are responsible for ensuring that published content follows the rules of each social media platform.',
    ],
  },
  {
    title: '4. AI-Generated Content',
    paragraphs: [
      'PropPilot.ai may provide AI-generated text, scripts, captions, and marketing suggestions. You should review and edit AI-generated content before publishing.',
      'We do not guarantee that AI-generated content is accurate, complete, or suitable for every purpose.',
    ],
  },
  {
    title: '5. Prohibited Use',
    paragraphs: ['You must not use PropPilot.ai to:'],
    bullets: [
      'Publish illegal, misleading, harmful, or fraudulent content',
      'Violate intellectual property rights',
      'Spam or abuse social media platforms',
      'Attempt to access systems, accounts, or data without permission',
    ],
  },
  {
    title: '6. Service Availability',
    paragraphs: [
      'We aim to keep the service available, but we do not guarantee uninterrupted or error-free operation. Some features may depend on third-party platforms such as Facebook, Instagram, TikTok, X, or YouTube.',
    ],
  },
  {
    title: '7. Limitation of Liability',
    paragraphs: [
      'PropPilot.ai is provided on an "as is" basis. We are not responsible for losses caused by user-generated content, third-party platform changes, account restrictions, or publishing errors.',
    ],
  },
  {
    title: '8. Changes to Terms',
    paragraphs: ['We may update these Terms from time to time. Continued use of the service means you accept the updated Terms.'],
  },
];

export default function TermsOfServicePage() {
  return (
    <LegalPage
      title="Terms of Service"
      description="Welcome to PropPilot.ai. By using our platform, you agree to these Terms of Service."
      sections={sections}
    />
  );
}
