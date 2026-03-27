"use client";
import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";
import apiClient from "@/lib/client";
import { ExperienceCard } from "@/components/private/ExperienceCard";
import { btnGhost, btnPrimary, inputClass } from "@/lib/classnames";
import { ExperienceResponse } from "@/lib/schemas";

const AdminExperiencesPage = () => {
    const [experiences, setExperiences] = useState<ExperienceResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [addingExp, setAddingExp] = useState(false);
    const [newCompany, setNewCompany] = useState("");
    const [sortOrder, setSortOrder] = useState<number | "">(0);

    const fetchAll = async () => {
        try {
            const res = await apiClient.get("/experience/all");
            setExperiences(res.data);
        } catch {
            toast.error("Failed to load experiences.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAll();
    }, []);

    const handleCreateExperience = async (e: React.FormEvent) => {
        e.preventDefault();
        const id = toast.loading("Creating experience...");
        try {
            await apiClient.post("/experience", {
                company: newCompany,
                sort_order: sortOrder,
            });
            toast.success("Experience created.", { id });
            setNewCompany("");
            setSortOrder(0);
            setAddingExp(false);
            fetchAll();
        } catch {
            toast.error("Something went wrong.", { id });
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto flex flex-col gap-8 p-5">
            <div className="flex items-center justify-between">
                <h1 className="font-bold text-text-primary text-xl">
                    Experiences
                </h1>
                <button
                    onClick={() => setAddingExp((v) => !v)}
                    className={`${btnPrimary} flex items-center gap-1.5`}
                >
                    <Plus size={14} /> Add Experience
                </button>
            </div>

            {addingExp && (
                <form
                    onSubmit={handleCreateExperience}
                    className="flex flex-col gap-2 p-4 rounded-xl border border-(--border) bg-bg-surface"
                >
                    <input
                        className={inputClass}
                        placeholder="Name"
                        value={newCompany}
                        onChange={(e) => setNewCompany(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        min={0}
                        className={inputClass}
                        placeholder="e.g. 1"
                        value={sortOrder}
                        onChange={(e) =>
                            setSortOrder(
                                e.target.value === ""
                                    ? ""
                                    : Number(e.target.value),
                            )
                        }
                        required
                    />
                    <div className="flex flex-row gap-2 ml-auto">
                        <button type="submit" className={btnPrimary}>
                            Create
                        </button>
                        <button
                            type="button"
                            onClick={() => setAddingExp(false)}
                            className={btnGhost}
                        >
                            <X size={14} />
                        </button>
                    </div>
                </form>
            )}

            {loading ? (
                <div className="flex items-center justify-center gap-3 text-text-muted text-sm">
                    <div className="w-4 h-4 rounded-full border-2 border-(--border-strong) border-t-accent animate-spin" />{" "}
                    Loading...
                </div>
            ) : experiences.length === 0 ? (
                <p className="text-sm text-text-muted">No experiences yet.</p>
            ) : (
                <div className="flex flex-col gap-4">
                    {experiences.map((exp) => (
                        <ExperienceCard
                            key={exp.experience_id}
                            exp={exp}
                            onRefresh={fetchAll}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminExperiencesPage;
