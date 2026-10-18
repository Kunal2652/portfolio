
import SectionLabel from "./SectionLabel";

const facts = [
  { number: "01", label: "Problem solver" },
  { number: "02", label: "Product focused" },
  { number: "03", label: "Always learning" },
];

export default function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28"
    >
      <SectionLabel >ABOUT ME</SectionLabel>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-20">
        {/* Left Column */}
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            Technology is powerful.
            <br />
            <span className="mt-2 inline-block text-gray-400">
              What we build with it matters.
            </span>
          </h2>
        </div>

        {/* Right Column */}
        <div>
          <p className="text-base leading-8 text-gray-300">
            I'm a Computer Science Engineering student who enjoys
            turning ideas into practical digital experiences. My
            interests span full-stack development, mobile applications,
            and machine learning.
          </p>

          <p className="mt-5 text-base leading-8 text-gray-300">
            From building an agriculture service marketplace to
            developing educational technology, I focus on understanding
            problems and creating useful solutions.
          </p>

          {/* About Facts */}
          <div className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {facts.map((fact) => (
              <div
                key={fact.number}
                className="rounded-xl border border-white/10 bg-[#111416] p-4 transition duration-300 hover:border-green-400/40"
              >
                <span className="block text-2xl font-bold text-green-400">
                  {fact.number}
                </span>

                <span className="mt-2 block text-sm font-medium text-gray-200">
                  {fact.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
