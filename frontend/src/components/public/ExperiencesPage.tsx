"use client";

import apiClient from "@/lib/client";
import { ExperienceResponse } from "@/lib/schemas";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const SkeletonCard = () => (
    <div className="flex flex-col gap-3 p-6 rounded-xl border border-(--border) bg-bg-surface animate-pulse">
        <div className="h-6 w-1/3 bg-bg-sunken rounded mb-4" />
        <div className="flex gap-5">
            <div className="flex flex-col items-center">
                <div className="w-2 h-2 rounded-full bg-bg-sunken shrink-0 mt-1.5" />
                <div className="flex-1 w-0.5 rounded-2xl bg-bg-sunken mt-1.5" />
            </div>
            <div className="flex flex-col gap-3 w-full pb-6">
                <div className="h-4 w-1/2 bg-bg-sunken rounded" />
                <div className="h-3 w-1/4 bg-bg-sunken rounded" />
                <div className="h-16 w-full bg-bg-sunken rounded" />
                <div className="flex gap-2">
                    <div className="h-6 w-12 bg-bg-sunken rounded-full" />
                    <div className="h-6 w-12 bg-bg-sunken rounded-full" />
                </div>
            </div>
        </div>
    </div>
);

const ExperienceGroup = ({ exp }: { exp: ExperienceResponse }) => (
    <div className="flex flex-col gap-0">
        <p className="font-bold text-text-primary text-base mb-4">
            {exp.company}
        </p>

        <div className="flex flex-col">
            {exp.roles.map((r, i) => (
                <div key={i} className="flex gap-5">
                    <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-text-muted shrink-0 mt-1.5" />
                        {i < exp.roles.length - 1 && (
                            <div className="flex-1 w-0.5 rounded-2xl bg-(--border) mt-1.5" />
                        )}
                    </div>

                    <div
                        className={`flex flex-col gap-2 ${i < exp.roles.length - 1 ? "pb-6" : ""}`}
                    >
                        <div>
                            <p className="font-semibold text-text-primary text-sm">
                                {r.role_title}
                            </p>
                            <p className="text-[0.7rem] text-text-secondary tracking-wider mt-0.5">
                                {r.date_range}
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
    const [workExperiences, setWorkExperiences] = useState<
        ExperienceResponse[]
    >([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleGetWorkExperiences = async () => {
            try {
                const response = await apiClient.get("/experience/all");
                if (response) {
                    setWorkExperiences(response.data);
                }
            } catch (err: any) {
                toast.error("Error loading experiences.");
            } finally {
                setIsLoading(false);
            }
        };

        handleGetWorkExperiences();
    }, []);

    return (
        <div className="flex min-h-screen w-screen justify-center bg-bg-sunken items-center py-20">
            <div className="max-w-2xl w-full mx-auto flex flex-col gap-14 px-6">
                <section className="flex flex-col gap-8">
                    <h2 className="font-bold tracking-widest uppercase text-accent text-2xl">
                        Experiences
                    </h2>

                    {isLoading ? (
                        Array.from({ length: 3 }).map((_, i) => (
                            <SkeletonCard key={i} />
                        ))
                    ) : workExperiences.length > 0 ? (
                        workExperiences.map((exp, i) => (
                            <div
                                key={i}
                                className="flex flex-col gap-3 p-6 rounded-xl border border-(--border) bg-bg-surface hover:border-(--border-strong) transition-colors duration-200"
                            >
                                <ExperienceGroup exp={exp} />
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-(--border) rounded-xl">
                            <p className="text-text-secondary font-medium italic">
                                No experiences to show yet.
                            </p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default ExperiencesPage;
