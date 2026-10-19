
import { useEffect, useState } from "react";
import { LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { adminApi } from "../../adminApi";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    adminApi
      .getSession()
      .then(() => {
        if (active) navigate("/admin/inbox", { replace: true });
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [navigate]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await adminApi.login(email.trim(), password);
      await adminApi.getSession();
      navigate("/admin/inbox", { replace: true });
    } catch (err) {
      setError(err.message || "Unable to sign in. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <main className="grid min-h-dvh place-items-center bg-[#090c0b] text-sm text-gray-400">
        Checking secure session...
      </main>
    );
  }

  return (
    <main className="relative grid min-h-dvh place-items-center overflow-hidden bg-[#090c0b] px-4 py-10 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/4 h-72 w-72 -translate-x-1/2 rounded-full bg-green-400/[0.07] blur-[100px] sm:h-96 sm:w-96"
      />

      <section className="relative w-full max-w-md rounded-2xl border border-white/[0.09] bg-[#101412]/95 p-6 shadow-2xl sm:p-9">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-green-400/20 bg-green-400/10 text-green-300">
          <ShieldCheck size={24} />
        </div>

        <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-green-400">
          Private workspace
        </p>

        <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          Admin sign in
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-400">
          Sign in to access and respond to portfolio messages.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="admin-email"
              className="text-sm font-medium text-gray-300"
            >
              Admin email
            </label>

            <div className="mt-2 flex items-center gap-3 rounded-xl border border-white/[0.1] bg-[#090c0b] px-3 focus-within:border-green-400/50">
              <Mail size={17} className="text-gray-500" />
              <input
                id="admin-email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="min-h-12 w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
                placeholder="admin@example.com"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="text-sm font-medium text-gray-300"
            >
              Password
            </label>

            <div className="mt-2 flex items-center gap-3 rounded-xl border border-white/[0.1] bg-[#090c0b] px-3 focus-within:border-green-400/50">
              <LockKeyhole size={17} className="text-gray-500" />
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="min-h-12 w-full min-w-0 bg-transparent text-sm text-white outline-none"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg border border-red-400/20 bg-red-400/[0.06] p-3 text-sm text-red-300"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="min-h-12 w-full rounded-xl bg-green-400 px-4 text-sm font-semibold text-[#07100a] transition hover:bg-green-300 disabled:opacity-50"
          >
            {submitting ? "Signing in..." : "Sign in securely"}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-600">
          <LockKeyhole size={13} />
          Protected by server-side authentication
        </div>
      </section>
    </main>
  );
}
