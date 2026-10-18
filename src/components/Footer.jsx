import {  Mail, ArrowUpRight } from "lucide-react";

const socials = [
  {
    name: "GitHub",
    href: "https://github.com/Kunal2652",
    icon: Mail,
    color: "hover:bg-white hover:text-black",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/kunal-lohchab-045806290/",
    icon: Mail,
    color: "hover:bg-sky-400 hover:text-gray-950",
  },
  {
    name: "Email",
    href: "kunal10943@gmail.com",
    icon: Mail,
    color: "hover:bg-amber-300 hover:text-gray-950",
  },
];

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-[#080b12]">
      {/* Crazy colorful background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 -top-40 h-[430px] w-[430px] rounded-full bg-fuchsia-600/40 blur-[110px]" />
        <div className="absolute left-[30%] top-20 h-[350px] w-[350px] rounded-full bg-violet-600/35 blur-[120px]" />
        <div className="absolute -right-20 top-0 h-[400px] w-[400px] rounded-full bg-cyan-500/30 blur-[110px]" />
        <div className="absolute -bottom-48 left-[40%] h-[400px] w-[500px] rounded-full bg-emerald-400/20 blur-[120px]" />

        {/* Neon gradient streak */}
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent opacity-80" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
            maskImage:
              "linear-gradient(to bottom, black, transparent 95%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
        <div className="flex flex-col justify-between gap-12 sm:flex-row sm:items-center sm:gap-8">

          {/* LEFT: Name and introduction */}
          <div className="max-w-3xl">
            <div className="mb-7 flex items-center gap-3">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-lime-300 shadow-[0_0_18px_rgba(190,242,100,0.9)]" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-300">
                Thanks for stopping by
              </span>
            </div>

            <a
              href="/"
              aria-label="Kunal home"
              className="group inline-block"
            >
              <h2 className="text-4xl font-black leading-[0.9] tracking-[-0.08em] text-white transition duration-500 sm:text-3xl md:text-4xl lg:text-[5rem]">
                KUNAL
                <span className="bg-gradient-to-r from-fuchsia-400 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
                  .
                </span>
              </h2>
            </a>

            <p className="mt-7 max-w-lg text-base leading-7 text-gray-300 sm:text-lg">
              Developer by passion. Researcher by curiosity.
              <span className="mt-1 block text-gray-400">
                Building ideas into experiences that matter.
              </span>
            </p>

            <a
              href="mailto:kunal10943@gmail.com"
              className="group mt-8 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/[0.07] px-5 py-3 text-sm font-medium text-white backdrop-blur-xl transition duration-300 hover:border-fuchsia-300/70 hover:bg-fuchsia-400/15"
            >
              Let's connect
              <ArrowUpRight
                size={17}
                className="text-fuchsia-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </div>

          {/* RIGHT: Social icons in a vertical column */}
          <div className="flex flex-row gap-4 sm:flex-col sm:items-center sm:gap-5">
            {socials.map(({ name, href, icon: Icon, color }) => (
              <a
                key={name}
                href={href}
                aria-label={name}
                title={name}
                target={name === "Email" ? undefined : "_blank"}
                rel={name === "Email" ? undefined : "noopener noreferrer"}
                className={`group flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/[0.08] text-white shadow-lg shadow-black/10 backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:border-transparent hover:shadow-[0_0_28px_rgba(255,255,255,0.15)] ${color}`}
              >
                <Icon
                  size={22}
                  strokeWidth={1.8}
                  className="transition-transform duration-300 group-hover:rotate-[-8deg]"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-16 flex flex-col gap-3 border-t border-white/15 pt-6 text-xs text-gray-400 sm:mt-20 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Kunal. All rights reserved.</p>
          <p className="tracking-wide">
            DESIGNED WITH <span className="text-fuchsia-400">✦</span> BUILT WITH CODE
          </p>
          <a
            href="#top"
            onClick={(event) => {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="w-fit transition-colors hover:text-cyan-300"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}