type Role = {
    role: string;
    dateRange: string;
    description: string;
    tags: string[];
};

type Experience = {
    company: string;
    roles: Role[];
};

const workExperiences: Experience[] = [
    {
        company: "Motion UBC",
        roles: [
            {
                role: "Software Developer",
                dateRange: "Mar 2026 - Present",
                description:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                tags: ["TypeScript", "Node.js", "PostgreSQL"],
            },
        ],
    },
    {
        company: "The Cornerstore",
        roles: [
            {
                role: "Software Development Lead",
                dateRange: "Feb 2026 - Present",
                description:
                    "Led a 4-person team through weekly sprints; delegating tasks, writing API documentation, tracking deadlines, and contributing full-stack across the backend and frontend.",
                tags: [
                    "Team Leadership",
                    "Full Stack",
                    "Agile",
                    "Python",
                    "TypeScript",
                    "FastAPI",
                    "PostgreSQL",
                    "Next.js",
                    "React",
                ],
            },
            {
                role: "Software Developer",
                dateRange: "Oct 2025 - Feb 2026",
                description:
                    "Built full-stack features in an agile team; FastAPI/SQLAlchemy backend with JWT auth, and Next.js/Tailwind frontend from Figma designs.",
                tags: [
                    "Python",
                    "TypeScript",
                    "FastAPI",
                    "PostgreSQL",
                    "Next.js",
                    "React",
                    "Agile",
                    "Full Stack",
                ],
            },
        ],
    },
    {
        company: "University of British Columbia",
        roles: [
            {
                role: "Computer Science Teaching Assistant",
                dateRange: "Sep 2025 - Apr 2026",
                description:
                    "Supported 50+ students across labs and office hours, reinforcing Java, OOP design patterns, and software engineering practices.",
                tags: ["Java", "Teaching", "OOP"],
            },
        ],
    },
];

const ExperienceGroup = ({ exp }: { exp: Experience }) => (
    <div className="flex flex-col gap-0">
        {/* Company header */}
        <p className="font-bold text-text-primary text-base mb-4">
            {exp.company}
        </p>

        {/* Roles with timeline */}
        <div className="flex flex-col">
            {exp.roles.map((r, i) => (
                <div key={i} className="flex gap-5">
                    {/* Timeline */}
                    <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-text-muted shrink-0 mt-1.5" />
                        {i < exp.roles.length - 1 && (
                            <div className="flex-1 w-0.5 rounded-2xl bg-(--border) mt-1.5" />
                        )}
                    </div>

                    {/* Role content */}
                    <div
                        className={`flex flex-col gap-2 ${i < exp.roles.length - 1 ? "pb-6" : ""}`}
                    >
                        <div>
                            <p className="font-semibold text-text-primary text-sm">
                                {r.role}
                            </p>
                            <p className="text-[0.7rem] text-text-secondary tracking-wider mt-0.5">
                                {r.dateRange}
                            </p>
                        </div>
                        <p className="text-sm text-text-secondary leading-relaxed">
                            {r.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {r.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-[0.65rem] tracking-wider px-3 py-1 rounded-full border border-(--border-strong) text-text-secondary bg-bg-base"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const ExperiencesPage = () => {
    return (
        <div className="flex min-h-screen w-screen justify-center bg-bg-sunken items-center py-20">
            <div className="max-w-2xl w-full mx-auto flex flex-col gap-14 px-4">
                <section className="flex flex-col gap-8">
                    <h2 className="font-bold tracking-widest uppercase text-accent text-2xl">
                        Experiences
                    </h2>
                    {workExperiences.map((exp, i) => (
                        <div
                            key={i}
                            className="flex flex-col gap-3 p-6 rounded-xl border border-(--border) bg-bg-surface hover:border-(--border-strong) transition-colors duration-200"
                        >
                            <ExperienceGroup exp={exp} />
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
};

export default ExperiencesPage;
