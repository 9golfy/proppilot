'use client';

import {
  ChevronDown,
  Edit3,
  Maximize,
  MoreVertical,
  Palette,
  Play,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  Upload,
  Volume2,
} from 'lucide-react';

import { Sidebar, StepBar, TopNav } from '@/app/post/page';
import vdoCover from '@/images/vdo-cover.png';

const avatarImage = 'https://i.pinimg.com/736x/09/e2/ad/09e2ad1f48716bb9e5f359941e02e2f3.jpg';

const scenes = [
  {
    id: 1,
    time: '0-3 วิ',
    title: 'เปิดตัวบ้าน',
    detail: 'บ้านเดี่ยวสไตล์ใหม่ พร้อมอยู่',
    script: 'บ้านเดี่ยวสไตล์ใหม่ พร้อมอยู่ เพื่อชีวิตที่ดีกว่า',
    tag: 'ภาพมุมกว้าง',
    message: 'บ้านเดี่ยวสไตล์ใหม่ พร้อมอยู่!',
    active: false,
  },
  {
    id: 2,
    time: '3-8 วิ',
    title: 'ภายในบ้าน',
    detail: 'กว้าง โปร่ง สบาย',
    script: 'พื้นที่ภายในโปร่ง สบาย ลงตัวกับทุกการใช้ชีวิต',
    tag: 'ภาพภายใน',
    message: 'กว้าง โปร่ง สบาย ลงตัวทุกการใช้ชีวิต',
    active: false,
  },
  {
    id: 3,
    time: '8-14 วิ',
    title: 'ห้องนอน',
    detail: '3 ห้องนอน 3 ห้องน้ำ',
    script: '3 ห้องนอน 3 ห้องน้ำ ตอบโจทย์ทุกความต้องการ',
    tag: 'ภาพห้องนอน',
    message: '3 ห้องนอน 3 ห้องน้ำ พร้อมอยู่',
    active: false,
  },
  {
    id: 4,
    time: '14-20 วิ',
    title: 'ทำเลศักยภาพ',
    detail: 'ใกล้ MRT รามอินทรา กม.9',
    script: 'เดินทางง่าย ใกล้ MRT รามอินทรา กม.9 และ Fashion Island',
    tag: 'ภาพทำเล',
    message: 'ใกล้ MRT รามอินทรา กม.9 และ Fashion Island',
    active: false,
  },
  {
    id: 5,
    time: '20-30 วิ',
    title: 'สรุป & CTA',
    detail: 'นัดชมบ้านวันนี้ รับข้อเสนอพิเศษ',
    script: 'นัดชมบ้านวันนี้ รับข้อเสนอพิเศษก่อนใคร',
    tag: 'ภาพ CTA',
    message: 'นัดชมบ้านวันนี้ รับข้อเสนอพิเศษ!',
    active: true,
  },
];

function FeedbackButton({ type }: { type: 'good' | 'bad' }) {
  const Icon = type === 'good' ? ThumbsUp : ThumbsDown;
  const label = type === 'good' ? 'ดี' : 'ไม่ดี';
  const color = type === 'good' ? 'text-[#5B5DF6]' : 'text-[#EF4444]';

  return (
    <button className="inline-flex h-10 min-w-[88px] items-center justify-center gap-2 whitespace-nowrap rounded-[12px] border border-[#E2E8F0] bg-white px-3 text-[13px] font-semibold text-[#334155] transition hover:border-[#C7D2FE] hover:bg-[#F8F7FF] active:scale-[0.98]">
      <Icon className={`size-4 ${color}`} />
      {label}
    </button>
  );
}

function VdoCoverImage() {
  return <img src={vdoCover.src} alt="VDO cover" className="h-full w-full object-cover" />;
}

