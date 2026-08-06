import Link from "next/link";
import type { Parent } from "@/lib/kids";

interface LinkedParentsProps {
  parents: Parent[];
}

export function LinkedParents({ parents }: LinkedParentsProps) {
  return (
    <div className="rounded-[16px] border border-card-border bg-card p-[18px]">
      <div className="mb-[14px] text-[12.5px] font-extrabold tracking-[0.8px] text-[#8A7C6D]">
        PADRES VINCULADOS
      </div>
      <div className="flex flex-col gap-[14px]">
        {parents.map((parent) => (
          <div
            key={parent.id}
            className="flex items-center gap-[12px]"
          >
            <div
              className="flex h-10 w-10 flex-none items-center justify-center rounded-full font-[family-name:var(--font-fredoka)] text-[16px] font-semibold"
              style={{
                background: parent.avatarStyle.background,
                color: parent.avatarStyle.foreground,
              }}
            >
              {parent.avatarInitial}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[14.5px] font-extrabold text-text-strong">
                {parent.name}
              </div>
              <div className="text-[12.5px] text-text-quiet">
                {parent.roleLabel}
              </div>
            </div>
            <span
              className="flex-none rounded-full px-[9px] py-1 text-[10.5px] font-extrabold"
              style={{
                background: parent.statusStyle.background,
                color: parent.statusStyle.text,
              }}
            >
              {parent.statusLabel}
            </span>
          </div>
        ))}
        <Link
          href="#"
          className="flex items-center gap-[12px] pt-2"
        >
          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border-[1.5px] border-dashed border-[#D8CBBA] text-[#B0A290]">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
          <span className="text-[14.5px] font-extrabold text-[#C5503A]">
            Vincular otro padre
          </span>
        </Link>
      </div>
    </div>
  );
}
