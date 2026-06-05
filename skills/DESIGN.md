# PropPilot AI Design System

This file is the source of truth for UI work in `D:\MyProjects\PropPilot.ai`. Before changing or adding pages, follow this guide so the app stays visually consistent with the homepage at `http://localhost:3000/`.

## Brand Direction

PropPilot AI is a premium, clean, modern SaaS product for real-estate AI sales workflows. The interface should feel bright, confident, polished, and easy to scan. Avoid heavy cyberpunk, gaming, neon, or unrelated dark-product aesthetics unless the page is explicitly an AI Studio workspace and still uses the same PropPilot tokens.

Core visual language:

- Soft white SaaS surfaces
- Violet to indigo primary gradient
- Rounded cards and buttons
- Subtle glass/blur only where it improves hierarchy
- Real estate imagery and AI production visuals
- Clear typography with generous line-height
- Lightweight borders and soft shadows

## Theme Tokens

Use existing CSS variables from `src/index.css` whenever possible:

```css
--background: #f8fafc;
--foreground: #0f172a;
--primary: #6c63ff;
--secondary: #f0edff;
--secondary-foreground: #4f46e5;
--accent: #00c78a;
--muted: #f1f5f9;
--muted-foreground: #64748b;
--border: #e2e8f0;
--card: #ffffff;
--input: #ffffff;
--radius: 18px;
```

Approved brand gradients:

```tsx
bg-gradient-to-r from-[#7B61FF] to-[#5B6CFF]
bg-gradient-to-r from-[#6C63FF] to-[#8B7BFF]
```

Use direct hex values only when matching the homepage or when a token is not practical. Prefer `var(--primary)`, `var(--card)`, `var(--border)`, and `var(--muted-foreground)` for reusable components.

## Typography

Primary font: Inter via Tailwind `font-sans`.

Homepage type scale:

- Navbar menu: `text-[14px] font-bold`
- Navbar logo: `text-[19px] font-black tracking-tight`
- Hero heading desktop: `text-[58px] xl:text-[64px] leading-[1.08] font-extrabold tracking-[-1.8px]`
- Hero heading tablet: `text-[42px] leading-[1.1]`
- Hero heading mobile: `text-[34px] leading-[1.08]`
- Hero body: `text-[15px] sm:text-[16px] lg:text-[18px] leading-[1.7] text-[#64748B]`
- Section heading: `text-[34px] md:text-[44px] lg:text-[52px] leading-[1.12] font-extrabold tracking-[-0.8px]`
- Body copy: `text-[16px] md:text-[18px] leading-[1.75]`

Do not use oversized dashboard fonts that compete with the homepage hero. Keep dashboard headings more compact unless the section is a true hero.

## Layout System

Use a centered content container matching the homepage:

```tsx
max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-10 xl:px-[56px]
```

Main spacing rhythm:

- Navbar height: `h-[72px]`
- Homepage hero vertical padding: `py-14 md:py-16 lg:py-[72px]`
- Standard sections: `py-16 md:py-20`
- Card gaps: `gap-5` for content grids, `gap-3` for tight controls
- Avoid nested scroll containers unless a dashboard panel explicitly needs one
- Avoid horizontal scroll except for compact filter rows on mobile/tablet

## Navbar Pattern

Use `src/components/layout/Navbar.tsx` as the canonical pattern.

Required behavior:

- Sticky top navigation with `h-[72px]`
- Background: `bg-[var(--card)]/90 backdrop-blur-xl`
- Border: `border-b border-[var(--border)]`
- Logo left, menu centered, actions right
- Menu spacing: `gap-7 lg:flex xl:gap-9`
- Menu text: `text-[14px] font-bold`, no wrapping
- Language switcher: compact pill with border, `text-[13px] font-bold`
- Primary CTA: violet/indigo gradient, rounded `12px`, `text-[13px] font-black`
- Mobile: hide center menu, use hamburger and stacked menu panel

Submenus should use:

```tsx
rounded-[18px] border border-[var(--border)] bg-[var(--card)]/96 p-2 shadow-[var(--shadow-card)] backdrop-blur-xl
```

Do not make navbar items large, boxed, or crowded. Active and hover states should rely on color and soft secondary backgrounds.

## Homepage Hero Pattern

Use `src/app/App.tsx` as the canonical hero.

Structure:

- Full-width `main` with `relative overflow-hidden bg-[var(--card)]`
- Background video/photo at 100% opacity when used as a hero visual
- Desktop overlay gradient from white to transparent:

```tsx
linear-gradient(90deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.96) 40%, rgba(255,255,255,0.58) 58%, rgba(255,255,255,0.00) 78%, rgba(255,255,255,0.00) 100%)
```

- Mobile overlay: vertical white gradient for legibility
- Content grid: `lg:grid-cols-[minmax(0,55%)_minmax(420px,45%)]`
- Left content max width: `max-w-[720px]`
- Text width: paragraph `max-w-[560px]`
- Keep presenter/visual clear; do not place feature cards over faces or important body areas

Hero badge:

```tsx
inline-flex min-h-9 px-3.5 rounded-full bg-[#F3F1FF]/90 text-[#6C63FF] border border-[#6C63FF]/10 shadow-[0_10px_30px_rgba(108,99,255,0.08)]
```

Primary CTA:

```tsx
h-[50px] min-w-[214px] rounded-xl bg-gradient-to-r from-[#7B61FF] to-[#5B6CFF] text-white font-bold text-[14px]
```

