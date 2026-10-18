
import { Link } from "react-router-dom";
import { images } from "../assets/images";

const highlights = [
  {
    number: "01",
    title: "Full-Stack Development",
    description: "Web applications and backend systems",
    path: "/projects",
  },
  {
    number: "02",
    title: "Mobile & Web",
    description: "Responsive and user-focused experiences",
    path: "/skills",
  },
  {
    number: "03",
    title: "Research & ML",
    description: "Deep learning and applied research",
    path: "/research",
  },
];

const technologies = [
  "React",
  "Node.js",
  "MongoDB",
  "React Native",
  "Python",
  "Machine Learning",
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-[#0b0d0f] text-white"
    >
      {/* Background decoration */}
  <div className="absolute -left-32 -top-40 h-[430px] w-[430px] rounded-full bg-fuchsia-600/40 blur-[110px]" />
        <div className="absolute left-[30%] top-20 h-[350px] w-[350px] rounded-full bg-violet-600/35 blur-[120px]" />
        <div className="absolute -right-20 top-0 h-[400px] w-[400px] rounded-full bg-cyan-500/30 blur-[110px]" />
        <div className="absolute -bottom-48 left-[40%] h-[400px] w-[500px] rounded-full bg-emerald-400/20 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-5 pb-16 pt-12 sm:px-8 sm:pt-16 lg:pb-20 lg:pt-20">
        {/* Main Hero */}
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
          {/* Introduction */}
          <div className="order-2 lg:order-1">
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-green-400/20 bg-green-400/[0.06] px-4 py-2 text-[11px] font-semibold tracking-[0.16em] text-green-300 sm:text-xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-50" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
              </span>
              OPEN TO OPPORTUNITIES
            </div>

            <p className="mb-4 text-sm font-bold tracking-[0.25em] text-green-400">
              HELLO, I'M KUNAL
            </p>

            <h1 className="max-w-3xl text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
              I build digital
              <br />
              products with
              <br />
              <span className="text-green-400">purpose & impact.</span>
            </h1>

            {/* <p className="mt-7 max-w-2xl text-base leading-8 text-gray-300 sm:text-lg">
              I'm a Computer Science Engineering student and developer
              passionate about building useful technology. From full-stack
              platforms and mobile applications to machine learning research,
              I turn ideas into practical solutions.
            </p> */}

            {/* Main Actions */}
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                to="/projects"
                className="inline-flex items-center gap-3 rounded-lg bg-green-400 px-6 py-3.5 font-semibold text-gray-950 transition duration-300 hover:-translate-y-1 hover:bg-green-300"
              >
                Explore my projects
                <span aria-hidden="true">↗</span>
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center gap-3 rounded-lg border border-white/15 px-6 py-3.5 font-semibold text-white transition duration-300 hover:-translate-y-1 hover:border-green-400 hover:text-green-300"
              >
                Let's connect
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* Social Links */}
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-gray-300">
              <a
                href="https://github.com/Kunal@2652"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-green-400"
              >
                GitHub ↗
              </a>

              <a
                href="https://www.linkedin.com/in/kunal-lohchab-045806290/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-green-400"
              >
                LinkedIn ↗
              </a>

              <a
                href="kunal10943@gmail"
                className="transition hover:text-green-400"
              >
                Email ↗
              </a>

              <span className="hidden h-4 w-px bg-gray-700 sm:block" />

              <span className="text-gray-400">India</span>
            </div>
          </div>

          {/* Profile Visual */}
          <div className="order-1 mx-auto w-full max-w-[360px] lg:order-2 lg:max-w-[400px]">
            <div className="relative px-3 pb-8 pt-5 sm:px-5">
              <div className="absolute inset-8 rounded-full bg-green-400/10 blur-3xl" />

              {/* Floating top label */}
              <div className="absolute right-0 top-0 z-20 rounded-xl border border-white/10 bg-[#151a18]/95 px-4 py-3 shadow-xl backdrop-blur">
                <p className="text-[10px] font-semibold tracking-[0.18em] text-gray-400">
                  CURRENT FOCUS
                </p>
                <p className="mt-1 text-sm font-semibold text-green-300">
                  Building & learning
                </p>
              </div>

              {/* Animated Profile Frame */}
              <div className="relative mx-auto aspect-square w-full max-w-[330px]">
                <div
                  className="absolute -inset-[3px] rounded-full"
                  style={{
                    background:
                      "conic-gradient(from var(--profile-angle, 0deg), transparent 0deg, transparent 180deg, #edef86 260deg, #fff28f 310deg, transparent 360deg)",
                    animation: "profile-spin 5s linear infinite",
                  }}
                />

                <div className="absolute inset-[3px] overflow-hidden rounded-full border-4 border-[#0b0d0f] bg-gray-900">
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-green-400">
                    <span className="text-7xl font-bold">K.</span>
                    <span className="text-xs font-semibold tracking-[0.3em]">
                      DEVELOPER
                    </span>
                  </div>

                  <img
                    src={images.profile}
                    alt="Kunal, Computer Science Engineering student and developer"
                    className="absolute inset-0 z-10 h-full w-full object-cover object-center"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />

                  <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                </div>
              </div>

              {/* Profile Caption */}
              <div className="absolute bottom-0 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap rounded-xl border border-white/10 bg-[#151a18] px-5 py-3 shadow-2xl">
                <span className="h-2.5 w-2.5 rounded-full bg-green-400 shadow-[0_0_12px_#4ade80]" />

                <div>
                  <strong className="block text-lg text-white text-bold">Kunal</strong>
                  <p className="mt-0.5 text-xs text-gray-100">
                    Full-Stack Developer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Overview */}
        <div className="mt-24 border-t border-white/10 pt-10 sm:mt-28">
          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-green-400">
                WHAT I DO
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                Turning ideas into solutions.
              </h2>
            </div>

            <Link
              to="/about"
              className="w-fit text-sm font-medium text-gray-300 transition hover:text-green-400"
            >
              More about me ↗
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {highlights.map((item) => (
              <Link
                key={item.number}
                to={item.path}
                className="group rounded-xl border border-white/10 bg-white/[0.02] p-5 transition duration-300 hover:-translate-y-1 hover:border-green-400/40 hover:bg-green-400/[0.03] sm:p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-widest text-green-400">
                    {item.number}
                  </span>
                  <span className="text-gray-500 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-green-400">
                    ↗
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-bold text-white">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Technology Snapshot */}
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
          <p className="shrink-0 text-xs font-semibold tracking-[0.15em] text-gray-400">
            TECHNOLOGIES I WORK WITH
          </p>

          <div className="flex flex-wrap gap-2">
            {technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-gray-300 transition hover:border-green-400/40 hover:text-green-300"
              >
                {technology}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Profile Border Animation */}
      <style>{`
        @property --profile-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes profile-spin {
          to {
            --profile-angle: 360deg;
          }
        }
      `}</style>
    </section>
  );
}
