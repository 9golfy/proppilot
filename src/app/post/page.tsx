'use client';

import Link from 'next/link';
import { Fragment, useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Bell,
  Bot,
  Building2,
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  CreditCard,
  Edit3,
  FileText,
  HelpCircle,
  Home,
  Image,
  LayoutDashboard,
  Library,
  Lock,
  MapPin,
  Mic,
  Menu,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  Upload,
  User,
  Wand2,
} from 'lucide-react';

import ThemeToggle from '@/components/common/ThemeToggle';

interface StepItem {
  number: number;
  title: string;
  description: string;
  status: 'active' | 'pending';
}

interface ChecklistItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  score: number;
}

interface ExtractedField {
  key: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  score: number;
  required: boolean;
  source?: string;
}

interface AiExtractResponse {
  fields?: Array<{
    key?: string;
    value?: string;
    score?: number;
    source?: string;
  }>;
  summary?: string;
}

interface BotStatusMessage {
  id: string;
  text: string;
  loading?: boolean;
}

const emptyFieldValue = 'รอวิเคราะห์';
const postFormStorageKey = 'proppilot.post.step1.fields';
const defaultBotMessage: BotStatusMessage = {
  id: 'default',
  text: 'วางข้อความประกาศที่คุณมี แล้วให้ AI extract เป็นหัวข้อด้านซ้ายเพื่อเช็คความครบถ้วนก่อนทำขั้นตอนถัดไป',
};
const workingBotMessages = ['กำลังเตรียมกรอกข้อมูล', 'กรุณารอสักครู่นะ'];

const steps: StepItem[] = [
  {
    number: 1,
    title: 'วางหรือเขียนข้อมูล',
    description: 'บอกข้อมูลเกี่ยวกับทรัพย์',
    status: 'active',
  },
  {
    number: 2,
    title: 'รูปภาพและวิดีโอ',
    description: 'อัปโหลดสื่อประกอบ',
    status: 'pending',
  },
  {
    number: 3,
    title: 'สร้างสคริปต์ VDO Ads',
    description: 'AI จัดโครงเรื่องและคำบรรยาย',
    status: 'pending',
  },
  {
    number: 4,
    title: 'เผยแพร่ประกาศ',
    description: 'ตรวจสอบและปล่อยประกาศ',
    status: 'pending',
  },
];

const checklistItems: ChecklistItem[] = [
  { icon: Home, label: 'ประเภทอสังหา', value: 'บ้านเดี่ยว', score: 99 },
  { icon: Building2, label: 'ชื่อโครงการ', value: 'PAVE Ramintra - Wongwaen', score: 95 },
  { icon: FileText, label: 'ราคา', value: '6,800,000 บาท', score: 96 },
  { icon: LayoutDashboard, label: 'ห้องนอน', value: '4 ห้องนอน', score: 99 },
  { icon: ClipboardList, label: 'ห้องน้ำ', value: '3 ห้องน้ำ', score: 99 },
  { icon: Building2, label: 'พื้นที่ใช้สอย', value: '217 ตร.ม.', score: 93 },
  { icon: MapPin, label: 'ขนาดที่ดิน', value: '61.5 ตร.วา', score: 95 },
  { icon: Home, label: 'ที่จอดรถ', value: '2 คัน', score: 95 },
  { icon: CompassIcon, label: 'ทิศหน้าบ้าน', value: 'ทิศเหนือ', score: 72 },
  { icon: Bot, label: 'แอร์', value: '2 เครื่อง', score: 90 },
  {
    icon: Sparkles,
    label: 'รายละเอียดเด่น',
    value: 'หลังมุม ติดสวน รีโนเวทใหม่ทั้งหลัง',
    score: 90,
  },
  {
    icon: Check,
    label: 'สิ่งอำนวยความสะดวก',
    value: 'Clubhouse, สระว่ายน้ำ, ฟิตเนส, CCTV',
    score: 88,
  },
  { icon: FileText, label: 'ค่าส่วนกลาง', value: '40 บาท/ตร.วา/เดือน', score: 85 },
  { icon: MapPin, label: 'สถานที่ใกล้เคียง', value: 'MRT รามอินทรา กม.9, Fashion Island', score: 90 },
  { icon: User, label: 'เบอร์ติดต่อ', value: '088-993-0371', score: 95 },
  { icon: User, label: 'Line ID', value: '0889930371', score: 95 },
];

const extractFieldTemplates: ExtractedField[] = [
  { key: 'propertyType', icon: Home, label: 'ประเภทอสังหา', value: emptyFieldValue, score: 0, required: true },
  { key: 'projectName', icon: Building2, label: 'ชื่อโครงการ', value: emptyFieldValue, score: 0, required: true },
  { key: 'listingType', icon: FileText, label: 'ประเภทประกาศ', value: emptyFieldValue, score: 0, required: true },
  { key: 'price', icon: FileText, label: 'ราคา', value: emptyFieldValue, score: 0, required: true },
  { key: 'bedroom', icon: LayoutDashboard, label: 'ห้องนอน', value: emptyFieldValue, score: 0, required: true },
  { key: 'bathroom', icon: ClipboardList, label: 'ห้องน้ำ', value: emptyFieldValue, score: 0, required: true },
  { key: 'usableArea', icon: Building2, label: 'พื้นที่ใช้สอย(ตร.ม.)', value: emptyFieldValue, score: 0, required: true },
  { key: 'landSize', icon: MapPin, label: 'ขนาดที่ดิน(ตร.ว.)', value: emptyFieldValue, score: 0, required: true },
  { key: 'parking', icon: Home, label: 'ที่จอดรถ(คัน)', value: emptyFieldValue, score: 0, required: false },
  { key: 'direction', icon: CompassIcon, label: 'ทิศหน้าบ้าน', value: emptyFieldValue, score: 0, required: false },
  { key: 'airConditioner', icon: Bot, label: 'แอร์(เครื่อง)', value: emptyFieldValue, score: 0, required: false },
  { key: 'highlights', icon: Sparkles, label: 'รายละเอียดเด่น', value: emptyFieldValue, score: 0, required: true },
  { key: 'facilities', icon: Check, label: 'สิ่งอำนวยความสะดวก', value: emptyFieldValue, score: 0, required: false },
  { key: 'commonFee', icon: FileText, label: 'ค่าส่วนกลาง(บาท)', value: emptyFieldValue, score: 0, required: false },
  { key: 'nearby', icon: MapPin, label: 'สถานที่ใกล้เคียง', value: emptyFieldValue, score: 0, required: false },
  { key: 'contactPhone', icon: User, label: 'เบอร์ติดต่อ', value: emptyFieldValue, score: 0, required: true },
  { key: 'lineId', icon: User, label: 'Line ID', value: emptyFieldValue, score: 0, required: false },
];

const starterPrompt = `KN-RR/024-2026

🏡 PAVE Ramintra - Wongwaen

เพฟ รามอินทรา-วงแหวน | บ้านหลังมุม ติดสวน บรรยากาศดีที่สุดในโครงการ
✨ บ้านเดี่ยว 2 ชั้น หลังมุม ทำเลเงียบสงบ ใกล้สวน
✨ แบบบ้าน Infinity - Type ใหญ่สุดของโครงการ

🔸 รายละเอียดบ้าน
- เนื้อที่ดิน 61.5 ตร.วา.
- พื้นที่ใช้สอย 217 ตร.ม. + ต่อเติมหลังคาโรงรถ/เฉลียง ~30 ตร.ม.
- 4 ห้องนอน | 3 ห้องน้ำ (มีห้องนอนชั้นล่าง)
- จอดรถได้ 2 คัน
- แอร์ 2 เครื่อง
- หันหน้าทิศเหนือ ลมดี ไม่ร้อน
- ราคาขาย 6,800,000 บาท

🍀 จุดเด่นที่หาไม่ได้ง่าย
✔ รีโนเวทใหม่ทั้งหลัง พร้อมอยู่
✔ ทาสีใหม่ TOA ทั้งภายนอก-ภายใน
✔ ปูพื้นใหม่ SPC อย่างดี 5.5 มม. กันน้ำ กันปลวก ไม่ลามไฟ
✔ สุขภัณฑ์ American Standard
✔ ใกล้ MRT รามอินทรา กม.9 และ Fashion Island

ติดต่อ 088-993-0371
Line ID 0889930371`;

