import { useState, type ElementType } from "react";
import { ChevronDown } from "lucide-react";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

interface FormFieldProps {
  label: string;
  placeholder?: string;
  value?: string | number;
  suffix?: string;
  icon?: ElementType;
  type?: string;
  className?: string;
  readOnly?: boolean;
  onChange?: (value: string) => void;
}

export function FormField({ label, placeholder, value, suffix, icon: Icon, type = "text", className, readOnly, onChange }: FormFieldProps) {
  return (
    <label className={cx("block", className)}>
      <span className="mb-2 block text-[13px] font-medium text-[#334155]">{label}</span>
      <span className="relative block">
        {Icon && <Icon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#6366F1]" />}
        <input
          type={type}
          value={value ?? undefined}
          onChange={(event) => onChange?.(event.target.value)}
          readOnly={readOnly}
          className={cx(
            "h-10 w-full rounded-[11px] border border-[#E5E7EB] bg-white px-3 text-[14px] font-normal text-[#111827] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#6366F1] focus:ring-4 focus:ring-[#6366F1]/10",
            Icon && "pl-9",
            suffix && "pr-14"
          )}
          placeholder={placeholder}
        />
        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] font-normal text-[#6B7280]">{suffix}</span>}
      </span>
    </label>
  );
}

type SelectOption = string | { label: string; value: string };

export function SelectField({
  label,
  value,
  options,
  className,
  onChange,
}: {
  label: string;
  value: string;
  options?: SelectOption[];
  className?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <label className={cx("block", className)}>
      <span className="mb-2 block text-[13px] font-medium text-[#334155]">{label}</span>
      <span className="relative block">
        <select
          value={onChange ? value : undefined}
          defaultValue={onChange ? undefined : value}
          onChange={(event) => onChange?.(event.target.value)}
          className="h-10 w-full appearance-none rounded-[11px] border border-[#E5E7EB] bg-white px-3 pr-9 text-left text-[14px] font-normal text-[#111827] outline-none transition hover:border-[#D1D5DB] focus:border-[#6366F1] focus:ring-4 focus:ring-[#6366F1]/10"
        >
          {(options ?? [value]).map((option) => {
            const normalizedOption = typeof option === "string" ? { label: option, value: option } : option;

            return (
              <option key={normalizedOption.value} value={normalizedOption.value}>
                {normalizedOption.label}
              </option>
            );
          })}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#6B7280]" />
      </span>
    </label>
  );
}

export function RadioGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value?: string;
  onChange?: (value: string) => void;
}) {
  const [internalValue, setInternalValue] = useState(options[0] ?? "");
  const selectedValue = value ?? internalValue;

  const handleSelect = (option: string) => {
    setInternalValue(option);
    onChange?.(option);
  };

  return (
    <div>
      <p className="mb-2 text-[13px] font-medium text-[#334155]">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => handleSelect(option)}
            className={cx(
              "h-9 rounded-[10px] border px-3 text-[13px] font-medium transition",
              selectedValue === option
                ? "border-[#6366F1] bg-[#F5F3FF] text-[#6366F1]"
                : "border-[#E5E7EB] bg-white text-[#475569] hover:bg-[#F8FAFC]"
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export function TextareaField({
  label,
  placeholder,
  className,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <label className={cx("block", className)}>
      <span className="mb-2 block text-[13px] font-medium text-[#334155]">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        className="min-h-[96px] w-full resize-none rounded-[11px] border border-[#E5E7EB] bg-white px-3 py-3 text-[14px] font-normal leading-6 text-[#111827] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#6366F1] focus:ring-4 focus:ring-[#6366F1]/10"
        placeholder={placeholder}
      />
    </label>
  );
}
