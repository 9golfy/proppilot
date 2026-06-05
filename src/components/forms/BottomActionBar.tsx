import { ArrowLeft, ArrowRight } from "lucide-react";

interface BottomActionBarProps {
  backLabel?: string;
  nextLabel: string;
  onBack: () => void;
  onNext: () => void;
}

export function BottomActionBar({ backLabel, nextLabel, onBack, onNext }: BottomActionBarProps) {
  return (
    <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#E5E7EB] bg-white py-4">
      <button
        type="button"
        onClick={onBack}
        aria-label={backLabel ?? "กลับ"}
        className="theme-focus inline-flex h-10 w-auto shrink-0 items-center justify-center gap-2 rounded-[12px] border border-[#E5E7EB] bg-white px-4 text-[14px] font-semibold text-[#111827] transition hover:bg-[#F5F7FA]"
      >
        <ArrowLeft className="size-4" />
        {backLabel}
      </button>
      <button
        type="button"
        onClick={onNext}
        className="theme-focus inline-flex h-10 w-auto items-center justify-center gap-2 rounded-[12px] bg-gradient-to-r from-[#6366F1] to-[#4F46E5] px-5 text-[14px] font-semibold text-white transition hover:brightness-105 active:scale-[0.99]"
      >
        {nextLabel}
        <ArrowRight className="size-4" />
      </button>
    </div>
  );
}
