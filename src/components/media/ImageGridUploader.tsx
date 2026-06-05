"use client";

import { Plus, X } from "lucide-react";

interface ImageGridUploaderProps {
  images: string[];
  maxImages?: number;
}

export function ImageGridUploader({ images, maxImages = 10 }: ImageGridUploaderProps) {
  const slots = Array.from({ length: maxImages });

  return (
    <section className="rounded-[16px] border border-[#E5E7EB] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] dark:border-[var(--border)] dark:bg-[var(--card)]">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[18px] font-bold tracking-[-0.2px] text-[#111827] dark:text-white">2. อัปโหลดรูปภาพและวิดีโอ</h2>
          <p className="mt-1 text-[13px] font-normal text-[#6B7280]">เพิ่มรูปภาพหรือวิดีโอเพื่อให้ AI สร้างวิดีโอรีวิวที่น่าสนใจ</p>
        </div>
        <span className="text-[13px] font-medium text-[#6B7280]">สูงสุด 10 รูป</span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {slots.map((_, index) => {
          const image = images[index];
          if (!image) {
            return (
              <button key={`empty-${index}`} type="button" className="theme-focus flex aspect-square min-h-[104px] flex-col items-center justify-center gap-2 rounded-[14px] border border-dashed border-[#D1D5DB] bg-white text-[13px] font-medium text-[#6366F1] transition hover:border-[#6366F1] hover:bg-[#F8FAFC]">
                <Plus className="size-5" />
                เพิ่มรูป
              </button>
            );
          }

          return (
            <div key={`${image}-${index}`} draggable className="group relative aspect-square min-h-[104px] overflow-hidden rounded-[14px] border border-[#E5E7EB] bg-[#F8FAFC] transition hover:border-[#C7D2FE]">
              <img src={image} alt={`Property upload ${index + 1}`} className="h-full w-full object-cover" />
              <button aria-label="Remove photo" className="absolute right-2 top-2 grid size-6 place-items-center rounded-full bg-white/92 text-[#111827] opacity-95 shadow-[0_1px_2px_rgba(0,0,0,0.10)] transition group-hover:scale-105">
                <X className="size-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}