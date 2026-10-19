
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  Mail,
  MapPin,
  MessageSquare,
  Send,
  X,
  // Github,
  // Linkedin,
  LoaderCircle,
} from "lucide-react";
import SectionLabel from "./SectionLabel";

const contactDetails = [
  {
    label: "Email",
    value: "kunal10943@gmail.com",
    href: "mailto:kunal10943@gmail.com",
    icon: Mail,
  },
  {
    label: "GitHub",
    value: "github.com/Kunal2652",
    href: "https://github.com/Kunal2652",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "Connect professionally",
    href: "https://linkedin.com/in/YOUR_USERNAME",
    icon: Mail,
  },
  {
    label: "IEEE",
    value: "IEEE Xplore",
    href: "https://ieeexplore.ieee.org/author/374424061740957",
    icon: ArrowUpRight,
  },
];

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const inputClass =
    "mt-2 w-full rounded-xl border border-white/[0.10] bg-[#0b0d0f] px-4 py-3.5 text-sm text-white outline-none transition duration-200 placeholder:text-gray-600 focus:border-green-400/60 focus:ring-2 focus:ring-green-400/10";

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setServerError("");
  }

  // Close the dialog with Escape and prevent background scrolling.
  useEffect(() => {
    if (!showSuccess) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setShowSuccess(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [showSuccess]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) return;

    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Please enter your name.";
    } else if (form.name.trim().length > 100) {
      nextErrors.name = "Name must be under 100 characters.";
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) ||
      form.email.trim().length > 254
    ) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.subject.trim()) {
      nextErrors.subject = "Please enter a subject.";
    } else if (form.subject.trim().length > 150) {
      nextErrors.subject = "Subject must be under 150 characters.";
    }

    if (form.message.trim().length < 10) {
      nextErrors.message = "Please write at least 10 characters.";
    } else if (form.message.trim().length > 5000) {
      nextErrors.message = "Message must be under 5000 characters.";
    }

    setErrors(nextErrors);
    setServerError("");

    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);

    try {
      const apiUrl = (
        import.meta.env.VITE_API_URL || "http://localhost:5000"
      ).replace(/\/+$/, "");

      const response = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to send your message. Please try again."
        );
      }

      setForm(initialForm);
      setShowSuccess(true);
    } catch (error) {
      setServerError(
        error.message ||
          "Unable to connect to the server. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      id="contact"
      className="relative mx-auto max-w-7xl overflow-hidden px-5 py-20 sm:px-8 md:py-28"
    >
      <style>{`
        @keyframes contactBackdropIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes contactDialogIn {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.94);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes contactCheckIn {
          from {
            opacity: 0;
            transform: scale(0.4) rotate(-20deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(0);
          }
        }

        @keyframes contactRing {
          0% { transform: scale(0.85); opacity: 0.7; }
          100% { transform: scale(1.45); opacity: 0; }
        }

        .contact-backdrop {
          animation: contactBackdropIn 220ms ease-out both;
        }

        .contact-dialog {
          animation: contactDialogIn 420ms cubic-bezier(.2,.8,.2,1) both;
        }

        .contact-check {
          animation: contactCheckIn 500ms cubic-bezier(.2,.8,.2,1) 120ms both;
        }

        .contact-ring {
          animation: contactRing 1.8s ease-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .contact-backdrop,
          .contact-dialog,
          .contact-check,
          .contact-ring {
            animation: none !important;
          }
        }
      `}</style>

      {/* Background accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-16 -z-10 h-72 w-72 rounded-full bg-green-400/[0.05] blur-[110px]"
      />

      {/* Heading */}
      <div className="mb-12 sm:mb-16">
        <div className="flex items-end justify-between">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-green-400">
            Have a project in mind?
          </p>
          <SectionLabel number="06">GET IN TOUCH</SectionLabel>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.65fr] lg:items-end">
          <div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
              Let's start a
              <br />
              <span className="text-gray-500">conversation.</span>
            </h1>
          </div>

          <p className="max-w-lg text-sm leading-7 text-gray-400 sm:text-base sm:leading-8 lg:justify-self-end">
            Whether you have an exciting project, a research collaboration,
            or simply want to connect, I’d love to hear from you.
          </p>
        </div>
      </div>

      {/* Contact layout */}
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Contact form */}
        <div className="rounded-3xl border border-white/[0.09] bg-[#111416] p-6 sm:p-8 lg:p-10">
          <div className="mb-8 flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-green-400/20 bg-green-400/[0.08] text-green-400">
              <MessageSquare size={21} strokeWidth={1.7} />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white">
                Send me a message
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                Fill in the details and tell me what you have in mind.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="text-sm font-medium text-gray-300"
                >
                  Your name <span className="text-green-400">*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  autoComplete="name"
                  maxLength={100}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={
                    errors.name ? "contact-name-error" : undefined
                  }
                  className={`${inputClass} ${
                    errors.name ? "border-red-400/70" : ""
                  }`}
                />
                {errors.name && (
                  <p
                    id="contact-name-error"
                    className="mt-1.5 text-xs text-red-400"
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="text-sm font-medium text-gray-300"
                >
                  Email address <span className="text-green-400">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  autoComplete="email"
                  maxLength={254}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={
                    errors.email ? "contact-email-error" : undefined
                  }
                  className={`${inputClass} ${
                    errors.email ? "border-red-400/70" : ""
                  }`}
                />
                {errors.email && (
                  <p
                    id="contact-email-error"
                    className="mt-1.5 text-xs text-red-400"
                  >
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-subject"
                className="text-sm font-medium text-gray-300"
              >
                Subject <span className="text-green-400">*</span>
              </label>
              <input
                id="contact-subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Project collaboration"
                maxLength={150}
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={
                  errors.subject ? "contact-subject-error" : undefined
                }
                className={`${inputClass} ${
                  errors.subject ? "border-red-400/70" : ""
                }`}
              />
              {errors.subject && (
                <p
                  id="contact-subject-error"
                  className="mt-1.5 text-xs text-red-400"
                >
                  {errors.subject}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="text-sm font-medium text-gray-300"
              >
                Your message <span className="text-green-400">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me a little about your idea..."
                rows={5}
                maxLength={5000}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={
                  errors.message ? "contact-message-error" : undefined
                }
                className={`${inputClass} min-h-36 resize-y leading-7 ${
                  errors.message ? "border-red-400/70" : ""
                }`}
              />
              {errors.message && (
                <p
                  id="contact-message-error"
                  className="mt-1.5 text-xs text-red-400"
                >
                  {errors.message}
                </p>
              )}
            </div>

            {serverError && (
              <div
                role="alert"
                className="rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-sm leading-6 text-red-300"
              >
                {serverError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-green-400 px-5 py-4 text-sm font-semibold text-gray-950 transition duration-300 hover:bg-green-300 hover:shadow-[0_0_30px_rgba(134,239,172,0.12)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {isSubmitting ? (
                <>
                  Sending...
                  <LoaderCircle size={16} className="animate-spin" />
                </>
              ) : (
                <>
                  Submit
                  <Send
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                  />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Contact information */}
        <aside className="flex flex-col gap-5">
          <div className="flex-1 rounded-3xl border border-white/[0.09] bg-[#111416] p-6 sm:p-8 lg:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-400">
              Contact information
            </p>

            <h2 className="mt-4 text-2xl font-semibold leading-snug text-white sm:text-3xl">
              Let's connect beyond the screen.
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-400">
              I’m interested in meaningful collaborations, innovative
              products, software development, and research opportunities.
            </p>

            <div className="mt-8 space-y-3">
              {contactDetails.map(({ label, value, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={label === "Email" ? undefined : "_blank"}
                  rel={
                    label === "Email" ? undefined : "noopener noreferrer"
                  }
                  className="group flex min-w-0 items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 transition duration-300 hover:border-green-400/25 hover:bg-green-400/[0.04]"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] text-gray-300 transition-colors group-hover:text-green-400">
                    <Icon size={19} strokeWidth={1.7} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-xs text-gray-500">
                      {label}
                    </span>
                    <span className="mt-1 block break-words text-sm font-medium text-gray-200 transition-colors group-hover:text-green-300">
                      {value}
                    </span>
                  </span>

                  <ArrowUpRight
                    size={17}
                    className="shrink-0 text-gray-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-green-400"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Personal note */}
          <div className="relative overflow-hidden rounded-3xl border border-green-400/15 bg-gradient-to-br from-[#17231c] to-[#101412] p-6 sm:p-8">
            <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-green-400/[0.08] blur-3xl" />

            <div className="relative">
              <div className="flex items-center gap-2 text-sm font-medium text-green-300">
                <MapPin size={16} />
                <span>Based in India</span>
              </div>

              <p className="mt-4 text-lg font-medium leading-7 text-white">
                Good ideas start with a conversation.
              </p>

              <p className="mt-2 text-sm leading-6 text-gray-400">
                Have a challenge worth solving? Let’s explore what we can
                create together.
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* Animated success dialog */}
      {showSuccess && (
        <div
          className="contact-backdrop fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-md"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowSuccess(false);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-success-title"
            aria-describedby="contact-success-description"
            className="contact-dialog relative my-auto w-full max-w-md overflow-hidden rounded-3xl border border-yellow-100 bg-[#111614] p-7 text-center shadow-[0_25px_100px_rgba(0,0,0,0.55)] sm:p-10"
          >
            <button
              type="button"
              onClick={() => setShowSuccess(false)}
              aria-label="Close success dialog"
              className="absolute right-4 top-4 rounded-full p-2 text-gray-400 transition hover:bg-white/[0.06] hover:text-white"
            >
              <X size={19} />
            </button>

            <div className="relative mx-auto mb-7 flex h-24 w-24 items-center justify-center">
              <div className="contact-ring absolute inset-0 rounded-full border border-green-400/40" />
              <div className="absolute inset-2 rounded-full bg-green-400/[0.08]" />
              <div className="contact-check relative flex h-20 w-20 items-center justify-center rounded-full border border-green-400/30 bg-green-400/[0.12] text-green-300 shadow-[0_0_45px_rgba(134,239,172,0.12)]">
                <CheckCircle2 size={43} strokeWidth={1.5} />
              </div>
            </div>

      
            <h2
              id="contact-success-title"
              className="text-3xl font-bold tracking-tight text-red-300 sm:text-4xl"
            >
              Thank you!
              <br />
             
            </h2>

            <p
              id="contact-success-description"
              className="mx-auto mt-5 max-w-sm text-sm leading-7 text-gray-100 sm:text-base"
            >
              Your message has been received successfully. I'll review it and
              get back to you as soon as possible. Looking forward to connecting
              with you! 💚
            </p>

            <div className="mt-8 rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-3">
              <p className="text-sm text-gray-100">
                <span className="text-green-300">✓ </span>{" "}
                Message saved successfully
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowSuccess(false)}
              autoFocus
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-400 px-5 py-3.5 text-sm font-semibold text-gray-950 transition hover:bg-green-300 hover:shadow-[0_0_30px_rgba(134,239,172,0.15)]"
            >
              Back to portfolio
              <ArrowUpRight size={17} />
            </button>

       
          </div>
        </div>
      )}
    </section>
  );
}
