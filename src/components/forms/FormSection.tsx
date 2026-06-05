import type { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  helper?: string;
  children: ReactNode;
  compact?: boolean;
}

export function FormSection({ title, helper, children, compact }: FormSectionProps) {
  return (
    <section className="border-b border-[#E5E7EB] pb-5 last:border-b-0 last:pb-0">
      <div className="mb-4">
        <h3 className="text-[16px] font-semibold tracking-[-0.1px] text-[#111827]">{title}</h3>
        {helper && <p className="mt-1 text-[12px] font-normal leading-5 text-[#6B7280]">{helper}</p>}
      </div>
      <div className={compact ? "space-y-3" : "space-y-4"}>{children}</div>
    </section>
  );
}