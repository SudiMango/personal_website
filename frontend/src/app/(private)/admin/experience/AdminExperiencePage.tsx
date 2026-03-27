"use client";
import apiClient from "@/lib/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ChevronDown, ChevronUp, Pencil, Plus, Trash2, X } from "lucide-react";

type RoleResponse = {
    role_id: string;
    experience_id: string;
    role_title: string;
    date_range: string;
    description: string;
    tags: string[];
    sort_order: number;
};

type ExperienceResponse = {
    experience_id: string;
    company: string;
    roles: RoleResponse[];
    sort_order: number;
};

const inputClass =
    "text-sm px-3 py-2 rounded-lg border border-(--border) bg-bg-elevated text-text-primary placeholder:text-text-muted focus:outline-none focus:border-(--border-strong) transition-colors duration-200 w-full";
const labelClass = "text-[0.7rem] text-text-muted tracking-wider uppercase";
const btnPrimary =
    "text-sm px-4 py-2 rounded-lg border border-(--border-strong) bg-bg-elevated text-text-secondary hover:bg-bg-hover hover:text-text-primary transition-all duration-200";
const btnDanger =
    "text-sm px-3 py-1.5 rounded-lg border border-red-900/40 bg-red-950/20 text-red-400 hover:bg-red-950/40 transition-all duration-200";
const btnGhost =
    "text-sm px-3 py-1.5 rounded-lg border border-(--border) bg-transparent text-text-muted hover:text-text-primary hover:border-(--border-strong) transition-all duration-200";

// ─── Role Form ───────────────────────────────────────────────────────────────

const RoleForm = ({
    experienceId,
    initial,
    onDone,
    onCancel,
}: {
    experienceId: string;
    initial?: RoleResponse;
    onDone: () => void;
    onCancel: () => void;
}) => {
    const [roleTitle, setRoleTitle] = useState(initial?.role_title ?? "");
    const [dateRange, setDateRange] = useState(initial?.date_range ?? "");
    const [description, setDescription] = useState(initial?.description ?? "");
    const [sortOrder, setSortOrder] = useState(initial?.sort_order ?? 0);
    const [tagsInput, setTagsInput] = useState(initial?.tags.join(", ") ?? "");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const id = toast.loading(
            initial ? "Updating role..." : "Creating role...",
        );
        const tags = tagsInput
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);
        try {
            if (initial) {
                await apiClient.patch(`/role/${initial.role_id}`, {
                    role_title: roleTitle,
                    date_range: dateRange,
                    sort_order: sortOrder,
                    description,
                    tags,
                });
            } else {
                await apiClient.post(`/role/${experienceId}`, {
                    role_title: roleTitle,
                    date_range: dateRange,
                    sort_order: sortOrder,
                    description,
                    tags,
                });
            }
            toast.success(initial ? "Role updated." : "Role created.", { id });
            onDone();
        } catch {
            toast.error("Something went wrong.", { id });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 p-4 rounded-lg border border-(--border) bg-bg-base mt-2"
        >
            <div className="flex flex-col gap-1">
                <label className={labelClass}>Role Title</label>
                <input
                    className={inputClass}
                    value={roleTitle}
                    onChange={(e) => setRoleTitle(e.target.value)}
                    required
                />
            </div>
            <div className="flex flex-col gap-1">
                <label className={labelClass}>Date Range</label>
                <input
                    className={inputClass}
                    placeholder="e.g. Jan 2025 - Present"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    required
                />
            </div>
            <div className="flex flex-col gap-1">
                <label className={labelClass}>Description</label>
                <textarea
                    className={`${inputClass} resize-none`}
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div className="flex flex-col gap-1">
                <label className={labelClass}>Tags (comma separated)</label>
                <input
                    className={inputClass}
                    placeholder="e.g. React, TypeScript, Node.js"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                />
            </div>
            <div className="flex flex-col gap-1">
                <label className={labelClass}>Sort Order</label>
                <input
                    type="number"
                    min={0}
                    className={inputClass}
                    placeholder="0"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(Number(e.target.value))}
                    required
                />
            </div>
            <div className="flex gap-2 mt-1">
                <button type="submit" disabled={loading} className={btnPrimary}>
                    {initial ? "Save" : "Create"}
                </button>
                <button type="button" onClick={onCancel} className={btnGhost}>
                    Cancel
                </button>
            </div>
        </form>
    );
};

