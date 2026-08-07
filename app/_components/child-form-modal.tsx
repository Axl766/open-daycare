"use client";

import {
  CHILD_FORM_LABELS,
  INVALID_BIRTHDAY_MESSAGE,
  ROOMS,
  type Room,
  isValidBirthday,
} from "@/lib/child-form";
import { useEffect, useState } from "react";

interface ChildFormModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ChildFormModal({ open, onClose }: ChildFormModalProps) {
  const [room, setRoom] = useState<Room>("Soles");
  const [birthday, setBirthday] = useState("");
  const [birthdayTouched, setBirthdayTouched] = useState(false);
  const labels = CHILD_FORM_LABELS;

  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-6 md:items-center md:p-10"
      onClick={onClose}
      style={{ background: "rgba(63,54,46,.45)" }}
    >
      <div
        className="relative w-full max-w-[520px] overflow-hidden rounded-[24px] border border-card-border"
        style={{
          background: "#FBF4EC",
          boxShadow: "0 20px 50px -24px rgba(63,54,46,.35)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-card-border px-[26px] py-5">
          <button
            onClick={onClose}
            className="text-[15px] font-bold text-text-faint"
          >
            {labels.cancelLabel}
          </button>
          <span
            className="text-[18px] text-text-strong"
            style={{ fontFamily: "var(--font-fredoka)", fontWeight: 600 }}
          >
            {labels.modalTitle}
          </span>
          <button
            onClick={onClose}
            className="text-[15px] font-extrabold text-accent"
          >
            {labels.saveLabel}
          </button>
        </div>

        {/* Body */}
        <div className="px-[26px] py-6">
          <div className="mb-2 text-[12px] font-extrabold tracking-[.7px] text-text-faint">
            {labels.nameFieldLabel}
          </div>
          <input
            placeholder={labels.namePlaceholder}
            className="mb-[18px] w-full rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white px-4 py-[13px] text-[15px] text-text-strong outline-none placeholder:text-text-quiet"
          />

          <div className="mb-[18px] flex gap-[14px]">
            <div className="flex-1">
              <div className="mb-2 text-[12px] font-extrabold tracking-[.7px] text-text-faint">
                {labels.birthdayFieldLabel}
              </div>
              <input
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                onBlur={() => setBirthdayTouched(true)}
                placeholder={labels.birthdayPlaceholder}
                className="w-full rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white px-4 py-[13px] text-[15px] text-text-strong outline-none placeholder:text-text-quiet"
              />
              {birthdayTouched && !isValidBirthday(birthday) && (
                <p className="mt-2 mb-[18px] text-[13px] text-accent">
                  {INVALID_BIRTHDAY_MESSAGE}
                </p>
              )}
            </div>
            <div className="flex-1">
              <div className="mb-2 text-[12px] font-extrabold tracking-[.7px] text-text-faint">
                {labels.roomFieldLabel}
              </div>
              <div className="relative">
                <select
                  value={room}
                  onChange={(e) => setRoom(e.target.value as Room)}
                  className="w-full appearance-none rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white px-4 py-[13px] pr-10 text-[15px] font-bold text-text-strong outline-none"
                >
                  {ROOMS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-quiet">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-2 text-[12px] font-extrabold tracking-[.7px] text-text-faint">
            {labels.allergiesFieldLabel}
          </div>
          <input
            placeholder={labels.allergiesPlaceholder}
            className="mb-[18px] w-full rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white px-4 py-[13px] text-[15px] text-text-strong outline-none placeholder:text-text-quiet"
          />

          <div className="mb-2 text-[12px] font-extrabold tracking-[.7px] text-text-faint">
            {labels.notesFieldLabel}
          </div>
          <textarea
            placeholder={labels.notesPlaceholder}
            className="min-h-[90px] w-full resize-y rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white px-4 py-[13px] text-[15px] leading-[1.5] text-text-strong outline-none placeholder:text-text-quiet"
          />
        </div>
      </div>
    </div>
  );
}
