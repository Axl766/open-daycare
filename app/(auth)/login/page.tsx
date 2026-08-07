import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="grid min-h-screen md:grid-cols-[1.05fr_1fr]">
      {/* Hero panel — hidden on mobile */}
      <div
        className="relative hidden md:flex flex-col justify-between overflow-hidden p-[56px_60px] text-white"
        style={{
          background:
            "linear-gradient(155deg,#F6A98E 0%,#F2937A 45%,#EC7E62 100%)",
        }}
      >
        <div
          className="absolute rounded-full"
          style={{
            width: 420,
            height: 420,
            background: "rgba(255,255,255,.12)",
            top: -140,
            right: -120,
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 300,
            height: 300,
            background: "rgba(255,255,255,.10)",
            bottom: -110,
            left: -80,
          }}
        />
        <div className="relative flex items-center gap-[13px]">
          <div className="flex h-[46px] w-[46px] items-center justify-center rounded-[14px] bg-white/[.22]">
            <svg
              width="26"
              height="26"
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
          <span
            className="text-[21px] tracking-[.5px]"
            style={{ fontFamily: "var(--font-fredoka)", fontWeight: 600 }}
          >
            OpenDayCare
          </span>
        </div>
        <div className="relative">
          <h1
            className="text-[42px] leading-[1.12] mb-[18px]"
            style={{ fontFamily: "var(--font-fredoka)", fontWeight: 600 }}
          >
            El día de cada niño,
            <br />
            compartido con su familia.
          </h1>
          <p className="text-[17px] leading-[1.6] max-w-[430px] text-white/[.92]">
            Publicá momentos, gestioná las salas y mantené a las familias cerca,
            desde un solo lugar.
          </p>
        </div>
        <div className="relative text-[14px] text-white/[.9]">
          🌿 Guardería Sala Soles
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center p-10">
        <div className="w-full max-w-[392px]">
          <h2
            className="text-[30px] mb-[6px] text-text-strong"
            style={{ fontFamily: "var(--font-fredoka)", fontWeight: 600 }}
          >
            Iniciar sesión
          </h2>
          <p className="mb-7 text-[15px] text-text-faint">
            Ingresá para ver el día de hoy.
          </p>

          <div className="mb-2 text-[12px] font-bold tracking-[.7px] text-text-faint">
            EMAIL
          </div>
          <input
            type="email"
            placeholder="nombre@guarderia.com"
            className="mb-[18px] w-full rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white px-4 py-[14px] text-[15px] text-text-strong outline-none placeholder:text-text-quiet"
          />

          <div className="mb-2 text-[12px] font-bold tracking-[.7px] text-text-faint">
            CONTRASEÑA
          </div>
          <input
            type="password"
            placeholder="••••••••"
            className="mb-[10px] w-full rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white px-4 py-[14px] text-[15px] text-text-strong outline-none placeholder:text-text-quiet"
          />

          <div className="mb-5 text-right">
            <Link
              href="#"
              className="text-[13.5px] font-bold text-accent-deep"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <Link
            href="#"
            className="block w-full rounded-[15px] px-4 py-[15px] text-center text-[16px] font-extrabold text-white"
            style={{
              background: "linear-gradient(180deg,#F4977E,#EE8164)",
              boxShadow: "0 10px 22px -8px rgba(238,129,100,.7)",
            }}
          >
            Iniciar sesión
          </Link>

          <p className="mt-6 text-center text-[14.5px] text-text-faint">
            ¿Te invitó la guardería?{" "}
            <Link
              href="/activate-account"
              className="font-extrabold text-accent-deep"
            >
              Activá tu cuenta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}