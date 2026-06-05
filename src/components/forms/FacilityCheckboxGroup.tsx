import { Check } from "lucide-react";
import { useState } from "react";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function FacilityCheckboxGroup({ label, options }: { label: string; options: string[] }) {
  const [selectedOptions, setSelectedOptions] = useState(() => new Set(options.slice(0, 2)));

  const toggleOption = (option: string) => {
    setSelectedOptions((current) => {
      const next = new Set(current);
      if (next.has(option)) {
        next.delete(option);
      } else {
        next.add(option);
      }
      return next;
    });
  };

  return (
    <div>
      <p className="mb-2 text-[13px] font-medium text-[#334155]">{label}</p>
      <div className="grid gap-2">
        {options.map((option) => {
          const selected = selectedOptions.has(option);
          return (
            <button key={option} type="button" onClick={() => toggleOption(option)} className={cx("flex h-9 items-center gap-2 rounded-[10px] border px-3 text-left text-[12px] font-medium transition", selected ? "border-[#6366F1]/30 bg-[#F5F3FF] text-[#4F46E5]" : "border-[#E5E7EB] bg-white text-[#475569] hover:bg-[#F8FAFC]")}>
              <span className={cx("grid size-4 shrink-0 place-items-center rounded border", selected ? "border-[#6366F1] bg-[#6366F1] text-white" : "border-[#D1D5DB] bg-white")}>{selected && <Check className="size-3" />}</span>
              <span className="truncate">{option}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