Secondary CTA:

```tsx
h-[50px] min-w-[154px] rounded-xl bg-white/92 border border-[#E2E8F0] text-[#0F172A] font-bold text-[14px]
```

## Cards And Surfaces

Card style should be soft and bright:

- Base card: `bg-white border border-[#E2E8F0] shadow-[0_18px_48px_rgba(15,23,42,0.09)]`
- Larger containers: `rounded-[24px] border border-[#E2E8F0] bg-[#FBFCFF] shadow-[0_22px_70px_rgba(15,23,42,0.08)]`
- Repeated item cards: radius `12px` to `22px`
- Hero/feature image cards: radius around `22px`
- Do not nest cards inside decorative cards unless the inner element is a true repeated item or control surface

Image card overlay pattern:

```tsx
absolute inset-0 bg-gradient-to-b from-slate-950/68 via-slate-950/14 to-slate-950/6
```

Image rules:

- Use `object-cover`; use `object-top` for people/avatar images so heads are not cropped
- Reserve dimensions with `aspect-ratio`, fixed heights, or min-heights to avoid layout shift
- Avoid low-opacity presenter images unless intentionally in the background. Primary presenter visuals should remain clear.

## Dashboard / AI Studio Pages

Dashboard pages such as `/ai/video` may use a left sidebar, but they must still feel like PropPilot.

Sidebar rules:

- Use `var(--card)`, `var(--secondary)`, `var(--primary)`, and `var(--border)`
- Do not box every normal menu item
- Normal menu item: icon + text, muted color, soft hover background
- Active menu item: secondary background plus primary accent indicator or primary-colored icon/text
- Top creation action should be a prominent filled primary CTA, not just a stroked button
- Sidebar width should stay around `280px-292px` on desktop
- Use compact menu text: `text-[14px] font-bold`

Dashboard hero/banner:

- Keep compact enough that the next section is visible in the first viewport
- Recommended banner height: `300px-340px` desktop
- Use soft card surfaces and violet/indigo accents
- Do not switch to unrelated cyan/blue product branding
- Include a light/dark toggle if the AI Studio can switch theme

## Section Patterns

### AI Sales Use Cases

Use four visual cards, one row on desktop, stacked on mobile:

```tsx
grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4
```

Cards use tall image tiles with white text overlay and subtle hover scale.

### Property Map

Use a full-width intelligence section with:

- Badge pill with `#6C63FF`
- Search/filter bar in a rounded white container
- Map panel with soft gray map grid and price pins
- Listing cards below in `sm:grid-cols-2 xl:grid-cols-3`

Search/filter controls should remain on one line where possible and may scroll horizontally on smaller screens.

### AI Sales Library

Use a light Pinterest/ad-library style, not a dark unrelated ad tool theme:

- Outer container: `bg-[#FBFCFF]`, border, soft shadow
- Tabs: rounded pills; active tab uses `bg-[#F0EDFF] text-[#6C63FF]`
- Creative cards: aspect `9/16`, white content area below image
- CTA: `Use this Avatar` with sparkle icon and primary gradient

## Interaction And Motion

Motion should be subtle and purposeful:

- Framer Motion entrance: `opacity + y` with short duration
- Hover cards: `hover:-translate-y-1` and shadow increase
- Buttons: `active:scale-[0.98]`
- Dropdown duration: `0.12s-0.16s easeOut`
- Do not animate layout in ways that cause text or controls to jump

## Accessibility

Required:

- Use Lucide icons, not emojis, for UI controls
- Icon-only buttons need `aria-label`
- Preserve visible focus using `.theme-focus`
- Keep touch targets around `40px-50px` high for web controls
- Do not rely on color alone for important states
- Text should be highlightable/copyable unless it is an icon/image/control
- Ensure contrast in both light and dark themes

## Responsive Rules

Desktop:

- Navbar: logo left, nav center, actions right
- Hero: 55/45 grid
- Use max container `1280px`

Tablet:

- Reduce hero heading to around `42px`
- Keep controls from wrapping awkwardly
- Image grids can move to 2 columns

Mobile:

- Navbar uses hamburger
- Hero becomes single column
- CTA buttons full width when needed
- Avoid horizontal overflow
- Keep body font at least `15px-16px`

## Anti-Patterns To Avoid

- Using a different brand color system on subpages
- Dark cyber/gaming UI for normal marketing pages
- Boxing every sidebar menu item with a border
- Oversized dashboard banners that hide the next section
- Presenter images at low opacity when they are the subject
- Cards or buttons overlapping faces/presenter content
- Random hardcoded blues/cyans replacing the violet brand system
- Tiny subtitles or crowded Thai/English text
- Heavy black borders on light SaaS pages
- Nested scroll areas that fight the browser scrollbar
- Decorative bokeh/orb backgrounds that distract from real product imagery

## Quick Implementation Checklist

Before shipping a UI change:

- Does it use PropPilot violet/indigo primary accents?
- Does the page still look related to the homepage?
- Are spacing, font sizes, and radii close to the homepage patterns?
- Are normal nav/sidebar items unboxed unless active or primary?
- Is the primary CTA clearly stronger than secondary actions?
- Are presenter/person images clear and not cropped at the head?
- Is the next section visible when the first viewport should show it?
- Did `npm run lint` and `npm run build` pass?
