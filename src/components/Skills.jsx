
import SectionLabel from "./SectionLabel";
import { skills } from "../data/skills";

export default function Skills() {
  return (
    <section className="relative overflow-hidden bg-[#0b0d0f] py-20 text-white md:py-28">
      {/* Background Accent */}
      <div className="pointer-events-none absolute -right-40 top-32 h-96 w-96 rounded-full bg-green-400/[0.04] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionLabel>TECHNICAL EXPERTISE</SectionLabel>

        {/* Heading */}
        <div className="mb-14 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_0.65fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-green-400">
              MY TECH STACK
            </p>

            <h2 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              The tools behind
              <br />
              <span className="text-gray-500">
                the things I build.
              </span>
            </h2>
          </div>

          <p className="max-w-lg text-base leading-8 text-gray-300 lg:justify-self-end">
            From crafting interfaces and building APIs to developing
            mobile applications and experimenting with machine learning,
            these are the technologies I use to bring ideas to life.
          </p>
        </div>

        {/* Skills Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {skills.map((group) => (
            <article
              key={group.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111416] p-6 transition duration-300 hover:-translate-y-1 hover:border-green-400/40 hover:bg-[#131816] sm:p-7"
            >
              {/* Hover Glow */}
              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-green-400/0 blur-3xl transition duration-500 group-hover:bg-green-400/10" />

              {/* Card Header */}
              <div className="relative flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-green-400/20 bg-green-400/[0.07] font-mono text-xl font-bold text-green-400 transition duration-300 group-hover:border-green-400/40 group-hover:bg-green-400 group-hover:text-gray-950">
                  {group.symbol}
                </div>

                <span className="font-mono text-xs tracking-widest text-gray-500">
                  {group.number}
                </span>
              </div>

              {/* Category */}
              <div className="relative mt-7">
                <h3 className="text-xl font-bold tracking-tight text-white transition group-hover:text-green-300">
                  {group.title}
                </h3>

                <p className="mt-2 min-h-12 text-sm leading-6 text-gray-400">
                  {group.subtitle}
                </p>
              </div>

              {/* Technology List */}
              <div className="relative mt-6 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-white/[0.08] bg-white/[0.025] px-3 py-2 text-xs font-medium text-gray-300 transition duration-200 hover:border-green-400/30 hover:bg-green-400/[0.06] hover:text-green-300"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Bottom Accent */}
              <div className="mt-7 h-px w-full bg-white/[0.06]">
                <div className="h-px w-0 bg-green-400 transition-all duration-500 group-hover:w-full" />
              </div>
            </article>
          ))}
        </div>

        {/* Technology Overview */}
        <div className="mt-10 flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <p className="text-sm font-semibold text-white">
              Always expanding my toolkit.
            </p>
            <p className="mt-1 text-sm text-gray-400">
              Learning new technologies through projects and research.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm font-medium text-green-400">
            <span className="h-2 w-2 rounded-full bg-green-400" />
            Learn. Build. Improve.
          </div>
        </div>
      </div>
    </section>
  );
}
