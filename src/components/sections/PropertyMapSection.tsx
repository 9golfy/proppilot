import {
  Bath,
  BedDouble,
  Building2,
  Check,
  ChevronDown,
  Heart,
  MapPin,
  Maximize2,
  Search,
} from 'lucide-react';

type LanguageCode = 'EN' | 'TH' | 'ZH';

interface PropertyMapSectionProps {
  currentLang: LanguageCode;
}

const copy = {
  EN: {
    badge: 'Bangkok property intelligence',
    title: 'Map of properties posted for sale in this area',
    subtitle: 'Compare asking prices, locations, and listing details from the same area so your team can evaluate the market with more confidence.',
    searchPlaceholder: 'Search',
    saleType: 'For Sale',
    price: 'Price',
    bedBaths: 'Bed & Baths',
    homeType: 'Home Type',
    more: 'More',
    saveSearch: 'Save Search',
    mapTitle: 'Google MAP',
    redoSearch: 'Redo search when map is moved',
    breadcrumb: 'Home / Properties / Bangkok',
    listingsTitle: 'Available properties near you',
    listingsCount: '2,648 listings posted in this area',
    sortBy: 'Sort by',
    recommended: 'Recommended',
    forSale: 'for sale',
  },
  TH: {
    badge: 'Bangkok property intelligence',
    title: 'แผนที่อสังหาที่โพสต์ขายในบริเวณนั้นๆ',
    subtitle: 'ดูราคาประกาศขาย ทำเล และรายละเอียดบ้านจากพื้นที่เดียวกัน เพื่อช่วยให้ทีมขายประเมินตลาดและสร้างคอนเทนต์ได้แม่นยำขึ้น',
    searchPlaceholder: 'ค้นหา',
    saleType: 'ขาย',
    price: 'ราคา',
    bedBaths: 'ห้องนอน/ห้องน้ำ',
    homeType: 'ประเภทอสังหาฯ',
    more: 'เพิ่มเติม',
    saveSearch: 'บันทึกการค้นหา',
    mapTitle: 'Google MAP',
    redoSearch: 'ค้นหาใหม่เมื่อเลื่อนแผนที่',
    breadcrumb: 'หน้าหลัก / อสังหา / กรุงเทพฯ',
    listingsTitle: 'ประกาศอสังหาใกล้คุณ',
    listingsCount: '2,648 ประกาศในบริเวณนี้',
    sortBy: 'เรียงตาม',
    recommended: 'แนะนำ',
    forSale: 'ขาย',
  },
  ZH: {
    badge: 'Bangkok property intelligence',
    title: '该区域正在出售的房源地图',
    subtitle: '比较同一区域的挂牌价格、位置与房源细节，帮助销售团队更准确地评估市场并创建内容。',
    searchPlaceholder: '搜索',
    saleType: '出售',
    price: '价格',
    bedBaths: '卧室/浴室',
    homeType: '房源类型',
    more: '更多',
    saveSearch: '保存搜索',
    mapTitle: 'Google MAP',
    redoSearch: '移动地图时重新搜索',
    breadcrumb: '首页 / 房源 / 曼谷',
    listingsTitle: '附近可售房源',
    listingsCount: '该区域共有 2,648 个房源',
    sortBy: '排序',
    recommended: '推荐',
    forSale: '出售',
  },
} satisfies Record<LanguageCode, Record<string, string>>;

const listings = [
  {
    type: 'CONDO',
    status: 'New',
    price: '฿4.08M',
    title: 'Amber Sukhumvit Residence',
    address: 'Sukhumvit 39, Bangkok',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=82',
    beds: 2,
    baths: 2,
    size: '68 sqm',
  },
  {
    type: 'HOUSE',
    status: 'Ready',
    price: '฿6.45M',
    title: 'North Park Private Home',
    address: 'Ladprao 71, Bangkok',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=82',
    beds: 4,
    baths: 3,
    size: '210 sqm',
  },
  {
    type: 'TOWNHOME',
    status: 'Deal',
    price: '฿3.72M',
    title: 'Metro Garden Townhome',
    address: 'Ratchada, Bangkok',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=82',
    beds: 3,
    baths: 2,
    size: '150 sqm',
  },
  {
    type: 'VILLA',
    status: 'Featured',
    price: '฿12.9M',
    title: 'Riverbend Pool Villa',
    address: 'Bangna-Trad, Bangkok',
    image: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=82',
    beds: 5,
    baths: 5,
    size: '420 sqm',
  },
  {
    type: 'CONDO',
    status: 'Transit',
    price: '฿5.24M',
    title: 'Noble Urban View',
    address: 'Ari, Bangkok',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=82',
    beds: 2,
    baths: 1,
    size: '54 sqm',
  },
  {
    type: 'HOUSE',
    status: 'Hot',
    price: '฿4.72M',
    title: 'Garden Courtyard Home',
    address: 'Ramintra, Bangkok',
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=900&q=82',
    beds: 3,
    baths: 2,
    size: '185 sqm',
  },
];

