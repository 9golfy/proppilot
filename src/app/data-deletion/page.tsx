import type { Metadata } from 'next';
import LegalPage from '@/components/legal/LegalPage';

export const metadata: Metadata = {
  title: 'Data Deletion Instructions | PropPilot.ai',
  description: 'Instructions for requesting deletion of your PropPilot.ai account and associated data.',
};

const sections = [
  {
    title: 'How to Request Data Deletion',
    paragraphs: ['If you wish to delete your PropPilot.ai account and associated data, please send a request to:'],
    bullets: ['Email: support@proppilot.ai'],
  },
  {
    title: 'What to Include',
    paragraphs: ['Please include the following information in your request:'],
    bullets: ['Your account email', 'Your Facebook account email, if applicable', 'Subject: Data Deletion Request'],
  },
  {
    title: 'Processing Time',
    paragraphs: ['We will process your request within 30 days.'],
  },
  {
    title: 'After Deletion',
    paragraphs: ['After your request is processed:'],
    bullets: [
      'Personal information will be removed',
      'Connected social media tokens will be revoked',
      'Associated account data will be deleted',
    ],
  },
  {
    title: 'Additional Questions',
    paragraphs: ['For additional questions, please contact support@proppilot.ai.'],
  },
];

export default function DataDeletionPage() {
  return (
    <LegalPage
      title="Data Deletion Instructions"
      description="Use this page to learn how to request deletion of your PropPilot.ai account and associated data."
      sections={sections}
    />
  );
}
