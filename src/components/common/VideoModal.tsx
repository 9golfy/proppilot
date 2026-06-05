import React, { useState, useEffect } from 'react';
import { X, Play, Volume2, Sparkles, Home, MapPin, Film } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'EN' | 'TH' | 'ZH';
}

export default function VideoModal({ isOpen, onClose, lang }: VideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [timelinePercent, setTimelinePercent] = useState(25);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setTimelinePercent((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 120);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-55 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="w-full max-w-[800px] bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-800 bg-slate-900/50">
            <div className="flex items-center gap-2.5">
              <Film className="w-5 h-5 text-[#6C63FF]" />
              <span className="font-semibold text-slate-200">
                AI Video Sandbox — PropPilot Renderer
              </span>
            </div>
            
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Interactive Simulated Player Screen */}
          <div className="relative aspect-video w-full bg-slate-900 overflow-hidden group flex items-center justify-center">
            {/* Real Estate mock background sliding card */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(108,99,255,0.15),transparent_70%)]" />
            
            <div className="absolute top-6 left-6 flex items-center gap-2 bg-slate-950/80 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-slate-800">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#F43F5E] uppercase">
                LIVE RENDERING
              </span>
            </div>

            <div className="absolute top-6 right-6 flex items-center gap-2 bg-[#6C63FF]/90 text-white px-3.5 py-1.5 rounded-full text-[12px] font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Voiceover: AI Generated</span>
            </div>

            {/* Video content: dynamic graphic simulating properties */}
            <div className="text-center max-w-[500px] px-6 z-10">
              <motion.div
                animate={{
                  scale: [1, 1.02, 1],
                  rotate: [0, 0.5, 0, -0.5, 0]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-2xl text-left"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="bg-emerald-500/10 text-emerald-400 font-bold text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-md border border-emerald-500/20">
                      FOR SALE
                    </span>
                    <h4 className="text-xl font-bold text-white mt-2.5">
                      The Sapphire Beach Vista
                    </h4>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#6C63FF] to-[#8B7BFF] flex items-center justify-center font-bold text-white tracking-tighter shadow-md">
                    $5.4M
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
                  <MapPin className="w-4 h-4 text-rose-400" />
                  <span>104 Ocean Drive, Maldives</span>
                </div>

                {/* Subtitle generated live */}
                <div className="p-3.5 bg-slate-950/50 rounded-xl border border-white/5">
                  <span className="text-[#6C63FF] font-semibold text-[11px] block uppercase tracking-wider font-mono">
                    AI NARRATOR AUDIO (THAI / CHINESE / ENGLISH):
                  </span>
                  <p className="text-slate-200 text-sm leading-relaxed mt-1.5 italic">
                    {lang === 'TH' 
                      ? '"ยินดีต้อนรับสู่เดอะ แซฟไฟร์ บีช วิลล่า... สวรรค์อันเงียบสงบพร้อมทิวทัศน์มหาสมุทรแบบพาโนรามา... ออกแบบมาเพื่อชีวิตที่หรูหราที่สุด"' 
                      : lang === 'ZH'
                      ? '"欢迎来到蓝宝石海滩别墅... 坐拥全景海洋景观的宁静天堂... 专为极致奢华生活打造。"'
                      : '"Welcome to the spectacular Sapphire Beach Villa... A serene getaway featuring panoramic oceanic blueprints... Architected for elite luxury living."'}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Video Controllers Bottom Overlay */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 to-transparent p-6 flex flex-col gap-3">
              {/* Timeline Track */}
              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden cursor-pointer relative">
                <div
                  className="absolute left-0 top-0 bottom-0 bg-[#6C63FF] rounded-full transition-all duration-300"
                  style={{ width: `${timelinePercent}%` }}
                />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-slate-300">
                  <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-white cursor-pointer transition-colors">
                    <Play className="w-5 h-5 fill-current" />
                  </button>
                  <Volume2 className="w-5 h-5 text-slate-300" />
                  <span className="text-xs font-mono text-slate-400">
                    0:0{Math.floor(timelinePercent / 20)} / 0:30
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-3 py-1 rounded-lg text-[11px] text-slate-400 font-mono">
                  <span>RES: 4K ULTRA HD</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="px-6 py-5 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
            <div className="text-xs text-slate-400">
              Generated by PropPilot Autopilot Engine in 14.2 seconds.
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-4.5 py-2.5 rounded-xl border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-slate-300 font-medium text-sm transition-all duration-200 cursor-pointer"
              >
                Close Preview
              </button>
              
              <button
                onClick={() => alert("Simulation Success: Real Estate asset downloaded locally!")}
                className="px-4.5 py-2.5 rounded-xl bg-[#6C63FF] hover:bg-[#8B7BFF] text-white font-semibold text-sm hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                Download HD Assets
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
