'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Check, ChevronRight, Copy, PanelRightClose, Plus, Sparkles, Upload, X } from 'lucide-react';

import { Sidebar, StepBar, TopNav } from '@/app/post/page';

const postFormStorageKey = 'proppilot.post.step1.fields';

type StoredField = {
  key: string;
  label: string;
  value: string;
};

type AvatarOption = {
  id: string;
  name: string;
  role: string;
  image: string;
};

const emptyFieldValue = 'รอวิเคราะห์';

const avatars: AvatarOption[] = [
  {
    id: 'prae',
    name: 'น้องแพร',
    role: 'สายอบอุ่น',
    image: 'https://i.pinimg.com/736x/09/e2/ad/09e2ad1f48716bb9e5f359941e02e2f3.jpg',
  },
  {
    id: 'ken',
    name: 'คุณเคน',
    role: 'สายมืออาชีพ',
    image: 'https://i.pinimg.com/736x/80/9a/39/809a3964ec78d6df9dfc97a4a13f187a.jpg',
  },
  {
    id: 'jin',
    name: 'น้องจิน',
    role: 'สายสดใส',
    image: 'https://i.pinimg.com/736x/c6/c0/09/c6c009b31ed165171c61a1964a7089bd.jpg',
  },
  {
    id: 'tin',
    name: 'คุณติน',
    role: 'สายจริงใจ',
    image: 'https://i.pinimg.com/736x/f5/ca/50/f5ca50eeba2016425e42e082c4b74ab6.jpg',
  },
];

const uploadedMedia = [
  'https://i.pinimg.com/736x/53/94/52/539452351497a0ab871b6491ecbbf3ca.jpg',
  'https://i.pinimg.com/736x/a9/65/8f/a9658f9f27fd895d641590e330544c0d.jpg',
  'https://i.pinimg.com/736x/92/a8/b1/92a8b138394907839c57bd0dce24da26.jpg',
  'https://i.pinimg.com/736x/a2/7c/27/a27c273d4339f094cc7635dd6660f16d.jpg',
  'https://i.pinimg.com/736x/25/4c/61/254c612423833c47810553ab4f227833.jpg',
  'https://i.pinimg.com/736x/45/16/06/451606a21ab06742766d285ee461567e.jpg',
  'https://i.pinimg.com/736x/6a/a9/92/6aa992c10b243e1c2675cb8687ac3b1b.jpg',
];

