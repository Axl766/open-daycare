import Link from "next/link";
import type { Child } from "@/lib/kids";

interface KidCardProps {
  child: Child;
}

export function KidCard({ child }: KidCardProps) {
  return (
    <Link
      href={`/kids/${child.id}`}
      className="kid flex items-center gap-[14px] min-w-0 rounded-[18px] border border-card-border bg-card p-4 shadow-[0_4px_14px_-12px_rgba(120,90,60,.5)] transition-[.15s] hover:border-[#F2A78E] hover:-translate-y-[2px]"
    >
      <div
        className="flex h-12 w-12 flex-none items-center justify-center rounded-full font-[family-name:var(--font-fredoka)] text-[19px] font-semibold"
        style={{
          background: child.avatarStyle.background,
          color: child.avatarStyle.foreground,
        }}
      >
        {child.avatarInitial}
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-[family-name:var(--font-fredoka)] text-[16px] font-semibold text-text-strong">
          {child.name}
        </div>
        <div className="text-[13px] text-text-quiet">
          {child.ageYearsLabel} · {child.parentsCountLabel}
        </div>
      </div>
      {child.flags.length > 0 ? (
        child.flags.map((flag) => (
          <span
            key={flag.label}
            className="flex-none rounded-full px-[9px] py-[5px] text-[11px] font-extrabold"
            style={{
              background: flag.style.background,
              color: flag.style.text,
            }}
          >
            {flag.label}
          </span>
        ))
      ) : (
        <svg
          className="flex-none"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#CBB89F"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      )}
    </Link>
  );
}
