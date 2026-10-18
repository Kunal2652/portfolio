import { useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  
  Mail,
  MapPin,
  MessageSquare,
  Send,
} from "lucide-react";
import SectionLabel from "./SectionLabel";

const contactDetails = [
  {
    label: "Email",
    value: "kunal10943@gmail.com",
    href: "mailto:YOUR_EMAIL@example.com",
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
    icon: Mail,
  },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: "" }));
    setSubmitted(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!form.subject.trim()) {
      nextErrors.subject = "Please enter a subject.";
    }
    if (form.message.trim().length < 10) {
      nextErrors.message = "Please write at least 10 characters.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    const recipient = "YOUR_EMAIL@example.com";
    const subject = encodeURIComponent(form.subject.trim());
    const body = encodeURIComponent(
      `Name: ${form.name.trim()}\nEmail: ${form.email.trim()}\n\n${form.message.trim()}`
    );

    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-white/[0.10] bg-[#0b0d0f] px-4 py-3.5 text-sm text-white outline-none transition duration-200 placeholder:text-gray-600 focus:border-green-400/60 focus:ring-2 focus:ring-green-400/10";

  return (
    <section
      id="contact"
      className="relative mx-auto max-w-7xl overflow-hidden px-5 py-20 sm:px-8 md:py-28"
    >
      {/* Subtle background accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-16 -z-10 h-72 w-72 rounded-full bg-green-400/[0.05] blur-[110px]"
      />

      {/* Heading */}
      <div className="mb-12 sm:mb-16">
         <div className="flex flex-row justify-between items-end">
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
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                  className={`${inputClass} ${errors.name ? "border-red-400/70" : ""}`}
                />
                {errors.name && (
                  <p id="contact-name-error" className="mt-1.5 text-xs text-red-400">
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
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                  className={`${inputClass} ${errors.email ? "border-red-400/70" : ""}`}
                />
                {errors.email && (
                  <p id="contact-email-error" className="mt-1.5 text-xs text-red-400">
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
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                className={`${inputClass} ${errors.subject ? "border-red-400/70" : ""}`}
              />
              {errors.subject && (
                <p id="contact-subject-error" className="mt-1.5 text-xs text-red-400">
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
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
                className={`${inputClass} min-h-36 resize-y leading-7 ${errors.message ? "border-red-400/70" : ""}`}
              />
              {errors.message && (
                <p id="contact-message-error" className="mt-1.5 text-xs text-red-400">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-green-400 px-5 py-4 text-sm font-semibold text-gray-950 transition duration-300 hover:bg-green-300 hover:shadow-[0_0_30px_rgba(134,239,172,0.12)] sm:w-auto"
            >
              Submit 
              <Send
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
              />
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
                  rel={label === "Email" ? undefined : "noopener noreferrer"}
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
    </section>
  );
}