function CompassIcon({ className }: { className?: string }) {
  return <MapPin className={className} />;
}

function normalizeScore(score: unknown, hasValue: boolean) {
  if (typeof score === 'number' && Number.isFinite(score)) {
    return Math.max(0, Math.min(100, Math.round(score)));
  }

  return hasValue ? 82 : 0;
}

function hasExtractedValue(value: string) {
  return value.trim().length > 0 && value !== emptyFieldValue && value !== '-';
}

function getEmptyFields() {
  return extractFieldTemplates.map((field) => ({ ...field }));
}

function readStoredFields() {
  try {
    const rawFields = window.localStorage.getItem(postFormStorageKey);
    if (!rawFields) return null;

    const parsedFields = JSON.parse(rawFields) as Partial<ExtractedField>[];
    if (!Array.isArray(parsedFields)) return null;

    return extractFieldTemplates.map((template) => {
      const storedField = parsedFields.find((field) => field.key === template.key);
      const value = typeof storedField?.value === 'string' ? storedField.value : template.value;
      const score = typeof storedField?.score === 'number' ? storedField.score : normalizeScore(undefined, hasExtractedValue(value));

      return {
        ...template,
        value,
        score,
        source: typeof storedField?.source === 'string' ? storedField.source : template.source,
      };
    });
  } catch {
    return null;
  }
}

function getMatchSummary(fields: ExtractedField[]) {
  const requiredFields = fields.filter((field) => field.required);
  const matchedRequired = requiredFields.filter((field) => hasExtractedValue(field.value));
  const overallScore = Math.round(fields.reduce((total, field) => total + field.score, 0) / fields.length);
  const high = fields.filter((field) => field.score >= 80).length;
  const review = fields.filter((field) => field.score >= 50 && field.score < 80).length;
  const missing = fields.filter((field) => field.score < 50).length;

  return {
    overallScore,
    high,
    review,
    missing,
    matchedRequired: matchedRequired.length,
    requiredTotal: requiredFields.length,
    complete: matchedRequired.length === requiredFields.length,
  };
}

function extractJson(text: string): AiExtractResponse | null {
  const fencedJson = text.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1];
  const rawJson = fencedJson || text.match(/\{[\s\S]*\}/)?.[0];

  if (!rawJson) return null;

  try {
    return JSON.parse(rawJson) as AiExtractResponse;
  } catch {
    return null;
  }
}

function mergeAiFields(aiData: AiExtractResponse | null, fallbackFields: ExtractedField[]) {
  if (!aiData?.fields?.length) return fallbackFields;

  return extractFieldTemplates.map((template) => {
    const localValue = fallbackFields.find((field) => field.key === template.key);
    const aiField = aiData.fields?.find((field) => field.key === template.key);
    const value = typeof aiField?.value === 'string' && aiField.value.trim() ? aiField.value.trim() : localValue?.value || emptyFieldValue;

    return {
      ...template,
      value,
      score: normalizeScore(aiField?.score, hasExtractedValue(value)),
      source: aiField?.source || localValue?.source,
    };
  });
}

export function StepBar({ activeStep = 1 }: { activeStep?: number }) {
  return (
    <section className="rounded-[18px] border border-[#E5E7EB] bg-white px-4 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Previous step"
          className="grid size-11 shrink-0 place-items-center rounded-[14px] border border-[#E5E7EB] bg-white text-[#94A3B8] transition hover:border-[#C7D2FE] hover:bg-[#F8FAFC] hover:text-[#6366F1]"
        >
          <ChevronLeft className="size-5" />
        </button>

        <div className="min-w-0 flex-1 overflow-x-auto">
          <div className="grid min-w-[760px] grid-cols-[auto_minmax(72px,1fr)_auto_minmax(72px,1fr)_auto_minmax(72px,1fr)_auto] items-center gap-5">
        {steps.map((step, index) => {
          const isActive = step.number === activeStep;
          const href =
            step.number === 1
              ? '/post'
              : step.number === 2
                ? '/post/step-2'
                : step.number === 3
                  ? '/post/step-3'
                  : '/post/step-4';

          return (
            <Fragment key={step.number}>
              <Link href={href} className="group inline-flex min-w-0 items-center justify-center gap-3 text-center">
                <span
                  className={`grid size-10 shrink-0 place-items-center rounded-full border text-[15px] font-semibold transition ${
                    isActive
                      ? 'border-[#6366F1] bg-[#6366F1] text-white ring-4 ring-[#EEF2FF]'
                      : 'border-[#E5E7EB] bg-white text-[#334155]'
                  }`}
                >
                  {step.number}
                </span>
                <span className={`whitespace-nowrap text-[14px] font-semibold ${isActive ? 'text-[#6366F1]' : 'text-[#334155]'}`}>
                  {step.title}
                </span>
              </Link>
              {index < steps.length - 1 ? <span className="h-px w-full rounded-full bg-[#E5E7EB]" /> : null}
            </Fragment>
          );
        })}
          </div>
        </div>

        <button
          type="button"
          aria-label="Next step"
          className="grid size-11 shrink-0 place-items-center rounded-[14px] border border-[#E5E7EB] bg-white text-[#64748B] transition hover:border-[#C7D2FE] hover:bg-[#F8FAFC] hover:text-[#6366F1]"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </section>
  );
}

