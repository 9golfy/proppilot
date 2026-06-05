---
name: Stitch Real Estate
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45464d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#515f74'
  on-secondary: '#ffffff'
  secondary-container: '#d5e3fd'
  on-secondary-container: '#57657b'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#001a42'
  on-tertiary-container: '#3980f4'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#d5e3fd'
  secondary-fixed-dim: '#b9c7e0'
  on-secondary-fixed: '#0d1c2f'
  on-secondary-fixed-variant: '#3a485c'
  tertiary-fixed: '#d8e2ff'
  tertiary-fixed-dim: '#adc6ff'
  on-tertiary-fixed: '#001a42'
  on-tertiary-fixed-variant: '#004395'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-md:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style
The design system is built on the "Stitch" philosophy: a minimalist, high-quality aesthetic that emphasizes precision and architectural clarity. It targets a professional real estate market where trust and efficiency are paramount. 

The visual language avoids unnecessary decoration, focusing instead on structural integrity and intentional whitespace. The emotional response should be one of calm reliability—evoking the feeling of a well-organized, premium architectural firm. The style is **Modern/Corporate** with a "Stitch" influence, characterized by hairline dividers, generous breathing room, and a strictly disciplined typographic scale.

## Colors
The palette is rooted in "Trustworthy Blues" and "Crisp Whites." 

- **Primary (#0F172A):** A deep, ink-like navy used for headlines and high-importance UI elements to establish authority.
- **Secondary (#334155):** A slate blue for secondary text and icons, maintaining a professional tone without the harshness of pure black.
- **Tertiary (#3B82F6):** A vibrant but stable blue used sparingly for actionable items, links, and focus states.
- **Neutral (#F8FAFC):** A foundation of cool grays and whites to provide a clean, "gallery" feel for property photography and data inputs.

## Typography
This design system utilizes **Hanken Grotesk** for headlines to provide a sharp, contemporary edge, while **Inter** is used for body and labels to ensure maximum utility and readability during complex data entry. 

Typographic hierarchy is achieved through weight and color rather than excessive size shifts. Labels are kept strictly legible with slightly increased tracking for clarity in dense forms. Display sizes use tighter letter spacing to create a "stitched" and compact professional appearance.

## Layout & Spacing
The layout follows a **Fixed Grid** model for property forms to ensure input fields don't become excessively wide and difficult to scan. 

- **Desktop:** 12-column grid centered in a 1200px container.
- **Tablet:** 8-column grid with 32px margins.
- **Mobile:** Single column with 16px margins, focusing on vertical stacks.

Spacing is governed by an 8px rhythm. For multi-step forms, use a "Centric Stack" approach: content is grouped into logical modules separated by `stack-lg` (48px) to reduce cognitive load. Gutters are kept wide (24px) to ensure that even complex multi-column forms feel airy and manageable.

## Elevation & Depth
In line with the "Stitch" style, this design system avoids heavy shadows. Depth is communicated via **Tonal Layers** and **Low-contrast outlines**.

- **Surface Levels:** The main canvas is pure white. Form sections use a subtle `neutral` background (#F8FAFC) with a 1px solid border (#E2E8F0) to define boundaries.
- **Focus States:** Instead of shadows, focused inputs use a 2px solid border in the `tertiary` blue.
- **Modals/Overlays:** Use an ultra-soft ambient shadow (0px 10px 30px rgba(15, 23, 42, 0.05)) to separate temporary layers from the background without breaking the minimalist aesthetic.

## Shapes
The shape language is **Soft (0.25rem)**. This provides a subtle approachability while maintaining a disciplined, professional grid. 

Buttons and input fields follow the `rounded-sm` (4px) rule. Container cards and section wrappers may use `rounded-lg` (8px) to softly distinguish larger layout blocks. The aim is to avoid the playfulness of highly rounded "pill" shapes, opting instead for a precise, tailored appearance.

## Components
- **Progress Indicators:** Use a horizontal "Stitched" stepper at the top of the form. Completed steps are indicated with a subtle checkmark and a `primary` color line, while the current step uses a bold label and a blue underline.
- **Input Fields:** Use "Floating Labels" or clear "Top-aligned Labels." Inputs have a 1px border (#CBD5E1) that transitions to `tertiary` blue on focus. Use a 16px internal padding for a premium feel.
- **Buttons:** 
  - *Primary:* Solid `primary` color with white text. No gradient.
  - *Secondary:* Outline `secondary` color with 1px border.
- **Radio Buttons & Checkboxes:** Custom-styled to match the `tertiary` blue. Radio buttons should appear as a "Target" icon when selected (outer ring + inner dot).
- **Cards:** Used for property previews or section grouping. They feature a 1px neutral border and no shadow. Headers within cards should use `label-md` for a technical, organized look.
- **Dropdowns:** Use a custom chevron icon. The dropdown menu should align perfectly with the width of the trigger and use a 1px border, mirroring the input field style.