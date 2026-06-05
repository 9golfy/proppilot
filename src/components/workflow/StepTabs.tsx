"use client";

import { Check, ChevronLeft, ChevronRight } from "lucide-react";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

interface StepTabsProps {
  steps: string[];
  activeStep: number;
  onStepChange: (step: number) => void;
}

export function StepTabs({ steps, activeStep, onStepChange }: StepTabsProps) {
  const canGoPrevious = activeStep > 0;
  const canGoNext = activeStep < steps.length - 1;

  const goPrevious = () => {
    if (canGoPrevious) onStepChange(activeStep - 1);
  };

  const goNext = () => {
    if (canGoNext) onStepChange(activeStep + 1);
  };

  return (
    <div className="sticky top-[84px] z-20 rounded-[16px] border border-[#E5E7EB] bg-white px-3 py-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)] dark:border-[var(--border)] dark:bg-[var(--card)]">
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Previous step"
          onClick={goPrevious}
          disabled={!canGoPrevious}
          className={cx(
            "theme-focus grid size-9 shrink-0 place-items-center rounded-[10px] border border-[#E5E7EB] bg-white text-[#64748B] transition hover:bg-[#F8FAFC]",
            !canGoPrevious && "cursor-not-allowed opacity-40 hover:bg-white"
          )}
        >
          <ChevronLeft className="size-4" />
        </button>

        <div className="flex min-w-0 flex-1 items-center overflow-x-auto px-2">
          {steps.map((step, index) => {
            const isActive = activeStep === index;
            const isDone = activeStep > index;
            return (
              <div key={step} className="flex min-w-fit flex-1 items-center last:flex-none">
                <button
                  type="button"
                  onClick={() => onStepChange(index)}
                  className="theme-focus group flex min-w-fit items-center gap-3 rounded-full px-2 py-1 text-left transition hover:bg-[#F8FAFC]"
                >
                  <span
                    className={cx(
                      "grid size-8 shrink-0 place-items-center rounded-full border text-[13px] font-semibold transition",
                      isActive || isDone
                        ? "border-[#6366F1] bg-[#6366F1] text-white"
                        : "border-[#E5E7EB] bg-white text-[#334155]"
                    )}
                  >
                    {isDone ? <Check className="size-4" /> : index + 1}
                  </span>
                  <span className={cx("whitespace-nowrap text-[13px] font-semibold", isActive ? "text-[#6366F1]" : "text-[#334155]")}>{step}</span>
                </button>
                {index < steps.length - 1 && (
                  <span className="mx-5 h-px min-w-[96px] flex-1 rounded-full bg-[#E5E7EB]">
                    <span className={cx("block h-full rounded-full transition-all duration-300", activeStep > index ? "w-full bg-[#6366F1]" : "w-0 bg-[#6366F1]")} />
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <button
          type="button"
          aria-label="Next step"
          onClick={goNext}
          disabled={!canGoNext}
          className={cx(
            "theme-focus grid size-9 shrink-0 place-items-center rounded-[10px] border border-[#E5E7EB] bg-white text-[#64748B] transition hover:bg-[#F8FAFC]",
            !canGoNext && "cursor-not-allowed opacity-40 hover:bg-white"
          )}
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}