function PromptInputCard() {
  return (
    <section className="rounded-[18px] border border-[#E5E7EB] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#A78BFA]" />
            <h2 className="text-[17px] font-extrabold tracking-[-0.01em] text-[#111827]">
              1. วางหรือเขียนข้อมูลประกาศของคุณ
            </h2>
          </div>
          <p className="mt-3 text-[13px] font-medium leading-5 text-[#65748B]">
            วางข้อความประกาศที่คุณมี หรือเขียนอธิบายทรัพย์ตามที่คุณต้องการ
          </p>
        </div>

        <button className="inline-flex h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[10px] border border-[#DCD8FF] bg-[#FBFAFF] px-4 text-[13px] font-bold text-[#5B50E6] transition hover:bg-[#F2F0FF]">
          <FileText className="h-4 w-4" />
          ตัวอย่างข้อความ
        </button>
      </div>

      <div className="relative">
        <textarea
          className="min-h-[420px] w-full resize-none rounded-[14px] border border-[#8E86FF] bg-white px-5 py-4 text-[14px] font-semibold leading-7 text-[#111827] outline-none transition placeholder:text-[#94A3B8] focus:border-[#6D5DFB] focus:ring-4 focus:ring-[#6D5DFB]/10 lg:min-h-[440px]"
          defaultValue={`KN-RR/024-2026

🏡 PAVE Ramintra - Wongwaen

เพฟ รามอินทรา-วงแหวน | บ้านหลังมุม ติดสวน บรรยากาศดีที่สุดในโครงการ
✨ บ้านเดี่ยว 2 ชั้น หลังมุม ทำเลเงียบสงบ ใกล้สวน
✨ แบบบ้าน Infinity - Type ใหญ่สุดของโครงการ

🔸 รายละเอียดบ้าน
- เนื้อที่ดิน 61.5 ตร.วา.
- พื้นที่ใช้สอย 217 ตร.ม. + ต่อเติมหลังคาโรงรถ/เฉลียง ~30 ตร.ม.
- 4 ห้องนอน | 3 ห้องน้ำ (มีห้องนอนชั้นล่าง)
- จอดรถได้ 2 คัน
- แอร์ 2 เครื่อง
- หันหน้าทิศเหนือ ลมดี ไม่ร้อน

🍀 จุดเด่นที่หาไม่ได้ง่าย
✔ รีโนเวทใหม่ทั้งหลัง พร้อมอยู่
✔ ทาสีใหม่ TOA ทั้งภายนอก-ภายใน
✔ ปูพื้นใหม่ SPC อย่างดี 5.5 มม. กันน้ำ กันปลวก ไม่ลามไฟ
✔ สุขภัณฑ์ American Standard`}
        />

        <div className="absolute bottom-4 right-4 text-[11px] font-semibold text-[#728098]">
          856 / 10,000
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-[12px] font-semibold text-[#71809A]">
        <Lock className="h-4 w-4" />
        ข้อมูลของคุณปลอดภัย เราใช้ AI เพื่อวิเคราะห์เท่านั้น
      </div>

      <button className="mt-4 flex h-12 w-full items-center justify-center gap-2 whitespace-nowrap rounded-[10px] bg-gradient-to-r from-[#6554F3] to-[#5147E8] px-4 text-[14px] font-extrabold text-white shadow-[0_16px_30px_rgba(91,80,230,0.24)] transition hover:brightness-105 active:scale-[0.99]">
        <Wand2 className="h-4 w-4" />
        กรอกข้อมูลด้วย AI
      </button>

      <div className="my-4 flex items-center gap-3">
        <div className="h-px flex-1 bg-[#EEF2F7]" />
        <span className="text-[12px] font-bold text-[#94A3B8]">หรือ</span>
        <div className="h-px flex-1 bg-[#EEF2F7]" />
      </div>

      <button className="flex h-11 w-full items-center justify-center gap-2 whitespace-nowrap rounded-[10px] border border-[#DDE3EE] bg-white px-4 text-[13px] font-bold text-[#5B50E6] transition hover:border-[#BDB7FF] hover:bg-[#FBFAFF]">
        <Edit3 className="h-4 w-4" />
        เริ่มกรอกข้อมูลเอง
      </button>

      <p className="mt-4 text-center text-[12px] font-semibold text-[#71809A]">
        ไม่มีข้อความพร้อมใช่ไหม?{' '}
        <button className="font-extrabold text-[#5B50E6] hover:underline">เริ่มกรอกข้อมูลเองได้ที่นี่</button>
      </p>
    </section>
  );
}

const assistantTasks = [
  'Extract property type',
  'Detect price and size',
  'Summarize selling points',
  'Improve description',
  'Check missing information',
];

function TextInput({
  label,
  placeholder,
  defaultValue,
  type = 'text',
}: {
  label: string;
  placeholder?: string;
  defaultValue?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[13px] font-medium text-[#475569]">{label}</span>
      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="h-11 w-full rounded-[12px] border border-[#E5E7EB] bg-white px-3 text-[14px] font-medium text-[#111827] outline-none transition placeholder:text-[#94A3B8] focus:border-[#6366F1] focus:ring-4 focus:ring-[#6366F1]/10"
      />
    </label>
  );
}

function SelectInput({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[13px] font-medium text-[#475569]">{label}</span>
      <button
        type="button"
        className="flex h-11 w-full items-center justify-between rounded-[12px] border border-[#E5E7EB] bg-white px-3 text-left text-[14px] font-medium text-[#111827] outline-none transition hover:border-[#CBD5E1] focus:border-[#6366F1] focus:ring-4 focus:ring-[#6366F1]/10"
      >
        <span className="min-w-0 truncate">{value}</span>
        <ChevronRight className="size-4 rotate-90 text-[#64748B]" />
      </button>
    </label>
  );
}

function Step2FormSection() {
  return (
    <section className="rounded-[18px] border border-[#E5E7EB] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-[#A78BFA]" />
            <h2 className="text-[17px] font-semibold tracking-[-0.01em] text-[#111827]">Paste property details</h2>
          </div>
          <p className="mt-2 max-w-[640px] text-[13px] font-medium leading-5 text-[#64748B]">
            Paste or write listing notes first, then let AI extract clean property information into the fields below.
          </p>
        </div>

        <button className="inline-flex h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[10px] bg-[#6366F1] px-4 text-[13px] font-semibold text-white shadow-[0_12px_24px_rgba(99,102,241,0.18)] transition hover:bg-[#4F46E5] active:scale-[0.98]">
          <Wand2 className="size-4" />
          Extract with AI
        </button>
      </div>

      <textarea
        className="min-h-[150px] w-full resize-none rounded-[14px] border border-[#D8DDF0] bg-[#FBFCFF] px-4 py-3 text-[14px] font-medium leading-6 text-[#111827] outline-none transition placeholder:text-[#94A3B8] focus:border-[#6366F1] focus:bg-white focus:ring-4 focus:ring-[#6366F1]/10"
        placeholder="Paste or write property information here. AI will help extract details into the form below."
      />

      <div className="mt-5 border-t border-[#EEF2F7] pt-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-[15px] font-semibold text-[#111827]">Structured listing data</h3>
            <p className="mt-1 text-[12px] font-medium text-[#64748B]">Review and edit anything AI extracted before moving forward.</p>
          </div>
          <span className="hidden rounded-full bg-[#EAFBF1] px-3 py-1 text-[12px] font-semibold text-[#15955B] sm:inline-flex">Auto-filled by AI</span>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <SelectInput label="Property Type" value="Single House" />
          <SelectInput label="Listing Type" value="For Sale" />
          <TextInput label="Price" defaultValue="6,800,000" />
          <TextInput label="Bedroom" defaultValue="4" />
          <TextInput label="Bathroom" defaultValue="3" />
          <TextInput label="Usable Area" defaultValue="217 sq.m." />
          <TextInput label="Land Size" defaultValue="61.5 sq.wah" />
          <TextInput label="Parking" defaultValue="2 cars" />
          <TextInput label="Location / Address" placeholder="Project, road, district, province" />
        </div>

        <label className="mt-4 block">
          <span className="mb-2 block text-[13px] font-medium text-[#475569]">Highlight / Description</span>
          <textarea
            className="min-h-[132px] w-full resize-none rounded-[12px] border border-[#E5E7EB] bg-white px-3 py-3 text-[14px] font-medium leading-6 text-[#111827] outline-none transition placeholder:text-[#94A3B8] focus:border-[#6366F1] focus:ring-4 focus:ring-[#6366F1]/10"
            placeholder="Key selling points, renovation details, nearby places, facilities, contact notes..."
          />
        </label>
      </div>
    </section>
  );
}

function AiAssistantCard() {
  return (
    <aside className="rounded-[18px] border border-[#E5E7EB] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="flex items-start gap-3">
        <div className="grid size-10 shrink-0 place-items-center rounded-[12px] bg-[#F5F3FF] text-[#6366F1]">
          <Bot className="size-5" />
        </div>
        <div>
          <h2 className="text-[17px] font-semibold tracking-[-0.01em] text-[#111827]">AI Assistant</h2>
          <p className="mt-1 text-[13px] font-medium leading-5 text-[#64748B]">
            AI can help convert pasted text into clean listing data and suggest what information is still missing.
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-[16px] border border-[#EDEBFF] bg-[#FBFAFF] p-4">
        <div className="mb-3 flex items-center gap-2 text-[13px] font-semibold text-[#4F46E5]">
          <Sparkles className="size-4" />
          What AI can do
        </div>
        <div className="space-y-2.5">
          {assistantTasks.map((task) => (
            <div key={task} className="flex items-center gap-3 rounded-[12px] bg-white px-3 py-2 text-[13px] font-medium text-[#334155] ring-1 ring-[#EEF2FF]">
              <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#EAFBF1] text-[#15955B]">
                <Check className="size-3.5" />
              </span>
              <span>{task}</span>
            </div>
          ))}
        </div>
      </div>

      <button className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-[12px] border border-[#C7D2FE] bg-white px-4 text-[13px] font-semibold text-[#6366F1] transition hover:bg-[#F5F3FF]">
        <HelpCircle className="size-4" />
        Ask AI to help
      </button>
    </aside>
  );
}

const baseFields = [
  { label: 'ประเภททรัพย์', value: 'บ้านเดี่ยว', score: '99%', unit: '' },
  { label: 'ชื่อโครงการ', value: 'PAVE Ramintra - Wongwaen', score: '95%', unit: '' },
  { label: 'ราคา', value: '6,800,000', score: '96%', unit: 'บาท' },
  { label: 'ขนาดที่ดิน', value: '61.5', score: '95%', unit: 'ตร.วา' },
  { label: 'พื้นที่ใช้สอย', value: '217', score: '93%', unit: 'ตร.ม.' },
  { label: 'จำนวนชั้น', value: '2', score: '95%', unit: 'ชั้น' },
];

const detailFields = [
  { label: 'ห้องนอน', value: '4', score: '99%', unit: 'ห้อง' },
  { label: 'ห้องน้ำ', value: '3', score: '99%', unit: 'ห้อง' },
  { label: 'ที่จอดรถ', value: '2', score: '99%', unit: 'คัน' },
  { label: 'ทิศหน้าบ้าน', value: 'ทิศเหนือ', score: '72%', unit: '', warning: true },
  { label: 'แอร์', value: '2', score: '90%', unit: 'เครื่อง' },
  { label: 'ห้องนอนชั้นล่าง', value: 'มี', score: '90%', unit: '' },
];

const highlightTags = [
  'หลังมุม ติดสวน',
  'รีโนเวทใหม่ทั้งหลัง',
  'แบบบ้านใหญ่สุดของโครงการ',
  'ใกล้สวน บรรยากาศดี',
  'ติดตั้งระบบกล้องวงจรปิด',
  'Clubhouse / สระว่ายน้ำ / ฟิตเนส / CCTV',
];

const nearbyTags = [
  'MRT รามอินทรา กม.9 (6.6 กม.)',
  'Fashion Island (7.3 กม.)',
  'รพ. อินทรารัตน์ (6.9 กม.)',
  'รร. นานาชาติรีเจนท์ (13 กม.)',
];

interface Step2FieldItem {
  label: string;
  value: string;
  score: string;
  unit?: string;
  warning?: boolean;
}

interface Step2FormData {
  base: Step2FieldItem[];
  detail: Step2FieldItem[];
  contact: Step2FieldItem[];
  highlights: string[];
  nearby: string[];
}

function getFieldValue(fields: ExtractedField[], key: string) {
  const value = fields.find((field) => field.key === key)?.value || '';
  return hasExtractedValue(value) ? value : '';
}

function getFieldScore(fields: ExtractedField[], key: string) {
  const score = fields.find((field) => field.key === key)?.score || 0;
  return `${score}%`;
}

function splitFieldTags(value: string) {
  return value
    .split(/[,;\n]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function buildStep2FormData(fields: ExtractedField[] | null): Step2FormData {
  if (!fields) {
    return {
      base: baseFields,
      detail: detailFields,
      contact: [
        { label: 'เบอร์โทรศัพท์', value: '088-993-0371', score: '95%' },
        { label: 'Line ID', value: '0889930371', score: '95%' },
      ],
      highlights: highlightTags,
      nearby: nearbyTags,
    };
  }

  const highlights = splitFieldTags(getFieldValue(fields, 'highlights'));
  const facilities = splitFieldTags(getFieldValue(fields, 'facilities'));
  const nearby = splitFieldTags(getFieldValue(fields, 'nearby'));

  return {
    base: [
      { label: 'ประเภททรัพย์', value: getFieldValue(fields, 'propertyType'), score: getFieldScore(fields, 'propertyType') },
      { label: 'ชื่อโครงการ', value: getFieldValue(fields, 'projectName'), score: getFieldScore(fields, 'projectName') },
      { label: 'ประเภทประกาศ', value: getFieldValue(fields, 'listingType'), score: getFieldScore(fields, 'listingType') },
      { label: 'ราคา', value: getFieldValue(fields, 'price'), score: getFieldScore(fields, 'price'), unit: 'บาท' },
      { label: 'ขนาดที่ดิน', value: getFieldValue(fields, 'landSize'), score: getFieldScore(fields, 'landSize'), unit: 'ตร.วา' },
      { label: 'พื้นที่ใช้สอย', value: getFieldValue(fields, 'usableArea'), score: getFieldScore(fields, 'usableArea'), unit: 'ตร.ม.' },
    ],
    detail: [
      { label: 'ห้องนอน', value: getFieldValue(fields, 'bedroom'), score: getFieldScore(fields, 'bedroom'), unit: 'ห้อง' },
      { label: 'ห้องน้ำ', value: getFieldValue(fields, 'bathroom'), score: getFieldScore(fields, 'bathroom'), unit: 'ห้อง' },
      { label: 'ที่จอดรถ', value: getFieldValue(fields, 'parking'), score: getFieldScore(fields, 'parking'), unit: 'คัน' },
      { label: 'ทิศหน้าบ้าน', value: getFieldValue(fields, 'direction'), score: getFieldScore(fields, 'direction'), warning: true },
      { label: 'แอร์', value: getFieldValue(fields, 'airConditioner'), score: getFieldScore(fields, 'airConditioner'), unit: 'เครื่อง' },
      { label: 'ค่าส่วนกลาง', value: getFieldValue(fields, 'commonFee'), score: getFieldScore(fields, 'commonFee'), unit: 'บาท' },
    ],
    contact: [
      { label: 'เบอร์โทรศัพท์', value: getFieldValue(fields, 'contactPhone'), score: getFieldScore(fields, 'contactPhone') },
      { label: 'Line ID', value: getFieldValue(fields, 'lineId'), score: getFieldScore(fields, 'lineId') },
    ],
    highlights: [...highlights, ...facilities].length ? [...highlights, ...facilities] : highlightTags,
    nearby: nearby.length ? nearby : nearbyTags,
  };
}

function ConfidenceBadge({ value, warning }: { value: string; warning?: boolean }) {
  return (
    <span
      className={`rounded-[8px] px-2 py-0.5 text-[12px] font-semibold ${
        warning ? 'bg-[#FFF3D8] text-[#E38B00]' : 'bg-[#DFF8EA] text-[#15955B]'
      }`}
    >
      {value}
    </span>
  );
}

function DataField({
  label,
  value,
  score,
  unit,
  warning,
}: {
  label: string;
  value: string;
  score: string;
  unit?: string;
  warning?: boolean;
}) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-[13px] font-medium text-[#475569]">{label}</span>
        <ConfidenceBadge value={score} warning={warning} />
      </div>
      <div className="flex h-11 overflow-hidden rounded-[12px] border border-[#E5E7EB] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.02)] transition focus-within:border-[#6366F1] focus-within:ring-4 focus-within:ring-[#6366F1]/10">
        <input
          defaultValue={value}
          className="min-w-0 flex-1 bg-transparent px-3 text-[14px] font-medium text-[#111827] outline-none"
        />
        {unit ? (
          <button
            type="button"
            className="flex min-w-[68px] items-center justify-center gap-1 border-l border-[#E5E7EB] bg-[#FBFCFF] px-3 text-[13px] font-medium text-[#475569]"
          >
            {unit}
            <ChevronRight className="size-3.5 rotate-90 text-[#94A3B8]" />
          </button>
        ) : null}
      </div>
    </label>
  );
}

function TagGroup({ title, tags }: { title: string; tags: string[] }) {
  return (
    <div className="rounded-[14px] border border-[#EEF2F7] bg-white p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-[13px] font-semibold text-[#111827]">{title}</p>
        <ConfidenceBadge value="90%" />
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex min-h-8 items-center rounded-[9px] bg-[#F1EFFF] px-3 text-[13px] font-medium text-[#4F46E5]"
          >
            {tag}
            <span className="ml-1.5 text-[#A5A0E8]">×</span>
          </span>
        ))}
        <button className="inline-flex min-h-8 items-center rounded-[9px] border border-dashed border-[#DDE3EE] px-3 text-[13px] font-medium text-[#94A3B8]">
          + เพิ่มจุดเด่น
        </button>
      </div>
    </div>
  );
}

export function Step2AnalysisForm() {
  const [formData, setFormData] = useState<Step2FormData>(() => buildStep2FormData(null));

  useEffect(() => {
    setFormData(buildStep2FormData(readStoredFields()));
  }, []);

  return (
    <section className="rounded-[18px] border border-[#E5E7EB] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col gap-3 border-b border-[#EEF2F7] p-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-[#A78BFA]" />
            <h2 className="text-[17px] font-semibold tracking-[-0.01em] text-[#111827]">2. AI วิเคราะห์ข้อมูลจากข้อความ</h2>
          </div>
          <p className="mt-2 text-[13px] font-medium leading-5 text-[#64748B]">
            ตรวจสอบความถูกต้องและแก้ไขข้อมูลให้สมบูรณ์
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="inline-flex h-10 items-center gap-2 rounded-[10px] border border-[#E5E7EB] bg-white px-3 text-[13px] font-semibold text-[#6366F1] transition hover:bg-[#F5F3FF]">
            <RefreshCw className="size-4" />
            อัปเดตอีกครั้ง
          </button>
          <button className="inline-flex h-10 items-center gap-2 rounded-[10px] border border-[#E5E7EB] bg-white px-3 text-[13px] font-semibold text-[#6366F1] transition hover:bg-[#F5F3FF]">
            <ClipboardList className="size-4" />
            ดูข้อความต้นฉบับ
          </button>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-4 inline-flex rounded-[9px] bg-[#DFF8EA] px-3 py-1 text-[12px] font-semibold text-[#15955B]">
          AI วิเคราะห์ข้อมูลครบถ้วน 92%
        </div>

        <div className="rounded-[16px] border border-[#EEF2F7] bg-[#FBFCFF] p-4">
          <p className="mb-4 text-[14px] font-semibold text-[#111827]">ข้อมูลพื้นฐาน</p>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {formData.base.map((field) => (
              <DataField key={`${field.label}-${field.value}`} {...field} />
            ))}
          </div>
        </div>

        <div className="rounded-[16px] border border-[#EEF2F7] bg-[#FBFCFF] p-4">
          <p className="mb-4 text-[14px] font-semibold text-[#111827]">รายละเอียดบ้าน</p>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {formData.detail.map((field) => (
              <DataField key={`${field.label}-${field.value}`} {...field} />
            ))}
          </div>
        </div>

        <div className="mt-4 space-y-4">
          <TagGroup title="จุดเด่น" tags={formData.highlights} />
          <TagGroup title="สถานที่ใกล้เคียง" tags={formData.nearby} />
        </div>

        <div className="mt-4 rounded-[16px] border border-[#EEF2F7] bg-[#FBFCFF] p-4">
          <p className="mb-4 text-[14px] font-semibold text-[#111827]">ข้อมูลติดต่อ</p>
          <div className="grid gap-4 md:grid-cols-2">
            {formData.contact.map((field) => (
              <DataField key={`${field.label}-${field.value}`} {...field} />
            ))}
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 border-t border-[#EEF2F7] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <button className="inline-flex h-11 items-center justify-center gap-2 rounded-[12px] border border-[#DDE3EE] bg-white px-5 text-[13px] font-semibold text-[#334155] transition hover:bg-[#F8FAFC]">
            <ChevronLeft className="size-4" />
            กลับไปขั้นตอนที่ 1
          </button>
          <button className="inline-flex h-11 items-center justify-center gap-2 rounded-[12px] bg-[#6366F1] px-6 text-[13px] font-semibold text-white shadow-[0_14px_28px_rgba(99,102,241,0.18)] transition hover:bg-[#4F46E5]">
            ยืนยันข้อมูลและไปขั้นตอนถัดไป
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

export function AnalysisSummarySidebar() {
  return (
    <aside className="rounded-[18px] border border-[#E5E7EB] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="mb-5">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-[#A78BFA]" />
          <h2 className="text-[17px] font-semibold tracking-[-0.01em] text-[#111827]">สรุปข้อมูลที่ AI วิเคราะห์ได้</h2>
        </div>
        <p className="mt-2 text-[13px] font-medium leading-5 text-[#64748B]">ตรวจสอบความถูกต้องก่อนดำเนินการต่อ</p>
      </div>

      <div className="rounded-[16px] bg-[#FBFAFF] p-4">
        <div className="flex items-center gap-4">
          <div className="grid size-[112px] shrink-0 place-items-center rounded-full bg-[conic-gradient(#6366F1_0_92%,#EDEBFF_92%_100%)]">
            <div className="grid size-[82px] place-items-center rounded-full bg-white">
              <span className="text-[24px] font-semibold text-[#111827]">92%</span>
            </div>
          </div>
          <div>
            <p className="text-[15px] font-semibold text-[#111827]">วิเคราะห์ข้อมูลครบถ้วน</p>
            <p className="mt-1 text-[13px] font-medium leading-5 text-[#64748B]">
              เหลือข้อมูลที่แนะนำให้ตรวจสอบ <span className="font-semibold text-[#E38B00]">3 รายการ</span>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <p className="mb-3 text-[14px] font-semibold text-[#111827]">คุณภาพข้อมูลรายได้</p>
        <div className="space-y-3 text-[13px] font-medium text-[#475569]">
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2"><span className="size-2.5 rounded-full bg-[#34C776]" />ข้อมูลครบถ้วน (80% ขึ้นไป)</span>
            <span className="text-[#334155]">16 รายการ</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2"><span className="size-2.5 rounded-full bg-[#F59E0B]" />ควรตรวจสอบ (50-79%)</span>
            <span className="text-[#334155]">1 รายการ</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2"><span className="size-2.5 rounded-full bg-[#EF4444]" />ควรแก้ไข (ต่ำกว่า 50%)</span>
            <span className="text-[#334155]">0 รายการ</span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <p className="mb-3 text-[14px] font-semibold text-[#111827]">รายการที่แนะนำให้ตรวจสอบ</p>
        <div className="rounded-[14px] border border-[#EDEBFF] bg-[#FBFAFF] p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[14px] font-semibold text-[#111827]">ทิศหน้าบ้าน</p>
              <p className="mt-2 text-[13px] font-medium leading-5 text-[#64748B]">พบคำว่า “ทิศเหนือ” ในข้อความ</p>
            </div>
            <ConfidenceBadge value="72%" warning />
          </div>
          <button className="mt-3 h-9 rounded-[10px] border border-[#C7D2FE] bg-white px-4 text-[13px] font-semibold text-[#6366F1] transition hover:bg-[#F5F3FF]">
            ตรวจสอบ
          </button>
        </div>
      </div>

      <div className="mt-5 rounded-[16px] border border-[#EDEBFF] bg-[#FBFAFF] p-4">
        <div className="flex items-start gap-3">
          <Sparkles className="mt-0.5 size-5 shrink-0 text-[#6366F1]" />
          <div>
            <p className="text-[14px] font-semibold text-[#4F46E5]">AI อาจมีข้อผิดพลาดได้</p>
            <p className="mt-2 text-[13px] font-medium leading-5 text-[#64748B]">
              กรุณาตรวจสอบข้อมูลสำคัญให้ถูกต้องก่อนดำเนินการขั้นตอนถัดไป
            </p>
            <button className="mt-3 text-[13px] font-semibold text-[#6366F1] hover:underline">ดูเคล็ดลับการใช้งาน</button>
          </div>
        </div>
      </div>
    </aside>
  );
}

function ChecklistSidebar() {
  return (
    <aside className="rounded-[18px] border border-[#E5E7EB] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#A78BFA]" />
            <h2 className="text-[16px] font-semibold tracking-[-0.01em] text-[#111827]">
              2. AI วิเคราะห์ข้อมูล
            </h2>
          </div>
          <div className="mt-2 inline-flex rounded-[8px] bg-[#DFF8EA] px-2.5 py-1 text-[12px] font-semibold text-[#15955B]">
            ความแม่นยำโดยรวม 92%
          </div>
        </div>

        <button className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-[#E6EAF2] text-[#5B50E6] transition hover:bg-[#F5F3FF]">
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>

      <div className="overflow-hidden rounded-[14px] border border-[#EDF1F7]">
        {checklistItems.map((item) => {
          const Icon = item.icon;
          const warning = item.score < 80;

          return (
            <div
              key={`${item.label}-${item.value}`}
              className="grid grid-cols-[22px_minmax(0,1fr)_46px_30px] items-center gap-2.5 border-b border-[#EDF1F7] px-3 py-2.5 last:border-b-0 sm:grid-cols-[22px_minmax(100px,0.86fr)_minmax(150px,1.28fr)_50px_30px]"
            >
              <Icon className="h-4 w-4 text-[#64748B]" />
              <div className="min-w-0 sm:contents">
                <p className="text-[12px] font-medium text-[#64748B] sm:text-[13px] sm:text-[#475569]">{item.label}</p>
                <p className="mt-0.5 min-w-0 text-[13px] font-semibold leading-5 text-[#111827] sm:mt-0">
                  {item.value}
                </p>
              </div>
              <span
                className={`min-w-[46px] rounded-[8px] px-2 py-1 text-center text-[12px] font-semibold ${
                  warning ? 'bg-[#FFF3D8] text-[#E38B00]' : 'bg-[#DFF8EA] text-[#15955B]'
                }`}
              >
                {item.score}%
              </span>
              <button className="flex h-7 w-7 items-center justify-center rounded-full border border-[#E6EAF2] text-[#64748B] transition hover:border-[#BDB7FF] hover:text-[#5B50E6]">
                <Edit3 className="h-3.5 w-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] font-medium text-[#64748B]">
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#34C776]" />
          ความแม่นยำสูง
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
          ควรตรวจสอบ
        </span>
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]" />
          ควรแก้ไข
        </span>
      </div>
    </aside>
  );
}

function AiPromptInputCard({
  prompt,
  isAnalyzing,
  error,
  botMessages,
  onPromptChange,
  onAnalyze,
}: {
  prompt: string;
  isAnalyzing: boolean;
  error: string;
  botMessages: BotStatusMessage[];
  onPromptChange: (value: string) => void;
  onAnalyze: () => void;
}) {
  return (
    <section className="rounded-[18px] border border-[#E5E7EB] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#A78BFA]" />
            <h2 className="text-[17px] font-semibold tracking-[-0.01em] text-[#111827]">
              เขียนหรือวางข้อมูลประกาศของคุณ
            </h2>
          </div>
        </div>

        
      </div>

      <BotStatusLine messages={botMessages} />

      <div className="relative">
        <textarea
          value={prompt}
          onChange={(event) => onPromptChange(event.target.value)}
          maxLength={10000}
          className="min-h-[420px] w-full resize-none rounded-[14px] border border-[#8E86FF] bg-white px-5 pb-28 pt-4 text-[14px] font-medium leading-7 text-[#111827] outline-none transition placeholder:text-[#94A3B8] focus:border-[#6D5DFB] focus:ring-4 focus:ring-[#6D5DFB]/10 lg:min-h-[440px]"
          placeholder="วางหรือเขียนรายละเอียดประกาศที่นี่ เช่น ประเภทอสังหา ราคา พื้นที่ ห้องนอน ห้องน้ำ จุดเด่น และข้อมูลติดต่อ"
        />
        <div className="pointer-events-none absolute inset-x-px bottom-px h-24 rounded-b-[14px] bg-gradient-to-t from-white via-white to-white/0" />
        <div className="absolute bottom-4 left-4 rounded-full bg-white px-2 py-1 text-[11px] font-semibold text-[#728098]">
          {prompt.length.toLocaleString()} / 10,000
        </div>
        <div className="absolute bottom-4 right-4 flex items-center gap-2">
          <button
            type="button"
            aria-label="Speech to text"
            title="Speech to text"
            className="grid size-10 place-items-center rounded-full border border-[#E5E7EB] bg-white text-[#334155] shadow-[0_4px_12px_rgba(15,23,42,0.10)] transition hover:border-[#C7D2FE] hover:bg-[#F8FAFC] hover:text-[#4F46E5]"
          >
            <Mic className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onAnalyze}
            disabled={isAnalyzing || !prompt.trim()}
            className="flex h-10 min-w-[128px] items-center justify-center rounded-full bg-gradient-to-r from-[#6554F3] to-[#5147E8] px-4 text-[13px] font-semibold text-white shadow-[0_10px_22px_rgba(91,80,230,0.24)] transition hover:brightness-105 active:scale-[0.99] disabled:cursor-not-allowed disabled:from-[#CBD5E1] disabled:to-[#CBD5E1] disabled:shadow-none"
          >
            {isAnalyzing ? 'กำลังกรอก...' : 'กรอกแบบฟอร์ม'}
          </button>
        </div>
      </div>

      {error ? (
        <div className="mt-3 rounded-[10px] border border-[#FCA5A5] bg-[#FEF2F2] px-3 py-2 text-[13px] font-semibold text-[#B91C1C]">
          {error}
        </div>
      ) : null}

      <div className="mt-4 flex items-center gap-2 text-[12px] font-semibold text-[#71809A]">
        <Lock className="h-4 w-4" />
        ข้อมูลของคุณปลอดภัย เราใช้ AI เพื่อวิเคราะห์เท่านั้น
      </div>

    </section>
  );
}

function TypingDots() {
  return (
    <span className="ml-1 inline-flex w-5 items-center gap-0.5 align-baseline" aria-hidden="true">
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          className="size-1 rounded-full bg-[#334155] opacity-30"
          style={{
            animation: `bot-dot-${index + 1} 1.2s steps(1, end) infinite`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes bot-dot-1 {
          0%,
          100% {
            opacity: 1;
          }
        }
        @keyframes bot-dot-2 {
          0%,
          32% {
            opacity: 0.3;
          }
          33%,
          100% {
            opacity: 1;
          }
        }
        @keyframes bot-dot-3 {
          0%,
          65% {
            opacity: 0.3;
          }
          66%,
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </span>
  );
}

function BotStatusLine({ messages }: { messages: BotStatusMessage[] }) {
  if (!messages.length) return null;
  const message = messages[messages.length - 1];

  return (
    <div className="mb-3 flex min-h-12 items-center gap-2 rounded-[14px] border border-[#EDEBFF] bg-[#FBFAFF] px-3 py-2 text-[13px] font-medium text-[#334155]">
      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#EEF2FF] text-[#6366F1]">
        <Bot className="size-4" />
      </span>
      <span className="min-w-0 whitespace-normal break-words leading-5">
        {message.text}
        {message.loading ? <TypingDots /> : null}
      </span>
    </div>
  );
}

function AiChecklistSidebar({
  fields,
  isAnalyzing,
  onFieldChange,
}: {
  fields: ExtractedField[];
  isAnalyzing: boolean;
  onFieldChange: (key: string, value: string) => void;
}) {
  const summary = getMatchSummary(fields);
  const extractedCount = fields.filter((field) => hasExtractedValue(field.value)).length;
  const missingCount = fields.length - extractedCount;
  const priorityKeys = ['projectName', 'highlights', 'nearby', 'facilities'];
  const orderedFields = [...fields].sort((first, second) => {
      const firstIndex = priorityKeys.indexOf(first.key);
      const secondIndex = priorityKeys.indexOf(second.key);

      if (firstIndex >= 0 || secondIndex >= 0) {
        return (firstIndex >= 0 ? firstIndex : priorityKeys.length) - (secondIndex >= 0 ? secondIndex : priorityKeys.length);
      }

      return 0;
    });
  const longFields = orderedFields.slice(0, 4);
  const compactFields = orderedFields.slice(4);
  const handleNextStep = () => {
    window.localStorage.setItem(postFormStorageKey, JSON.stringify(fields));
  };

  return (
    <aside className="rounded-[18px] border border-[#E5E7EB] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#8B5CF6]" />
          <h2 className="text-[19px] font-semibold tracking-[-0.01em] text-[#111827]">AI วิเคราะห์ข้อมูล</h2>
        </div>
        <button
          type="button"
          aria-label="Close analysis"
          className="grid size-8 place-items-center rounded-[10px] text-[#94A3B8] transition hover:bg-[#F8FAFC] hover:text-[#475569]"
        >
          ×
        </button>
      </div>

      <div className="mb-5 flex items-center gap-3 rounded-[16px] border border-[#E5E7EB] bg-[#FBFCFF] px-4 py-3">
        <div className="grid size-11 shrink-0 place-items-center rounded-full bg-[conic-gradient(#34C776_var(--progress),#E5E7EB_var(--progress)_100%)]" style={{ '--progress': `${Math.round((extractedCount / fields.length) * 100)}%` } as React.CSSProperties}>
          <div className="grid size-8 place-items-center rounded-full bg-white text-[11px] font-semibold text-[#15955B]">
            {Math.round((extractedCount / fields.length) * 100)}%
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[14px] font-semibold text-[#334155]">Extracted</span>
            <span className="text-[15px] font-semibold text-[#111827]">{extractedCount}/{fields.length}</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#E5E7EB]">
            <div className="h-full rounded-full bg-[#34C776]" style={{ width: `${Math.round((extractedCount / fields.length) * 100)}%` }} />
          </div>
        </div>
        <div className="h-9 w-px bg-[#E5E7EB]" />
        <div className="shrink-0 text-right">
          <p className="text-[14px] font-semibold text-[#334155]">Missing</p>
          <p className="mt-0.5 text-[18px] font-semibold text-[#F59E0B]">{missingCount}</p>
        </div>
      </div>

      <div className="rounded-[18px] border border-[#E5E7EB] bg-white px-4 py-4">
        <h3 className="mb-4 text-[20px] font-semibold tracking-[-0.01em] text-[#111827]">กรอกข้อมูลประกาศ</h3>
        <div className="space-y-3">
        {longFields.map((item) => {
          const Icon = item.icon;
          const extracted = hasExtractedValue(item.value);

          return (
            <label key={item.key} className="grid grid-cols-[24px_minmax(0,1fr)_22px] items-start gap-x-3 gap-y-2">
              <span className="grid size-5 place-items-center text-[#64748B]">
                <Icon className="h-4 w-4" />
              </span>
              <span className="min-w-0 truncate text-[15px] font-medium leading-6 text-[#334155]">{item.label}</span>
              <span className={`grid size-5 place-items-center rounded-full border ${extracted ? 'border-[#34C776] text-[#22C55E]' : 'border-[#F59E0B] text-[#F59E0B]'}`}>
                {extracted ? <Check className="h-3.5 w-3.5" /> : <span className="text-[12px] font-semibold">!</span>}
              </span>
              <textarea
                value={extracted ? item.value : ''}
                onChange={(event) => onFieldChange(item.key, event.target.value)}
                rows={item.value.length > 80 ? 3 : 2}
                className={`col-span-2 col-start-2 min-h-11 w-full resize-y rounded-[8px] border bg-white px-3 py-2 text-[14px] font-medium leading-6 text-[#334155] outline-none transition placeholder:text-[#D97706] focus:bg-white focus:ring-3 ${
                  extracted
                    ? 'border-[#E5E7EB] focus:border-[#C7D2FE] focus:ring-[#6366F1]/10'
                    : 'border-[#F59E0B] bg-[#FFFBEB] shadow-[0_0_0_3px_rgba(245,158,11,0.12)] focus:border-[#F59E0B] focus:bg-[#FFFBEB] focus:ring-[#F59E0B]/18'
                }`}
              />
            </label>
          );
        })}

        <div className="grid gap-x-6 gap-y-3 md:grid-cols-2">
          {compactFields.map((item) => {
            const Icon = item.icon;
            const extracted = hasExtractedValue(item.value);

            return (
              <label key={item.key} className="grid min-h-7 grid-cols-[24px_minmax(92px,0.9fr)_minmax(72px,1fr)_22px] items-center gap-3">
                <span className="grid size-5 place-items-center text-[#64748B]">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0 truncate text-[15px] font-medium leading-6 text-[#334155]">{item.label}</span>
                <input
                  value={extracted ? item.value : ''}
                  onChange={(event) => onFieldChange(item.key, event.target.value)}
                  className={`h-10 min-w-0 truncate rounded-[10px] border bg-white px-3 text-right text-[15px] font-medium text-[#111827] outline-none transition placeholder:text-[#D97706] focus:ring-4 ${
                    extracted
                      ? 'border-[#D8D5FF] focus:border-[#8E86FF] focus:ring-[#6D5DFB]/12'
                      : 'border-[#F59E0B] bg-[#FFFBEB] shadow-[0_0_0_3px_rgba(245,158,11,0.12)] focus:border-[#F59E0B] focus:bg-[#FFFBEB] focus:ring-[#F59E0B]/18'
                  }`}
                />
                <span className={`grid size-5 place-items-center rounded-full border ${extracted ? 'border-[#34C776] text-[#22C55E]' : 'border-[#F59E0B] text-[#F59E0B]'}`}>
                  {extracted ? <Check className="h-3.5 w-3.5" /> : <span className="text-[12px] font-semibold">!</span>}
                </span>
              </label>
            );
          })}
        </div>
        </div>
      </div>

      {isAnalyzing ? (
        <div className="mt-3 flex items-center gap-2 rounded-[12px] bg-[#F8FAFC] px-3 py-2.5 text-[12px] font-semibold text-[#64748B]">
          <RefreshCw className="h-3.5 w-3.5 animate-spin text-[#6366F1]" />
          กำลังจัดข้อมูลที่ extract ได้...
        </div>
      ) : null}

      <div className="mt-5 flex justify-end border-t border-[#EEF2F7] pt-5">
        <Link href="/post/step-2" onClick={handleNextStep} className="flex h-12 w-full min-w-0 items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-[12px] bg-gradient-to-r from-[#6554F3] to-[#5147E8] px-5 text-[13px] font-extrabold text-white shadow-[0_16px_30px_rgba(91,80,230,0.24)] transition hover:brightness-105 active:scale-[0.99] sm:w-[390px] sm:text-[14px]">
          บันทึกข้อมูลและไปขั้นตอนถัดไป
          <ArrowRight className="h-4 w-4 shrink-0" />
        </Link>
      </div>
    </aside>
  );
}

export function ActionButtons() {
  return (
    <div className="flex flex-col gap-3 border-t border-[#E5E7EB] bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-end lg:px-6">
      <button className="flex h-12 w-full min-w-0 items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-[12px] bg-gradient-to-r from-[#6554F3] to-[#5147E8] px-5 text-[13px] font-extrabold text-white shadow-[0_16px_30px_rgba(91,80,230,0.24)] transition hover:brightness-105 active:scale-[0.99] sm:w-[390px] sm:text-[14px]">
        บันทึกข้อมูลและไปขั้นตอนถัดไป
        <ArrowRight className="h-4 w-4 shrink-0" />
      </button>
    </div>
  );
}

export function Sidebar() {
  const mainItems = [
    { icon: Wand2, label: 'สร้างประกาศด้วย AI', active: true },
    { icon: Home, label: 'หน้าหลัก' },
    { icon: FileText, label: 'สำรวจ' },
    { icon: Library, label: 'คลังวิดีโอของฉัน' },
  ];

  const toolItems = [
    { icon: Sparkles, label: 'AI สร้างประกาศ', active: true },
    { icon: Image, label: 'AI วิดีโอพรีเซนเตอร์' },
    { icon: Bot, label: 'AI อวตาร' },
    { icon: ClipboardList, label: 'AI เสียงบรรยาย' },
  ];

  return (
    <aside className="hidden w-[280px] shrink-0 border-r border-[#E5E7EB] bg-white px-4 py-6 lg:flex lg:flex-col">
      <Link href="/dashboard" className="flex items-center gap-3 px-2">
        <span className="grid size-10 place-items-center rounded-[12px] bg-[#6366F1] text-white">
          <Home className="size-[18px]" />
        </span>
        <span className="text-[20px] font-bold tracking-[-0.3px] text-[#111827]">PropPilot AI</span>
      </Link>
      <nav className="mt-8 flex-1 space-y-1 overflow-y-auto pr-1">
        <div className="space-y-1">
          {mainItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={`flex h-10 w-full items-center gap-3 rounded-[10px] px-3 text-left text-[14px] font-medium transition ${
                  item.active
                    ? 'mb-5 bg-[#6366F1] text-white hover:bg-[#4F46E5]'
                    : 'text-[#6B7280] hover:bg-[#F5F7FA] hover:text-[#111827]'
                }`}
              >
                <Icon className="size-[18px] shrink-0" />
                <span className="min-w-0 truncate">{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="space-y-1">
          <p className="px-3 pb-2 pt-8 text-[11px] font-medium uppercase tracking-[0.18em] text-[#9CA3AF]">AI Tools</p>
          <div className="space-y-1">
            {toolItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className={`flex h-10 w-full items-center gap-3 rounded-[10px] px-3 text-left text-[14px] font-medium transition ${
                    item.active ? 'bg-[#F5F3FF] text-[#6366F1]' : 'text-[#6B7280] hover:bg-[#F5F7FA] hover:text-[#111827]'
                  }`}
                >
                  <Icon className="size-[18px] shrink-0" />
                  <span className="min-w-0 truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <div className="mt-6 border-t border-[#E5E7EB] px-2 pt-5">
        <button className="mb-4 flex h-10 w-full items-center gap-3 rounded-[10px] px-3 text-left text-[14px] font-medium text-[#6B7280] hover:bg-[#F5F7FA] hover:text-[#111827]">
          <HelpCircle className="size-[18px]" />
          ตั้งค่า
        </button>
        <div className="flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-full bg-[#111827] text-[13px] font-medium text-white">
            N
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-medium text-[#111827]">Natthapong S.</p>
            <p className="text-[12px] text-[#6366F1]">Pro Plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function TopNav() {
  return (
    <header className="sticky top-0 z-40 flex items-center gap-4 border-b border-[#E5E7EB] bg-white/92 px-6 py-3 backdrop-blur-sm lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-[#E5E7EB] text-[#475569] lg:hidden">
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="truncate text-[17px] font-bold tracking-[-0.2px] text-[#111827]">สร้างประกาศใหม่ด้วย AI</h1>
      </div>

      <div className="ml-auto hidden items-center gap-2.5 sm:flex">
        <button className="hidden h-10 items-center gap-2 rounded-[12px] px-3 text-[13px] font-medium text-[#111827] hover:bg-[#F5F7FA] xl:inline-flex">
          Try PropPilot 2.0 <span className="rounded-full bg-[#EEF2FF] px-2 py-0.5 text-[11px] text-[#6366F1]">New</span>
        </button>
        <ThemeToggle />
        <div className="flex h-10 items-center gap-2 rounded-[12px] border border-[#E5E7EB] bg-white px-3 text-[13px] font-medium text-[#111827] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          <CreditCard className="size-4 text-[#6366F1]" />
          <span>20</span>
          <span className="h-4 w-px bg-[#E5E7EB]" />
          <span className="text-[#334155]">Free Trial</span>
        </div>
        <button aria-label="Notifications" className="grid size-10 place-items-center rounded-[12px] border border-[#E5E7EB] bg-white text-[#6B7280] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          <Bell className="size-4" />
        </button>
        <button aria-label="Profile" className="grid size-10 place-items-center rounded-full bg-[#6366F1] text-[14px] font-medium text-white">
          N
        </button>
      </div>
    </header>
  );
}

export default function PostPage() {
  const [prompt, setPrompt] = useState(starterPrompt);
  const [fields, setFields] = useState<ExtractedField[]>(() => getEmptyFields());
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState('');
  const [botMessages, setBotMessages] = useState<BotStatusMessage[]>([defaultBotMessage]);
  const [hasLoadedStoredFields, setHasLoadedStoredFields] = useState(false);

  const requiredKeys = useMemo(
    () => extractFieldTemplates.filter((field) => field.required).map((field) => `${field.key}: ${field.label}`).join('\n'),
    []
  );

  useEffect(() => {
    const storedFields = readStoredFields();
    if (storedFields) {
      setFields(storedFields);
      setBotMessages([{ id: 'restored', text: 'โหลดข้อมูลแบบฟอร์มล่าสุดเรียบร้อยแล้ว' }]);
    }
    setHasLoadedStoredFields(true);
  }, []);

  useEffect(() => {
    if (!hasLoadedStoredFields) return;

    window.localStorage.setItem(postFormStorageKey, JSON.stringify(fields));
  }, [fields, hasLoadedStoredFields]);

  const handleAnalyze = async () => {
    const sourceText = prompt.trim();
    if (!sourceText || isAnalyzing) return;

    setIsAnalyzing(true);
    setAnalysisError('');
    const emptyFields = getEmptyFields();
    setFields(emptyFields);
    let workingMessageIndex = 0;
    setBotMessages([{ id: 'working-0', text: workingBotMessages[workingMessageIndex], loading: true }]);
    const workingStatusTimer = window.setInterval(() => {
      workingMessageIndex = (workingMessageIndex + 1) % workingBotMessages.length;
      setBotMessages([{ id: `working-${workingMessageIndex}`, text: workingBotMessages[workingMessageIndex], loading: true }]);
    }, 1300);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: `You are a real estate listing extraction API for PropPilot AI.
Return JSON only. Do not include markdown.
Extract the pasted Thai/English property listing into this exact shape:
{
  "fields": [
    { "key": "propertyType", "value": "...", "score": 0-100, "source": "short evidence" }
  ],
  "summary": "short Thai summary"
}
Use only these keys and labels:
${requiredKeys}
Optional keys: parking, direction, airConditioner, facilities, commonFee, nearby, lineId.
Score means how confidently the pasted text matches that field. Use 0 if missing, 50-79 if inferred/needs review, 80-100 if clearly stated.`,
            },
            {
              role: 'user',
              content: sourceText,
            },
          ],
        }),
      });

      const data = (await response.json()) as { text?: string; error?: string };
      if (!response.ok) {
        throw new Error(data.error || 'วิเคราะห์ข้อมูลไม่สำเร็จ');
      }

      const aiData = extractJson(data.text || '');
      setFields(mergeAiFields(aiData, emptyFields));

      if (!aiData) {
        setAnalysisError('AI ตอบกลับไม่เป็น JSON ที่สมบูรณ์ กรุณาลองวิเคราะห์อีกครั้ง');
        setBotMessages([{ id: 'error', text: 'AI ตอบกลับไม่สมบูรณ์ กรุณาลองวิเคราะห์อีกครั้ง' }]);
      } else {
        setBotMessages([{ id: 'complete', text: 'กรอกข้อมูลแบบฟอร์มเรียบร้อย...' }]);
      }
    } catch (error) {
      setFields(emptyFields);
      setAnalysisError(error instanceof Error ? error.message : 'วิเคราะห์ข้อมูลไม่สำเร็จ กรุณาลองอีกครั้ง');
      setBotMessages([{ id: 'error', text: 'วิเคราะห์ข้อมูลไม่สำเร็จ กรุณาลองอีกครั้ง' }]);
    } finally {
      window.clearInterval(workingStatusTimer);
      setIsAnalyzing(false);
    }
  };

  const handleFieldChange = (key: string, value: string) => {
    setFields((current) =>
      current.map((field) =>
        field.key === key
          ? {
              ...field,
              value,
              score: normalizeScore(undefined, hasExtractedValue(value)),
              source: 'แก้ไขโดยผู้ใช้',
            }
          : field
      )
    );
  };

  return (
    <main className="min-h-screen bg-[#F7F9FC] text-[#111827]">
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <TopNav />

          <div className="mx-auto w-full max-w-[1480px] flex-1 px-4 py-4 lg:px-6">
            <StepBar />

            <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,2.35fr)_minmax(320px,1fr)]">
              <div className="space-y-5">
                <AiChecklistSidebar fields={fields} isAnalyzing={isAnalyzing} onFieldChange={handleFieldChange} />

                
              </div>

              <AiPromptInputCard
                prompt={prompt}
                isAnalyzing={isAnalyzing}
                error={analysisError}
                botMessages={botMessages}
                onPromptChange={setPrompt}
                onAnalyze={handleAnalyze}
              />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
