
import { Inbox, LogOut, ShieldCheck } from "lucide-react";

export default function AdminHeader({ onLogout, busy = false }) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/[0.08] bg-[#0b0e0d]/90 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[72px] max-w-[1800px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <a href="#inbox" className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-green-400/20 bg-green-400/10 text-green-400">
            <Inbox size={21} />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white sm:text-base">
              Portfolio Inbox
            </p>
            <p className="hidden text-xs text-gray-500 sm:block">
              Private message workspace
            </p>
          </div>
        </a>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden items-center gap-2 text-xs text-gray-400 sm:flex">
            <ShieldCheck size={16} className="text-green-400" />
            Secure workspace
          </div>

          <button
            type="button"
            onClick={onLogout}
            disabled={busy}
            className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/10 px-3 text-sm text-gray-300 transition hover:border-red-400/30 hover:text-red-300 disabled:opacity-50 sm:px-4"
          >
            <LogOut size={16} />
            <span>{busy ? "Signing out..." : "Sign out"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
