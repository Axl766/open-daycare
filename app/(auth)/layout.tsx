// (auth) route group — pre-auth screens without the app sidebar (does not affect the URL).
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#FBF4EC]">{children}</div>;
}