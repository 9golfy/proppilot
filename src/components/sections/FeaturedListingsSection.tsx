import {
  Bookmark,
  ChevronDown,
  Filter,
  LayoutGrid,
  Search,
  Sparkles,
  Wand2,
} from 'lucide-react';

const tabs = [
  'Ad Library',
  'Brand Library',
  'My AI Generations',
  'Community AI Generations',
  'My Creatives',
];

const aiSalesCreatives = [
  {
    brand: 'PropPilot Studio',
    status: 'AI generated',
    title: 'AI Property',
    caption: 'Create listing visuals and property copy from one address.',
    image: 'https://i.pinimg.com/736x/53/94/52/539452351497a0ab871b6491ecbbf3ca.jpg',
    height: 'h-[440px]',
  },
  {
    brand: 'Listing Video Lab',
    status: 'Ready to publish',
    title: 'AI Sales Video',
    caption: 'Turn room photos into polished sales clips for every channel.',
    image: 'https://i.pinimg.com/736x/09/e2/ad/09e2ad1f48716bb9e5f359941e02e2f3.jpg',
    height: 'h-[560px]',
  },
  {
    brand: 'Agent Social Kit',
    status: 'Campaign draft',
    title: 'Social Media Posts',
    caption: 'Generate carousel posts, captions, and ad hooks in seconds.',
    image: 'https://i.pinimg.com/736x/c6/c0/09/c6c009b31ed165171c61a1964a7089bd.jpg',
    height: 'h-[390px]',
  },
  {
    brand: 'Landing Page AI',
    status: 'Published',
    title: 'SEO Landing Page',
    caption: 'Build area pages that match buyer intent and search demand.',
    image: 'https://i.pinimg.com/736x/f5/ca/50/f5ca50eeba2016425e42e082c4b74ab6.jpg',
    height: 'h-[510px]',
  },
  {
    brand: 'Open House Ads',
    status: 'Sponsored creative',
    title: 'Virtual Open House',
    caption: 'Create scroll-stopping ads from a property walkthrough.',
    image: 'https://i.pinimg.com/736x/80/9a/39/809a3964ec78d6df9dfc97a4a13f187a.jpg',
    height: 'h-[470px]',
  },
  {
    brand: 'Broker Growth',
    status: 'New template',
    title: 'Lead Capture Creative',
    caption: 'Collect buyer leads with concise visuals and clear CTA copy.',
    image: 'https://i.pinimg.com/736x/80/9a/39/809a3964ec78d6df9dfc97a4a13f187a.jpg',
    height: 'h-[420px]',
  },
  {
    brand: 'Market Update AI',
    status: 'Report creative',
    title: 'Neighborhood Insight',
    caption: 'Show pricing trends and local demand as shareable media.',
    image: 'https://i.pinimg.com/736x/45/16/06/451606a21ab06742766d285ee461567e.jpg',
    height: 'h-[535px]',
  },
  {
    brand: 'Short Form Studio',
    status: 'Video ad',
    title: 'Reels Campaign',
    caption: 'Convert highlights into short videos for Facebook and TikTok.',
    image: 'https://i.pinimg.com/736x/6a/a9/92/6aa992c10b243e1c2675cb8687ac3b1b.jpg',
    height: 'h-[405px]',
  },
];

