import { ArrowRight, Globe2, Home, Mail, ShieldCheck, Sparkles } from 'lucide-react';

interface FooterProps {
  currentLang: 'EN' | 'TH' | 'ZH';
}

const footerCopy = {
  EN: {
    description: 'AI sales media, listing pages, and campaign tools for modern real estate teams.',
    sections: [
      { title: 'Platform', links: ['AI Property', 'AI Sales Video', 'Social Media Posts', 'SEO Landing Page'] },
      { title: 'Resources', links: ['Ad Library', 'Creative Templates', 'Market Insights', 'Help Center'] },
      { title: 'Company', links: ['About PropPilot', 'For Agencies', 'Pricing', 'Contact'] },
      { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Settings', 'Security'] },
    ],
    stats: [
      { value: '50K+', label: 'videos generated' },
      { value: '200K+', label: 'properties enhanced' },
    ],
    bottom: '© 2026 PropPilot AI. All rights reserved.',
  },
  TH: {
    description: 'เครื่องมือสร้างสื่อขายอสังหา หน้า listing และแคมเปญด้วย AI สำหรับทีมขายยุคใหม่',
    sections: [
      { title: 'แพลตฟอร์ม', links: ['AI Property', 'AI Sales Video', 'Social Media Posts', 'SEO Landing Page'] },
      { title: 'แหล่งข้อมูล', links: ['Ad Library', 'Creative Templates', 'Market Insights', 'Help Center'] },
      { title: 'บริษัท', links: ['About PropPilot', 'For Agencies', 'Pricing', 'Contact'] },
      { title: 'นโยบาย', links: ['Privacy Policy', 'Terms of Service', 'Cookie Settings', 'Security'] },
    ],
    stats: [
      { value: '50K+', label: 'videos generated' },
      { value: '200K+', label: 'properties enhanced' },
    ],
    bottom: '© 2026 PropPilot AI. All rights reserved.',
  },
  ZH: {
    description: 'AI sales media, listing pages, and campaign tools for modern real estate teams.',
    sections: [
      { title: 'Platform', links: ['AI Property', 'AI Sales Video', 'Social Media Posts', 'SEO Landing Page'] },
      { title: 'Resources', links: ['Ad Library', 'Creative Templates', 'Market Insights', 'Help Center'] },
      { title: 'Company', links: ['About PropPilot', 'For Agencies', 'Pricing', 'Contact'] },
      { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Settings', 'Security'] },
    ],
    stats: [
      { value: '50K+', label: 'videos generated' },
      { value: '200K+', label: 'properties enhanced' },
    ],
    bottom: '© 2026 PropPilot AI. All rights reserved.',
  },
};

export default function Footer({ currentLang }: FooterProps) {
  const copy = footerCopy[currentLang];

  return (
    <footer className="w-full bg-[#171717]">
      <section className="py-14 text-white md:py-16">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10 xl:px-[56px]">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_2fr_0.85fr]">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#7B61FF] to-[#5B6CFF] text-white shadow-[0_16px_36px_rgba(108,99,255,0.28)]">
                  <Home className="h-5 w-5" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[24px] font-extrabold tracking-[-0.6px]">PropPilot</span>
                  <span className="rounded-md bg-[#7B61FF] px-1.5 py-1 text-[12px] font-extrabold leading-none">AI</span>
                </div>
              </div>
              <p className="mt-5 max-w-[320px] text-[14px] font-medium leading-[1.8] text-white/62">{copy.description}</p>
              <button className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-[14px] font-extrabold text-[#171717] transition hover:bg-[#F0EDFF] hover:text-[#6C63FF]">
                Start Free
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
              {copy.sections.map((section) => (
                <div key={section.title}>
                  <h4 className="text-[13px] font-extrabold uppercase tracking-[0.12em] text-white/42">{section.title}</h4>
                  <ul className="mt-5 space-y-3.5">
                    {section.links.map((link) => (
                      <li key={link}>
                        <a href="#" className="text-[14px] font-semibold text-white transition hover:text-[#9B8CFF]">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="lg:text-right">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[13px] font-bold text-white/76">
                <ShieldCheck className="h-4 w-4 text-[#9B8CFF]" />
                Secure AI Workspace
              </div>
              <div className="mt-7 grid grid-cols-2 gap-5 lg:grid-cols-1">
                {copy.stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-[24px] font-extrabold tracking-[-0.4px] text-white">{stat.value}</div>
                    <div className="mt-1 text-[13px] font-medium text-white/48">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap items-center gap-x-7 gap-y-3 text-[13px] font-bold text-white">
                <a href="#" className="hover:text-[#9B8CFF]">PropPilot Elements</a>
                <a href="#" className="hover:text-[#9B8CFF]">AI Sales Studio</a>
                <a href="#" className="hover:text-[#9B8CFF]">All Products</a>
                <a href="#" className="hover:text-[#9B8CFF]">Sitemap</a>
              </div>

              <div className="flex items-center gap-3">
                {[Globe2, Mail, Sparkles].map((Icon, index) => (
                  <a key={index} href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/12 text-white/66 transition hover:bg-[#6C63FF] hover:text-white">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <p className="mt-6 text-[13px] font-medium text-white/48">{copy.bottom}</p>
          </div>
        </div>
      </section>
    </footer>
  );
}

