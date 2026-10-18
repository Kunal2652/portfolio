import { ArrowUpRight, ExternalLink, Sparkles } from "lucide-react";
import SectionLabel from "./SectionLabel";
import { projects } from "../data/projects";
import { images } from "../assets/images";

function ProjectCard({ project, index }) {
    const image =
        project.image ||
        (project.imageKey ? images[project.imageKey] : null) ||
        (project.slug ? images[project.slug] : null);

    return (
        <article className="group relative overflow-hidden rounded-3xl border border-white/[0.09] bg-[#101315] transition-all duration-500 hover:border-green-400/30 hover:bg-[#131718]">
            {/* Subtle ambient glow */}
            <div className="pointer-events-none absolute -left-24 top-0 h-56 w-56 rounded-full bg-green-400/[0.04] blur-[90px] transition-all duration-500 group-hover:bg-green-400/[0.09]" />

            <div className="relative grid min-w-0 lg:grid-cols-[0.9fr_1.1fr]">
                {/* LEFT: Project information */}
                <div className="flex min-w-0 flex-col justify-center p-6 sm:p-8 lg:p-10 xl:p-12">
                    <div className="mb-7 flex flex-wrap items-center gap-3">
                        <span className="font-mono text-xs tracking-widest text-green-400">
                            PROJECT / {String(project.number).padStart(2, "0")}
                        </span>

                        <span className="h-1 w-1 rounded-full bg-gray-600" />

                        <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                            {project.type}
                        </span>
                    </div>

                    <h3 className="max-w-xl text-2xl font-semibold leading-tight tracking-tight text-white transition-colors duration-300 group-hover:text-green-300 sm:text-3xl xl:text-4xl">
                        {project.name}
                    </h3>

                    <p className="mt-5 max-w-xl text-sm leading-7 text-gray-400 sm:text-base sm:leading-8">
                        {project.description}
                    </p>

                    {/* Technology tags */}
                    <div className="mt-6 flex flex-wrap gap-2">
                        {project.stack.map((technology) => (
                            <span
                                key={technology}
                                className="rounded-full border border-white/[0.09] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-gray-300 transition-colors duration-300 group-hover:border-white/[0.14]"
                            >
                                {technology}
                            </span>
                        ))}
                    </div>

                    {/* Links */}
                    <div className="mt-8 flex flex-wrap items-center gap-3">
                        {project.live && (
                            <a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/link inline-flex items-center gap-2 rounded-full bg-green-400 px-5 py-3 text-sm font-semibold text-gray-950 transition-all duration-300 hover:bg-green-300 hover:shadow-[0_0_25px_rgba(134,239,172,0.15)]"
                            >
                                Live project
                                <ArrowUpRight
                                    size={16}
                                    className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                                />
                            </a>
                        )}

                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`View ${project.name} source code on GitHub`}
                                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-gray-300 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.05] hover:text-white"
                            >
                                {/* <Github size={16} /> */}
                                Source code
                                <ExternalLink size={13} className="text-gray-500" />
                            </a>
                        )}

                        {!project.live && !project.github && (
                            <span className="text-sm text-gray-500">
                                Project links coming soon
                            </span>
                        )}
                    </div>
                </div>

                {/* RIGHT: Project image */}
                <div className="relative min-w-0 p-4 pt-0 sm:p-6 sm:pt-0 lg:p-5 lg:pl-0">
                    <div
                        className={`relative flex aspect-[5/3] items-center justify-center overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br ${project.tone || "from-[#1b2922] to-[#101412]"
                            } lg:aspect-[4/3]`}
                    >
                        {/* Image */}
                        {image ? (
                            <img
                                src={image}
                                alt={`${project.name} project preview`}
                                loading="lazy"
                                className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                            />
                        ) : (
                            <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-8 text-center">
                                <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-green-400/25 bg-black/20 text-3xl font-bold text-green-400 backdrop-blur-md">
                                    {String(project.number).padStart(2, "0")}
                                </div>
                                <span className="max-w-xs text-sm font-medium text-gray-300">
                                    {project.name}
                                </span>
                                <span className="text-xs text-gray-500">
                                    Add a project screenshot
                                </span>
                            </div>
                        )}

                        {/* Image overlays */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

                        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-xl sm:left-5 sm:top-5">
                            <Sparkles size={12} className="text-green-300" />
                            Featured project
                        </div>

                        <span className="pointer-events-none absolute bottom-3 right-4 select-none text-6xl font-black tracking-tighter text-white/[0.12] sm:bottom-4 sm:right-5 sm:text-8xl">
                            {String(index + 1).padStart(2, "0")}
                        </span>

                        {project.live && (
                            <a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Open ${project.name}`}
                                className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:bg-green-400 hover:text-gray-950 sm:bottom-5 sm:left-5"
                            >
                                <ArrowUpRight size={20} />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}

export default function Projects() {
    return (
        <section
            id="projects"
            className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28"
        >
            {/* Page heading */}
            <div className="mb-12 sm:mb-16">
                <div className="flex flex-row justify-between gap-6 md:flex-row md:items-end">
                    
                        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-green-400">
                            Ideas into reality
                        </p>
                        <SectionLabel number="03">SELECTED WORK</SectionLabel>
                    </div>
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div>
                        

                        <h2 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
                            Things I’ve built
                            <span className="text-green-400">.</span>
                        </h2>

                        <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base sm:leading-8">
                            A collection of products, experiments, and ideas shaped through
                            code, research, and a passion for solving real-world problems.
                        </p>
                    </div>

                    <a
                        href="https://github.com/Kunal2652"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex w-fit shrink-0 items-center gap-2 text-sm font-semibold text-gray-300 transition-colors hover:text-green-400"
                    >
                        Explore my GitHub
                        <ArrowUpRight
                            size={17}
                            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                    </a>
                </div>
            </div>

            {/* Horizontal project rows */}
            <div className="space-y-5 sm:space-y-7">
                {projects.map((project, index) => (
                    <ProjectCard
                        key={project.number}
                        project={project}
                        index={index}
                    />
                ))}
            </div>

            {/* Closing statement */}
            <div className="mt-12 flex flex-col gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <p className="text-sm leading-7 text-gray-400">
                    Have an interesting idea? There’s always something new to build.
                </p>

                <a
                    href="/contact"
                    className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-green-400 transition-colors hover:text-green-300"
                >
                    Let’s work together
                    <ArrowUpRight size={16} />
                </a>
            </div>
        </section>
    );
}