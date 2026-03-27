"use client";
import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

type Link = {
    label: string;
    url: string;
};

type Project = {
    name: string;
    description: string;
    tags: string[];
    links: Link[];
    image?: string;
    imageFit?: "cover" | "contain";
};

const projects: Project[] = [
    {
        name: "MyStudyPal",
        image: "projects/MyStudyPal/home_page.png",
        description:
            "AI-powered study platform that generates flashcards and quizzes from uploaded study materials. Built with a custom Spring Security filter chain using OAuth2 and JWT, and a RAG system using Google GenAI with adaptive chunking and PGVector for semantic search.",
        tags: [
            "Spring Boot",
            "PostgreSQL",
            "Google GenAI",
            "Next.js",
            "React",
            "Tailwind",
        ],
        links: [
            { label: "GitHub", url: "https://github.com/SudiMango/MyStudyPal" },
            { label: "Live", url: "https://mystudypal.sudicodes.xyz" },
        ],
    },
    {
        name: "SimpleEngine 2D",
        image: "projects/SimpleEngine2D/image.png",
        description:
            "Modular 2D game engine built from scratch using a data-oriented ECS architecture, with systems for rendering, physics, input, audio, and AABB collision detection. Features an event-driven architecture with a central event bus for decoupled inter-system communication.",
        tags: ["C++", "SDL2", "GLM", "CMake"],
        links: [{ label: "GitHub", url: "#" }],
    },
    {
        name: "Bookmarked",
        image: "projects/Bookmarked/front_page.jpg",
        imageFit: "contain",
        description:
            "AI-powered mobile app that converts TikTok BookTok videos into structured TBR lists using ElevenLabs STT and Gemini, enriched via Google Books API. Includes personalized recommendations from natural language queries and location-based library discovery using OpenStreetMap and Playwright scraping.",
        tags: [
            "Hackathon",
            "React Native",
            "Expo",
            "PostgreSQL",
            "Supabase",
            "Gemini API",
        ],
        links: [
            {
                label: "GitHub",
                url: "https://github.com/SudiMango/nwhacks_2026",
            },
            {
                label: "Devpost",
                url: "https://devpost.com/software/bookmarked-7srimw",
            },
        ],
    },
];

const ProjectCard = ({ project }: { project: Project }) => (
    <div className="flex flex-col rounded-xl border border-(--border) bg-bg-surface hover:border-(--border-strong) transition-colors duration-200 overflow-hidden shrink-0 w-96 min-h-130">
        <div className="h-52 bg-bg-elevated flex items-center justify-center border-b border-(--border)">
            {project.image ? (
                <img
                    src={project.image}
                    alt={project.name}
                    className={`w-full h-full ${project.imageFit === "contain" ? "object-contain" : "object-cover"}`}
                />
            ) : (
                <div className="flex flex-col items-center gap-2 text-text-muted">
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <span className="text-[0.6rem] tracking-widest uppercase">
                        No image
                    </span>
                </div>
            )}
        </div>

        <div className="flex flex-col p-5 flex-1">
            <p className="font-bold text-text-primary text-base leading-tight mb-3">
                {project.name}
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
                {project.description}
            </p>

            <div className="mt-auto pt-4 flex flex-col gap-3">
                <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-[0.6rem] tracking-wider px-2.5 py-1 rounded-full border border-(--border-strong) text-text-secondary bg-bg-base"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-(--border)">
                    {project.links.map((link) => (
                        <a
                            key={link.label}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-[0.7rem] font-semibold text-accent hover:text-accent-soft transition-colors duration-200"
                        >
                            {link.label}
                            <ExternalLink size={11} />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const ProjectsPage = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (dir: "left" | "right") => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({
            left: dir === "right" ? 400 : -400,
            behavior: "smooth",
        });
    };

    return (
        <div className="flex min-h-screen w-screen justify-center bg-bg-base items-center py-20">
            <div className="w-full max-w-5xl mx-auto px-10 flex flex-col gap-8">
                <div className="flex items-center justify-between">
                    <h2 className="font-bold tracking-widest uppercase text-accent text-2xl">
                        Projects
                    </h2>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => scroll("left")}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-(--border-strong) bg-bg-elevated text-text-secondary hover:text-text-primary hover:bg-bg-hover transition-all duration-200 text-[0.7rem] tracking-wider"
                        >
                            <ChevronLeft size={14} />
                            Prev
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-(--border-strong) bg-bg-elevated text-text-secondary hover:text-text-primary hover:bg-bg-hover transition-all duration-200 text-[0.7rem] tracking-wider"
                        >
                            Next
                            <ChevronRight size={14} />
                        </button>
                    </div>
                </div>

                <div
                    ref={scrollRef}
                    className="flex gap-5 overflow-x-auto pb-2"
                    style={{ scrollbarWidth: "none" }}
                >
                    {projects.map((project, i) => (
                        <ProjectCard key={i} project={project} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectsPage;
