"use client";

import { useMemo, useState } from "react";
import { AtSign, Folder, Plus, X } from "lucide-react";

interface PromptEditorProps {
  images: string[];
}

function ReferenceChip({ image, label }: { image: string; label: string }) {
  return (
    <span className="mx-0.5 inline-flex translate-y-[4px] items-center gap-1 rounded-full bg-[#F5F3FF] px-1.5 py-0.5 text-[13px] font-medium text-[#6366F1] ring-1 ring-[#C7D2FE]">
      <img src={image} alt={label} className="size-5 rounded-full object-cover" />
      {label}
    </span>
  );
}

function AttachmentThumb({ image, label }: { image: string; label: string }) {
  return (
    <div draggable className="group relative size-14 overflow-hidden rounded-[12px] border border-[#E5E7EB] bg-[#F8FAFC]">
      <img src={image} alt={label} className="h-full w-full object-cover" />
      <button aria-label={`Remove ${label}`} className="absolute right-1 top-1 grid size-5 place-items-center rounded-full bg-white/92 text-[#111827] shadow-[0_1px_2px_rgba(0,0,0,0.10)]">
        <X className="size-3" />
      </button>
    </div>
  );
}

export function PromptEditor({ images }: PromptEditorProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const sampleLength = useMemo(() => 318, []);
  const referenceImages = images.slice(0, 2);

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-[12px] font-medium text-[#6B7280]">Reference attachments</p>
        <div className="flex items-center gap-2">
          {referenceImages.map((image, index) => <AttachmentThumb key={image} image={image} label={`Image ${index + 1}`} />)}
          <button type="button" aria-label="Attach reference" className="theme-focus grid size-14 place-items-center rounded-[12px] border border-dashed border-[#D1D5DB] bg-white text-[#6366F1] transition hover:border-[#6366F1] hover:bg-[#F8FAFC]">
            <Plus className="size-5" />
          </button>
        </div>
      </div>

      <div className="relative rounded-[16px] border border-[#C7D2FE] bg-white p-4 transition focus-within:ring-4 focus-within:ring-[#6366F1]/10 dark:border-[var(--border)] dark:bg-white/[0.04]">
        <div
          contentEditable
          suppressContentEditableWarning
          role="textbox"
          aria-label="Prompt with image references"
          className="max-h-[44vh] min-h-[300px] overflow-y-auto text-[14px] font-normal leading-7 text-[#111827] outline-none dark:text-white"
        >
          <ReferenceChip image={referenceImages[0]} label="Image 1" /> สร้างวิดีโอรีวิวบ้านหรูโทนอบอุ่น โดยอ้างอิงบรรยากาศหลักจาก <ReferenceChip image={referenceImages[1]} label="Image 2" /> เน้นพื้นที่นั่งเล่น สระว่ายน้ำ และมุมถ่ายภาพที่ดูพรีเมียม ความยาว 30-45 วินาที สำหรับครอบครัวรุ่นใหม่ที่ต้องการบ้านพร้อมอยู่ ใส่เสียงบรรยายแบบมืออาชีพและปิดท้ายด้วย call to action เพื่อนัดชมบ้าน
        </div>
        <div className="mt-3 flex items-center justify-between gap-3 border-t border-[#EEF2FF] pt-3">
          <div className="relative">
            <button type="button" onClick={() => setMenuOpen((open) => !open)} className="theme-focus inline-flex h-8 items-center gap-2 rounded-full bg-[#F5F7FA] px-3 text-[12px] font-medium text-[#334155] transition hover:bg-[#EEF2FF]">
              <AtSign className="size-3.5" /> Reference an asset
            </button>
            {menuOpen && (
              <div className="absolute bottom-10 left-0 z-20 w-[260px] overflow-hidden rounded-[16px] border border-[#E5E7EB] bg-white py-2 shadow-[0_12px_32px_rgba(15,23,42,0.12)]">
                <p className="px-4 pb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9CA3AF]">Current upload</p>
                {referenceImages.map((image, index) => (
                  <button key={image} type="button" className="flex w-full items-center gap-3 px-4 py-2 text-left text-[13px] font-medium text-[#334155] hover:bg-[#F5F7FA]">
                    <img src={image} alt={`Image ${index + 1}`} className="size-8 rounded-lg object-cover" />
                    Image {index + 1}
                  </button>
                ))}
                <button type="button" className="mt-1 flex w-full items-center gap-3 border-t border-[#E5E7EB] px-4 py-2 text-left text-[13px] font-medium text-[#334155] hover:bg-[#F5F7FA]">
                  <Folder className="size-4" /> Browse assets
                </button>
              </div>
            )}
          </div>
          <span className="text-[12px] font-medium text-[#6B7280]">{sampleLength} / 2000</span>
        </div>
      </div>

      <div className="rounded-[14px] border border-[#E5E7EB] bg-[#F8FAFC] p-4">
        <p className="text-[13px] font-semibold text-[#111827]">Tips</p>
        <ul className="mt-2 space-y-1.5 text-[13px] font-normal leading-5 text-[#64748B]">
          <li>ระบุประเภททรัพย์และกลุ่มลูกค้าเป้าหมาย</li>
          <li>บอกโทนวิดีโอ เช่น หรู อบอุ่น หรือมืออาชีพ</li>
          <li>ใส่ระยะเวลาวิดีโอและจุดเด่นที่ต้องการเน้น</li>
        </ul>
      </div>
    </div>
  );
}