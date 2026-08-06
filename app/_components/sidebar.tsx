"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState, type ReactNode } from "react";

type NavItem = {
  label: string;
  href: string;
  icon: ReactNode;
};

function isActive(href: string, pathname: string): boolean {
  if (href === "#") return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

const navItems: NavItem[] = [
  {
    label: "Feed",
    href: "/",
    icon: (
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
        <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
      </svg>
    ),
  },
  {
    label: "Niños",
    href: "/kids",
    icon: (
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
        <circle cx="9" cy="7" r="3" />
        <circle cx="17" cy="9" r="2.4" />
        <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 20a5 5 0 0 1 5.5-4.9" />
      </svg>
    ),
  },
  {
    label: "Avisos",
    href: "#",
    icon: (
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
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" />
      </svg>
    ),
  },
  {
    label: "Mi cuenta",
    href: "#",
    icon: (
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
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-[11px] px-2 pb-[22px] pt-1"
    >
      <div
        className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-[12px]"
        style={{
          background: "linear-gradient(155deg,#F8C3A8,#F2937A)",
        }}
      >
        <svg
          width="21"
          height="21"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      </div>
      <div>
        <div className="font-[family-name:var(--font-fredoka)] text-[17px] font-semibold leading-none text-text-strong">
          OpenDayCare
        </div>
        <div className="mt-[2px] text-[11.5px] text-text-quiet">
          Sala Soles
        </div>
      </div>
    </Link>
  );
}

function NewPostButton() {
  return (
    <a
      href="#"
      className="mb-[18px] flex w-full items-center justify-center gap-2 rounded-[14px] p-3 text-[14.5px] font-extrabold text-white"
      style={{
        background: "linear-gradient(180deg,#F4977E,#EE8164)",
        boxShadow: "0 8px 18px -8px rgba(238,129,100,.75)",
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
      Nueva publicación
    </a>
  );
}

function NavList() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-1 flex-col gap-1">
      {navItems.map((item) => {
        const active = isActive(item.href, pathname);
        const className = active
          ? "flex items-center gap-3 rounded-[12px] bg-active-bg px-3 py-[11px] text-[14.5px] font-extrabold text-active-text"
          : "flex items-center gap-3 rounded-[12px] px-3 py-[11px] text-[14.5px] font-semibold text-text-muted";
        if (item.href === "#") {
          return (
            <a key={item.label} href="#" className={className}>
              {item.icon}
              {item.label}
            </a>
          );
        }
        return (
          <Link key={item.label} href={item.href} className={className}>
            {item.icon}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function UserCard() {
  return (
    <div className="mt-[10px] border-t border-card-border pt-[14px]">
      <div className="flex items-center gap-[11px] px-2 py-[6px]">
        <div className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-full bg-accent-coral font-[family-name:var(--font-fredoka)] text-[16px] font-semibold text-white">
          C
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[14px] font-extrabold text-text-strong">
            Caro Giménez
          </div>
          <div className="text-[12px] text-text-quiet">Maestra · Soles</div>
        </div>
        <a
          href="#"
          title="Cerrar sesión"
          className="flex h-8 w-8 flex-none items-center justify-center rounded-[10px] bg-canvas text-text-faint"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
          </svg>
        </a>
      </div>
    </div>
  );
}

function SidebarContent() {
  return (
    <>
      <Logo />
      <NewPostButton />
      <NavList />
      <UserCard />
    </>
  );
}

export function SidebarDrawer() {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label="Abrir menú"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-card text-text-muted shadow-[0_4px_14px_-10px_rgba(120,90,60,.4)]"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      </button>

      {open && (
        <>
          <div
            role="button"
            tabIndex={-1}
            aria-label="Cerrar menú"
            onClick={close}
            className="fixed top-0 right-0 bottom-0 left-[248px] z-40 bg-black/30"
          />
          <aside className="fixed left-0 top-0 z-50 flex h-screen w-[248px] flex-col bg-card px-4 py-6">
            <SidebarContent />
          </aside>
        </>
      )}
    </div>
  );
}

export function Sidebar() {
  return (
    <>
      <aside className="sticky top-0 hidden h-screen w-[248px] flex-none flex-col bg-card px-4 py-6 md:flex md:border-r md:border-card-border">
        <SidebarContent />
      </aside>
      <SidebarDrawer />
    </>
  );
}

export default Sidebar;