const mapPins = [
  { top: '28%', left: '18%', price: '฿6.45M' },
  { top: '42%', left: '40%', price: '฿3.72M' },
  { top: '30%', left: '66%', price: '฿4.08M', active: true },
  { top: '61%', left: '23%', price: '฿5.24M' },
  { top: '69%', left: '52%', price: '฿12.9M' },
  { top: '56%', left: '78%', price: '฿4.72M' },
];

export default function PropertyMapSection({ currentLang }: PropertyMapSectionProps) {
  const t = copy[currentLang];
  const criteria = [t.saleType, t.price, t.bedBaths, t.homeType, t.more];

  return (
    <section id="property-map" className="w-full bg-[#F8FAFC] py-16 md:py-20">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10 xl:px-[56px]">
        <div className="mb-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#6C63FF]/15 bg-white px-4 py-2.5 text-[13px] font-bold text-[#6C63FF] shadow-[0_10px_30px_rgba(108,99,255,0.10)]">
            <MapPin className="h-4 w-4" />
            {t.badge}
          </div>
          <h2 className="mt-5 max-w-[900px] text-[34px] font-extrabold leading-[1.12] tracking-[-0.8px] text-[#0F172A] md:text-[48px]">
            {t.title}
          </h2>
          <p className="mt-4 max-w-[900px] text-[16px] leading-[1.75] text-[#64748B] md:text-[18px]">
            {t.subtitle}
          </p>
        </div>

        <div className="mb-5 overflow-hidden rounded-[16px] border border-[#E2E8F0] bg-white p-2 shadow-[0_12px_36px_rgba(15,23,42,0.06)]">
          <div className="flex w-full items-center gap-2 overflow-x-auto pb-0.5">
            <label className="flex h-11 min-w-[280px] flex-[1_0_320px] items-center gap-2.5 rounded-[10px] border border-[#E2E8F0] bg-white px-3 transition focus-within:border-[#6C63FF] focus-within:ring-4 focus-within:ring-[#6C63FF]/10">
              <Search className="h-4.5 w-4.5 shrink-0 text-[#94A3B8]" />
              <input
                className="min-w-0 flex-1 bg-transparent text-[14px] font-semibold text-[#0F172A] outline-none placeholder:text-[#94A3B8]"
                placeholder={t.searchPlaceholder}
                aria-label={t.searchPlaceholder}
              />
            </label>

            {criteria.map((label) => (
              <button
                key={label}
                className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-[10px] border border-[#E2E8F0] bg-white px-3.5 text-[14px] font-semibold text-[#475569] transition hover:border-[#6C63FF]/45 hover:bg-[#F8F7FF] hover:text-[#6C63FF]"
              >
                <span className="whitespace-nowrap">{label}</span>
                <ChevronDown className="h-3.5 w-3.5 shrink-0 text-[#94A3B8]" />
              </button>
            ))}

            <button className="h-11 shrink-0 rounded-[10px] bg-[#6C63FF] px-5 text-[14px] font-bold text-white shadow-[0_10px_24px_rgba(108,99,255,0.18)] transition hover:bg-[#5B50F0]">
              {t.saveSearch}
            </button>
          </div>
        </div>

        <div className="relative min-h-[360px] overflow-hidden rounded-[24px] border border-[#E2E8F0] bg-[#E5E7EB] shadow-[0_22px_70px_rgba(15,23,42,0.10)] md:min-h-[430px]">
          <div className="absolute left-5 top-5 z-20 text-[22px] font-semibold text-[#0F172A] md:text-[28px]">{t.mapTitle}</div>
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[#E5E7EB]" />
            <div className="absolute inset-0 opacity-80 bg-[linear-gradient(90deg,rgba(148,163,184,0.35)_1px,transparent_1px),linear-gradient(0deg,rgba(148,163,184,0.32)_1px,transparent_1px)] bg-[size:76px_76px]" />
            <div className="absolute -left-[8%] top-[24%] h-12 w-[116%] rotate-[16deg] rounded-full bg-white/80 shadow-[0_0_0_1px_rgba(203,213,225,0.8)]" />
            <div className="absolute left-[16%] -top-[22%] h-[150%] w-12 rotate-[-24deg] rounded-full bg-white/85 shadow-[0_0_0_1px_rgba(203,213,225,0.8)]" />
            <div className="absolute left-[58%] -top-[22%] h-[150%] w-12 rotate-[20deg] rounded-full bg-white/75 shadow-[0_0_0_1px_rgba(203,213,225,0.8)]" />
          </div>

          <button className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#0F172A] shadow-[0_12px_30px_rgba(15,23,42,0.14)]" aria-label="Expand map">
            <Maximize2 className="h-4.5 w-4.5" />
          </button>

          <button className="absolute left-1/2 top-5 z-20 hidden -translate-x-1/2 items-center gap-2 rounded-full bg-white/94 px-4 py-2 text-[13px] font-bold text-[#0F172A] shadow-[0_14px_34px_rgba(15,23,42,0.12)] md:inline-flex">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#6C63FF] text-white">
              <Check className="h-3.5 w-3.5" />
            </span>
            {t.redoSearch}
          </button>

          {mapPins.map((pin) => (
            <div key={`${pin.top}-${pin.left}`} className="absolute z-20 -translate-x-1/2 -translate-y-1/2" style={{ top: pin.top, left: pin.left }}>
              <div className={`mb-2 rounded-full px-3 py-1.5 text-[12px] font-extrabold shadow-[0_10px_24px_rgba(15,23,42,0.12)] ${pin.active ? 'bg-[#6C63FF] text-white' : 'bg-white text-[#334155]'}`}>
                {pin.price}
              </div>
              <MapPin className={`mx-auto h-8 w-8 drop-shadow-md ${pin.active ? 'fill-[#6C63FF] text-[#6C63FF]' : 'fill-white text-[#0F172A]'}`} />
            </div>
          ))}

          <div className="absolute right-[10%] top-[18%] z-30 hidden w-[260px] overflow-hidden rounded-[10px] bg-white shadow-[0_18px_46px_rgba(15,23,42,0.20)] md:block">
            <img src={listings[0].image} alt="" className="h-[118px] w-full object-cover" loading="lazy" />
            <div className="p-4">
              <div className="text-[18px] font-extrabold text-[#0F172A]">{listings[0].title}</div>
              <div className="mt-1 text-[13px] text-[#64748B]">{listings[0].address}</div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[13px] font-semibold text-[#94A3B8]">{t.breadcrumb}</div>
              <h3 className="mt-1 text-[26px] font-extrabold tracking-[-0.4px] text-[#0F172A]">{t.listingsTitle}</h3>
              <div className="mt-1 text-[14px] font-medium text-[#64748B]">{t.listingsCount}</div>
            </div>
            <button className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#E2E8F0] bg-white px-3 text-[13px] font-bold text-[#475569] shadow-sm">
              {t.sortBy}: <span className="text-[#6C63FF]">{t.recommended}</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {listings.map((listing) => (
              <article key={listing.title} className="overflow-hidden rounded-[12px] border border-[#E2E8F0] bg-white shadow-[0_12px_34px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(15,23,42,0.10)]">
                <div className="relative aspect-[1.35] bg-slate-100">
                  <img src={listing.image} alt="" className="h-full w-full object-cover" loading="lazy" />
                  <div className="absolute left-3 top-3 flex gap-2">
                    <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-extrabold text-[#0F172A]">{listing.type}</span>
                    <span className="rounded-full bg-[#F3F1FF]/95 px-2.5 py-1 text-[10px] font-extrabold text-[#6C63FF]">{listing.status}</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-[22px] font-extrabold tracking-[-0.3px] text-[#6C63FF]">
                        {listing.price}
                        <span className="ml-1 text-[12px] font-semibold text-[#94A3B8]">{t.forSale}</span>
                      </div>
                      <h4 className="mt-2 text-[18px] font-extrabold leading-tight text-[#0F172A]">{listing.title}</h4>
                      <div className="mt-1 text-[13px] font-medium text-[#64748B]">{listing.address}</div>
                    </div>
                    <button className="rounded-full p-2 text-[#64748B] transition hover:bg-[#F3F1FF] hover:text-[#6C63FF]" aria-label="Save listing">
                      <Heart className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3 text-[12px] font-bold text-[#475569]">
                    <span className="inline-flex items-center gap-1.5">
                      <BedDouble className="h-4 w-4 text-[#6C63FF]" />
                      {listing.beds} bd.
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Bath className="h-4 w-4 text-[#6C63FF]" />
                      {listing.baths} ba.
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Building2 className="h-4 w-4 text-[#6C63FF]" />
                      {listing.size}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
