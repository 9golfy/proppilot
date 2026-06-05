'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bell,
  Bot,
  CheckCircle2,
  CreditCard,
  Folder,
  Home,
  ImageIcon,
  Library,
  LogOut,
  Mic2,
  PlayCircle,
  Search,
  Settings,
  Sparkles,
  TrendingUp,
  UserRound,
  Video,
  Wand2,
} from 'lucide-react';
import type { ElementType } from 'react';

import ThemeToggle from '@/components/common/ThemeToggle';

type MenuItem = {
  label: string;
  href: string;
  icon: ElementType;
  badge?: string;
};

const primaryMenu: MenuItem[] = [
  { label: 'Create with AI', href: '/sell', icon: Sparkles },
  { label: 'Explore', href: '/explore', icon: Search },
  { label: 'My VDO', href: '/my/vdo', icon: Folder },
];

const aiToolsMenu: MenuItem[] = [
  { label: 'Home', href: '/dashboard', icon: Home },
  { label: 'AI Video Agent', href: '/ai/vdo/agent', icon: Bot },
  { label: 'AI Video Avatar', href: '/ai/vdo/avartar', icon: Video },
  { label: 'AI Voice', href: '/ai/voice', icon: Mic2 },
  { label: 'My Library', href: '/ai/library', icon: Library },
];

const memberMenu: MenuItem[] = [
  { label: 'Settings', href: '/settings', icon: Settings },
  { label: 'Log out', href: '/logout', icon: LogOut },
];

const workflowSlides = [
  {
    title: 'Plan, publish, and reuse assets',
    description: 'Manage AI videos, landing pages, captions, and saved creatives in a focused real-estate workflow.',
    cta: 'Browse library',
    image: 'https://i.pinimg.com/736x/c6/c0/09/c6c009b31ed165171c61a1964a7089bd.jpg',
  },
  {
    title: 'Create property video ads in minutes',
    description: 'Turn listing photos, buyer persona, and channel goals into polished AI sales assets from one dashboard.',
    cta: 'Start creating',
    image: 'https://i.pinimg.com/736x/09/e2/ad/09e2ad1f48716bb9e5f359941e02e2f3.jpg',
  },
  {
    title: 'Launch reusable AI presenters',
    description: 'Keep your brand voice, avatar style, and campaign visuals consistent across every property listing.',
    cta: 'Open avatar studio',
    image: 'https://i.pinimg.com/736x/45/16/06/451606a21ab06742766d285ee461567e.jpg',
  },
];

const statCards = [
  { label: 'Videos created', value: '24', delta: '+12%', icon: Video },
  { label: 'Avatars used', value: '8', delta: '+4%', icon: UserRound },
  { label: 'Assets saved', value: '146', delta: '+31%', icon: Library },
];

const quickActions = [
  { label: 'New AI video', href: '/ai/vdo/agent', icon: Bot },
  { label: 'Create avatar', href: '/ai/vdo/avartar', icon: Video },
  { label: 'Clone voice', href: '/ai/voice', icon: Mic2 },
  { label: 'Browse library', href: '/ai/library', icon: Library },
];

const inspirationCards = [
  { label: 'Listing teaser', image: 'https://i.pinimg.com/736x/f5/ca/50/f5ca50eeba2016425e42e082c4b74ab6.jpg' },
  { label: 'Avatar promo', image: 'https://i.pinimg.com/736x/c6/c0/09/c6c009b31ed165171c61a1964a7089bd.jpg' },
  { label: 'Product demo', image: 'https://i.pinimg.com/736x/80/9a/39/809a3964ec78d6df9dfc97a4a13f187a.jpg' },
  { label: 'Social clip', image: 'https://i.pinimg.com/736x/6a/a9/92/6aa992c10b243e1c2675cb8687ac3b1b.jpg' },
];

function SidebarMenu({ title, items }: { title?: string; items: MenuItem[] }) {
  const pathname = usePathname();

  return (
    <div className="space-y-1">
      {title && (
        <div className="px-3 pb-2 pt-8 text-[11px] font-medium uppercase tracking-[0.18em] text-[#9CA3AF]">
          {title}
        </div>
      )}
      {items.map((item) => {
        const Icon = item.icon;
        const isCreate = item.label === 'Create with AI';
        const isActive = pathname === item.href && !isCreate;

        return (
          <Link
            key={item.label}
            href={item.href}
            className={`theme-focus flex h-10 w-full items-center gap-3 rounded-[10px] px-3 text-left text-[14px] font-medium transition ${
              isCreate
                ? 'mb-5 bg-[#6366F1] text-white hover:bg-[#5558E8]'
                : isActive
                  ? 'border-l-[3px] border-[#6366F1] bg-[#F5F7FA] pl-[9px] text-[#111827] dark:bg-white/[0.08] dark:text-white'
                  : 'text-[#6B7280] hover:bg-[#F5F7FA] hover:text-[#111827] dark:text-slate-400 dark:hover:bg-white/[0.06] dark:hover:text-white'
            }`}
          >
            <Icon className={`h-[18px] w-[18px] shrink-0 ${isActive ? 'text-[#6366F1]' : isCreate ? 'text-white' : 'text-current'}`} />
            <span className="truncate">{item.label}</span>
            {item.badge && <span className="ml-auto rounded-full bg-[#EEF2FF] px-2 py-0.5 text-[10px] text-[#6366F1]">{item.badge}</span>}
          </Link>
        );
      })}
    </div>
  );
}

