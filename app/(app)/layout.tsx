// Route group layout — wraps all sidebar-based pages.
// The (app) directory is a route group: it does NOT affect URLs.
import { Sidebar } from "@/app/_components/sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-canvas">
      <Sidebar />
      <main className="h-screen flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
