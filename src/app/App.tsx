'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import AISalesUseCasesSection from '@/components/sections/AISalesUseCasesSection';
import PropertyMapSection from '@/components/sections/PropertyMapSection';
import FeaturedListingsSection from '@/components/sections/FeaturedListingsSection';
import Footer from '@/components/layout/Footer';
import VideoModal from '@/components/common/VideoModal';
import { TRANSLATIONS } from '@/constants/content';
import { Sparkles, Play, ArrowRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [lang, setLang] = useState<'EN' | 'TH' | 'ZH'>('EN');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [seedText, setSeedText] = useState('');
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [simCompleteToast, setSimCompleteToast] = useState(false);

  const t = TRANSLATIONS[lang].hero;

  useEffect(() => {
    if (!isGenerating) return;

    setCurrentStep(1);

    const timers = [
      setTimeout(() => setCurrentStep(2), 2200),
      setTimeout(() => setCurrentStep(3), 4400),
      setTimeout(() => setCurrentStep(4), 6600),
      setTimeout(() => {
        setIsGenerating(false);
        setCurrentStep(5);
        setVideoModalOpen(true);
        setSimCompleteToast(true);
        setTimeout(() => setSimCompleteToast(false), 5000);
      }, 8800),
    ];

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [isGenerating]);

  const startSimulator = (customText: string) => {
    if (isGenerating) return;
    setSeedText(customText || '742 Evergreen Terrace');
    setIsGenerating(true);
    setCurrentStep(0);
  };

  const handleStartAutopilotDefault = () => {
    startSimulator('742 Evergreen Terrace, Luxury Oasis');
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-[#6C63FF]/20 selection:text-[#6C63FF] antialiased overflow-x-hidden">
      <Navbar
        currentLang={lang}
        onLangChange={setLang}
        onOpenDemo={() => setVideoModalOpen(true)}
        onOpenSimulator={handleStartAutopilotDefault}
      />

      <main className="w-full relative overflow-hidden bg-[var(--card)]">
        <video
          src="https://res.cloudinary.com/dxyqgp8jf/video/upload/v1780117035/kling_20260530_VIDEO_Don_t_spea_3292_0_dy0pcz.mov"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover lg:object-[100%_center] z-0 opacity-100 pointer-events-none saturate-100 contrast-100"
        />

        <div
          className="absolute inset-0 z-10 pointer-events-none hidden lg:block"
          style={{
            background:
              'linear-gradient(90deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.96) 40%, rgba(255,255,255,0.58) 58%, rgba(255,255,255,0.00) 78%, rgba(255,255,255,0.00) 100%)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white/72 z-10 pointer-events-none block lg:hidden" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white/80 to-transparent z-10 pointer-events-none lg:hidden" />

        <div className="absolute top-[8%] left-[-10%] w-[450px] h-[450px] bg-[#6C63FF]/3 rounded-full blur-[130px] pointer-events-none z-10" />
        <div className="absolute right-[-10%] top-[35%] w-[450px] h-[450px] bg-[#7B61FF]/3 rounded-full blur-[130px] pointer-events-none z-10" />

        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 xl:px-[56px] relative z-20 py-14 md:py-16 lg:py-[72px]">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,55%)_minmax(420px,45%)] gap-10 xl:gap-12 items-center">
            <div className="flex flex-col items-start text-left z-20 max-w-[720px]">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 min-h-9 px-3.5 rounded-full bg-[#F3F1FF]/90 text-[#6C63FF] border border-[#6C63FF]/10 shadow-[0_10px_30px_rgba(108,99,255,0.08)] backdrop-blur-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#6C63FF]" />
                <span className="text-[13px] font-semibold tracking-wide">{t.badge}</span>
              </motion.div>

              <h1 className="text-[34px] md:text-[42px] lg:text-[58px] xl:text-[64px] leading-[1.08] md:leading-[1.1] font-extrabold text-[#0F172A] tracking-[-1.2px] lg:tracking-[-1.8px] max-w-[720px] mt-6 font-sans">
                {t.headlinePart1}
                <br />
                <span className="bg-gradient-to-r from-[#6C63FF] to-[#8B7BFF] bg-clip-text text-transparent">
                  {t.headlinePart2}
                </span>
              </h1>

              <p className="text-[15px] sm:text-[16px] lg:text-[18px] leading-[1.7] text-[#64748B] font-normal max-w-[560px] mt-6">
                {t.description}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3.5 mt-8 w-full sm:w-auto">
                <button
                  onClick={handleStartAutopilotDefault}
                  disabled={isGenerating}
                  className="w-full sm:w-auto min-w-[214px] h-[50px] px-5 rounded-xl bg-gradient-to-r from-[#7B61FF] to-[#5B6CFF] text-white font-bold text-[14px] shadow-[0_14px_34px_rgba(108,99,255,0.20)] hover:shadow-[0_18px_42px_rgba(108,99,255,0.26)] hover:brightness-105 active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 disabled:bg-slate-300 disabled:shadow-none disabled:cursor-not-allowed group focus:outline-none focus:ring-2 focus:ring-[#7B61FF]/50"
                >
                  <span>{t.primaryCta}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setVideoModalOpen(true)}
                  className="w-full sm:w-auto min-w-[154px] h-[50px] px-5 rounded-xl bg-white/92 border border-[#E2E8F0] hover:border-[#6C63FF]/25 text-[#0F172A] font-bold text-[14px] hover:bg-[#F8F7FF] active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group focus:outline-none focus:ring-2 focus:ring-slate-100 shadow-[0_10px_26px_rgba(15,23,42,0.05)]"
                >
                  <div className="w-5.5 h-5.5 rounded-full bg-[#F3F1FF] text-[#6C63FF] flex items-center justify-center pl-0.5 group-hover:bg-[#6C63FF] group-hover:text-white transition-all">
                    <Play className="w-2 h-2 fill-current" />
                  </div>
                  <span>{t.secondaryCta}</span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-[12px] mt-8">
                <div className="flex items-center -space-x-3">
                  {['AJ', 'MT', 'SK', 'RL', 'VP'].map((initials, index) => (
                    <div
                      key={initials}
                      className={`w-[40px] h-[40px] rounded-[10px] border-2 border-white flex items-center justify-center text-white font-extrabold text-xs shadow-sm transition-transform hover:-translate-y-1 ${
                        [
                          'bg-gradient-to-tr from-indigo-500 to-indigo-300',
                          'bg-gradient-to-tr from-rose-500 to-rose-300',
                          'bg-gradient-to-tr from-emerald-500 to-emerald-300',
                          'bg-gradient-to-tr from-amber-500 to-amber-300',
                          'bg-gradient-to-tr from-cyan-400 to-cyan-200',
                        ][index]
                      }`}
                    >
                      {initials}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col text-left">
                  <span className="text-[15px] font-bold text-[#0F172A] leading-tight">{t.socialProof}</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-emerald-500 text-xs font-semibold">Live growth</span>
                    <span className="text-[13px] text-[#64748B]">growing their business beautifully</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative min-h-[360px] md:min-h-[430px] lg:min-h-[520px] w-full pt-0 mt-8 lg:mt-0 z-20 pointer-events-none" aria-hidden="true" />
          </div>
        </div>
      </main>

      <AISalesUseCasesSection currentLang={lang} />
      <PropertyMapSection currentLang={lang} />
      <FeaturedListingsSection />
      <Footer currentLang={lang} />

      <VideoModal isOpen={videoModalOpen} onClose={() => setVideoModalOpen(false)} lang={lang} />

      <AnimatePresence>
        {simCompleteToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-800 text-white px-5 py-4.5 rounded-2xl shadow-2xl flex items-center gap-3.5 z-50 max-w-[420px] w-full"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <Check className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-bold text-sm text-slate-100">Generation Complete!</span>
              <span className="text-xs text-slate-400 font-medium mt-0.5">
                AI marketing campaign successfully created for &quot;{seedText}&quot;.
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
