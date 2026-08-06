export function Composer() {
  return (
    <a
      href="#"
      className="mb-6 flex items-center gap-3.5 rounded-[18px] border border-card-border bg-card p-3.5 shadow-[0_4px_14px_-10px_rgba(120,90,60,.4)] sm:p-[14px_18px]"
    >
      <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-accent-coral font-[family-name:var(--font-fredoka)] text-[16px] font-semibold text-white">
        C
      </div>
      <span className="flex-1 text-[15px] text-text-quiet">
        Compartí un momento…
      </span>
      <span className="flex h-[38px] w-[38px] items-center justify-center rounded-[12px] bg-accent-tint text-accent-deep">
        <svg
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      </span>
    </a>
  );
}

export default Composer;