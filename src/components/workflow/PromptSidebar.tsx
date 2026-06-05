"use client";

import { ChevronLeft, ChevronRight, Copy, PanelRightClose, Sparkles, X } from "lucide-react";
import { PromptEditor } from "@/components/prompt/PromptEditor";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type PromptVariant = "media" | "property" | "share";

interface PromptSidebarProps {
  images?: string[];
  collapsed: boolean;
  onToggle: () => void;
  onGenerate: () => void;
  variant?: PromptVariant;
  stepBadge?: string;
}

const summaryRows = [
  ["ประเภทประกาศ", "ขาย · บ้านเดี่ยว"],
  ["หัวข้อประกาศ", "บ้านเดี่ยวหลังมุม พร้อมอยู่ ใกล้รถไฟฟ้า"],
  ["โครงการ", "หมู่บ้านร่มรื่น (Romruen Village)"],
  ["ขนาด", "240 ตร.ม. | 80 ตร.ว. | 3 ห้องนอน | 3 ห้องน้ำ"],
  ["ทำเล", "กรุงเทพมหานคร · วัฒนา · ใกล้ BTS พร้อมพงษ์"],
  ["ราคา", "5,900,000 บาท"],
];

export function PromptSidebar({ images = [], collapsed, onToggle, onGenerate, variant = "media", stepBadge = "Step 1" }: PromptSidebarProps) {
  const title = variant === "media" ? "เขียน Prompt สำหรับ AI" : "Prompt สำหรับ AI";
  const subtitle = variant === "share" ? "ตรวจสอบข้อความก่อนแชร์โพสต์" : "ข้อมูลนี้ช่วยให้ AI สร้างคอนเทนต์ได้ตรงเป้าหมาย";

  return (
    <aside
      className={cx(
        "sticky top-[84px] max-h-[calc(100vh-104px)] shrink-0 overflow-hidden rounded-[16px] border border-[#E5E7EB] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[width] duration-300 ease-out dark:border-[var(--border)] dark:bg-[var(--card)]",
        collapsed ? "w-12" : "w-full xl:w-[400px]"
      )}
    >
      {collapsed ? (
        <button type="button" onClick={onToggle} aria-label="Expand prompt sidebar" className="theme-focus flex h-full min-h-[360px] w-12 flex-col items-center justify-start gap-3 px-2 py-4 text-[#6366F1] transition hover:bg-[#F8FAFC]">
          <ChevronLeft className="size-5" />
          <span className="[writing-mode:vertical-rl] rotate-180 text-[12px] font-semibold tracking-[0.08em]">Prompt</span>
        </button>
      ) : (
        <div className="flex max-h-[calc(100vh-104px)] flex-col">
          <div className="flex items-center justify-between gap-3 border-b border-[#E5E7EB] px-5 py-4 dark:border-[var(--border)]">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-[18px] font-bold tracking-[-0.2px] text-[#111827] dark:text-white">{title}</h2>
                <span className="rounded-full bg-[#EEF2FF] px-2 py-0.5 text-[11px] font-semibold text-[#6366F1]">{stepBadge}</span>
              </div>
              <p className="mt-1 text-[12px] font-normal text-[#6B7280]">{subtitle}</p>
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              <button type="button" onClick={onToggle} aria-label="Collapse prompt sidebar" className="theme-focus grid size-8 place-items-center rounded-[10px] border border-[#E5E7EB] bg-white text-[#6B7280] transition hover:bg-[#F5F7FA]"><PanelRightClose className="size-4" /></button>
              <button type="button" aria-label="Close prompt sidebar" className="theme-focus grid size-8 place-items-center rounded-[10px] border border-[#E5E7EB] bg-white text-[#6B7280] transition hover:bg-[#F5F7FA]"><X className="size-4" /></button>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
            {variant === "media" && <PromptEditor images={images} />}
            {variant === "property" && <PropertyPromptContent />}
            {variant === "share" && <SharePromptContent images={images} />}
          </div>

          <div className="border-t border-[#E5E7EB] bg-white p-5 dark:border-[var(--border)] dark:bg-[var(--card)]">
            <button type="button" onClick={onGenerate} className="theme-focus inline-flex h-12 w-full items-center justify-center gap-2 rounded-[14px] bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-[14px] font-semibold text-white transition hover:brightness-105 active:scale-[0.99]">
              <Sparkles className="size-4" />
              สร้าง AI Sales Review
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}

function PropertyPromptContent() {
  return (
    <div className="space-y-4">
      <div className="rounded-[14px] border border-[#E5E7EB] bg-[#FBFCFF] p-4">
        <h3 className="text-[14px] font-semibold text-[#111827]">สรุปข้อมูลจากฟอร์ม</h3>
        <div className="mt-3 space-y-2.5">
          {summaryRows.map(([label, value]) => (
            <div key={label} className="grid grid-cols-[92px_minmax(0,1fr)] gap-3 text-[12px] leading-5">
              <span className="text-[#64748B]">{label}</span>
              <span className="font-medium text-[#111827]">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[14px] border border-[#E5E7EB] bg-white p-4">
        <h3 className="text-[14px] font-semibold text-[#111827]">คำแนะนำการเติมข้อมูล</h3>
        <ul className="mt-3 space-y-2 text-[13px] leading-5 text-[#475569]">
          <li>เพิ่ม selling points ให้ชัด เช่น หลังมุม วิวดี หรือเฟอร์ครบ</li>
          <li>ใส่แลนด์มาร์กใกล้เคียงเพื่อช่วยให้ผู้ซื้อเห็นภาพ</li>
          <li>กำหนดโทนชีวิต เช่น ครอบครัวรุ่นใหม่ หรือสายลงทุน</li>
          <li>เช็กฟิลด์สำคัญก่อนสร้างวิดีโอ</li>
        </ul>
      </div>

      <div className="rounded-[14px] border border-[#C7D2FE] bg-white p-4">
        <div className="mb-2 flex items-center justify-between gap-3">
          <h3 className="text-[14px] font-semibold text-[#111827]">ตัวอย่าง Prompt</h3>
          <button type="button" className="inline-flex h-8 items-center gap-1.5 rounded-[10px] border border-[#E5E7EB] px-2.5 text-[12px] font-medium text-[#6366F1] hover:bg-[#F8FAFC]"><Copy className="size-3.5" />คัดลอก</button>
        </div>
        <p className="min-h-[120px] text-[13px] leading-6 text-[#334155]">ช่วยสร้างวิดีโอรีวิวบ้านเดี่ยวหลังมุม โทนอบอุ่น พรีเมียม เหมาะกับครอบครัวรุ่นใหม่ เน้นพื้นที่ใช้สอย 240 ตร.ม. 3 ห้องนอน 3 ห้องน้ำ ใกล้ BTS พร้อมพงษ์ และปิดท้ายด้วยราคา 5,900,000 บาท</p>
        <p className="mt-3 text-right text-[12px] font-medium text-[#64748B]">184 / 2000</p>
      </div>
    </div>
  );
}

function SharePromptContent({ images }: { images: string[] }) {
  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-[14px] border border-[#E5E7EB] bg-white">
        <div className="aspect-video bg-[#F8FAFC]">
          <img src={images[0]} alt="Share preview" className="h-full w-full object-cover" />
        </div>
        <div className="p-4">
          <h3 className="text-[14px] font-semibold text-[#111827]">Preview & Share</h3>
          <p className="mt-2 text-[13px] leading-6 text-[#475569]">บ้านเดี่ยวหลังมุม ทำเลดี พร้อมเข้าอยู่ เหมาะสำหรับครอบครัวที่ต้องการพื้นที่กว้างและเดินทางสะดวก</p>
        </div>
      </div>
      <div className="rounded-[14px] border border-[#E5E7EB] bg-[#FBFCFF] p-4">
        <h3 className="text-[14px] font-semibold text-[#111827]">Checklist ก่อนแชร์</h3>
        <ul className="mt-3 space-y-2 text-[13px] leading-5 text-[#475569]">
          <li>ตรวจคำบรรยายและราคาอีกครั้ง</li>
          <li>เลือกรูปปกให้ชัดและน่าเชื่อถือ</li>
          <li>เปิดช่องทางโซเชียลที่ต้องการแชร์</li>
        </ul>
      </div>
    </div>
  );
}