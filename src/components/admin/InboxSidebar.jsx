
import {
  Inbox,
  Mail,
  MailCheck,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

const filters = [
  { id: "all", label: "All messages", icon: Inbox, color: "blue" },
  { id: "unread", label: "Unread", icon: Mail, color: "violet" },
  { id: "replied", label: "Replied", icon: MailCheck, color: "cyan" },
];

const activeStyles = {
  all: "border-blue-400/25 bg-blue-500/10 text-blue-300",
  unread: "border-violet-400/25 bg-violet-500/10 text-violet-300",
  replied: "border-cyan-400/25 bg-cyan-500/10 text-cyan-300",
};

const iconStyles = {
  all: "bg-blue-500/15 text-blue-300",
  unread: "bg-violet-500/15 text-violet-300",
  replied: "bg-cyan-500/15 text-cyan-300",
};

export default function InboxSidebar({
  activeFilter,
  onFilterChange,
  counts = {},
}) {
  return (
    <aside className="flex h-full flex-col border-b border-white/[0.07] bg-[#0b1020] p-3 sm:p-4 lg:border-b-0 lg:border-r lg:border-white/[0.07]">
      {/* Workspace heading */}
      <div className="mb-5 px-2 pt-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10">
            <Inbox size={16} className="text-blue-300" />
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Workspace</p>
            <p className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-slate-500">
              Message center
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
        Mailboxes
      </p>

      <nav className="grid grid-cols-3 gap-2 lg:grid-cols-1">
        {filters.map(({ id, label, icon: Icon }) => {
          const active = activeFilter === id;
          const count = Number(counts[id]);

          return (
            <button
              key={id}
              type="button"
              onClick={() => onFilterChange(id)}
              aria-pressed={active}
              className={`group relative flex min-h-12 items-center justify-center gap-2 rounded-xl border px-2.5 text-xs transition-all duration-200 sm:px-3 sm:text-sm lg:justify-start ${
                active
                  ? activeStyles[id]
                  : "border-transparent text-slate-400 hover:border-white/[0.06] hover:bg-white/[0.035] hover:text-white"
              }`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                  active
                    ? iconStyles[id]
                    : "bg-white/[0.035] text-slate-400 group-hover:bg-white/[0.07] group-hover:text-white"
                }`}
              >
                <Icon size={16} />
              </span>

              <span className="truncate font-medium">{label}</span>

              {Number.isFinite(count) && (
                <span
                  className={`ml-auto hidden min-w-7 rounded-md px-2 py-1 text-center text-[11px] font-semibold tabular-nums lg:inline ${
                    active
                      ? "bg-white/[0.08] text-white"
                      : "bg-white/[0.04] text-slate-500"
                  }`}
                >
                  {count}
                </span>
              )}

              {active && (
                <ChevronRight
                  size={15}
                  className="ml-auto hidden shrink-0 lg:block"
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Security card */}
      <div className="mt-5 hidden rounded-2xl border border-indigo-400/15 bg-gradient-to-br from-indigo-500/[0.10] via-blue-500/[0.04] to-transparent p-4 lg:mt-auto lg:block">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-indigo-300/15 bg-indigo-400/10">
          <ShieldCheck size={18} className="text-indigo-300" />
        </div>

        <p className="mt-3 text-sm font-semibold text-slate-200">
          Private workspace
        </p>

        <p className="mt-1.5 text-xs leading-5 text-slate-500">
          Your portfolio inquiries stay within the authenticated admin area.
        </p>

        <div className="mt-4 flex items-center gap-2 border-t border-white/[0.07] pt-3">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-30" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
          </span>

          <span className="text-[11px] font-medium text-slate-400">
            Protected session
          </span>
        </div>
      </div>
    </aside>
  );
}
