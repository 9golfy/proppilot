import React, { useState } from 'react';
import { TRANSLATIONS } from '@/constants/content';
import { Play, Sparkles, Send, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface AutopilotSimulatorProps {
  currentLang: 'EN' | 'TH' | 'ZH';
  onStartSimulation: (seedText: string) => void;
  isGenerating: boolean;
}

export default function AutopilotSimulator({ currentLang, onStartSimulation, isGenerating }: AutopilotSimulatorProps) {
  const t = TRANSLATIONS[currentLang].customizer;
  const [addressInput, setAddressInput] = useState('');

  const presets = [
    { name: "๐ฒ Pine Valley Villa", text: "4-bedroom alpine property in Aspen with snowy mountain deck views." },
    { name: "๐ Malibu Penthouse", text: "Sunset beachfront condominium in Malibu with glass-front hot tub." }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const queryText = addressInput.trim() || "742 Evergreen Terrace, Luxury Oasis";
    onStartSimulation(queryText);
  };

  return (
    <div className="w-full max-w-[620px] bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-xs mt-[24px] text-left transition-all duration-300">
      <div className="flex items-center gap-2 mb-3.5">
        <div className="w-8 h-8 rounded-lg bg-[#6C63FF]/10 text-[#6C63FF] flex items-center justify-center">
          <Sparkles className="w-4 h-4" />
        </div>
        <h4 className="font-bold text-[16px] text-slate-800 tracking-tight">
          {t.title}
        </h4>
        <span className="bg-[#6C63FF]/10 text-[#6C63FF] text-[10px] font-bold tracking-widest px-2 py-0.5 rounded-full uppercase ml-auto">
          AUTO-RIG
        </span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
        <input
          type="text"
          value={addressInput}
          onChange={(e) => setAddressInput(e.target.value)}
          placeholder={t.inputPlaceholder}
          disabled={isGenerating}
          className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent text-slate-800 disabled:opacity-60 placeholder-slate-400 font-medium transition-all"
        />
        <button
          type="submit"
          disabled={isGenerating}
          className="bg-[#6C63FF] hover:bg-[#8B7BFF] disabled:bg-slate-300 text-white font-bold text-sm px-5 py-3 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 shrink-0 hover:shadow-md active:scale-98"
        >
          <span>{t.submitBtn}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Preset Fast seed buttons */}
      <div className="flex flex-wrap items-center gap-2 mt-3">
        <span className="text-xs text-slate-400 font-medium mr-1">Quick seed:</span>
        {presets.map((preset, index) => (
          <button
            key={index}
            type="button"
            disabled={isGenerating}
            onClick={() => setAddressInput(preset.text)}
            className="text-[12px] bg-white border border-slate-200 hover:border-[#6C63FF]/50 text-slate-600 hover:text-[#6C63FF] font-semibold py-1 px-3 rounded-full transition-all duration-200 disabled:opacity-50 cursor-pointer"
          >
            {preset.name}
          </button>
        ))}
      </div>
    </div>
  );
}

