'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

type LegalSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

interface LegalPageProps {
  title: string;
  description: string;
  sections: LegalSection[];
}

export default function LegalPage({ title, description, sections }: LegalPageProps) {
  const [lang, setLang] = useState<'EN' | 'TH' | 'ZH'>('EN');

  const noop = () => {};

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased">
      <Navbar currentLang={lang} onLangChange={setLang} onOpenDemo={noop} onOpenSimulator={noop} />
      <main className="bg-[var(--card)]">
        <section className="border-b border-[var(--border)] bg-gradient-to-b from-[#F8F7FF] to-white">
          <div className="mx-auto max-w-[980px] px-5 py-14 sm:px-8 md:py-18 lg:px-10">
            <p className="text-[13px] font-extrabold uppercase tracking-[0.16em] text-[#6C63FF]">PropPilot.ai Legal</p>
            <h1 className="mt-4 text-[36px] font-black leading-tight tracking-[-1px] text-[#0F172A] sm:text-[46px]">{title}</h1>
            <p className="mt-4 max-w-[720px] text-[16px] font-medium leading-7 text-[#64748B]">{description}</p>
            <p className="mt-6 inline-flex rounded-full border border-[#E2E8F0] bg-white px-4 py-2 text-[13px] font-bold text-[#334155] shadow-sm">
              Last updated: June 2026
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[980px] px-5 py-10 sm:px-8 md:py-14 lg:px-10">
          <div className="rounded-[18px] border border-[var(--border)] bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)] sm:p-8 md:p-10">
            <div className="space-y-9">
              {sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-[20px] font-black leading-snug tracking-[-0.2px] text-[#0F172A]">{section.title}</h2>
                  <div className="mt-4 space-y-4 text-[15px] font-medium leading-7 text-[#475569]">
                    {section.paragraphs?.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.bullets ? (
                      <ul className="space-y-2.5 pl-1">
                        {section.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-3">
                            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#6C63FF]" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </section>
              ))}

              <section className="rounded-[14px] border border-[#E2E8F0] bg-[#F8FAFC] p-5">
                <h2 className="text-[18px] font-black text-[#0F172A]">Contact</h2>
                <p className="mt-3 text-[15px] font-medium leading-7 text-[#475569]">
                  For questions, please contact{' '}
                  <a href="mailto:support@proppilot.ai" className="font-bold text-[#5B5DF6] hover:text-[#4F46E5]">
                    support@proppilot.ai
                  </a>
                  .
                </p>
                <p className="mt-2 text-[14px] font-medium text-[#64748B]">Website: https://proppilot-jet.vercel.app</p>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer currentLang={lang} />
    </div>
  );
}
