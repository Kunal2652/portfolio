
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RefreshCw } from "lucide-react";
import { adminApi } from "../../adminApi";
import AdminHeader from "../../components/admin/AdminHeader";
import InboxSidebar from "../../components/admin/InboxSidebar";
import MessageList from "../../components/admin/MessageList";
import MessageDetails from "../../components/admin/MessageDetails";
import ReplyComposer from "../../components/admin/ReplyComposer";
import { images } from "../../assets/images";

export default function AdminInbox() {
    const navigate = useNavigate();

    const [messages, setMessages] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [loading, setLoading] = useState(true);
    const [detailLoading, setDetailLoading] = useState(false);
    const [error, setError] = useState("");
    const [replyOpen, setReplyOpen] = useState(false);
    const [sending, setSending] = useState(false);
    const [logoutBusy, setLogoutBusy] = useState(false);
    const [notice, setNotice] = useState("");
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({
        total: 0,
        totalPages: 1,
    });

    const unreadCount = useMemo(
        () => messages.filter((message) => message.read === false).length,
        [messages]
    );

    const repliedCount = useMemo(
        () => messages.filter((message) => message.replies?.length > 0).length,
        [messages]
    );

    const loadMessages = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const result = await adminApi.getMessages({
                page,
                limit: 20,
                search,
                filter,
            });

            const rows = result.data || [];
            setMessages(rows);
            setPagination(result.pagination || { total: rows.length, totalPages: 1 });

            if (
                selectedId &&
                !rows.some(
                    (item) => String(item._id || item.id) === String(selectedId)
                )
            ) {
                setSelectedId(null);
                setSelectedMessage(null);
            }
        } catch (err) {
            if (err.status === 401) {
                navigate("/admin/login", { replace: true });
                return;
            }
            setError(err.message || "Unable to load messages.");
        } finally {
            setLoading(false);
        }
    }, [filter, navigate, page, search, selectedId]);

    useEffect(() => {
        let active = true;

        async function initialize() {
            try {
                await adminApi.getSession();
                if (active) await loadMessages();
            } catch {
                if (active) navigate("/admin/login", { replace: true });
            }
        }

        initialize();

        return () => {
            active = false;
        };
    }, [navigate, loadMessages]);

    async function openMessage(id) {
        setSelectedId(id);
        setSelectedMessage(null);
        setDetailLoading(true);
        setNotice("");

        try {
            const result = await adminApi.getMessage(id);
            const message = result.data || result.message || result;
            setSelectedMessage(message);

            if (message.read === false) {
                try {
                    await adminApi.markRead(id);
                    setMessages((current) =>
                        current.map((item) =>
                            String(item._id || item.id) === String(id)
                                ? { ...item, read: true }
                                : item
                        )
                    );
                    setSelectedMessage((current) =>
                        current ? { ...current, read: true } : current
                    );
                } catch {
                    // Reading the message should still work if marking it read fails.
                }
            }
        } catch (err) {
            if (err.status === 401) {
                navigate("/admin/login", { replace: true });
            } else {
                setNotice(err.message || "Unable to open this message.");
            }
        } finally {
            setDetailLoading(false);
        }
    }

    async function sendReply(payload) {
        if (!selectedId) return;

        setSending(true);
        setNotice("");

        try {
            const result = await adminApi.reply(selectedId, payload);

            if (result.success === false) {
                throw new Error(result.message || "The reply could not be sent.");
            }

            setReplyOpen(false);
            setNotice("Reply sent successfully.");

            // Refresh the saved conversation so the server remains the source of truth.
            const refreshed = await adminApi.getMessage(selectedId);
            const message = refreshed.data || refreshed.message || refreshed;
            setSelectedMessage(message);

            await loadMessages();
        } catch (err) {
            if (err.status === 401) {
                navigate("/admin/login", { replace: true });
            }
            throw err;
        } finally {
            setSending(false);
        }
    }

    async function handleLogout() {
        setLogoutBusy(true);

        try {
            await adminApi.logout();
        } catch {
            // Navigate away even if the session has already expired.
        } finally {
            navigate("/admin/login", { replace: true });
            setLogoutBusy(false);
        }
    }

    function changeFilter(nextFilter) {
        setFilter(nextFilter);
        setPage(1);
        setSelectedId(null);
        setSelectedMessage(null);
    }

    const counts = {
        all: pagination.total,
        unread: unreadCount,
        replied: repliedCount,
    };

    return (
        <main className="min-h-dvh bg-[#090c0b] text-white">
            <AdminHeader onLogout={handleLogout} busy={logoutBusy} />

            <div className="mx-auto max-w-[1800px] px-3 py-4 sm:px-5 sm:py-6 lg:px-8">

                <div className="mb-3 flex flex-col-reverse items-center justify-between gap-5 sm:flex-row sm:gap-6">
                    {/* Left: Profile image */}
                    <div className="flex shrink-0 items-center justify-center">
                        <img
                            src={images.kunal}
                            alt="Kunal"
                            className="h-24 w-24 rounded-2xl   object-cover   sm:h-28 sm:w-28"
                        />
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-400">
                                Communications
                            </p>

                            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                                Your inbox
                            </h1>

                            <p className="mt-2 max-w-md text-sm leading-6 text-gray-400">
                                Review inquiries and manage your conversations.
                            </p>
                        </div>
                    </div>

                    {/* Right: Inbox heading and refresh */}
                    <div className="flex w-full flex-col items-end text-right">

                        <button
                            type="button"
                            onClick={loadMessages}
                            disabled={loading}
                            className="mt-4 inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-green-400/40 bg-green-400/10 px-4 py-2 text-sm font-medium text-green-300 shadow-sm transition-all duration-200 hover:border-green-300 hover:bg-green-400/20 hover:text-green-200 focus:outline-none focus:ring-2 focus:ring-green-400/50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <RefreshCw
                                size={16}
                                className={loading ? "animate-spin" : ""}
                            />
                            {loading ? "Refreshing..." : "Refresh inbox"}
                        </button>
                    </div>
                </div>


                {notice && (
                    <div
                        role="status"
                        className="mb-4 flex items-center justify-between gap-3 rounded-xl border border-green-400/15 bg-green-400/[0.06] px-4 py-3 text-sm text-green-200"
                    >
                        <span>{notice}</span>
                        <button
                            type="button"
                            onClick={() => setNotice("")}
                            className="text-xs text-gray-400 hover:text-white"
                        >
                            Dismiss
                        </button>
                    </div>
                )}

                <div className="grid min-h-[68dvh] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0e1110] lg:h-[calc(100dvh-205px)] lg:min-h-[560px] lg:grid-cols-[190px_minmax(270px,340px)_minmax(0,1fr)] xl:grid-cols-[210px_minmax(300px,360px)_minmax(0,1fr)]">
                    <InboxSidebar
                        activeFilter={filter}
                        onFilterChange={changeFilter}
                        counts={counts}
                    />

                    <div
                        className={
                            selectedId
                                ? "hidden min-h-0 min-w-0 lg:flex lg:flex-col"
                                : "flex min-h-0 min-w-0 flex-col"
                        }
                    >
                        <MessageList
                            messages={messages}
                            selectedId={selectedId}
                            onSelect={openMessage}
                            search={search}
                            onSearchChange={(value) => {
                                setSearch(value);
                                setPage(1);
                            }}
                            loading={loading}
                            error={error}
                        />

                        <div className="flex items-center justify-between gap-3 border-t border-white/[0.07] px-4 py-3 text-xs text-gray-500">
                            <span>
                                Page {page} of {Math.max(1, pagination.totalPages)}
                            </span>

                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    disabled={page <= 1 || loading}
                                    onClick={() => setPage((value) => value - 1)}
                                    className="rounded-lg border border-white/[0.08] px-3 py-2 hover:text-white disabled:opacity-30"
                                >
                                    Previous
                                </button>
                                <button
                                    type="button"
                                    disabled={page >= pagination.totalPages || loading}
                                    onClick={() => setPage((value) => value + 1)}
                                    className="rounded-lg border border-white/[0.08] px-3 py-2 hover:text-white disabled:opacity-30"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>

                    <section
                        className={
                            selectedId
                                ? "flex min-h-0 min-w-0 flex-col"
                                : "hidden min-h-0 min-w-0 lg:flex lg:flex-col"
                        }
                    >
                        {notice && !selectedId ? (
                            <p role="alert" className="p-5 text-sm text-red-300">
                                {notice}
                            </p>
                        ) : null}

                        <MessageDetails
                            message={selectedMessage}
                            loading={detailLoading}
                            onBack={() => {
                                setSelectedId(null);
                                setSelectedMessage(null);
                            }}
                            onReply={() => setReplyOpen(true)}
                        />
                    </section>
                </div>

                <p className="mt-4 text-center text-xs leading-5 text-gray-600">
                    Private workspace · Message content is loaded from your authenticated backend.
                </p>
            </div>

            {replyOpen && selectedMessage && (
                <ReplyComposer
                    message={selectedMessage}
                    sending={sending}
                    onClose={() => {
                        if (!sending) setReplyOpen(false);
                    }}
                    onSend={sendReply}
                />
            )}
        </main>
    );
}
