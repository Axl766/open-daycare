import { KidCard } from "@/app/_components/kid-card";
import { KIDS } from "@/lib/kids";

export default function KidsPage() {
  return (
    <div className="mx-auto w-full max-w-[880px] px-5 pb-20 pt-8 sm:px-10 sm:pt-[34px]">
      <div className="mb-[22px] flex items-end justify-between gap-4">
        <div>
          <div className="mb-1 text-[12.5px] font-extrabold tracking-[0.8px] text-accent">
            GESTIÓN
          </div>
          <h1 className="m-0 font-[family-name:var(--font-fredoka)] text-[30px] font-semibold text-text-strong">
            Niños
          </h1>
        </div>
        <a
          href="#"
          className="flex items-center gap-2 rounded-[14px] px-[18px] py-[11px] text-[14.5px] font-extrabold text-white"
          style={{
            background: "linear-gradient(180deg,#F4977E,#EE8164)",
            boxShadow: "0 8px 18px -8px rgba(238,129,100,.7)",
          }}
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          Agregar niño
        </a>
      </div>

      <div className="mb-[22px] flex items-center gap-[11px] rounded-[14px] border border-card-border bg-card px-4 py-3">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#B0A290"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          placeholder="Buscar niño…"
          className="flex-1 border-none bg-none text-[15px] text-text-strong placeholder:text-[#B6A99B]"
          readOnly
        />
      </div>

      <div className="mb-[14px] flex items-center gap-3">
        <span className="text-[12.5px] font-extrabold tracking-[0.8px] text-text-strong">
          SALA SOLES
        </span>
        <span className="text-[13px] text-text-quiet">
          {KIDS.length} niños
        </span>
        <span className="h-px flex-1 bg-[#E7DAC8]" />
      </div>

      <div className="grid grid-cols-2 gap-[14px]">
        {KIDS.map((child) => (
          <KidCard key={child.id} child={child} />
        ))}
      </div>
    </div>
  );
}
