import React, { useState } from 'react';
import Link from 'next/link';
import { TRANSLATIONS } from '@/constants/content';
import ThemeToggle from '@/components/common/ThemeToggle';
import { ChevronDown, Globe, Home, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

type LanguageCode = 'EN' | 'TH' | 'ZH';

interface NavbarProps {
  currentLang: LanguageCode;
  onLangChange: (lang: LanguageCode) => void;
  onOpenDemo: () => void;
  onOpenSimulator: () => void;
}

const LANGUAGE_OPTIONS: Array<{
  code: LanguageCode;
  label: string;
  name: string;
}> = [
  { code: 'TH', label: 'TH', name: 'ไทย' },
  { code: 'EN', label: 'EN', name: 'English' },
  { code: 'ZH', label: 'ZH', name: '中文' },
];

const aiSalesItems = [
  { label: 'AI Property', href: '#ai-property' },
  { label: 'AI Sales Video', href: '/dashboard' },
  { label: 'Social Media Posts', href: '#social-media-posts' },
  { label: 'SEO Landing Page', href: '#seo-landing-page' },
];

export default function Navbar({ currentLang, onLangChange, onOpenSimulator }: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [aiSalesOpen, setAiSalesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[currentLang].nav;

  const navItems: Array<{ label: string; href: string; type?: 'aiSales' }> = [
    { label: t.home, href: '#' },
    { label: t.aiSales, href: '#ai-sales', type: 'aiSales' },
    { label: t.pricing, href: '#pricing' },
    { label: t.forAgencies, href: '#agencies' },
  ];

  const handleLangSelect = (code: LanguageCode) => {
    onLangChange(code);
    setDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 h-[72px] w-full border-b border-[var(--border)] bg-[var(--card)]/90 backdrop-blur-xl transition-colors duration-300">
      <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between gap-5 px-5 sm:px-8 lg:px-10 xl:px-[56px]">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-[#6C63FF] to-[#8B7BFF] text-white shadow-[0_12px_28px_rgba(108,99,255,0.22)]">
            <Home className="h-5 w-5" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[19px] font-black leading-none tracking-tight text-[var(--foreground)]">PropPilot</span>
            <span className="rounded-md bg-[var(--primary)] px-1.5 py-0.5 text-[10px] font-black leading-none text-white">AI</span>
          </div>
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-7 lg:flex xl:gap-9">
          {navItems.map((item) =>
            item.type === 'aiSales' ? (
              <div key={item.label} className="relative" onMouseEnter={() => setAiSalesOpen(true)} onMouseLeave={() => setAiSalesOpen(false)}>
                <button
                  type="button"
                  onClick={() => setAiSalesOpen((value) => !value)}
                  className={`theme-focus flex cursor-pointer items-center gap-1 whitespace-nowrap rounded-lg px-2 py-1 text-[14px] font-bold leading-6 transition-colors ${
                    aiSalesOpen ? 'text-[var(--primary)]' : 'text-[var(--foreground)] hover:text-[var(--primary)]'
                  }`}
                  aria-haspopup="menu"
                  aria-expanded={aiSalesOpen}
                >
                  <span>{item.label}</span>
                  <ChevronDown className={`h-3.5 w-3.5 shrink-0 transition-transform ${aiSalesOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {aiSalesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.14, ease: 'easeOut' }}
                      className="absolute left-1/2 top-9 z-[100] w-[246px] -translate-x-1/2 overflow-hidden rounded-[18px] border border-[var(--border)] bg-[var(--card)]/96 p-2 shadow-[var(--shadow-card)] backdrop-blur-xl"
                      role="menu"
                    >
                      {aiSalesItems.map((subItem) => (
                        <Link key={subItem.label} href={subItem.href} onClick={() => setAiSalesOpen(false)} className="flex min-h-10 items-center rounded-xl px-3 text-[13px] font-bold text-[var(--foreground)] transition-colors hover:bg-[var(--secondary)] hover:text-[var(--primary)]" role="menuitem">
                          {subItem.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <a key={item.label} href={item.href} className="whitespace-nowrap text-[14px] font-bold leading-6 text-[var(--foreground)] transition-colors hover:text-[var(--primary)]">
                {item.label}
              </a>
            ),
          )}
        </nav>

        <div className="hidden shrink-0 items-center justify-end gap-3 lg:flex">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((value) => !value)}
              className="theme-focus flex h-10 cursor-pointer items-center gap-2 whitespace-nowrap rounded-[12px] border border-[var(--border)] bg-[var(--card)] px-3 text-[13px] font-bold text-[var(--foreground)] shadow-sm transition hover:border-[var(--primary)]"
            >
              <Globe className="h-4 w-4 shrink-0" />
              <span>{currentLang}</span>
              <ChevronDown className={`h-3 w-3 shrink-0 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.12, ease: 'easeOut' }}
                  className="absolute right-0 top-12 z-[100] w-[188px] overflow-hidden rounded-[16px] border border-[var(--border)] bg-[var(--card)] py-1.5 shadow-[var(--shadow-card)]"
                >
                  {LANGUAGE_OPTIONS.map((option) => (
                    <button
                      key={option.code}
                      onClick={() => handleLangSelect(option.code)}
                      className={`flex h-10 w-full items-center justify-between px-3 text-left text-[13px] font-bold transition-colors hover:bg-[var(--secondary)] ${
                        currentLang === option.code ? 'bg-[var(--secondary)] text-[var(--primary)]' : 'text-[var(--foreground)]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-6 text-[11px] font-black text-[var(--muted-foreground)]">{option.label}</span>
                        <span>{option.name}</span>
                      </span>
                      {currentLang === option.code && <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)]" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <ThemeToggle />
          <div className="my-auto h-4 w-px bg-[var(--border)]" />

          <Link href="/sign-in" className="whitespace-nowrap px-2 py-1.5 text-[13px] font-bold leading-6 text-[var(--foreground)] transition-colors hover:text-[var(--primary)]">
            {t.login}
          </Link>

          <Link href="/sign-up" className="flex h-10 shrink-0 items-center justify-center whitespace-nowrap rounded-[12px] bg-gradient-to-r from-[#7B61FF] to-[#5B6CFF] px-4 text-[13px] font-black text-white shadow-[0_12px_28px_rgba(108,99,255,0.20)] transition hover:brightness-105 active:scale-[0.98]">
            {t.startFree}
          </Link>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <button onClick={() => setMobileMenuOpen((value) => !value)} className="theme-focus rounded-xl border border-[var(--border)] bg-[var(--card)] p-2 text-[var(--foreground)]" aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-[72px] z-40 w-full overflow-hidden border-b border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-card)] lg:hidden"
          >
            <div className="flex flex-col gap-4 px-5 py-6">
              {navItems.map((item) =>
                item.type === 'aiSales' ? (
                  <div key={item.label} className="border-b border-[var(--border)] pb-3">
                    <button type="button" onClick={() => setAiSalesOpen((value) => !value)} className="flex w-full items-center justify-between py-1.5 text-left text-[15px] font-bold text-[var(--foreground)] hover:text-[var(--primary)]" aria-expanded={aiSalesOpen}>
                      <span>{item.label}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${aiSalesOpen ? 'rotate-180 text-[var(--primary)]' : ''}`} />
                    </button>
                    <AnimatePresence initial={false}>
                      {aiSalesOpen && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.16 }} className="mt-2 overflow-hidden rounded-xl bg-[var(--secondary)]">
                          {aiSalesItems.map((subItem) => (
                            <Link key={subItem.label} href={subItem.href} onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 text-[13.5px] font-bold text-[var(--muted-foreground)] hover:text-[var(--primary)]">
                              {subItem.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <a key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)} className="border-b border-[var(--border)] py-1.5 text-[15px] font-bold text-[var(--foreground)] hover:text-[var(--primary)]">
                    {item.label}
                  </a>
                ),
              )}

              <div className="mt-4 grid grid-cols-2 gap-3 pt-2">
                <button onClick={() => handleLangSelect(currentLang === 'EN' ? 'TH' : currentLang === 'TH' ? 'ZH' : 'EN')} className="h-11 rounded-xl border border-[var(--border)] text-sm font-black text-[var(--foreground)]">
                  {currentLang}
                </button>
                <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)} className="flex h-11 items-center justify-center rounded-xl border border-[var(--border)] text-sm font-black text-[var(--foreground)]">
                  {t.login}
                </Link>
                <Link href="/sign-up" onClick={() => setMobileMenuOpen(false)} className="col-span-2 flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-[#7B61FF] to-[#5B6CFF] text-sm font-black text-white shadow-md">
                  {t.startFree}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}