const fieldLabels: Record<string, string> = {
  propertyType: 'ประเภทอสังหา',
  projectName: 'ชื่อโครงการ',
  listingType: 'ประเภทประกาศ',
  price: 'ราคา',
  bedroom: 'ห้องนอน',
  bathroom: 'ห้องน้ำ',
  usableArea: 'พื้นที่ใช้สอย',
  landSize: 'ขนาดที่ดิน',
  parking: 'ที่จอดรถ',
  direction: 'ทิศหน้าบ้าน',
  airConditioner: 'แอร์',
  highlights: 'รายละเอียดเด่น',
  facilities: 'สิ่งอำนวยความสะดวก',
  commonFee: 'ค่าส่วนกลาง',
  nearby: 'สถานที่ใกล้เคียง',
  contactPhone: 'เบอร์ติดต่อ',
  lineId: 'Line ID',
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function hasValue(value?: string) {
  const normalized = value?.trim();
  return Boolean(normalized && normalized !== emptyFieldValue && normalized !== '-');
}

function valueFor(fields: StoredField[], key: string) {
  return fields.find((field) => field.key === key && hasValue(field.value))?.value.trim();
}

function buildVideoScript(fields: StoredField[]) {
  const projectName = valueFor(fields, 'projectName') ?? 'โครงการของคุณ';
  const propertyType = valueFor(fields, 'propertyType') ?? 'อสังหาริมทรัพย์';
  const listingType = valueFor(fields, 'listingType') ?? 'ขาย';
  const price = valueFor(fields, 'price');
  const bedrooms = valueFor(fields, 'bedroom');
  const bathrooms = valueFor(fields, 'bathroom');
  const usableArea = valueFor(fields, 'usableArea');
  const landSize = valueFor(fields, 'landSize');
  const highlights = valueFor(fields, 'highlights');
  const nearby = valueFor(fields, 'nearby');
  const facilities = valueFor(fields, 'facilities');
  const contactPhone = valueFor(fields, 'contactPhone');
  const lineId = valueFor(fields, 'lineId');

  const specs = [
    bedrooms ? `${bedrooms} ห้องนอน` : '',
    bathrooms ? `${bathrooms} ห้องน้ำ` : '',
    usableArea ? `พื้นที่ใช้สอย ${usableArea} ตร.ม.` : '',
    landSize ? `ที่ดิน ${landSize} ตร.ว.` : '',
  ].filter(Boolean);

  return [
    `เปิดวิดีโอด้วยภาพหน้าบ้านและบรรยากาศโครงการ ${projectName}`,
    `พูดแนะนำว่า "${listingType}${propertyType} ในโครงการ ${projectName}" ด้วยโทนอบอุ่น น่าเชื่อถือ และเป็นมืออาชีพ`,
    highlights ? `เน้นจุดเด่นของทรัพย์: ${highlights}` : 'เน้นจุดเด่นของบ้าน ทำเล และบรรยากาศที่เหมาะกับการอยู่อาศัย',
    specs.length ? `แทรกข้อมูลสำคัญให้ชัดเจน: ${specs.join(' | ')}` : 'แทรกข้อมูลพื้นที่ ห้องนอน ห้องน้ำ และรายละเอียดสำคัญของทรัพย์',
    nearby ? `พูดถึงทำเลและสถานที่ใกล้เคียง: ${nearby}` : '',
    facilities ? `เล่าถึงสิ่งอำนวยความสะดวก: ${facilities}` : '',
    price ? `ปิดท้ายด้วยราคาขาย ${price} บาท พร้อมชวนผู้ชมติดต่อเพื่อเข้าชมบ้านจริง` : 'ปิดท้ายด้วย call to action ให้ติดต่อเพื่อเข้าชมบ้านจริง',
    contactPhone || lineId ? `ใส่ข้อมูลติดต่อ: ${[contactPhone ? `โทร ${contactPhone}` : '', lineId ? `Line ID ${lineId}` : ''].filter(Boolean).join(' | ')}` : '',
  ]
    .filter(Boolean)
    .join('\n\n');
}

function readStoredFields() {
  try {
    const rawFields = window.localStorage.getItem(postFormStorageKey);
    if (!rawFields) return [];

    const parsedFields = JSON.parse(rawFields) as Partial<StoredField>[];
    if (!Array.isArray(parsedFields)) return [];

    return parsedFields
      .map((field) => ({
        key: typeof field.key === 'string' ? field.key : '',
        label: typeof field.label === 'string' ? field.label : fieldLabels[field.key ?? ''] ?? '',
        value: typeof field.value === 'string' ? field.value : '',
      }))
      .filter((field) => field.key && field.label);
  } catch {
    return [];
  }
}

function AvatarSelector({ selectedAvatar, onSelectAvatar }: { selectedAvatar: string; onSelectAvatar: (id: string) => void }) {
  return (
    <section className="rounded-[16px] border border-[#E5E7EB] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[18px] font-bold tracking-[-0.2px] text-[#111827]">1. เลือก AI Avatar / Influencer</h2>
          <p className="mt-1 text-[13px] font-normal text-[#6B7280]">เลือกอวาตาร์หรือนักแสดง AI ที่ต้องการใช้ในวิดีโอ</p>
        </div>
        <button type="button" className="inline-flex h-9 shrink-0 items-center gap-2 rounded-[12px] border border-[#E5E7EB] bg-white px-3.5 text-[13px] font-medium text-[#111827] transition hover:bg-[#F5F7FA]">
          View all <ArrowRight className="size-4" />
        </button>
      </div>

      <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <button type="button" className="flex aspect-[4/5] min-h-[168px] flex-col items-center justify-center rounded-[14px] border border-dashed border-[#D1D5DB] bg-white p-4 text-center transition hover:border-[#6366F1] hover:bg-[#F8FAFC]">
          <span className="grid size-11 place-items-center rounded-full bg-[#F5F3FF] text-[#6366F1]">
            <Upload className="size-5" />
          </span>
          <span className="mt-3 text-[14px] font-semibold leading-5 text-[#111827]">อัปโหลดรูปของคุณ</span>
          <span className="mt-1 text-[12px] font-normal leading-5 text-[#6B7280]">JPG, PNG สูงสุด 10MB</span>
        </button>

        {avatars.map((avatar) => {
          const selected = selectedAvatar === avatar.id;
          return (
            <button
              key={avatar.id}
              type="button"
              onClick={() => onSelectAvatar(avatar.id)}
              className={cx(
                'relative flex h-full flex-col overflow-hidden rounded-[14px] border bg-white p-2 text-center transition hover:border-[#C7D2FE]',
                selected ? 'border-[#6366F1] ring-1 ring-[#6366F1]' : 'border-[#E5E7EB]'
              )}
            >
              {selected ? (
                <span className="absolute right-3 top-3 z-10 grid size-6 place-items-center rounded-full bg-[#6366F1] text-white">
                  <Check className="size-4" />
                </span>
              ) : null}
              <div className="aspect-[4/5] overflow-hidden rounded-[11px] bg-[#F8FAFC]">
                <img src={avatar.image} alt={avatar.name} className="h-full w-full object-cover object-top" />
              </div>
              <div className="mt-auto pt-2">
                <p className="text-[13px] font-semibold text-[#111827]">{avatar.name}</p>
                <p className="text-[12px] font-normal text-[#6B7280]">{avatar.role}</p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function ImageGridUploader() {
  const slots = Array.from({ length: 10 });

  return (
    <section className="rounded-[16px] border border-[#E5E7EB] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[18px] font-bold tracking-[-0.2px] text-[#111827]">2. อัปโหลดรูปภาพและวิดีโอ</h2>
          <p className="mt-1 text-[13px] font-normal text-[#6B7280]">เพิ่มรูปภาพหรือวิดีโอเพื่อให้ AI สร้างวิดีโอรีวิวที่น่าสนใจ</p>
        </div>
        <span className="text-[13px] font-medium text-[#6B7280]">สูงสุด 10 รูป</span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {slots.map((_, index) => {
          const image = uploadedMedia[index];
          if (!image) {
            return (
              <button key={`empty-${index}`} type="button" className="flex aspect-square min-h-[104px] flex-col items-center justify-center gap-2 rounded-[14px] border border-dashed border-[#D1D5DB] bg-white text-[13px] font-medium text-[#6366F1] transition hover:border-[#6366F1] hover:bg-[#F8FAFC]">
                <Plus className="size-5" />
                เพิ่มรูป
              </button>
            );
          }

          return (
            <div key={`${image}-${index}`} className="group relative aspect-square min-h-[104px] overflow-hidden rounded-[14px] border border-[#E5E7EB] bg-[#F8FAFC] transition hover:border-[#C7D2FE]">
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

function ReferenceThumb({ image, label }: { image: string; label: string }) {
  return (
    <div className="relative size-14 overflow-hidden rounded-[12px] border border-[#E5E7EB] bg-[#F8FAFC]">
      <img src={image} alt={label} className="h-full w-full object-cover" />
      <button aria-label={`Remove ${label}`} className="absolute right-1 top-1 grid size-5 place-items-center rounded-full bg-white/90 text-[#111827]">
        <X className="size-3" />
      </button>
    </div>
  );
}

function AiScriptSidebar({ fields }: { fields: StoredField[] }) {
  const script = useMemo(() => buildVideoScript(fields), [fields]);
  const filledFields = fields.filter((field) => hasValue(field.value));

  return (
    <aside className="sticky top-[84px] max-h-[calc(100vh-104px)] overflow-hidden rounded-[16px] border border-[#E5E7EB] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="flex max-h-[calc(100vh-104px)] flex-col">
        <div className="flex items-center justify-between gap-3 border-b border-[#E5E7EB] px-5 py-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-[18px] font-bold tracking-[-0.2px] text-[#111827]">เขียน Script สำหรับ AI</h2>
              <span className="rounded-full bg-[#EEF2FF] px-2 py-0.5 text-[11px] font-semibold text-[#6366F1]">Step 2</span>
            </div>
            <p className="mt-1 text-[12px] font-normal text-[#6B7280]">AI ดึงข้อมูลจากแบบฟอร์มมาเขียนเป็นสคริปต์สำหรับสร้างวิดีโอ</p>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <button type="button" aria-label="Collapse script sidebar" className="grid size-8 place-items-center rounded-[10px] border border-[#E5E7EB] bg-white text-[#6B7280] transition hover:bg-[#F5F7FA]">
              <PanelRightClose className="size-4" />
            </button>
            <button type="button" aria-label="Close script sidebar" className="grid size-8 place-items-center rounded-[10px] border border-[#E5E7EB] bg-white text-[#6B7280] transition hover:bg-[#F5F7FA]">
              <X className="size-4" />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
          <p className="mb-2 text-[12px] font-medium text-[#64748B]">Reference attachments</p>
          <div className="mb-4 flex flex-wrap gap-2">
            {uploadedMedia.slice(0, 2).map((image, index) => (
              <ReferenceThumb key={image} image={image} label={`Image ${index + 1}`} />
            ))}
            <button type="button" className="grid size-14 place-items-center rounded-[12px] border border-dashed border-[#C7D2FE] text-[#6366F1]">
              <Plus className="size-5" />
            </button>
          </div>

          <div className="rounded-[14px] border border-[#C7D2FE] bg-white p-4">
            <textarea
              value={script}
              readOnly
              className="min-h-[300px] w-full resize-none bg-transparent text-[14px] font-normal leading-7 text-[#111827] outline-none"
            />
            <div className="mt-3 flex items-center justify-between border-t border-[#E5E7EB] pt-3">
              <button type="button" className="inline-flex h-9 items-center gap-2 rounded-full bg-[#F8FAFC] px-3 text-[13px] font-medium text-[#334155]">
                <Sparkles className="size-4 text-[#6366F1]" />
                ใช้ข้อมูล {filledFields.length} fields
              </button>
              <span className="text-[12px] font-medium text-[#64748B]">{script.length} / 2000</span>
            </div>
          </div>

          <div className="mt-4 rounded-[14px] border border-[#E5E7EB] bg-[#FBFCFF] p-4">
            <div className="mb-2 flex items-center justify-between gap-3">
              <h3 className="text-[14px] font-semibold text-[#111827]">ข้อมูลที่ใช้เขียนสคริปต์</h3>
              <button type="button" className="inline-flex h-8 items-center gap-1.5 rounded-[10px] border border-[#E5E7EB] px-2.5 text-[12px] font-medium text-[#6366F1] hover:bg-white">
                <Copy className="size-3.5" />
                คัดลอก
              </button>
            </div>
            <div className="space-y-2.5">
              {fields.slice(0, 8).map((field) => (
                <div key={field.key} className="grid grid-cols-[92px_minmax(0,1fr)] gap-3 text-[12px] leading-5">
                  <span className="text-[#64748B]">{field.label}</span>
                  <span className="font-medium text-[#111827]">{hasValue(field.value) ? field.value : '-'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#E5E7EB] bg-white p-5">
          <Link href="/post/step-3" className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-[14px] bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-[14px] font-semibold text-white transition hover:brightness-105 active:scale-[0.99]">
            สร้าง AI Sales Review
            <ChevronRight className="size-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}

export default function PostStep2Page() {
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0].id);
  const [fields, setFields] = useState<StoredField[]>([]);

  useEffect(() => {
    setFields(readStoredFields());
  }, []);

  return (
    <main className="min-h-screen bg-[#F7F9FC] text-[#111827]">
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <TopNav />

          <div className="mx-auto w-full max-w-[1480px] flex-1 px-4 py-4 lg:px-6">
            <StepBar activeStep={2} />

            <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_400px] xl:items-start">
              <div className="min-w-0 space-y-4">
                <AvatarSelector selectedAvatar={selectedAvatar} onSelectAvatar={setSelectedAvatar} />
                <ImageGridUploader />
              </div>
              <AiScriptSidebar fields={fields} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
