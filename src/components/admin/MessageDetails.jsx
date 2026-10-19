
import {
  ArrowLeft,
  CalendarDays,
  Mail,
  Reply,
  UserRound,
  MessageSquareText,
  Clock3,
  CheckCircle2,
  Send,
} from "lucide-react";

function formatDate(value) {
  if (!value) return "Date unavailable";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return date.toLocaleString([], {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function MessageDetails({
  message,
  loading,
  onBack,
  onReply,
}) {
  if (loading) {
    return (
      <div className="min-h-0 flex-1 animate-pulse space-y-6 p-5 sm:p-7">
        <div className="h-5 w-32 rounded-full bg-white/[0.06]" />
        <div className="h-8 w-3/4 rounded-lg bg-white/[0.06]" />
        <div className="h-4 w-1/2 rounded bg-white/[0.04]" />

        <div className="mt-8 flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-white/[0.06]" />
          <div className="space-y-2">
            <div className="h-4 w-32 rounded bg-white/[0.06]" />
            <div className="h-3 w-44 rounded bg-white/[0.04]" />
          </div>
        </div>

        <div className="mt-10 space-y-3">
          <div className="h-4 w-full rounded bg-white/[0.04]" />
          <div className="h-4 w-full rounded bg-white/[0.04]" />
          <div className="h-4 w-4/5 rounded bg-white/[0.04]" />
          <div className="h-4 w-3/4 rounded bg-white/[0.04]" />
        </div>
      </div>
    );
  }

  if (!message) {
    return (
      <div className="flex min-h-[320px] flex-1 flex-col items-center justify-center bg-[#0b1020] px-6 text-center lg:min-h-0">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-blue-400/15 bg-gradient-to-br from-blue-500/10 to-violet-500/[0.06] shadow-xl shadow-blue-950/10">
          <Mail size={29} className="text-blue-300" />
          <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-xl border-4 border-[#0b1020] bg-violet-500/20 text-violet-300">
            <MessageSquareText size={13} />
          </span>
        </div>

        <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-blue-300">
          Message center
        </p>

        <h2 className="mt-2 text-xl font-semibold tracking-tight text-white">
          Select a conversation
        </h2>

        <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
          Choose a message from your inbox to view its details and respond.
        </p>
      </div>
    );
  }

  const date = formatDate(message.createdAt);
  const replies = Array.isArray(message.replies) ? message.replies : [];
  const name = message.name || "Unknown sender";
  const initial = name.trim().charAt(0).toUpperCase() || "?";

  return (
    <article className="flex min-h-0 min-w-0 flex-1 flex-col bg-[#0b1020]">
      {/* Message header */}
      <header className="border-b border-white/[0.07] bg-gradient-to-br from-[#111a30] via-[#0d1425] to-[#0b1020] px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
        <button
          type="button"
          onClick={onBack}
          className="mb-5 inline-flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-xs font-medium text-slate-400 transition hover:border-blue-400/25 hover:text-blue-300 lg:hidden"
        >
          <ArrowLeft size={15} />
          Back to messages
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-blue-300">
            <Mail size={12} />
            Incoming message
          </span>

          {replies.length > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1.5 text-[10px] font-medium text-violet-300">
              <MessageSquareText size={12} />
              {replies.length} {replies.length === 1 ? "reply" : "replies"}
            </span>
          )}

          {message.read === false && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1.5 text-[10px] font-medium text-cyan-300">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
              Unread
            </span>
          )}
        </div>

        <h1 className="mt-5 break-words text-xl font-semibold leading-snug tracking-tight text-white sm:text-2xl lg:text-[27px]">
          {message.subject || "(No subject)"}
        </h1>

        {/* Sender information */}
        <div className="mt-6 flex min-w-0 items-start gap-3 sm:gap-4">
          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-blue-400/20 bg-gradient-to-br from-blue-500/20 to-violet-500/10 text-lg font-semibold text-blue-200 shadow-lg shadow-blue-950/10">
            {initial}
            <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-[3px] border-[#10182a] bg-cyan-400" />
          </div>

          <div className="min-w-0 flex-1 pt-0.5">
            <p className="break-words text-sm font-semibold text-slate-100">
              {name}
            </p>

            <a
              href={`mailto:${message.email || ""}`}
              className="mt-1 inline-block max-w-full break-all text-xs text-blue-300/80 transition hover:text-blue-200"
            >
              {message.email || "No email provided"}
            </a>

            <p className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
              <CalendarDays size={13} className="shrink-0 text-slate-600" />
              {date}
            </p>
          </div>

          <button
            type="button"
            onClick={onReply}
            className="hidden shrink-0 items-center gap-2 rounded-xl border border-blue-400/20 bg-blue-500/[0.08] px-4 py-2.5 text-xs font-semibold text-blue-300 transition hover:border-blue-300/40 hover:bg-blue-500/[0.15] hover:text-blue-200 sm:inline-flex"
          >
            <Reply size={15} />
            Reply
          </button>
        </div>
      </header>

      {/* Message content and conversation history */}
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-6 sm:py-7 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-5 w-1 rounded-full bg-blue-400" />
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Message content
            </h2>
          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-[#101729] p-4 shadow-sm shadow-black/10 sm:p-6">
            <div className="whitespace-pre-wrap break-words text-sm leading-7 text-slate-300 sm:text-[14px] sm:leading-8">
              {message.message || "No message content."}
            </div>
          </div>

          {/* Reply history */}
          {replies.length > 0 && (
            <section className="mt-9">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/15 bg-violet-500/10">
                    <MessageSquareText
                      size={16}
                      className="text-violet-300"
                    />
                  </div>

                  <div>
                    <h2 className="text-sm font-semibold text-white">
                      Conversation history
                    </h2>
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      Your previous responses
                    </p>
                  </div>
                </div>

                <span className="rounded-lg border border-white/[0.07] bg-white/[0.025] px-2.5 py-1 text-[11px] text-slate-400">
                  {replies.length} total
                </span>
              </div>

              <div className="relative space-y-4 pl-3 before:absolute before:bottom-5 before:left-[17px] before:top-5 before:w-px before:bg-gradient-to-b before:from-violet-400/40 before:to-transparent">
                {replies.map((reply, index) => (
                  <div
                    key={reply._id || `${reply.sentAt}-${index}`}
                    className="relative pl-8"
                  >
                    <div className="absolute left-0 top-4 flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/20 bg-[#15142b]">
                      <Reply size={15} className="text-violet-300" />
                    </div>

                    <div className="rounded-2xl border border-white/[0.07] bg-[#101729] p-4 sm:p-5">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-100">
                            Your reply
                          </p>
                          {reply.subject && (
                            <p className="mt-1 break-words text-xs text-slate-400">
                              {reply.subject}
                            </p>
                          )}
                        </div>

                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium ${
                            reply.status === "failed"
                              ? "border-rose-400/20 bg-rose-500/[0.08] text-rose-300"
                              : "border-cyan-400/15 bg-cyan-500/[0.07] text-cyan-300"
                          }`}
                        >
                          {reply.status === "failed" ? (
                            "Failed"
                          ) : (
                            <>
                              <CheckCircle2 size={11} />
                              {reply.status === "sent" ? "Sent" : "Recorded"}
                            </>
                          )}
                        </span>
                      </div>

                      <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-7 text-slate-300">
                        {reply.message}
                      </p>

                      <div className="mt-4 flex items-center gap-1.5 border-t border-white/[0.06] pt-3 text-[11px] text-slate-500">
                        <Clock3 size={12} />
                        {formatDate(reply.sentAt)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Bottom action bar */}
      <footer className="border-t border-white/[0.07] bg-[#0d1323] px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="hidden items-center gap-2 text-xs text-slate-500 sm:flex">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.04]">
              <Mail size={13} />
            </span>
            Reply directly to this inquiry
          </div>

          <button
            type="button"
            onClick={onReply}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 px-5 text-sm font-semibold text-white shadow-lg shadow-blue-950/30 transition hover:from-blue-400 hover:to-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1020] sm:ml-auto sm:w-auto"
          >
            <Send size={16} />
            Write a reply
          </button>
        </div>
      </footer>
    </article>
  );
}
