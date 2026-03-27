"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, Pencil, Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import apiClient from "@/lib/client";
import { ExperienceResponse } from "@/lib/schemas";
import { inputClass, btnPrimary, btnGhost, btnDanger } from "@/lib/classnames";
import { RoleRow } from "@/components/private/RoleRow";
import { RoleForm } from "@/components/private/RoleForm";

export const ExperienceCard = ({
    exp,
    onRefresh,
}: {
    exp: ExperienceResponse;
    onRefresh: () => void;
}) => {
    const [expanded, setExpanded] = useState(true);
    const [editingCompany, setEditingCompany] = useState(false);
    const [company, setCompany] = useState(exp.company);
    const [sortOrder, setSortOrder] = useState<number | "">(
        exp.sort_order ?? 0,
    );
    const [addingRole, setAddingRole] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleUpdateCompany = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const id = toast.loading("Updating company...");
        try {
            await apiClient.patch(`/experience/${exp.experience_id}`, {
                company,
                sort_order: sortOrder,
            });
            toast.success("Company updated.", { id });
            setEditingCompany(false);
            onRefresh();
        } catch {
            toast.error("Something went wrong.", { id });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm(`Delete experience "${exp.company}" and all its roles?`))
            return;
        const id = toast.loading("Deleting experience...");
        try {
            await apiClient.delete(`/experience/${exp.experience_id}`);
            toast.success("Experience deleted.", { id });
            onRefresh();
        } catch {
            toast.error("Something went wrong.", { id });
        }
    };

    return (
        <div className="flex flex-col gap-3 p-5 rounded-xl border border-(--border) bg-bg-surface">
            <div className="flex items-center justify-between gap-4">
                {editingCompany ? (
                    <form
                        onSubmit={handleUpdateCompany}
                        className="flex flex-col gap-2 w-full"
                    >
                        <input
                            className={inputClass}
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            min={0}
                            className={inputClass}
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
                        <div className="ml-auto flex gap-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className={btnPrimary}
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={() => setEditingCompany(false)}
                                className={btnGhost}
                            >
                                <X size={14} />
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="flex flex-col">
                        <span className="font-bold text-text-primary text-base">
                            {exp.company}
                        </span>
                        <span className="text-[0.75rem] text-text-secondary mt-1 leading-relaxed">
                            Sort order: {exp.sort_order}
                        </span>
                    </div>
                )}
                <div className="flex gap-2 shrink-0">
                    {!editingCompany && (
                        <button
                            onClick={() => setEditingCompany(true)}
                            className={btnGhost}
                        >
                            <Pencil size={13} />
                        </button>
                    )}
                    <button onClick={handleDelete} className={btnDanger}>
                        <Trash2 size={13} />
                    </button>
                    <button
                        onClick={() => setExpanded((v) => !v)}
                        className={btnGhost}
                    >
                        {expanded ? (
                            <ChevronUp size={14} />
                        ) : (
                            <ChevronDown size={14} />
                        )}
                    </button>
                </div>
            </div>

            {expanded && (
                <div className="flex flex-col gap-4 mt-1">
                    {exp.roles.map((role) => (
                        <RoleRow
                            key={role.role_id}
                            role={role}
                            onRefresh={onRefresh}
                        />
                    ))}
                    {addingRole ? (
                        <RoleForm
                            experienceId={exp.experience_id}
                            onDone={() => {
                                setAddingRole(false);
                                onRefresh();
                            }}
                            onCancel={() => setAddingRole(false)}
                        />
                    ) : (
                        <button
                            onClick={() => setAddingRole(true)}
                            className={`${btnGhost} flex items-center gap-1.5 w-fit`}
                        >
                            <Plus size={13} /> Add Role
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};
