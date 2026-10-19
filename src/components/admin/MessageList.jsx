
import {
  Mail,
  MailOpen,
  Search,
  X,
  MessageSquareText,
  Clock3,
} from "lucide-react";

function formatDate(value) {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const now = new Date();
  const sameDay = date.toDateString() === now.toDateString();

  if (sameDay) {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const sameYear = date.getFullYear() === now.getFullYear();

  return date.toLocaleDateString([], {
    month: "short",
    day: "numeric",
    ...(sameYear ? {} : { year: "2-digit" }),
  });
}

const avatarColors = [
  "from-blue-500/25 to-indigo-500/10 text-blue-200 ring-blue-400/20",
  "from-violet-500/25 to-fuchsia-500/10 text-violet-200 ring-violet-400/20",
  "from-cyan-500/25 to-teal-500/10 text-cyan-200 ring-cyan-400/20",
  "from-amber-500/25 to-orange-500/10 text-amber-200 ring-amber-400/20",
];

function getAvatarColor(value = "") {
  const total = Array.from(value).reduce(
    (sum, char) => sum + char.charCodeAt(0),
    0
  );

  return avatarColors[total % avatarColors.length];
}

export default function MessageList({
  messages = [],
  selectedId,
  onSelect,
  search,
  onSearchChange,
  loading,
  error,
}) {
  return (
    <section className="flex min-h-0 min-w-0 flex-col border-b border-white/[0.07] bg-[#0d1323] lg:border-b-0 lg:border-r lg:border-white/[0.07]">
      {/* Search header */}
      <div className="border-b border-white/[0.07] bg-[#0d1323] p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold tracking-tight text-white">
              Messages
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Your incoming conversations
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-lg border border-blue-400/15 bg-blue-500/[0.08] px-2.5 py-1.5 text-[11px] font-medium text-blue-300">
            <Mail size={13} />
            {messages.length} shown
          </span>
        </div>

        <label className="mt-5 flex h-11 items-center gap-2.5 rounded-xl border border-white/[0.08] bg-[#080d19] px-3 transition-all focus-within:border-blue-400/40 focus-within:ring-2 focus-within:ring-blue-400/[0.08]">
          <Search
            size={16}
            className="shrink-0 text-slate-500 transition-colors"
          />

          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search name, email, subject..."
            aria-label="Search messages"
            className="w-full min-w-0 bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-600"
          />

          {search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/[0.07] hover:text-white"
            >
              <X size={14} />
            </button>
          )}
        </label>
      </div>

      {/* Message list */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        {loading ? (
          <div className="space-y-3 p-3 sm:p-4" aria-label="Loading messages">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-2xl border border-white/[0.04] bg-white/[0.025] p-4"
              >
                <div className="flex gap-3">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-white/[0.06]" />
                  <div className="flex-1 space-y-2 pt-1">
                    <div className="h-3 w-2/3 rounded bg-white/[0.07]" />
                    <div className="h-2.5 w-1/2 rounded bg-white/[0.05]" />
                    <div className="h-3 w-full rounded bg-white/[0.05]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div
            role="alert"
            className="m-4 rounded-xl border border-rose-400/15 bg-rose-500/[0.06] p-4"
          >
            <p className="text-sm font-medium text-rose-300">
              Couldn't load messages
            </p>
            <p className="mt-1 text-xs leading-5 text-rose-200/60">
              {error}
            </p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.025]">
              {search ? (
                <Search size={23} className="text-slate-500" />
              ) : (
                <MessageSquareText size={23} className="text-slate-500" />
              )}
            </div>

            <p className="mt-4 text-sm font-semibold text-slate-200">
              {search ? "No matching messages" : "Your inbox is empty"}
            </p>

            <p className="mt-1.5 max-w-56 text-xs leading-5 text-slate-500">
              {search
                ? "Try another name, email address, or keyword."
                : "New portfolio inquiries will appear here when they arrive."}
            </p>
          </div>
        ) : (
          <div className="space-y-2 p-2.5 sm:p-3">
            {messages.map((message) => {
              const id = message._id || message.id;
              const active = String(id) === String(selectedId);
              const unread = message.read === false;
              const name = message.name || "Unknown sender";
              const avatarKey = message.email || name;
              const initials = name.trim().charAt(0).toUpperCase();
              const hasReplies =
                Array.isArray(message.replies) && message.replies.length > 0;

              return (
                <button
                  type="button"
                  key={id}
                  onClick={() => onSelect(id)}
                  aria-current={active ? "true" : undefined}
                  className={`group relative w-full overflow-hidden rounded-2xl border p-3.5 text-left transition-all duration-200 sm:p-4 ${
                    active
                      ? "border-blue-400/25 bg-gradient-to-br from-blue-500/[0.12] to-indigo-500/[0.04] shadow-lg shadow-blue-950/10"
                      : unread
                        ? "border-white/[0.075] bg-white/[0.025] hover:border-blue-400/20 hover:bg-white/[0.045]"
                        : "border-transparent bg-transparent hover:border-white/[0.06] hover:bg-white/[0.025]"
                  }`}
                >
                  {/* Active indicator */}
                  {active && (
                    <span className="absolute bottom-3 left-0 top-3 w-[3px] rounded-r-full bg-blue-400" />
                  )}

                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div
                      className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-sm font-bold ring-1 ${getAvatarColor(
                        avatarKey
                      )}`}
                    >
                      {initials}

                      {unread && (
                        <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-[#0d1323] bg-blue-400" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      {/* Sender and date */}
                      <div className="flex items-start justify-between gap-2">
                        <p
                          className={`truncate text-sm ${
                            unread
                              ? "font-semibold text-white"
                              : "font-medium text-slate-300"
                          }`}
                        >
                          {name}
                        </p>

                        <span className="shrink-0 pt-0.5 text-[10px] tabular-nums text-slate-500 sm:text-[11px]">
                          {formatDate(message.createdAt)}
                        </span>
                      </div>

                      <p className="mt-1 truncate text-xs text-slate-500">
                        {message.email || "No email provided"}
                      </p>

                      {/* Subject */}
                      <p
                        className={`mt-3 truncate text-[13px] ${
                          unread
                            ? "font-semibold text-slate-100"
                            : "font-medium text-slate-300"
                        }`}
                      >
                        {message.subject || "(No subject)"}
                      </p>

                      {/* Preview */}
                      <p className="mt-1.5 line-clamp-2 break-words text-xs leading-5 text-slate-500">
                        {message.message || "No message content"}
                      </p>

                      {/* Status */}
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        {unread ? (
                          <span className="inline-flex items-center gap-1.5 rounded-md border border-blue-400/15 bg-blue-500/[0.09] px-2 py-1 text-[10px] font-medium text-blue-300">
                            <Mail size={11} />
                            Unread
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-[10px] text-slate-500">
                            <MailOpen size={12} />
                            Read
                          </span>
                        )}

                        {hasReplies && (
                          <span className="inline-flex items-center gap-1 rounded-md border border-violet-400/15 bg-violet-500/[0.07] px-2 py-1 text-[10px] font-medium text-violet-300">
                            <MessageSquareText size={11} />
                            Replied
                          </span>
                        )}

                        {message.createdAt && (
                          <span className="ml-auto hidden items-center gap-1 text-[10px] text-slate-600 sm:inline-flex">
                            <Clock3 size={11} />
                            Received
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
