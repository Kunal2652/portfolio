
import {
    BookOpen,
    BrainCircuit,
    CalendarDays,
    ExternalLink,
    FileText,
    GraduationCap,
    Microscope,
    Sparkles, ArrowUpRight
} from "lucide-react";

import SectionLabel from "./SectionLabel";
import { researchPapers } from "../data/research";

function getResearchIcon(category = "") {
    const value = category.toLowerCase();

    if (value.includes("machine learning")) return BrainCircuit;
    if (value.includes("computer vision")) return Microscope;
    if (value.includes("augmented reality")) return Sparkles;
    return BookOpen;
}

function StatusBadge({ status }) {
    const isPublished = status === "Published & Indexed";

    return (
        <span
            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold tracking-wide ${isPublished
                ? "border-green-400/25 bg-green-400/10 text-green-300"
                : "border-amber-400/25 bg-amber-400/10 text-amber-300"
                }`}
        >
            <span
                className={`h-2 w-2 rounded-full ${isPublished ? "bg-green-400" : "bg-amber-400"
                    }`}
            />
            {status}
        </span>
    );
}

export default function Research() {
    const publishedCount = researchPapers.filter(
        (paper) => paper.status === "Published & Indexed"
    ).length;

    return (
        <section className="min-h-screen bg-[#0b0d0f] py-16 font-sans text-white sm:py-20 lg:py-28">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <div className="flex flex-row justify-between items-center w-full">
                    <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-green-400">
                        <GraduationCap size={17} strokeWidth={1.8} />
                        Academic Portfolio
                    </div>
                    <div>
                        <SectionLabel number="04">
                            RESEARCH & ACHIEVEMENTS
                        </SectionLabel>
                    </div>
                </div>

                {/* Page Heading */}
                <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                    <div>


                        <h1 className="max-w-3xl text-4xl font-bold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl">
                            Research that explores
                            <br className="hidden sm:block" />
                            <span className="text-gray-500">
                                ideas and innovation.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
                            Exploring machine learning, computer vision, augmented
                            reality, and intelligent systems through research and
                            experimentation.
                        </p>
                    </div>

                    {/* Research Summary */}
                    <div className="flex flex-col gap-3">
                        <a
                            href="https://ieeexplore.ieee.org/author/374424061740957"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex w-fit shrink-0 items-center gap-2 text-sm font-semibold text-gray-300 transition-colors hover:text-green-400 ml-2"
                        >
                            Explore my IEEE Profile
                            <ArrowUpRight
                                size={17}
                                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                            />
                        </a>
                        <div className="flex gap-3">
                            <div className="min-w-32 rounded-2xl border border-white/10 bg-[#111416] p-5">
                                <FileText
                                    size={20}
                                    className="mb-4 text-green-400"
                                    strokeWidth={1.7}
                                />
                                <p className="text-3xl font-bold tracking-tight text-white">
                                    {researchPapers.length.toString().padStart(2, "0")}
                                </p>
                                <p className="mt-1 text-xs font-medium text-gray-400">
                                    Research papers
                                </p>
                            </div>

                            <div className="min-w-32 rounded-2xl border border-white/10 bg-[#111416] p-5">
                                <BookOpen
                                    size={20}
                                    className="mb-4 text-green-400"
                                    strokeWidth={1.7}
                                />
                                <p className="text-3xl font-bold tracking-tight text-white">
                                    {publishedCount.toString().padStart(2, "0")}
                                </p>
                                <p className="mt-1 text-xs font-medium text-gray-400">
                                    Published & indexed
                                </p>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Papers */}
                <div className="space-y-5">
                    {researchPapers.map((paper, index) => {
                        const ResearchIcon = getResearchIcon(paper.category);

                        return (
                            <article
                                key={paper.id}
                                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#101315] transition duration-300 hover:border-green-400/30 hover:bg-[#121715]"
                            >
                                <div className="flex flex-col gap-5 p-5 sm:p-7 lg:flex-row lg:gap-7 lg:p-8">
                                    {/* Icon and Index */}
                                    <div className="flex shrink-0 items-start justify-between lg:block">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-green-400/20 bg-green-400/[0.07] text-green-400 transition duration-300 group-hover:border-green-400/40 group-hover:bg-green-400/10">
                                            <ResearchIcon size={25} strokeWidth={1.6} />
                                        </div>

                                        <span className="font-mono text-xs tracking-widest text-gray-600 lg:mt-5 lg:block">
                                            PAPER {String(index + 1).padStart(2, "0")}
                                        </span>
                                    </div>

                                    {/* Paper Information */}
                                    <div className="min-w-0 flex-1">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-green-400 sm:text-xs">
                                                {paper.category}
                                            </span>

                                            <span className="h-1 w-1 rounded-full bg-gray-600" />

                                            <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                                                <CalendarDays size={13} />
                                                {paper.year}
                                            </span>
                                        </div>

                                        <h2 className="mt-3 max-w-4xl text-xl font-bold leading-snug tracking-tight text-gray-100 transition group-hover:text-green-300 sm:text-2xl lg:text-[26px]">
                                            {paper.title}
                                        </h2>

                                        <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-400 sm:text-base">
                                            {paper.description}
                                        </p>

                                        {/* Conference and Paper ID */}
                                        {(paper.conference ||
                                            paper.paperId ||
                                            paper.publisher) && (
                                                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-xs leading-5 text-gray-400 sm:text-sm">
                                                    {paper.conference && (
                                                        <div className="flex items-start gap-2">
                                                            <GraduationCap
                                                                size={16}
                                                                className="mt-0.5 shrink-0 text-gray-500"
                                                            />
                                                            <span>{paper.conference}</span>
                                                        </div>
                                                    )}

                                                    {paper.paperId && (
                                                        <div className="flex items-center gap-2">
                                                            <FileText
                                                                size={15}
                                                                className="shrink-0 text-gray-500"
                                                            />
                                                            <span>
                                                                Paper ID:{" "}
                                                                <span className="font-semibold text-gray-300">
                                                                    {paper.paperId}
                                                                </span>
                                                            </span>
                                                        </div>
                                                    )}

                                                    {paper.publisher && (
                                                        <span className="text-gray-500">
                                                            Publisher:{" "}
                                                            <span className="font-medium text-gray-300">
                                                                {paper.publisher}
                                                            </span>
                                                        </span>
                                                    )}
                                                </div>
                                            )}

                                        {/* Technologies */}
                                        {paper.technologies?.length > 0 && (
                                            <div className="mt-5 flex flex-wrap gap-2">
                                                {paper.technologies.map((technology) => (
                                                    <span
                                                        key={technology}
                                                        className="rounded-md border border-white/[0.08] bg-white/[0.025] px-3 py-1.5 text-xs font-medium text-gray-300 transition hover:border-green-400/25 hover:text-green-300"
                                                    >
                                                        {technology}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {/* Status and Publication Link */}
                                        <div className="mt-6 flex flex-col gap-4 border-t border-white/[0.07] pt-5 sm:flex-row sm:items-center sm:justify-between">
                                            <StatusBadge status={paper.status} />

                                            {paper.status === "Published & Indexed" &&
                                                paper.publicationUrl && (
                                                    <a
                                                        href={paper.publicationUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-green-400 transition hover:text-green-300"
                                                    >
                                                        View publication
                                                        <ExternalLink size={15} />
                                                    </a>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>

                {/* Footer Note */}
                <div className="mt-8 flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
                    <BookOpen
                        size={18}
                        className="mt-0.5 shrink-0 text-green-400"
                    />
                    <p className="text-sm leading-7 text-gray-400">
                        My research interests include intelligent systems,
                        computer vision, machine learning, and practical
                        applications of emerging technologies.
                    </p>
                </div>
            </div>
        </section>
    );
}
