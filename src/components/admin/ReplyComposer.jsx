
import { useEffect, useState } from "react";
import { LoaderCircle, Send, X } from "lucide-react";

export default function ReplyComposer({
  message,
  onClose,
  onSend,
  sending = false,
}) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setSubject(
      message?.subject
        ? /^re:/i.test(message.subject)
          ? message.subject
          : `Re: ${message.subject}`
        : "Re: Your message"
    );
    setBody("");
    setError("");
  }, [message?._id, message?.id]);

  if (!message) return null;

  async function handleSubmit(event) {
    event.preventDefault();

    if (!subject.trim() || !body.trim()) {
      setError("Please provide a subject and reply message.");
      return;
    }

    if (body.trim().length > 10000) {
      setError("Your reply must be 10,000 characters or fewer.");
      return;
    }

    setError("");

    try {
      await onSend({
        subject: subject.trim(),
        message: body.trim(),
      });
    } catch (sendError) {
      setError(sendError.message || "Unable to send your reply.");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !sending) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="reply-title"
        className="flex max-h-[94dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl border border-white/[0.1] bg-[#101412] shadow-2xl sm:rounded-2xl"
      >
        <header className="flex items-center justify-between gap-3 border-b border-white/[0.08] px-4 py-4 sm:px-6">
          <div>
            <h2 id="reply-title" className="text-base font-semibold text-white">
              Compose reply
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Respond directly to the original sender.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={sending}
            aria-label="Close reply composer"
            className="rounded-lg p-2 text-gray-400 hover:bg-white/[0.05] hover:text-white disabled:opacity-50"
          >
            <X size={19} />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="space-y-4 overflow-y-auto p-4 sm:p-6">
            <div>
              <label className="text-xs font-medium text-gray-400">
                To
              </label>
              <div className="mt-2 break-all rounded-lg border border-white/[0.07] bg-black/20 px-3 py-3 text-sm text-gray-300">
                {message.email}
              </div>
              <p className="mt-1.5 text-[11px] text-gray-600">
                Recipient is taken from the saved contact message.
              </p>
            </div>

            <div>
              <label
                htmlFor="reply-subject"
                className="text-xs font-medium text-gray-400"
              >
                Subject
              </label>
              <input
                id="reply-subject"
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                maxLength={180}
                required
                className="mt-2 w-full rounded-lg border border-white/[0.09] bg-black/20 px-3 py-3 text-sm text-white outline-none transition focus:border-green-400/50"
              />
            </div>

            <div>
              <div className="flex items-center justify-between gap-2">
                <label
                  htmlFor="reply-body"
                  className="text-xs font-medium text-gray-400"
                >
                  Message
                </label>
                <span className="text-[11px] text-gray-600">
                  {body.length}/10,000
                </span>
              </div>

              <textarea
                id="reply-body"
                value={body}
                onChange={(event) => setBody(event.target.value)}
                placeholder={`Hi ${message.name || "there"},\n\nThank you for reaching out...`}
                rows={9}
                maxLength={10000}
                required
                className="mt-2 min-h-48 w-full resize-y rounded-lg border border-white/[0.09] bg-black/20 px-3 py-3 text-sm leading-7 text-gray-200 outline-none transition placeholder:text-gray-600 focus:border-green-400/50"
              />
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-lg border border-red-400/20 bg-red-400/[0.06] p-3 text-sm text-red-300"
              >
                {error}
              </p>
            )}
          </div>

          <footer className="flex flex-col-reverse gap-2 border-t border-white/[0.08] p-4 sm:flex-row sm:justify-between sm:px-6">
            <button
              type="button"
              onClick={onClose}
              disabled={sending}
              className="min-h-11 rounded-xl border border-white/[0.09] px-4 text-sm text-gray-300 hover:bg-white/[0.04] disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={sending || !body.trim() || !subject.trim()}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-green-400 px-5 text-sm font-semibold text-[#07100a] transition hover:bg-green-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {sending ? (
                <LoaderCircle size={17} className="animate-spin" />
              ) : (
                <Send size={16} />
              )}
              {sending ? "Sending reply..." : "Send reply"}
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
}