// ─── Role Row ─────────────────────────────────────────────────────────────────

const RoleRow = ({
    role,
    onRefresh,
}: {
    role: RoleResponse;
    onRefresh: () => void;
}) => {
    const [editing, setEditing] = useState(false);

    const handleDelete = async () => {
        if (!confirm(`Delete role "${role.role_title}"?`)) return;
        const id = toast.loading("Deleting role...");
        try {
            await apiClient.delete(`/role/${role.role_id}`);
            toast.success("Role deleted.", { id });
            onRefresh();
        } catch {
            toast.error("Something went wrong.", { id });
        }
    };

    return (
        <div className="flex flex-col border-l-2 border-(--border) pl-4 py-1">
            {editing ? (
                <RoleForm
                    experienceId={role.experience_id}
                    initial={role}
                    onDone={() => {
                        setEditing(false);
                        onRefresh();
                    }}
                    onCancel={() => setEditing(false)}
                />
            ) : (
                <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-semibold text-text-primary">
                            {role.role_title}
                        </span>
                        <span className="text-[0.7rem] text-text-muted">
                            {role.date_range}
                        </span>
                        <span className="text-[0.75rem] text-text-secondary mt-1 leading-relaxed">
                            {role.description}
                        </span>
                        {role.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                                {role.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-[0.6rem] px-2 py-0.5 rounded-full border border-(--border-strong) text-text-secondary bg-bg-base"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                        <span className="text-[0.75rem] text-text-secondary mt-1 leading-relaxed">
                            Sort order: {role.sort_order}
                        </span>
                    </div>
                    <div className="flex gap-2 shrink-0">
                        <button
                            onClick={() => setEditing(true)}
                            className={btnGhost}
                        >
                            <Pencil size={13} />
                        </button>
                        <button onClick={handleDelete} className={btnDanger}>
                            <Trash2 size={13} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// ─── Experience Card ──────────────────────────────────────────────────────────

const ExperienceCard = ({
    exp,
    onRefresh,
}: {
    exp: ExperienceResponse;
    onRefresh: () => void;
}) => {
    const [expanded, setExpanded] = useState(true);
    const [editingCompany, setEditingCompany] = useState(false);
    const [company, setCompany] = useState(exp.company);
    const [addingRole, setAddingRole] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleUpdateCompany = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const id = toast.loading("Updating company...");
        try {
            await apiClient.patch(`/experience/${exp.experience_id}`, {
                company,
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
            {/* Header */}
            <div className="flex items-center justify-between gap-4">
                {editingCompany ? (
                    <form
                        onSubmit={handleUpdateCompany}
                        className="flex gap-2 flex-1"
                    >
                        <input
                            className={inputClass}
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            required
                        />
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
                    </form>
                ) : (
                    <span className="font-bold text-text-primary text-base">
                        {exp.company}
                    </span>
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

            {/* Roles */}
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

// ─── Page ─────────────────────────────────────────────────────────────────────

const AdminExperiencesPage = () => {
    const [experiences, setExperiences] = useState<ExperienceResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [addingExp, setAddingExp] = useState(false);
    const [newCompany, setNewCompany] = useState("");
    const [sortIndex, setSortIndex] = useState(0);

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
                sort_index: sortIndex,
            });
            toast.success("Experience created.", { id });
            setNewCompany("");
            setSortIndex(0);
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
                        placeholder="0"
                        value={sortIndex}
                        onChange={(e) => setSortIndex(Number(e.target.value))}
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
                    <div className="w-4 h-4 rounded-full border-2 border-(--border-strong) border-t-accent animate-spin" />
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