function VideoPreviewCard() {
  return (
    <section className="overflow-hidden rounded-[18px] border border-[#E2E8F0] bg-white shadow-[0_18px_48px_rgba(15,23,42,0.08)]">
      <div className="relative aspect-video overflow-hidden bg-[#111827]">
        <VdoCoverImage />

        <button className="absolute right-4 top-4 inline-flex h-10 items-center gap-2 rounded-[12px] border border-white/25 bg-slate-950/44 px-3.5 text-[13px] font-semibold text-white shadow-[0_10px_24px_rgba(15,23,42,0.24)] backdrop-blur-md transition hover:bg-slate-950/58 active:scale-[0.98]">
          เปลี่ยนรูปแบบวิดีโอ
          <ChevronDown className="size-4" />
        </button>

        <div className="absolute inset-x-6 bottom-5 flex items-center gap-4 text-white">
          <button aria-label="Play video preview" className="grid size-10 shrink-0 place-items-center rounded-full bg-white/14 text-white backdrop-blur-md transition hover:bg-white/22 active:scale-[0.98]">
            <Play className="ml-0.5 size-4 fill-current" />
          </button>
          <span className="w-[78px] text-[13px] font-semibold tabular-nums">0:05 / 0:30</span>
          <div className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-white/30">
            <div className="h-full w-[42%] rounded-full bg-[#7B61FF]" />
          </div>
          <button aria-label="Volume" className="grid size-9 place-items-center rounded-full bg-white/10 backdrop-blur-md transition hover:bg-white/18">
            <Volume2 className="size-4" />
          </button>
          <button aria-label="Fullscreen" className="grid size-9 place-items-center rounded-full bg-white/10 backdrop-blur-md transition hover:bg-white/18">
            <Maximize className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

function ScriptPanel() {
  return (
    <section className="rounded-[18px] border border-[#E2E8F0] bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
      <div className="mb-4 flex items-center gap-2.5">
        <span className="grid size-9 place-items-center rounded-full bg-[#F0EDFF] text-[#6C63FF]">
          <Sparkles className="size-5" />
        </span>
        <div className="min-w-0">
          <h2 className="truncate text-[18px] font-bold tracking-[-0.02em] text-[#0F172A]">สคริปต์ & คำบรรยาย (AI Script)</h2>
          <p className="mt-0.5 truncate text-[13px] font-medium text-[#64748B]">ตรวจประโยคที่ AI Sales Influencer จะพูดในแต่ละ Scene</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-[16px] border border-[#E2E8F0]">
        {scenes.map((scene) => (
          <div
            key={scene.id}
            className={`grid gap-4 border-b border-[#E2E8F0] px-4 py-3.5 last:border-b-0 lg:grid-cols-[72px_minmax(0,1fr)_210px] lg:items-center ${
              scene.active ? 'bg-[#F5F3FF]' : 'bg-white'
            }`}
          >
            <div className="flex items-center gap-3 lg:block">
              <div className="grid h-12 w-14 shrink-0 place-items-center rounded-[12px] border border-[#E2E8F0] bg-white text-center shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                <span className="text-[16px] font-bold leading-none text-[#6C63FF]">{scene.id}</span>
                <span className="whitespace-nowrap text-[11px] font-semibold leading-none text-[#64748B]">{scene.time}</span>
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex min-w-0 items-center gap-3">
                <h3 className={`truncate text-[14px] font-bold ${scene.active ? 'text-[#5B5DF6]' : 'text-[#0F172A]'}`}>{scene.title}</h3>
                <span className="shrink-0 whitespace-nowrap rounded-full bg-[#F8FAFC] px-2 py-0.5 text-[11px] font-semibold text-[#64748B]">{scene.time}</span>
              </div>
              <p className="mt-1 truncate text-[13px] font-medium leading-5 text-[#64748B]">{scene.detail}</p>
              <p className="mt-1.5 truncate text-[14px] font-semibold leading-6 text-[#334155]">{scene.script}</p>
            </div>

            <div className="flex items-center gap-2 lg:justify-end">
              <FeedbackButton type="good" />
              <FeedbackButton type="bad" />
              <button aria-label={`แก้ไข Scene ${scene.id}`} className="grid size-10 shrink-0 place-items-center rounded-[12px] text-[#64748B] transition hover:bg-[#F8F7FF] hover:text-[#5B5DF6] active:scale-[0.98]">
                <Edit3 className="size-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button className="inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-[12px] border border-[#E2E8F0] bg-white px-4 text-[13px] font-bold text-[#5B5DF6] transition hover:bg-[#F8F7FF] active:scale-[0.98]">
          <span className="text-[18px] leading-none">+</span>
          เพิ่มสคริปต์
        </button>
        <div className="flex flex-wrap items-center gap-3 text-[13px] font-semibold text-[#64748B]">
          <span className="whitespace-nowrap">ความยาวรวม 30 วินาที</span>
          <button className="h-11 whitespace-nowrap rounded-[12px] border border-[#C7D2FE] bg-white px-4 text-[13px] font-bold text-[#5B5DF6] transition hover:bg-[#F5F3FF] active:scale-[0.98]">
            ปรับความยาวอัตโนมัติ
          </button>
        </div>
      </div>
    </section>
  );
}

function StoryboardPanel() {
  return (
    <section className="overflow-hidden rounded-[18px] border border-[#E2E8F0] bg-white shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
      <div className="flex items-center justify-between gap-4 border-b border-[#E2E8F0] px-5 py-4">
        <h2 className="min-w-0 truncate text-[18px] font-bold tracking-[-0.02em] text-[#0F172A]">สคริปต์วิดีโอที่สร้างโดย AI</h2>
        <div className="flex shrink-0 items-center gap-2.5">
          <button className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-[12px] border border-[#D8D5FF] bg-white px-3.5 text-[13px] font-bold text-[#5B5DF6] transition hover:bg-[#F5F3FF] active:scale-[0.98]">
            <Palette className="size-4" />
            ปรับแต่งสคริปต์
          </button>
          <button className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-[12px] border border-[#D8D5FF] bg-white px-3.5 text-[13px] font-bold text-[#5B5DF6] transition hover:bg-[#F5F3FF] active:scale-[0.98]">
            <Upload className="size-4" />
            ส่งออกสคริปต์
          </button>
        </div>
      </div>

      <div className="overflow-x-auto px-5">
        <div className="min-w-[610px]">
          {scenes.map((scene) => (
            <div key={scene.id} className="grid grid-cols-[46px_184px_minmax(0,1fr)_160px_28px] items-start gap-4 border-b border-[#E2E8F0] py-5 last:border-b-0">
              <div className="pt-1 text-center">
                <span className="mx-auto grid size-10 place-items-center rounded-full border border-[#D8D5FF] bg-white text-[15px] font-bold text-[#6C63FF]">
                  {scene.id}
                </span>
                <p className="mt-2 whitespace-nowrap text-[12px] font-semibold text-[#64748B]">{scene.time}</p>
              </div>

              <div className="relative aspect-video overflow-hidden rounded-[12px] bg-[#111827] shadow-[0_8px_20px_rgba(15,23,42,0.10)]">
                <VdoCoverImage />
                <span className="absolute bottom-1.5 left-1.5 rounded-[7px] bg-slate-950/72 px-2 py-0.5 text-[10px] font-bold text-white">
                  {scene.time}
                </span>
              </div>

              <div className="min-w-0 pt-1">
                <div className="flex min-w-0 items-center gap-2">
                  <p className="shrink-0 whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.04em] text-[#5B5DF6]">Scene {scene.id}</p>
                  <span className="max-w-[92px] truncate rounded-full bg-[#F0EDFF] px-2 py-0.5 text-[11px] font-bold text-[#6C63FF]">{scene.tag}</span>
                </div>
                <h3 className="mt-2 truncate text-[15px] font-bold leading-5 text-[#0F172A]">{scene.title}</h3>
                <p className="mt-1 truncate text-[13px] font-medium leading-5 text-[#64748B]">{scene.detail}</p>
              </div>

              <div className="min-w-0 border-l border-[#E2E8F0] py-1 pl-4">
                <p className="whitespace-nowrap text-[11px] font-bold text-[#8B7BFF]">ข้อความบนจอ</p>
                <p className="mt-2 line-clamp-2 text-[14px] font-bold leading-6 text-[#5B5DF6]">{scene.message}</p>
              </div>

              <button aria-label={`เมนู Scene ${scene.id}`} className="mt-1 grid size-9 place-items-center rounded-[12px] text-[#64748B] transition hover:bg-[#F8FAFC] hover:text-[#5B5DF6]">
                <MoreVertical className="size-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-[#E2E8F0] bg-[#FBFCFF] px-5 py-4">
        <div className="inline-flex min-w-0 items-center gap-3 rounded-[12px] bg-[#F0EDFF] px-3 py-2">
          <span className="whitespace-nowrap text-[13px] font-bold text-[#334155]">เสียงบรรยาย</span>
          <img src={avatarImage} alt="เสียงหญิงอ่อนนุ่ม" className="size-7 rounded-full object-cover object-top" />
          <span className="truncate text-[13px] font-semibold text-[#64748B]">หญิงอ่อนนุ่ม</span>
          <button aria-label="ฟังตัวอย่างเสียง" className="grid size-7 shrink-0 place-items-center rounded-full bg-white text-[#5B5DF6] shadow-[0_1px_2px_rgba(15,23,42,0.08)] transition hover:bg-[#F8F7FF]">
            <Play className="ml-0.5 size-3.5 fill-current" />
          </button>
        </div>
        <button className="h-10 shrink-0 whitespace-nowrap rounded-[12px] border border-[#D8D5FF] bg-white px-4 text-[13px] font-bold text-[#5B5DF6] transition hover:bg-[#F5F3FF] active:scale-[0.98]">
          เปลี่ยนเสียง
        </button>
      </div>
    </section>
  );
}

export default function PostStep3Page() {
  return (
    <main className="min-h-screen bg-[#F7F9FC] text-[#111827]">
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <TopNav />

          <div className="mx-auto w-full max-w-[1520px] flex-1 px-4 py-4 lg:px-6">
            <StepBar activeStep={3} />

            <div className="mt-5 grid gap-6 xl:grid-cols-[minmax(0,54fr)_minmax(620px,46fr)] xl:items-start">
              <div className="min-w-0 space-y-5">
                <VideoPreviewCard />
                <ScriptPanel />
              </div>
              <StoryboardPanel />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
