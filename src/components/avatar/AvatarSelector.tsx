"use client";

import { ArrowRight, Check, Upload } from "lucide-react";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export interface AvatarOption {
  id: string;
  name: string;
  role: string;
  image: string;
}

interface AvatarSelectorProps {
  avatars: AvatarOption[];
  selectedAvatar: string;
  onSelectAvatar: (id: string) => void;
}

export function AvatarSelector({ avatars, selectedAvatar, onSelectAvatar }: AvatarSelectorProps) {
  return (
    <section className="rounded-[16px] border border-[#E5E7EB] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] dark:border-[var(--border)] dark:bg-[var(--card)]">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[18px] font-bold tracking-[-0.2px] text-[#111827] dark:text-white">1. เลือก AI Avatar / Influencer</h2>
          <p className="mt-1 text-[13px] font-normal text-[#6B7280]">เลือกอวาตาร์หรือนักแสดง AI ที่ต้องการใช้ในวิดีโอ</p>
        </div>
        <button type="button" className="theme-focus inline-flex h-9 shrink-0 items-center gap-2 rounded-[12px] border border-[#E5E7EB] bg-white px-3.5 text-[13px] font-medium text-[#111827] transition hover:bg-[#F5F7FA]">
          View all <ArrowRight className="size-4" />
        </button>
      </div>

      <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <button type="button" className="theme-focus flex aspect-[4/5] min-h-[168px] flex-col items-center justify-center rounded-[14px] border border-dashed border-[#D1D5DB] bg-white p-4 text-center transition hover:border-[#6366F1] hover:bg-[#F8FAFC]">
          <span className="grid size-11 place-items-center rounded-full bg-[#F5F3FF] text-[#6366F1]"><Upload className="size-5" /></span>
          <span className="mt-3 text-[14px] font-semibold leading-5 text-[#111827]">อัปโหลดรูปของคุณ</span>
          <span className="mt-1 text-[12px] font-normal leading-5 text-[#6B7280]">JPG, PNG สูงสุด 10MB</span>
        </button>

        {avatars.map((avatar) => {
          const selected = selectedAvatar === avatar.id;
          return (
            <button
              key={avatar.id}
              type="button"
              onClick={() => onSelectAvatar(avatar.id)}
              className={cx(
                "theme-focus relative flex h-full flex-col overflow-hidden rounded-[14px] border bg-white p-2 text-center transition hover:border-[#C7D2FE]",
                selected ? "border-[#6366F1]" : "border-[#E5E7EB]"
              )}
            >
              {selected && <span className="absolute right-3 top-3 z-10 grid size-6 place-items-center rounded-full bg-[#6366F1] text-white"><Check className="size-4" /></span>}
              <div className="aspect-[4/5] overflow-hidden rounded-[11px] bg-[#F8FAFC]">
                <img src={avatar.image} alt={avatar.name} className="h-full w-full object-cover object-top" />
              </div>
              <div className="mt-auto pt-2">
                <p className="text-[13px] font-semibold text-[#111827] dark:text-white">{avatar.name}</p>
                <p className="text-[12px] font-normal text-[#6B7280]">{avatar.role}</p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}