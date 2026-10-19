
import {
  ArrowDownRight,
  Code2,
  GraduationCap,
  Lightbulb,
  Sparkles,
  Target,
} from "lucide-react";
import SectionLabel from "./SectionLabel";

const facts = [
  {
    number: "01",
    label: "Problem solver",
    description: "Breaking complex problems into practical solutions.",
    icon: Target,
  },
  {
    number: "02",
    label: "Product focused",
    description: "Building experiences around real user needs.",
    icon: Lightbulb,
  },
  {
    number: "03",
    label: "Always learning",
    description: "Exploring new tools, ideas, and technologies.",
    icon: Sparkles,
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative isolate overflow-hidden bg-[#0b0e0d] px-4 py-20 text-white sm:px-6 sm:py-24 md:px-8 md:py-28 lg:py-32"
    >
      {/* Subtle background accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-16 -z-10 h-72 w-72 rounded-full bg-green-400/[0.07] blur-[100px] sm:h-96 sm:w-96"
      />

      <div className="mx-auto max-w-7xl">
        <SectionLabel>ABOUT ME</SectionLabel>

        {/* Main introduction */}
        <div className="mt-8 grid grid-cols-1 gap-10 lg:mt-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-16 xl:gap-24">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/[0.06] px-3 py-1.5 text-xs font-medium tracking-wide text-green-300 sm:text-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              A little about me
            </div>

            <h2 className="text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl">
              Technology is powerful.
              <span className="mt-2 block text-gray-500">
                What we build with it matters.
              </span>
            </h2>

            <div className="mt-7 flex items-start gap-3 border-l-2 border-green-400/60 pl-4 sm:mt-9 sm:pl-5">
              <p className="max-w-xl text-sm leading-7 text-gray-300 sm:text-base sm:leading-8">
                I'm a Computer Science Engineering student who enjoys
                turning ideas into practical digital experiences. I care
                about building technology that solves problems, serves
                people, and creates meaningful impact.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10">
              <div className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-400/10 text-green-400">
                  <GraduationCap size={21} strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    Computer Science
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    Engineering student
                  </p>
                </div>
              </div>

              <a
                href="#projects"
                className="group inline-flex min-h-[64px] items-center gap-2 rounded-xl px-3 py-3 text-sm font-medium text-gray-300 transition-colors hover:text-green-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 sm:px-4"
              >
                Explore my work
                <ArrowDownRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
                />
              </a>
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-5 lg:pt-5">
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111614] p-5 sm:p-7 md:p-8">
              <div
                aria-hidden="true"
                className="absolute right-0 top-0 h-32 w-32 rounded-full bg-green-400/[0.06] blur-3xl"
              />

              <div className="relative">
                <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-green-400">
                  <Code2 size={16} />
                  What I enjoy building
                </div>

                <p className="text-base leading-7 text-gray-300 sm:text-lg sm:leading-8">
                  My interests span{" "}
                  <span className="font-medium text-white">
                    full-stack development
                  </span>
                  ,{" "}
                  <span className="font-medium text-white">
                    mobile applications
                  </span>
                  , and{" "}
                  <span className="font-medium text-white">
                    machine learning
                  </span>
                  . I enjoy taking an idea from an initial concept to a
                  working product.
                </p>

            

                <div className="mt-6 flex flex-wrap gap-2">
                  {["React", "Node.js", "Mobile Apps", "Machine Learning","Research Papers"].map(
                    (skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-gray-300 sm:text-sm"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Principles */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {facts.map((fact) => {
                const Icon = fact.icon;

                return (
                  <article
                    key={fact.number}
                    className="group rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-green-400/30 hover:bg-green-400/[0.035] sm:p-5 lg:p-4 xl:p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-medium tracking-widest text-gray-600">
                        {fact.number}
                      </span>
                      <Icon
                        size={19}
                        strokeWidth={1.7}
                        className="text-green-400 transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>

                    <h3 className="mt-4 text-sm font-semibold text-gray-100 sm:text-base">
                      {fact.label}
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-gray-500 sm:text-sm">
                      {fact.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
