import React from 'react';

type LanguageCode = 'EN' | 'TH' | 'ZH';

interface AISalesUseCasesSectionProps {
  currentLang: LanguageCode;
}

const content = {
  EN: {
    title: 'เหตุผลที่ควรซื้อของมือสองกับเรา',
    subtitle:
      'PropPilot AI turns one property upload into sales-ready content, helping teams move faster while keeping every listing clear, consistent, and easy to publish.',
    cards: [
      {
        title: 'AI Property',
        image: 'https://i.pinimg.com/736x/92/a8/b1/92a8b138394907839c57bd0dce24da26.jpg',
      },
      {
        title: 'AI Sales Video',
        image: 'https://i.pinimg.com/736x/a2/7c/27/a27c273d4339f094cc7635dd6660f16d.jpg',
      },
      {
        title: 'Social Media Posts',
        image: 'https://i.pinimg.com/736x/a9/65/8f/a9658f9f27fd895d641590e330544c0d.jpg',
      },
      {
        title: 'SEO Landing Page',
        image: 'https://i.pinimg.com/1200x/25/4c/61/254c612423833c47810553ab4f227833.jpg',
      },
    ],
  },
  TH: {
    title: 'เหตุผลที่ควรซื้อของมือสองกับเรา',
    subtitle:
      'PropPilot AI เปลี่ยนข้อมูลบ้านหนึ่งครั้งให้เป็นคอนเทนต์พร้อมขาย ช่วยให้ทีมทำงานเร็วขึ้น สื่อสารชัดขึ้น และเผยแพร่ได้หลายช่องทางอย่างเป็นระบบ',
    cards: [
      {
        title: 'AI Property',
        image: 'https://i.pinimg.com/736x/92/a8/b1/92a8b138394907839c57bd0dce24da26.jpg',
      },
      {
        title: 'AI Sales Video',
        image: 'https://i.pinimg.com/736x/a2/7c/27/a27c273d4339f094cc7635dd6660f16d.jpg',
      },
      {
        title: 'Social Media Posts',
        image: 'https://i.pinimg.com/736x/a9/65/8f/a9658f9f27fd895d641590e330544c0d.jpg',
      },
      {
        title: 'SEO Landing Page',
        image: 'https://i.pinimg.com/1200x/25/4c/61/254c612423833c47810553ab4f227833.jpg',
      },
    ],
  },
  ZH: {
    title: 'เหตุผลที่ควรซื้อของมือสองกับเรา',
    subtitle:
      'PropPilot AI 将一次房源上传转化为可发布的销售内容，帮助团队更快完成文案、视频、社交贴文与落地页。',
    cards: [
      {
        title: 'AI Property',
        image: 'https://i.pinimg.com/736x/92/a8/b1/92a8b138394907839c57bd0dce24da26.jpg',
      },
      {
        title: 'AI Sales Video',
        image: 'https://i.pinimg.com/736x/a2/7c/27/a27c273d4339f094cc7635dd6660f16d.jpg',
      },
      {
        title: 'Social Media Posts',
        image: 'https://i.pinimg.com/736x/a9/65/8f/a9658f9f27fd895d641590e330544c0d.jpg',
      },
      {
        title: 'SEO Landing Page',
        image: 'https://i.pinimg.com/1200x/25/4c/61/254c612423833c47810553ab4f227833.jpg',
      },
    ],
  },
} satisfies Record<LanguageCode, {
  title: string;
  subtitle: string;
  cards: Array<{
    title: string;
    image: string;
  }>;
}>;

export default function AISalesUseCasesSection({ currentLang }: AISalesUseCasesSectionProps) {
  const section = content[currentLang];

  return (
    <section id="ai-sales" className="w-full bg-white py-16 md:py-20">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10 xl:px-[56px]">
        <div className="mx-auto max-w-[980px] text-center">
          <h2 className="text-[34px] font-extrabold leading-[1.12] tracking-[-0.8px] text-[#0F172A] md:text-[44px] lg:text-[52px]">
            {section.title}
          </h2>
          <p className="mx-auto mt-4 max-w-[940px] text-[16px] leading-[1.75] text-[#475569] md:text-[18px]">
            {section.subtitle}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {section.cards.map((card) => (
            <article
              key={card.title}
              className="group relative min-h-[380px] overflow-hidden rounded-[22px] bg-slate-100 shadow-[0_18px_44px_rgba(15,23,42,0.08)] md:min-h-[430px]"
            >
              <img
                src={card.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950/68 via-slate-950/14 to-slate-950/6" />
              <div className="relative z-10 p-6 md:p-7">
                <h3 className="max-w-[260px] text-[26px] font-extrabold leading-[1.12] tracking-[-0.4px] text-white md:text-[30px]">
                  {card.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