export default function FeaturedListingsSection() {
  return (
    <section className="w-full bg-white py-16 md:py-20">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10 xl:px-[56px]">
        <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 inline-flex h-10 items-center gap-2 rounded-full border border-[#DDD8FF] bg-white px-4 text-[14px] font-bold text-[#6C63FF] shadow-[0_12px_34px_rgba(108,99,255,0.12)]">
              <Sparkles className="h-4 w-4" />
              AI Sales Library
            </div>
            <h2 className="max-w-[780px] text-[32px] font-extrabold leading-[1.15] tracking-[-0.5px] text-[#0F172A] md:text-[44px]">
              คลังภาพ AI Sales สำหรับงานขายอสังหา
            </h2>
            <p className="mt-4 max-w-[780px] text-[16px] leading-[1.8] text-[#64748B] md:text-[18px]">
              รวมตัวอย่างครีเอทีฟที่ AI ช่วยสร้างภาพ วิดีโอ โพสต์ และหน้า SEO เพื่อให้ทีมขายนำไปใช้ต่อยอดได้เร็วขึ้น
            </p>
          </div>

          <button className="inline-flex h-12 w-fit items-center justify-center gap-2 rounded-full border border-[#D7DEEA] bg-white px-5 text-[14px] font-bold text-[#0F172A] shadow-[0_12px_34px_rgba(15,23,42,0.08)] transition hover:border-[#6C63FF] hover:text-[#6C63FF]">
            <Wand2 className="h-4 w-4" />
            Generate new creative
          </button>
        </div>

        <div className="overflow-hidden rounded-[24px] border border-[#E2E8F0] bg-[#FBFCFF] shadow-[0_22px_70px_rgba(15,23,42,0.08)]">
          <div className="flex gap-1 overflow-x-auto border-b border-[#E2E8F0] px-3 py-2 sm:px-5">
            {tabs.map((tab, index) => (
              <button
                key={tab}
                className={`inline-flex h-11 shrink-0 items-center gap-2 rounded-full px-4 text-[14px] font-bold transition ${
                  index === 0
                    ? 'bg-[#F0EDFF] text-[#6C63FF]'
                    : 'text-[#475569] hover:bg-white hover:text-[#0F172A]'
                }`}
              >
                {index === 0 ? <Sparkles className="h-4 w-4" /> : index === 3 ? <LayoutGrid className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                {tab}
              </button>
            ))}
          </div>

          <div className="grid gap-3 border-b border-[#E2E8F0] bg-white p-4 lg:grid-cols-[1fr_auto_auto]">
            <label className="flex h-12 min-w-0 items-center gap-3 rounded-xl border border-[#D7DEEA] bg-white px-4 text-[#64748B] shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
              <Search className="h-5 w-5 shrink-0" />
              <input
                className="min-w-0 flex-1 bg-transparent text-[15px] font-semibold text-[#0F172A] outline-none placeholder:text-[#94A3B8]"
                placeholder="ค้นหา AI Sales เช่น condo, villa, campaign"
              />
            </label>
            <button className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#D7DEEA] bg-white px-4 text-[14px] font-bold text-[#475569] transition hover:border-[#6C63FF] hover:text-[#6C63FF]">
              Newest first
              <ChevronDown className="h-4 w-4" />
            </button>
            <button className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#C8C1FF] bg-[#F7F5FF] px-5 text-[14px] font-bold text-[#6C63FF] transition hover:bg-[#F0EDFF]">
              <Filter className="h-4 w-4" />
              Filter
            </button>
          </div>

          <div className="grid gap-5 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-3 xl:grid-cols-4">
            {aiSalesCreatives.map((creative) => (
              <article
                key={`${creative.brand}-${creative.title}`}
                className="flex h-full flex-col overflow-hidden rounded-[22px] border border-[#E2E8F0] bg-white shadow-[0_18px_48px_rgba(15,23,42,0.09)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(15,23,42,0.13)]"
              >
                <div className="relative aspect-[9/16] w-full overflow-hidden bg-slate-100">
                  <img
                    src={creative.image}
                    alt={creative.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <button className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/92 text-[#6C63FF] shadow-[0_12px_30px_rgba(15,23,42,0.18)] backdrop-blur-md transition hover:bg-white hover:scale-105">
                    <Bookmark className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-3 min-w-0">
                    <p className="truncate text-[13px] font-bold text-[#6C63FF]">{creative.brand}</p>
                    <p className="truncate text-[12px] font-semibold text-[#94A3B8]">{creative.status}</p>
                  </div>

                  <h3 className="text-[24px] font-extrabold leading-[1.15] tracking-[-0.25px] text-[#0F172A]">
                    {creative.title}
                  </h3>
                  <p className="mt-2 min-h-[70px] text-[14px] font-semibold leading-[1.65] text-[#64748B]">
                    {creative.caption}
                  </p>

                  <button className="mt-auto inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7B61FF] to-[#5B6CFF] px-4 text-[14px] font-extrabold text-white shadow-[0_14px_30px_rgba(108,99,255,0.24)] transition hover:translate-y-[-1px] hover:shadow-[0_18px_36px_rgba(108,99,255,0.30)]">
                    <Sparkles className="h-4 w-4" />
                    Use this Avatar
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}



