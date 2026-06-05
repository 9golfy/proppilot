"use client";

import Link from "next/link";
import { Fragment, useState } from "react";
import type { ElementType, ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  AtSign,
  Bath,
  BedDouble,
  Bell,
  Bot,
  Building2,
  Check,
  ChevronDown,
  CreditCard,
  Facebook,
  Folder,
  Home,
  Instagram,
  LandPlot,
  Library,
  Link2,
  LogOut,
  Mic2,
  MessageCircle,
  Plus,
  Search,
  Send,
  Settings,
  Share2,
  Sparkles,
  Video,
  X,
  Youtube,
} from "lucide-react";

import ThemeToggle from "@/components/common/ThemeToggle";
import { AvatarSelector } from "@/components/avatar/AvatarSelector";
import { ImageGridUploader } from "@/components/media/ImageGridUploader";
import { PromptSidebar } from "@/components/workflow/PromptSidebar";
import { PropertyForm } from "@/components/forms/PropertyForm";
import { StepTabs } from "@/components/workflow/StepTabs";

interface AvatarOption {
  id: string;
  name: string;
  role: string;
  image: string;
}

interface MenuItem {
  label: string;
  href: string;
  icon: ElementType;
  primary?: boolean;
}

const menuGroups: Array<{ title?: string; items: MenuItem[] }> = [
  {
    items: [
      { label: "Create with AI", href: "/dashboard", icon: Sparkles, primary: true },
      { label: "Explore", href: "/explore", icon: Search },
      { label: "My VDO", href: "/my/vdo", icon: Folder },
    ],
  },
  {
    title: "AI Tools",
    items: [
      { label: "Home", href: "/dashboard", icon: Home },
      { label: "AI Video Agent", href: "/ai/vdo/agent", icon: Bot },
      { label: "AI Video Avatar", href: "/ai/vdo/avartar", icon: Video },
      { label: "AI Voice", href: "/ai/voice", icon: Mic2 },
      { label: "My Library", href: "/ai/library", icon: Library },
    ],
  },
  {
    title: "Member",
    items: [
      { label: "Settings", href: "/settings", icon: Settings },
      { label: "Log out", href: "/logout", icon: LogOut },
    ],
  },
];

const steps = [{ title: "Fill Form" }, { title: "Gen AI Sales" }, { title: "Share" }];

const avatars: AvatarOption[] = [
  { id: "prae", name: "น้องแพร", role: "สายอบอุ่น", image: "https://i.pinimg.com/736x/09/e2/ad/09e2ad1f48716bb9e5f359941e02e2f3.jpg" },
  { id: "ken", name: "คุณเคน", role: "สายมืออาชีพ", image: "https://i.pinimg.com/736x/80/9a/39/809a3964ec78d6df9dfc97a4a13f187a.jpg" },
  { id: "jin", name: "น้องจิน", role: "สายสดใส", image: "https://i.pinimg.com/736x/c6/c0/09/c6c009b31ed165171c61a1964a7089bd.jpg" },
  { id: "tin", name: "คุณติน", role: "สายจริงใจ", image: "https://i.pinimg.com/736x/f5/ca/50/f5ca50eeba2016425e42e082c4b74ab6.jpg" },
];

const uploadedMedia = [
  "https://i.pinimg.com/736x/53/94/52/539452351497a0ab871b6491ecbbf3ca.jpg",
  "https://i.pinimg.com/736x/a9/65/8f/a9658f9f27fd895d641590e330544c0d.jpg",
  "https://i.pinimg.com/736x/92/a8/b1/92a8b138394907839c57bd0dce24da26.jpg",
  "https://i.pinimg.com/736x/a2/7c/27/a27c273d4339f094cc7635dd6660f16d.jpg",
  "https://i.pinimg.com/736x/25/4c/61/254c612423833c47810553ab4f227833.jpg",
  "https://i.pinimg.com/736x/45/16/06/451606a21ab06742766d285ee461567e.jpg",
  "https://i.pinimg.com/736x/6a/a9/92/6aa992c10b243e1c2675cb8687ac3b1b.jpg",
  "https://i.pinimg.com/736x/80/9a/39/809a3964ec78d6df9dfc97a4a13f187a.jpg",
];

