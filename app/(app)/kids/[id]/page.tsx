import Link from "next/link";
import { ChildAllergies } from "@/app/_components/child-allergies";
import { LinkedParents } from "@/app/_components/linked-parents";
import { KIDS } from "@/lib/kids";

export function generateStaticParams() {
  return KIDS.map((child) => ({ id: child.id }));
}

interface ProfilePageProps {
  params: Promise<{ id: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id } = await params;
  const child = KIDS.find((c) => c.id === id);

  if (!child) {
    return (
      <div className="mx-auto w-full max-w-[820px] px-5 pb-20 pt-8 sm:px-10 sm:pt-[34px]">
        <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
          <div className="text-[60px]">🔍</div>
          <h2 className="m-0 font-[family-name:var(--font-fredoka)] text-[24px] font-semibold text-text-strong">
            Niño no encontrado
          </h2>
          <p className="m-0 text-[15px] text-text-quiet">
            No se encontró un niño con el identificador &quot;{id}&quot;.
          </p>
          <Link
            href="/kids"
            className="rounded-[12px] border border-card-border bg-card px-4 py-2 text-[14px] font-semibold text-text-muted hover:border-[#F2A78E] hover:text-accent"
          >
            Volver a Niños
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[820px] px-5 pb-20 pt-8 sm:px-10 sm:pt-[34px]">
      <Link
        href="/kids"
        className="mb-5 flex items-center gap-[7px] text-[14px] font-bold text-text-faint"
      >
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
          <path d="m15 18-6-6 6-6" />
        </svg>
        Volver a Niños
      </Link>

      <div className="flex flex-wrap items-start gap-[26px]">
        <div className="flex min-w-[300px] flex-1 flex-col gap-[18px]">
          <div className="flex items-center gap-[18px]">
            <div
              className="flex h-[84px] w-[84px] flex-none items-center justify-center rounded-full font-[family-name:var(--font-fredoka)] text-[34px] font-semibold"
              style={{
                background: child.avatarStyle.background,
                color: child.avatarStyle.foreground,
              }}
            >
              {child.avatarInitial}
            </div>
            <div className="flex-1">
              <h1 className="m-0 font-[family-name:var(--font-fredoka)] text-[28px] font-semibold text-text-strong">
                {child.name}
              </h1>
              <p className="mt-[3px] text-[15px] text-text-faint">
                {child.ageYearsLabel} · Sala {child.roomLabel}
              </p>
            </div>
            <a
              href="#"
              className="rounded-[12px] border-[1.5px] border-card-border bg-card px-4 py-[9px] text-[14px] font-bold text-text-muted"
            >
              Editar
            </a>
          </div>

          {child.allergiesBody && (
            <ChildAllergies
              title={child.allergiesTitle}
              body={child.allergiesBody}
            />
          )}

          <div className="overflow-hidden rounded-[16px] border border-card-border bg-card">
            <div className="flex justify-between border-b border-[#F0E6D8] px-[18px] py-[15px]">
              <span className="text-[14.5px] text-text-faint">
                Fecha de nacimiento
              </span>
              <span className="text-[14.5px] font-extrabold text-text-strong">
                {child.birthDateLabel}
              </span>
            </div>
            <div className="flex justify-between border-b border-[#F0E6D8] px-[18px] py-[15px]">
              <span className="text-[14.5px] text-text-faint">Sala</span>
              <span className="text-[14.5px] font-extrabold text-text-strong">
                {child.roomLabel}
              </span>
            </div>
            <div className="flex justify-between px-[18px] py-[15px]">
              <span className="text-[14.5px] text-text-faint">Ingreso</span>
              <span className="text-[14.5px] font-extrabold text-text-strong">
                {child.ingresoLabel}
              </span>
            </div>
          </div>
        </div>

        <div className="flex w-[300px] flex-none flex-col gap-[14px]">
          <a
            href="#"
            className="flex w-full items-center justify-center gap-[9px] rounded-[14px] bg-text-strong px-[18px] py-[13px] text-[15px] font-extrabold text-white"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
            Resumen del día
          </a>

          {child.parents.length > 0 && (
            <LinkedParents parents={child.parents} />
          )}
        </div>
      </div>
    </div>
  );
}