function Surface({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[20px] border border-[#E5E7EB] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] dark:border-[var(--border)] dark:bg-[var(--card)] ${className}`}>
      {children}
    </div>
  );
}

export default function AIVideoPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFB] text-[#0F172A] selection:bg-[#6366F1]/20 selection:text-[#0F172A] dark:bg-[var(--background)] dark:text-[var(--foreground)]">
      <style>{`
        @keyframes workflowSlide {
          0%, 30% { opacity: 1; }
          35%, 95% { opacity: 0; }
          100% { opacity: 1; }
        }
        .workflow-slide:nth-child(1) { animation-delay: 0s; }
        .workflow-slide:nth-child(2) { animation-delay: 5s; }
        .workflow-slide:nth-child(3) { animation-delay: 10s; }
      `}</style>

      <div className="flex min-h-screen bg-[#FAFAFB] dark:bg-[var(--background)]">
        <aside className="hidden w-[280px] shrink-0 border-r border-[#E5E7EB] bg-white px-4 py-6 lg:flex lg:flex-col dark:border-[var(--border)] dark:bg-[var(--card)]">
          <Link href="/dashboard" className="flex items-center gap-3 px-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#6366F1] text-white">
              <Home className="h-[18px] w-[18px]" />
            </div>
            <span className="text-[20px] font-bold tracking-[-0.3px] text-[#111827] dark:text-white">PropPilot AI</span>
          </Link>

          <nav className="mt-8 flex-1 overflow-y-auto pr-1">
            <SidebarMenu items={primaryMenu} />
            <SidebarMenu title="AI tools" items={aiToolsMenu} />
            <SidebarMenu title="Member" items={memberMenu} />
          </nav>

          <div className="mt-6 flex items-center gap-3 border-t border-[#E5E7EB] px-2 pt-5 dark:border-[var(--border)]">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F5F7FA] text-[13px] font-medium text-[#374151] dark:bg-white/[0.08] dark:text-white">N</div>
            <div className="min-w-0">
              <p className="truncate text-[13px] font-medium text-[#111827] dark:text-white">Nattapong S.</p>
              <p className="text-[12px] font-normal text-[#6B7280]">Free Plan</p>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-40 border-b border-[#E5E7EB] bg-white/92 px-4 py-3 backdrop-blur-sm sm:px-6 lg:px-8 dark:border-[var(--border)] dark:bg-[var(--card)]/92">
            <div className="mx-auto flex max-w-[1480px] items-center justify-between gap-5">
              <Link href="/dashboard" className="flex items-center gap-3 lg:hidden">
                <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#6366F1] text-white">
                  <Home className="h-[18px] w-[18px]" />
                </div>
                <span className="text-[19px] font-semibold">PropPilot AI</span>
              </Link>

              <label className="hidden h-[52px] min-w-[280px] max-w-[620px] flex-1 items-center gap-3 rounded-[16px] border border-[#E5E7EB] bg-white px-4 text-[#64748B] shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition focus-within:border-[#6366F1] focus-within:ring-3 focus-within:ring-[#6366F1]/10 md:flex dark:border-[var(--border)] dark:bg-white/[0.04]">
                <Search className="h-5 w-5 text-[#64748B]" />
                <input className="min-w-0 flex-1 bg-transparent text-[14px] font-normal text-[#111827] outline-none placeholder:text-[#94A3B8] dark:text-white" placeholder="Search videos, avatars, assets" />
              </label>

              <div className="ml-auto flex items-center gap-3">
                <Link href="/dashboard" className="hidden h-10 items-center gap-2 rounded-[12px] px-3 text-[13px] font-medium text-[#111827] transition hover:bg-[#F5F7FA] xl:inline-flex dark:text-white dark:hover:bg-white/[0.06]">
                  Try PropPilot 2.0
                  <span className="rounded-full bg-[#EEF2FF] px-2 py-0.5 text-[11px] font-medium text-[#6366F1]">New</span>
                </Link>
                <ThemeToggle />
                <div className="flex h-10 items-center gap-2 rounded-[12px] border border-[#E5E7EB] bg-white px-3 text-[14px] font-medium text-[#111827] shadow-[0_1px_2px_rgba(0,0,0,0.04)] dark:border-[var(--border)] dark:bg-white/[0.04] dark:text-white">
                  <CreditCard className="h-4 w-4 text-[#6366F1]" />
                  <span>20</span>
                  <span className="h-4 w-px bg-[#E5E7EB]" />
                  <span className="text-[#475569] dark:text-slate-300">Free Trial</span>
                </div>
                <button className="theme-focus flex h-10 w-10 items-center justify-center rounded-[12px] border border-[#E5E7EB] bg-white text-[#64748B] shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition hover:text-[#111827] dark:border-[var(--border)] dark:bg-white/[0.04]" aria-label="Notifications">
                  <Bell className="h-4 w-4" />
                </button>
                <button className="theme-focus flex h-10 w-10 items-center justify-center rounded-full bg-[#6366F1] text-[14px] font-medium text-white" aria-label="User profile">
                  9
                </button>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-[1480px] px-4 py-2 sm:px-6 lg:px-8">
            <section className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
              <Surface className="overflow-hidden p-0">
                <div className="relative min-h-[360px]">
                  {workflowSlides.map((slide) => (
                    <div key={slide.title} className="workflow-slide absolute inset-0 grid opacity-0 [animation:workflowSlide_15s_infinite] md:grid-cols-[45%_55%]">
                      <div className="min-h-[320px] overflow-hidden bg-[#F5F7FA] md:min-h-[360px]">
                        <img src={slide.image} alt="" className="h-full w-full object-cover object-top" loading="lazy" />
                      </div>
                      <div className="flex min-h-[320px] flex-col justify-center p-8 md:min-h-[360px] lg:p-10">
                        <p className="mb-4 text-[13px] font-medium text-[#6366F1]">Featured workflow</p>
                        <h2 className="max-w-[560px] text-[36px] font-bold leading-[1.12] tracking-[-0.6px] text-[#111827] lg:text-[44px] dark:text-white">{slide.title}</h2>
                        <p className="mt-5 max-w-[520px] text-[16px] font-normal leading-[1.7] text-[#334155] dark:text-slate-300">{slide.description}</p>
                        <div className="mt-7 flex items-center gap-3">
                          <button className="h-11 rounded-[12px] bg-[#6366F1] px-5 text-[14px] font-medium text-white transition hover:bg-[#5558E8] active:scale-[0.98]">
                            {slide.cta}
                          </button>
                          <button className="h-11 rounded-[12px] border border-[#E5E7EB] bg-white px-5 text-[14px] font-medium text-[#111827] transition hover:bg-[#F5F7FA] dark:border-[var(--border)] dark:bg-white/[0.04] dark:text-white">
                            View workflow
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Surface>

              <Surface className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-[#64748B]">Quick start</p>
                    <h2 className="mt-2 text-[22px] font-bold tracking-[-0.2px] text-[#111827] dark:text-white">Create faster</h2>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-[#22C55E]" />
                </div>
                <div className="mt-6 grid gap-3">
                  {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <Link key={action.label} href={action.href} className="theme-focus flex h-[52px] items-center gap-3 rounded-[12px] border border-[#E5E7EB] bg-white px-4 text-[14px] font-medium text-[#334155] transition hover:border-[#D1D5DB] hover:bg-[#F9FAFB] hover:text-[#111827] dark:border-[var(--border)] dark:bg-white/[0.04] dark:text-slate-200">
                        <Icon className="h-5 w-5 text-[#64748B]" />
                        {action.label}
                      </Link>
                    );
                  })}
                </div>
              </Surface>
            </section>

            <section className="mt-10">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-[#64748B]">Creative gallery</p>
                  
                </div>
                <Link href="/explore" className="hidden h-10 rounded-[12px] border border-[#E5E7EB] bg-white px-4 text-[14px] font-medium text-[#111827] transition hover:bg-[#F5F7FA] sm:inline-flex sm:items-center dark:border-[var(--border)] dark:bg-white/[0.04] dark:text-white">
                  Browse all
                </Link>
              </div>
              <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {inspirationCards.map((card) => (
                  <article key={card.label} className="group overflow-hidden rounded-[18px] border border-[#E5E7EB] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition hover:border-[#D1D5DB] dark:border-[var(--border)] dark:bg-[var(--card)]">
                    <div className="relative h-[164px] overflow-hidden bg-[#F5F7FA] xl:h-[180px]">
                      <img src={card.image} alt="" className="h-full w-full object-cover object-top transition duration-300 group-hover:scale-[1.02]" loading="lazy" />
                      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
                      <span className="absolute bottom-4 left-4 text-[15px] font-medium text-white">{card.label}</span>
                      <PlayCircle className="absolute bottom-4 right-4 h-6 w-6 text-white" />
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