const socialChannels = [
  { name: "Facebook", handle: "เพจของคุณ", active: true, icon: Facebook, color: "text-[#1877F2]" },
  { name: "Instagram", handle: "@your_account", active: true, icon: Instagram, color: "text-[#E4405F]" },
  { name: "LINE", handle: "Timeline", active: true, icon: MessageCircle, color: "text-[#06C755]" },
  { name: "TikTok", handle: "@your_account", active: false, icon: Share2, color: "text-[#111827]" },
  { name: "X (Twitter)", handle: "@your_account", active: false, icon: Share2, color: "text-[#111827]" },
  { name: "YouTube", handle: "ช่องของคุณ", active: false, icon: Youtube, color: "text-[#FF0000]" },
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function SellListingPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0].id);
  const selectedAvatarData = avatars.find((avatar) => avatar.id === selectedAvatar) ?? avatars[0];

  return (
    <main className="min-h-screen bg-[#FAFAFB] text-[#111827] selection:bg-[#6366F1]/20 selection:text-[#111827] dark:bg-[var(--background)] dark:text-[var(--foreground)]">
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <section className="min-w-0 flex-1">
          <DashboardTopbar />
          <div className="mx-auto max-w-[1480px] px-4 py-4 lg:px-6">
            <div>
              {activeStep === 0 && <FillFormStep activeStep={activeStep} onStepChange={setActiveStep} onBack={() => setActiveStep(0)} onNext={() => setActiveStep(1)} />}
              {activeStep === 1 && <GenAISalesStep activeStep={activeStep} onStepChange={setActiveStep} selectedAvatar={selectedAvatar} onSelectAvatar={setSelectedAvatar} onNext={() => setActiveStep(2)} />}
              {activeStep === 2 && <ShareStep activeStep={activeStep} onStepChange={setActiveStep} avatar={selectedAvatarData} onBack={() => setActiveStep(1)} />}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function DashboardSidebar() {
  return (
    <aside className="hidden w-[280px] shrink-0 border-r border-[#E5E7EB] bg-white px-4 py-6 lg:flex lg:flex-col dark:border-[var(--border)] dark:bg-[var(--card)]">
      <Link href="/dashboard" className="flex items-center gap-3 px-2">
        <span className="grid size-10 place-items-center rounded-[12px] bg-[#6366F1] text-white"><Home className="size-[18px]" /></span>
        <span className="text-[20px] font-bold tracking-[-0.3px] text-[#111827] dark:text-white">PropPilot AI</span>
      </Link>
      <nav className="mt-8 flex-1 space-y-1 overflow-y-auto pr-1">
        {menuGroups.map((group, groupIndex) => (
          <div key={group.title ?? groupIndex} className="space-y-1">
            {group.title && <p className="px-3 pb-2 pt-8 text-[11px] font-medium uppercase tracking-[0.18em] text-[#9CA3AF]">{group.title}</p>}
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = item.label === "Home";
              return (
                <Link key={item.label} href={item.href} className={cx("theme-focus flex h-10 items-center gap-3 rounded-[10px] px-3 text-[14px] font-medium transition", item.primary ? "mb-5 bg-[#6366F1] text-white hover:bg-[#4F46E5]" : isActive ? "bg-[#F5F3FF] text-[#6366F1]" : "text-[#6B7280] hover:bg-[#F5F7FA] hover:text-[#111827] dark:text-slate-400 dark:hover:bg-white/[0.06] dark:hover:text-white")}> 
                  <Icon className="size-[18px] shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
      <div className="mt-6 flex items-center gap-3 border-t border-[#E5E7EB] px-2 pt-5 dark:border-[var(--border)]">
        <span className="grid size-9 place-items-center rounded-full bg-[#111827] text-[13px] font-medium text-white">N</span>
        <div className="min-w-0 flex-1"><p className="truncate text-[13px] font-medium text-[#111827] dark:text-white">Nattapong S.</p><p className="text-[12px] text-[#6366F1]">Free Plan</p></div>
      </div>
    </aside>
  );
}

function DashboardTopbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#E5E7EB] bg-white/92 px-6 py-3 backdrop-blur-sm lg:px-8 dark:border-[var(--border)] dark:bg-[var(--card)]/92">
      <div className="mx-auto flex max-w-[1320px] items-center gap-4">
        <Link href="/dashboard" className="flex items-center gap-2 lg:hidden"><span className="grid size-10 place-items-center rounded-[12px] bg-[#6366F1] text-white"><Home className="size-5" /></span><span className="text-[18px] font-bold">PropPilot AI</span></Link>
        <label className="hidden h-[48px] min-w-[260px] max-w-[560px] flex-1 items-center gap-3 rounded-[14px] border border-[#E5E7EB] bg-white px-4 text-[#6B7280] shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition focus-within:border-[#6366F1] focus-within:ring-4 focus-within:ring-[#6366F1]/10 md:flex dark:border-[var(--border)] dark:bg-white/[0.04]">
          <Search className="size-4" />
          <input className="min-w-0 flex-1 bg-transparent text-[14px] font-normal text-[#111827] outline-none placeholder:text-[#94A3B8] dark:text-white" placeholder="Search videos, avatars, assets" />
        </label>
        <div className="ml-auto flex items-center gap-2.5">
          <Link href="/dashboard" className="hidden h-10 items-center gap-2 rounded-[12px] px-3 text-[13px] font-medium text-[#111827] hover:bg-[#F5F7FA] xl:inline-flex dark:text-white dark:hover:bg-white/[0.06]">Try PropPilot 2.0 <span className="rounded-full bg-[#EEF2FF] px-2 py-0.5 text-[11px] text-[#6366F1]">New</span></Link>
          <ThemeToggle />
          <div className="flex h-10 items-center gap-2 rounded-[12px] border border-[#E5E7EB] bg-white px-3 text-[13px] font-medium text-[#111827] shadow-[0_1px_2px_rgba(0,0,0,0.04)] dark:border-[var(--border)] dark:bg-white/[0.04] dark:text-white"><CreditCard className="size-4 text-[#6366F1]" /><span>20</span><span className="h-4 w-px bg-[#E5E7EB]" /><span className="text-[#334155] dark:text-slate-300">Free Trial</span></div>
          <button aria-label="Notifications" className="grid size-10 place-items-center rounded-[12px] border border-[#E5E7EB] bg-white text-[#6B7280] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"><Bell className="size-4" /></button>
          <button aria-label="Profile" className="grid size-10 place-items-center rounded-full bg-[#6366F1] text-[14px] font-medium text-white">N</button>
        </div>
      </div>
    </header>
  );
}

function StepProgress({ activeStep, onStepChange }: { activeStep: number; onStepChange: (step: number) => void }) {
  return (
    <div className="mx-auto max-w-[920px]">
      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-4">
        {steps.map((step, index) => (
          <Fragment key={step.title}>
            <button type="button" onClick={() => onStepChange(index)} className="group inline-flex min-w-0 items-center justify-center gap-3 text-center">
              <span className={cx("grid size-9 shrink-0 place-items-center rounded-full border text-[15px] font-semibold transition", activeStep >= index ? "border-[#6366F1] bg-[#6366F1] text-white" : "border-[#E5E7EB] bg-white text-[#111827]")}>{index + 1}</span>
              <span className={cx("whitespace-nowrap text-[13px] font-semibold", activeStep === index ? "text-[#6366F1]" : "text-[#334155]")}>{step.title}</span>
            </button>
            {index < steps.length - 1 && <span key={`${step.title}-line`} className={cx("h-px w-full min-w-[120px] rounded-full", activeStep > index ? "bg-[#6366F1]" : "bg-[#E5E7EB]")} />}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

function SectionShell({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={cx("rounded-[20px] border border-[#E5E7EB] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] dark:border-[var(--border)] dark:bg-[var(--card)]", className)}>{children}</section>;
}

function SectionHeading({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return <div className="mb-4 flex items-start justify-between gap-4"><div><h2 className="text-[19px] font-bold tracking-[-0.2px] text-[#111827] dark:text-white">{title}</h2>{subtitle && <p className="mt-1 text-[13px] font-normal text-[#6B7280]">{subtitle}</p>}</div>{action}</div>;
}

function GenAISalesStep({ activeStep, onStepChange, selectedAvatar, onSelectAvatar, onNext }: { activeStep: number; onStepChange: (step: number) => void; selectedAvatar: string; onSelectAvatar: (id: string) => void; onNext: () => void }) {
  const [promptCollapsed, setPromptCollapsed] = useState(false);

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-start">
      <div className="min-w-0 space-y-4">
        <StepTabs steps={steps.map((step) => step.title)} activeStep={activeStep} onStepChange={onStepChange} />
        <AvatarSelector avatars={avatars} selectedAvatar={selectedAvatar} onSelectAvatar={onSelectAvatar} />
        <ImageGridUploader images={uploadedMedia} maxImages={10} />
      </div>

      <PromptSidebar
        images={uploadedMedia}
        collapsed={promptCollapsed}
        onToggle={() => setPromptCollapsed((collapsed) => !collapsed)}
        onGenerate={onNext}
      />
    </div>
  );
}
function ReferenceThumb({ photo, label }: { photo: string; label: string }) {
  return (
    <div className="relative size-14 overflow-hidden rounded-[12px] border border-[#E5E7EB] bg-[#F8FAFC]">
      <img src={photo} alt={label} className="h-full w-full object-cover" />
      <button aria-label={`Remove ${label}`} className="absolute right-1 top-1 grid size-5 place-items-center rounded-full bg-white/90 text-[#111827]"><X className="size-3" /></button>
    </div>
  );
}

function InlineReference({ photo, label }: { photo: string; label: string }) {
  return <span className="mx-0.5 inline-flex translate-y-[4px] items-center gap-1 rounded-full bg-[#F5F3FF] px-1.5 py-0.5 text-[13px] font-medium text-[#6366F1] ring-1 ring-[#C7D2FE]"><img src={photo} alt={label} className="size-5 rounded-full object-cover" />{label}</span>;
}

function FillFormStep({ activeStep, onStepChange, onBack, onNext }: { activeStep: number; onStepChange: (step: number) => void; onBack: () => void; onNext: () => void }) {
  const [promptCollapsed, setPromptCollapsed] = useState(false);

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-start">
      <div className="min-w-0 space-y-4">
        <StepTabs steps={steps.map((step) => step.title)} activeStep={activeStep} onStepChange={onStepChange} />
        <PropertyForm onBack={onBack} onNext={onNext} />
      </div>
      <PromptSidebar
        images={uploadedMedia}
        collapsed={promptCollapsed}
        onToggle={() => setPromptCollapsed((collapsed) => !collapsed)}
        onGenerate={onNext}
        variant="property"
        stepBadge={`Step ${activeStep + 1}`}
      />
    </div>
  );
}
function ShareStep({ activeStep, onStepChange, avatar, onBack }: { activeStep: number; onStepChange: (step: number) => void; avatar: AvatarOption; onBack: () => void }) {
  const [promptCollapsed, setPromptCollapsed] = useState(false);

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-start">
      <div className="min-w-0 space-y-4">
        <StepTabs steps={steps.map((step) => step.title)} activeStep={activeStep} onStepChange={onStepChange} />
        <SectionShell>
          <div className="mb-5 flex items-center gap-4">
            <button type="button" onClick={onBack} className="inline-flex h-10 items-center gap-2 rounded-[12px] border border-[#E5E7EB] bg-white px-4 text-[13px] font-medium text-[#111827] hover:bg-[#F5F7FA]">
              <ArrowLeft className="size-4" /> กลับไปกรอกข้อมูล
            </button>
            <div>
              <h1 className="text-[22px] font-semibold text-[#111827] dark:text-white">Share</h1>
              <p className="mt-1 text-[14px] font-normal text-[#6B7280]">ตรวจสอบ แก้ไข และแชร์โพสต์ในคลิกเดียว</p>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="overflow-hidden rounded-[18px] border border-[#E5E7EB] bg-white">
              <div className="flex items-center gap-3 border-b border-[#E5E7EB] p-4">
                <img src={avatar.image} alt={avatar.name} className="size-10 rounded-full object-cover object-top" />
                <div>
                  <p className="text-[13px] font-semibold text-[#111827]">{avatar.name} AI Sales</p>
                  <p className="text-[12px] font-normal text-[#6B7280]">1 นาที • สาธารณะ</p>
                </div>
              </div>
              <div className="p-4 text-[14px] font-normal leading-6 text-[#334155]">
                บ้านเดี่ยวหลังมุม ทำเลดี พื้นที่กว้าง สไตล์โมเดิร์น เหมาะสำหรับครอบครัวที่ต้องการบ้านพร้อมอยู่ ใกล้รถไฟฟ้าและสิ่งอำนวยความสะดวกครบ
              </div>
              <div className="relative aspect-video bg-[#F8FAFC]">
                <img src={uploadedMedia[0]} alt="House preview" className="h-full w-full object-cover" />
                <img src={avatar.image} alt="AI presenter" className="absolute bottom-0 left-5 h-[82%] max-w-[34%] object-contain object-bottom" />
              </div>
              <div className="p-4">
                <p className="text-[20px] font-semibold text-[#111827]">ราคา 5,900,000 บาท</p>
                <p className="mt-1 text-[13px] font-normal text-[#6B7280]">หมู่บ้านร่มรื่น ซอยรามคำแหง 123</p>
              </div>
            </div>

            <div className="rounded-[18px] border border-[#E5E7EB] bg-white p-4">
              <h2 className="text-[16px] font-semibold text-[#111827]">แชร์ไปยังโซเชียล</h2>
              <div className="mt-4 space-y-3">
                {socialChannels.map((channel) => {
                  const Icon = channel.icon;
                  return (
                    <div key={channel.name} className="flex items-center gap-3 rounded-[14px] border border-[#E5E7EB] bg-white p-3">
                      <Icon className={cx("size-5", channel.color)} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[12px] font-semibold text-[#111827]">{channel.name}</p>
                        <p className="truncate text-[11px] font-normal text-[#6B7280]">{channel.handle}</p>
                      </div>
                      <span className={cx("relative h-5 w-9 rounded-full", channel.active ? "bg-[#6366F1]" : "bg-[#E5E7EB]")}>
                        <span className={cx("absolute top-0.5 size-4 rounded-full bg-white transition", channel.active ? "left-[18px]" : "left-0.5")} />
                      </span>
                    </div>
                  );
                })}
              </div>
              <button className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-[12px] border border-[#C7D2FE] bg-white text-[13px] font-semibold text-[#6366F1] hover:bg-[#F5F3FF]">
                <Link2 className="size-4" /> เชื่อมต่อบัญชีเพิ่ม
              </button>
              <button className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-[14px] bg-[#22C55E] text-[15px] font-semibold text-white">
                <Send className="size-4" /> โพสต์เลย
              </button>
            </div>
          </div>
        </SectionShell>
      </div>

      <PromptSidebar
        images={uploadedMedia}
        collapsed={promptCollapsed}
        onToggle={() => setPromptCollapsed((collapsed) => !collapsed)}
        onGenerate={() => undefined}
        variant="share"
        stepBadge="Step 3"
      />
    </div>
  );
}

function formatTHB(value: number) {
  return new Intl.NumberFormat("th-TH", { style: "currency", currency: "THB", maximumFractionDigits: 0 }).format(Number.isFinite(value) ? value : 0);
}

function RadioPills({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <p className="mb-2 text-[13px] font-medium text-[#111827] dark:text-white">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option, index) => <button key={option} type="button" className={cx("h-10 rounded-[12px] border px-3 text-[13px] font-medium transition", index === 0 ? "border-[#6366F1] bg-[#F5F3FF] text-[#6366F1]" : "border-[#E5E7EB] bg-white text-[#334155] hover:bg-[#F8FAFC]")}>{option}</button>)}
      </div>
    </div>
  );
}

function CheckboxGrid({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <p className="mb-2 text-[13px] font-medium text-[#111827] dark:text-white">{label}</p>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((option, index) => <button key={option} type="button" className={cx("flex h-10 items-center gap-2 rounded-[12px] border px-3 text-left text-[13px] font-medium transition", index < 2 ? "border-[#6366F1]/30 bg-[#F5F3FF] text-[#4F46E5]" : "border-[#E5E7EB] bg-white text-[#334155] hover:bg-[#F8FAFC]")}><span className={cx("grid size-4 place-items-center rounded border", index < 2 ? "border-[#6366F1] bg-[#6366F1] text-white" : "border-[#D1D5DB] bg-white")} >{index < 2 && <Check className="size-3" />}</span>{option}</button>)}
      </div>
    </div>
  );
}

function TextareaField({ label, placeholder, className }: { label: string; placeholder: string; className?: string }) {
  return <label className={cx("block", className)}><span className="mb-2 block text-[13px] font-medium text-[#111827] dark:text-white">{label}</span><textarea className="min-h-[118px] w-full resize-none rounded-[12px] border border-[#E5E7EB] bg-white px-3 py-3 text-[14px] font-normal leading-6 text-[#111827] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#6366F1] focus:ring-4 focus:ring-[#6366F1]/10 dark:border-[var(--border)] dark:bg-white/[0.04] dark:text-white" placeholder={placeholder} /></label>;
}

function FileField({ label, hint }: { label: string; hint: string }) {
  return <label className="block"><span className="mb-2 block text-[13px] font-medium text-[#111827] dark:text-white">{label}</span><span className="flex min-h-11 cursor-pointer items-center justify-between rounded-[12px] border border-dashed border-[#D1D5DB] bg-white px-3 text-[13px] font-medium text-[#6366F1] transition hover:border-[#6366F1] hover:bg-[#F8FAFC]"><span>{hint}</span><Plus className="size-4" /><input type="file" multiple className="sr-only" /></span></label>;
}

function FormBlock({ title, children, noBorder }: { title: string; children: ReactNode; noBorder?: boolean }) {
  return <section className={cx("pb-5", !noBorder && "border-b border-[#E5E7EB]")}><h3 className="mb-4 text-[16px] font-bold text-[#111827] dark:text-white">{title}</h3>{children}</section>;
}

function InputField({ label, placeholder, suffix, icon: Icon, className, type = "text" }: { label: string; placeholder: string; suffix?: string; icon?: ElementType; className?: string; type?: string }) {
  return <label className={cx("block", className)}><span className="mb-2 block text-[13px] font-medium text-[#111827] dark:text-white">{label}</span><span className="relative block">{Icon && <Icon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#6366F1]" />}<input type={type} className={cx("h-11 w-full rounded-[12px] border border-[#E5E7EB] bg-white px-3 text-[14px] font-normal text-[#111827] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#6366F1] focus:ring-4 focus:ring-[#6366F1]/10 dark:border-[var(--border)] dark:bg-white/[0.04] dark:text-white", Icon && "pl-9", suffix && "pr-14")} placeholder={placeholder} />{suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] font-normal text-[#6B7280]">{suffix}</span>}</span></label>;
}

function SelectField({ label, value }: { label: string; value: string }) {
  return <label className="block"><span className="mb-2 block text-[13px] font-medium text-[#111827] dark:text-white">{label}</span><button type="button" className="flex h-11 w-full items-center justify-between rounded-[12px] border border-[#E5E7EB] bg-white px-3 text-[14px] font-normal text-[#111827] transition hover:border-[#D1D5DB] dark:border-[var(--border)] dark:bg-white/[0.04] dark:text-white">{value}<ChevronDown className="size-4 text-[#6B7280]" /></button></label>;
}